import { Field, FieldProps } from '../fields';

import createdAt from './createdAt';
import deletedAt from './deletedAt';
import updatedAt from './updatedAt';

export default (
  fieldsOptions: { createdAt?: FieldProps | false; updatedAt?: FieldProps | false; deletedAt?: FieldProps | false } = {}
): Field[] => {
  const fields: Field[] = [];

  if (fieldsOptions.createdAt !== false) {
    fields.push(createdAt(fieldsOptions.createdAt));
  }

  if (fieldsOptions.updatedAt !== false) {
    fields.push(updatedAt(fieldsOptions.updatedAt));
  }

  if (fieldsOptions.deletedAt !== false) {
    fields.push(deletedAt(fieldsOptions.deletedAt));
  }

  return fields;
};
