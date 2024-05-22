import { Field, FieldProps } from '../fields';
import { TimestampField } from '../types';

export default (extraProps: FieldProps = {}): Field =>
  TimestampField('deletedAt', {
    optional: true,
    type: {
      column: 'DeleteDateColumn',
    },
    actions: {
      create: false,
      update: false,
    },
    form: false,
    table: false,
    index: true,
    ...extraProps,
  });
