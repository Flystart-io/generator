import { merge } from 'lodash';

import { ArrayField } from '../types';

import { PluralRelationshipProps } from './relationships';

import { defaultPluralRelationshipValues } from '.';

export default function (name: string, extraProps: PluralRelationshipProps = {}) {
  return ArrayField(
    name,
    merge(
      {
        relatedEntity: name,
        relationshipName: 'OneToMany',
        relationshipType: 'OneToMany',
        type: {
          column: false,
        },
        form: false,
      },
      defaultPluralRelationshipValues,
      extraProps
    )
  );
}
