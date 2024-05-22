/* eslint-disable no-console */

import { join, sep } from 'path';

import { snakeCase, camelCase } from 'change-case';
import pluralize from 'pluralize';

import { Field, SelectFieldProps } from '../../fields/fields';
import { FlySchema } from '../../schema';

import color from './terminalColor';

type LocaleEntry = {
  entityFields?: {
    [key: string]: Record<string, string>;
    default: Record<string, string>;
  };
  entities?: Record<string, string>;
};
type EntityTranslationEntry = {
  locale: string;
  translations: Record<string, string> | { [key: `$${string}_options`]: Record<string, string> };
};

const listFormatter: { format: (items: string[]) => string } = new Intl.ListFormat('en-US', {
  style: 'long',
  type: 'conjunction',
});

class MissingTranslationError extends Error {
  private _entityName: string;
  private _locales: string[];
  private _field?: string;
  private _fileName?: string;

  get entityName() {
    return this._entityName;
  }

  get locales() {
    return this._locales;
  }

  get field() {
    return this._field;
  }

  get fileName() {
    return this._fileName;
  }

  constructor(entityName: string, locales: string[], field?: string, fileName?: string) {
    super();

    this._entityName = entityName;
    this._locales = locales;
    this._field = field;
    this._fileName = fileName;
  }

  toString() {
    if (this.field) {
      return `Missing '${this.field}' translation for ${this.entityName} (${listFormatter.format(this.locales)})${
        this.fileName ? ` in '${this.fileName}'` : ''
      }`;
    }

    return `Missing all translations for ${this.entityName} (${listFormatter.format(this.locales)})`;
  }
}

// Translations are stored by locale, every locale a separate 'entityFields' entry.
// 	This function groups 'entityFields' entries by their locales
const groupLocalesByEntity = (locales: Record<string, LocaleEntry>) => {
  const entities: { default?: EntityTranslationEntry[] } & Record<string, EntityTranslationEntry[]> = {};

  Object.entries(locales).forEach(([locale, { entityFields = {} }]) => {
    Object.entries(entityFields).forEach(([entityName, translations]) => {
      if (entityName in entities) {
        entities[entityName].push({ locale, translations });
      } else {
        entities[entityName] = [{ locale, translations }];
      }
    });
  });

  return entities;
};

const checkTranslationsForEntityName = (
  entityName: string,
  translations: Record<string, LocaleEntry>,
  locales: string[]
): MissingTranslationError[] => {
  const errorsByKey: Record<string, string[]> = {};

  const addError = (locale: string, name: string) => {
    if (name in errorsByKey) {
      errorsByKey[name].push(locale);
    } else {
      errorsByKey[name] = [locale];
    }
  };

  locales.forEach((locale) => {
    const { entities } = translations[locale] ?? {};

    if (!entities) {
      throw new Error(`No translation for entities for locale: ${locale}`);
    }

    const singleName = camelCase(entityName);
    const pluralName = pluralize.plural(singleName);

    if (!entities[singleName]) {
      addError(locale, singleName);
    }

    if (!entities[pluralName]) {
      addError(locale, pluralName);
    }
  });

  return Object.entries(errorsByKey).map(([key, value]) => new MissingTranslationError('entities', value, key, 'entities.json'));
};

const checkTranslationsForEntity = (
  entityName: string,
  translations: EntityTranslationEntry[],
  fields: string[],
  locales: string[]
): MissingTranslationError[] => {
  if (!translations) {
    return [new MissingTranslationError(entityName, locales)];
  }

  // Check if entity has locale entry
  const entityLocales = translations.reduce((set, { locale }) => set.add(locale), new Set<string>());
  const wrongLocales = locales.filter((locale) => !entityLocales.has(locale));

  if (wrongLocales.length > 0) {
    return [new MissingTranslationError(entityName, wrongLocales)];
  }

  // Check if all fields exist in locale
  const errorLocalesByField: Record<string, string[]> = {};
  translations.forEach(({ locale, translations }) => {
    fields.forEach((field) => {
      const shouldAddField = !(field in translations) || translations[field].length <= 0;

      if (shouldAddField) {
        if (field in errorLocalesByField) {
          errorLocalesByField[field].push(locale);
        } else {
          errorLocalesByField[field] = [locale];
        }
      }
    });
  });

  return Object.entries(errorLocalesByField).map(([field, locales]) => new MissingTranslationError(entityName, locales, field));
};

const checkTranslationsForFieldOptions = (entityName: string, entityTranslations: EntityTranslationEntry[], fields: Field[]) => {
  if (!entityTranslations) {
    return [];
  }

  const errorLocalesByField: Record<string, string[]> = {};

  fields.forEach((field) => {
    if (!('options' in field)) {
      return;
    }

    const { options } = field as SelectFieldProps;

    entityTranslations.forEach(({ locale, translations }) => {
      const optionsKey = `$${snakeCase(field.name)}_options`;

      const addOption = (option: string) => {
        const optionKey = `${optionsKey}.${option}`;

        if (optionKey in errorLocalesByField) {
          errorLocalesByField[optionKey].push(locale);
        } else {
          errorLocalesByField[optionKey] = [locale];
        }
      };

      if (!(optionsKey in translations)) {
        options.forEach(addOption);

        return;
      }

      const translationOptions = translations[optionsKey];

      options.forEach((option) => {
        if (option in translationOptions && translationOptions[option].length > 0) {
          return;
        }

        addOption(option);
      });
    });
  });

  return Object.entries(errorLocalesByField).map(([field, locales]) => new MissingTranslationError(entityName, locales, field));
};

// Check that all default schemas have the same entries
const checkDefaultSchemas = (translations: Record<string, LocaleEntry>): MissingTranslationError[] => {
  const allFields = Object.values(translations).reduce((set, { entityFields = {} }) => {
    Object.keys(entityFields.default ?? {}).forEach((field) => {
      set.add(field);
    });

    return set;
  }, new Set<string>());

  const errorLocalesByField: Record<string, string[]> = {};
  Object.entries(translations).forEach(([locale, { entityFields = {} }]) => {
    const defaultFields = entityFields.default ?? {};

    allFields.forEach((requiredField) => {
      const shouldAddField = !(requiredField in defaultFields) || defaultFields[requiredField].length <= 0;

      if (shouldAddField) {
        if (requiredField in errorLocalesByField) {
          errorLocalesByField[requiredField].push(locale);
        } else {
          errorLocalesByField[requiredField] = [locale];
        }
      }
    });
  });

  return Object.entries(errorLocalesByField).map(([field, locales]) => new MissingTranslationError('default translations', locales, field));
};

const handleCheck = async (schemasPath: string, translationsDirPath: string) => {
  console.log(color.purple(`${'-'.repeat(5)}TRANSLATION CHECKS${'-'.repeat(5)}`));

  const footer = color.purple('-'.repeat(30));

  const { default: schemas }: { default: { [key: string]: FlySchema } } = await import(schemasPath);
  const {
    default: translations,
  }: {
    default: Record<string, LocaleEntry>;
  } = await import(join(translationsDirPath, './index.js'));

  const groupedTranslations = groupLocalesByEntity(translations);

  if (!groupedTranslations.default || groupedTranslations.default.length <= 0) {
    throw new Error('Unable to find default translation');
  }

  const defaultFields = Object.keys(groupedTranslations.default[0].translations);
  const locales = Object.keys(translations);
  let hasErrors = false;

  const defaultSchemaErrors = checkDefaultSchemas(translations);

  if (defaultSchemaErrors.length > 0) {
    defaultSchemaErrors.forEach((err) => {
      console.error(color.red(err.toString()));
    });
    hasErrors = true;
  } else {
    Object.values(schemas).forEach((schema) => {
      const schemaTranslations = groupedTranslations[schema.name];
      const schemaFields = schema.fields.map((field) => snakeCase(field.alias || field.name)).filter((field) => !defaultFields.includes(field));

      const errors = [
        ...checkTranslationsForEntityName(schema.name, translations, locales),
        ...checkTranslationsForEntity(schema.name, schemaTranslations, schemaFields, locales),
        ...checkTranslationsForFieldOptions(schema.name, schemaTranslations, schema.fields),
      ];

      if (errors.length <= 0) {
        console.log(`👌 ${schema.name}`);
      } else {
        console.error(color.red(`❌ ${schema.name}`));
        errors.forEach((error) => {
          console.log(`\t└─ ${color.red(error.toString())}`);
        });
        hasErrors = true;
      }
    });
  }

  if (hasErrors) {
    console.log(footer);
    console.log('You are missing translations.');
    console.log('Every entity should have a translation for every field in every locale.');
    console.log(
      `You can find the entity translation files in the ${color.blue(`'${translationsDirPath}${sep}`)}${color.blue(
        color.italic('locale')
      )}${color.blue(`${sep}entityFields${sep}'`)} directory.`
    );
  }

  console.log(footer);

  if (hasErrors) {
    process.exit(1);
  }
};

export default (rootDir: string) => {
  handleCheck(join(rootDir, './schemas/dist/schemas/index'), join(rootDir, './frontend/src/lib/locales/dist/')).catch((err: Error) => {
    console.error(` \u001b[31m[TRANSLATIONS]: ${err.toString()} \u001b[0m`);
    console.log(err.stack);
    process.exit(1);
  });
};
