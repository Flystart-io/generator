import { merge } from 'lodash';

import { Field, FieldProps } from '../fields';

import StringField from './string';

export default function EmailField(name: string, extraProps: FieldProps = {}): Field {
  return StringField(
    name,
    merge(
      {
        type: {
          generator: 'email',
        },
      },
      extraProps
    )
  );
}
