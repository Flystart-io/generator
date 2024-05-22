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
        relationshipName: 'HasMany',
        relationshipType: 'ManyToMany',
        inversePluralRelationship: true,
        type: {
          column: 'JoinTable',
        },
      },
      defaultPluralRelationshipValues,
      extraProps
    )
  );
}
