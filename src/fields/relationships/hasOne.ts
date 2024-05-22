import { merge } from 'lodash';

import { ModelField } from '../types';

import { RelationshipProps } from './relationships';

export default function (name: string, extraProps: RelationshipProps = {}) {
  return ModelField(
    name,
    merge(
      {
        relatedEntity: name,
        relationshipName: 'HasOne',
        relationshipType: 'OneToOne',
        type: {
          column: false,
        },
      },
      extraProps
    )
  );
}
