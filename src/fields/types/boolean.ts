import { Field, FieldProps } from '../fields';

import defaultField from './default';

export interface BooleanFieldProps extends Omit<FieldProps, 'defaultValue'> {
  defaultValue?: string | number | boolean | null;
}

export default function BooleanField(name: string, { defaultValue = null, ...extraProps }: BooleanFieldProps = {}): Field {
  const field = defaultField({
    name,
    extraProps: { defaultValue: undefined, ...extraProps },
    config: {
      type: {
        generator: 'boolean',
        js: 'Boolean',
        graphql: 'Boolean',
        entity: 'boolean',
        simpleSchema: 'Boolean',
      },
      component: 'Boolean',
    },
  });

  // If this field is required and if it has no default value, set the default value to false
  if ((defaultValue === null || defaultValue === undefined) && !extraProps.optional) {
    // eslint-disable-next-line no-param-reassign
    defaultValue = false;
  }

  if (defaultValue !== null) {
    field.default = {
      simpleSchema: Boolean(defaultValue).toString(),
      typeOrm: Number(defaultValue),
    };
  }

  return field;
}
