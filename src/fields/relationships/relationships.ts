import { FieldProps } from '../fields';

export interface RelationshipProps extends FieldProps {
  /** 
   * @deprecated use `name` instead.
   */
  alias?: string;

  /** 
   * @deprecated use `inverseName` instead.
   */
  connection?: string;

  /**
   * Give a custom name to this relationship. 
   * 
   * You need a name if the entity is related to itself, or related to another entity twice. 
   * By default the name is the name of the field.
   * 
   * Do not forget to define an inverseName on the inverse relationship.
   */
  name?: string;

  /**
   * The custom name for an inverse relationship.
   * 
   * This is required if the relationship on the other entity has a custom name defined.
   */
  inverseName?: string;
}

export type PluralRelationshipProps = RelationshipProps;
