import { FieldProps } from '../fields';

export interface RelationshipProps extends FieldProps {
  alias?: string;
  connection?: string;
}

export type PluralRelationshipProps = RelationshipProps;
