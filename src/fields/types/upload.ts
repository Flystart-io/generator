import { Field, FieldProps } from '../fields';

import defaultField from './default';

export default function UploadField(name: string, extraProps: FieldProps = {}): Field {
  return defaultField({
    name,
    extraProps,
    config: {
      type: {
        generator: 'upload',
        js: 'String',
        graphql: 'String',
        entity: 'string',
        simpleSchema: 'String',
      },
      component: 'Upload',
    },
  });
}
