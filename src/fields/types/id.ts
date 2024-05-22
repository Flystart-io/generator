import { Field, FieldProps } from '../fields';

import defaultField from './default';

export default function IdField(name: string, extraProps: FieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'id',
        js: 'String',
        entity: 'string',
        column: 'PrimaryGeneratedColumn',
        graphql: 'ID',
        simpleSchema: 'String',
      },
      component: 'Id',
      actions: {
        create: false,
        update: false,
      },
      form: false,
      table: true,
    },
  });
}
