// Same as Partial<T>, but works for nested objects
// Unfortunately TypeScript does not have this utility type natively
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export enum Hidden {
  /**
   * @description Hide the field from forms, tables and database lookups, inserts and updates. Useful for internal fields.
   */
  FULL = 'full',
  /**
   * @description Hide the field from forms, tables and database lookups.
   */
  LIMITED = 'limited',
}

export interface Field {
  name: string;
  type: {
    /**
     * The name of the type of generator field.
     */
    generator: string;
    /**
     * Simple schema type as JS base type function.
     */
    js: 'String' | 'Number' | 'Boolean' | 'Array' | 'Object' | 'Date' | 'Integer';

    /**
     * Typescript type for the column in the entity definition. Set to `false` to disable.
     */
    entity: 'Date' | 'boolean' | 'number' | 'string' | false;

    /**
     * The TypeORM column decorator.
     *
     * @see {@link https://typeorm.io/decorator-reference#column-decorators}
     */
    column:
      | 'Column'
      | 'PrimaryGeneratedColumn'
      | 'JoinColumn'
      | 'JoinTable'
      | 'CreateDateColumn'
      | 'UpdateDateColumn'
      | 'DeleteDateColumn'
      | false;

    /**
     * The graphql type used in graphql queries. Also nestjs automatically casts values to this type.
     *
     * @see {@link https://graphql.org/learn/schema/#scalar-types}
     */
    graphql: 'Boolean' | 'DateTime' | 'Float' | 'ID' | 'Int' | 'String';

    /**
     * The simpleSchema type.
     *
     * @see {@link https://github.com/longshotlabs/simpl-schema#type}.
     */
    simpleSchema: 'String' | 'Number' | 'SimpleSchema.Integer' | 'Boolean' | 'Object' | 'Array' | 'Date';

    /**
     * The column type for TypeORM.
     *
     * @see {@link https://typeorm.io/entities#column-types}.
     */
    typeOrm: string;
  };

  /**
   * Determines whether this field is shown in the form.
   *
   * @default true
   */
  form: boolean;
  /**
   * This determines if this field should be shown in the table or not.
   *
   * @default true
   */
  table: boolean;
  /**
   * Determines whether this field should be displayed on the view page.
   */
  view: boolean;

  /**
   * Allowed actions to perform on this field
   */
  actions: {
    create: boolean;
    read: boolean;
    update: boolean;
  };

  /**
   * GraphQL middleware
   */
  middleware?: {
    read?: string[];
  };

  /**
   * This determines if this field is nullable in the database and in the frontend validation.
   *
   * @default false
   */
  optional?: boolean;
  /**
   * Whether to hide this field from queries
   */
  hidden?: Hidden | false;
  /**
   * Name of the GraphQL field
   */
  graphqlName: string;
  /**
   * Default value
   */
  default?: {
    simpleSchema: string | number | false;
    typeOrm: string | number | false;
  };
  onUpdate?: string;
  component?: string;
  /**
   * Determines if this field should be unique
   */
  unique?: boolean;
  index?: boolean;

  /**
   * @deprecated use `name` instead.
   */
  alias?: string;
  /**
   * Timestamp precision
   */
  precision?: number;
}

export type FieldProps = DeepPartial<Omit<Field, 'name'>>;

export type DefaultFieldProps = FieldProps & {
  defaultValue?: string | number | false;
};

export type CustomFieldProps = Omit<FieldProps, 'type'> & {
  type?: Omit<NonNullable<FieldProps['type']>, 'generator'>;
};

export type SelectFieldProps = FieldProps & {
  /**
   * Options for a select field. Only applicable for the SelectField.
   */
  options: readonly string[];
  defaultValue?: string;
};
