import { camelCase } from 'change-case';
import { merge } from 'lodash';

import { DeepPartial, DefaultFieldProps, Field, FieldProps, Hidden } from '../fields';

export default function DefaultField({
  name,
  config,
  extraProps = {},
}: {
  name: string;
  extraProps: DefaultFieldProps;
  config: FieldProps;
}): Field {
  if (!name?.trim()) {
    throw new Error('Every field should have a name!');
  }

  const field: DeepPartial<Field> = {
    name,
    type: {
      column: 'Column',
    },
    form: true,
    table: true,
    view: true,
    hidden: false,
    actions: {
      create: true,
      read: true,
      update: true,
    },
    middleware: {
      read: [],
    },
    graphqlName: camelCase(name),
  };

  const { defaultValue } = extraProps;

  if (typeof defaultValue !== 'undefined') {
    field.default = {
      simpleSchema: defaultValue,
      typeOrm: defaultValue,
    };
  }

  const mergedField = merge(field, config, extraProps) as Field;

  if (mergedField.hidden) {
    mergedField.actions.read = extraProps?.actions?.read ?? false;
    mergedField.table = extraProps?.table ?? false;
    mergedField.form = extraProps?.form ?? false;

    if (mergedField.hidden === Hidden.FULL) {
      mergedField.actions.create = extraProps?.actions?.create ?? false;
      mergedField.actions.update = extraProps?.actions?.update ?? false;
    }
  }

  return mergedField;
}
