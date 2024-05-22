import { Field, FieldProps } from '../fields';

import defaultField from './default';

export default function ModelField(name: string, extraProps: FieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'model',
        js: 'String',
        entity: false,
        simpleSchema: 'String',
      },
      actions: {
        create: false,
        update: false,
      },
      optional: false,
      form: true,
      table: true,
    },
  });
}
