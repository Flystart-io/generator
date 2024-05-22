import { Field, FieldProps } from '../fields';

import defaultField from './default';

interface FloatFieldProps extends FieldProps {
  defaultValue?: number;
}

export default function FloatField(name: string, extraProps: FloatFieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'float',
        js: 'Number',
        graphql: 'Float',
        entity: 'number',
        simpleSchema: 'Number',
        typeOrm: 'float',
      },
    },
  });
}
