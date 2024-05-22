import { merge } from 'lodash';

import { Field } from '../fields';

import BooleanField, { BooleanFieldProps } from './boolean';

export default function ApproveField(name: string, extraProps: BooleanFieldProps = {}): Field {
  return BooleanField(
    name,
    merge(
      {
        optional: true,
        table: false,
        component: 'Approve',
      },
      extraProps
    )
  );
}
