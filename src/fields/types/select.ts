import { Field, SelectFieldProps } from '../fields';

import StringField from './string';

export default function SelectField(name: string, extraProps: SelectFieldProps): Field {
  if (!Array.isArray(extraProps.options)) {
    throw new Error(`SelectField '${name}' does not have any options defined.`);
  }

  // TODO: The SelectField is basically the same as a string field in the front-end,
  //  but handling these separately could allow future back-end checks
  return StringField(name, { ...extraProps, component: 'Select' });
}
