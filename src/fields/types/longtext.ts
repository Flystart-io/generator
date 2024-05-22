import { Field, FieldProps } from '../fields';

import defaultField from './default';

interface LongTextFieldProps extends FieldProps {
  defaultValue?: string;
}

export default function (name: string, extraProps: LongTextFieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'longtext',
        js: 'String',
        graphql: 'String',
        entity: 'string',
        simpleSchema: 'String',
        typeOrm: 'longtext',
      },
      component: 'LongText',
    },
  });
}
