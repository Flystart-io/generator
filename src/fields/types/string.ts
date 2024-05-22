import { DefaultFieldProps, Field } from '../fields';

import defaultField from './default';

export default function StringField(name: string, { defaultValue, ...extraProps }: DefaultFieldProps = {}): Field {
  // TODO: probably breaks when field is set to optional says Vic
  const stringDefaultValue = (() => {
    if (defaultValue === null) {
      return 'null';
    }

    return defaultValue ? `"${defaultValue}"` : defaultValue;
  })();

  return defaultField({
    name,
    extraProps: { defaultValue: undefined, ...extraProps },
    config: {
      type: {
        generator: 'string',
        js: 'String',
        graphql: 'String',
        entity: 'string',
        simpleSchema: 'String',
      },
      default: {
        simpleSchema: stringDefaultValue,
        typeOrm: stringDefaultValue,
      },
    },
  });
}
