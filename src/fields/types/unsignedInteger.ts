import { Field, FieldProps } from '../fields';

import defaultField from './default';

interface UnsignedIntegerFieldProps extends FieldProps {
  defaultValue?: number;
}

export default function UnsignedIntegerField(name: string, extraProps: UnsignedIntegerFieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'unsignedInteger',
        js: 'Number',
        graphql: 'Int',
        entity: 'number',
        simpleSchema: 'SimpleSchema.Integer',
      },
      component: 'Number',
    },
  });
}
