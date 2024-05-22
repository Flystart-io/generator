import { Field, FieldProps } from '../fields';

import defaultField from './default';

export default function DateTimeField(name: string, extraProps: FieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'dateTime',
        js: 'Date',
        graphql: 'DateTime',
        entity: 'Date',
        simpleSchema: 'Date',
        typeOrm: 'datetime',
      },
      component: 'DateTime',
    },
  });
}
