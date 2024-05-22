import { Field, FieldProps } from '../fields';

import defaultField from './default';

interface DoubleFieldProps extends FieldProps {
  defaultValue?: number;
}

export default function DoubleField(name: string, extraProps: DoubleFieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'double',
        js: 'Number',
        graphql: 'Float',
        entity: 'number',
        simpleSchema: 'Number',
        typeOrm: 'double',
      },
    },
  });
}
