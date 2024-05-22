import { merge } from 'lodash';

import { Field, FieldProps, Hidden } from '../fields';

import stringField from './string';

export default function PasswordField(name: string, extraProps: FieldProps = {}): Field {
  return stringField(
    name,
    merge(
      {
        type: {
          generator: 'password',
          graphqlDirective: '@bcrypt',
        },
        hidden: Hidden.LIMITED,
      },
      extraProps
    )
  );
}
