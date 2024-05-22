import { Field, FieldProps } from '../fields';
import { TimestampField } from '../types';

export default (extraProps: FieldProps = {}): Field =>
  TimestampField('updatedAt', {
    optional: true,
    type: {
      column: 'UpdateDateColumn',
    },
    default: {
      typeOrm: 'currentTimestamp',
    },
    onUpdate: 'currentTimestamp()',
    actions: {
      create: false,
      update: false,
    },
    form: false,
    ...extraProps,
  });
