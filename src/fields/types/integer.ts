import { Field, FieldProps } from '../fields';

import defaultField from './default';

interface IntegerFieldProps extends FieldProps {
  defaultValue?: number;
}

export default function IntegerField(name: string, extraProps: IntegerFieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'integer',
        js: 'Integer',
        graphql: 'Int',
        entity: 'number',
        simpleSchema: 'SimpleSchema.Integer',
        typeOrm: 'int',
      },
      component: 'Number',
    },
  });
}
