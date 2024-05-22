import { merge } from 'lodash';

import { ModelField } from '../types';

import { RelationshipProps } from './relationships';

export default function (name: string, extraProps: RelationshipProps = {}) {
  return ModelField(
    name,
    merge(
      {
        relatedEntity: name,
        relationshipName: 'ManyToOne',
        relationshipType: 'ManyToOne',
        inversePluralRelationship: true,
        type: {
          column: 'JoinColumn',
        },
      },
      extraProps
    )
  );
}
