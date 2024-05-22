import { Field, FieldProps } from '../fields';

import defaultField from './default';

export default function ArrayField(name: string, extraProps: FieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'array',
        js: 'Array',
        entity: false,
        simpleSchema: 'Array',
      },
      actions: {
        create: false,
        update: false,
      },
      optional: true,
      table: true,
    },
  });
}
