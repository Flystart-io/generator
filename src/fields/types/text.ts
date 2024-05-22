import { merge } from 'lodash';

import { Field, FieldProps } from '../fields';

import StringField from './string';

interface TextFieldProps extends FieldProps {
  defaultValue?: string;
}

export default function TextField(name: string, extraProps: TextFieldProps = {}): Field {
  return StringField(
    name,
    merge(
      {
        type: {
          generator: 'text',
          typeOrm: 'text',
        },
      },
      extraProps
    )
  );
}
