import { merge } from 'lodash';

import { Field, FieldProps } from '../fields';

import stringField from './string';

export default function RichTextField(name: string, extraProps: FieldProps = {}): Field {
  return stringField(
    name,
    merge(
      {
        type: {
          generator: 'richText',
          typeOrm: 'longtext',
        },
        table: false,
        component: 'RichText',
      },
      extraProps
    )
  );
}
