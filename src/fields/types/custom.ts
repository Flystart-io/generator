import { CustomFieldProps, Field } from '../fields';

import defaultField from './default';

export default function CustomField(name: string, extraProps: CustomFieldProps): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'custom',
      },
    },
  });
}
