import { Field, FieldProps } from '../fields';
import { TimestampField } from '../types';

export default (extraProps: FieldProps = {}): Field =>
  TimestampField('createdAt', {
    optional: true,
    type: {
      column: 'CreateDateColumn',
    },
    default: {
      typeOrm: 'currentTimestamp',
    },
    actions: {
      create: false,
      update: false,
    },
    form: false,
    ...extraProps,
  });
