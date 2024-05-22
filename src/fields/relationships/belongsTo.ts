import { merge } from 'lodash';

import { ModelField } from '../types';

import { RelationshipProps } from './relationships';

export default function (name: string, extraProps: RelationshipProps = {}) {
  return ModelField(
    name,
    merge(
      {
        relatedEntity: name,
        relationshipName: 'BelongsTo',
        relationshipType: 'OneToOne',
        type: {
          column: 'JoinColumn',
        },
      },
      extraProps
    )
  );
}
