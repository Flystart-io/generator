import { Field } from './fields/fields';

export interface FlySchema {
  name: string;
  fields: Field[];

  /**
   * Add unique constraints consisting of multiple fields.
   *
   * @remarks
   * Give a constraintName as the object key, and pass the array of fields that should be unique as it's value.
   *
   * @example
   * ```
   * uniqueConstraints: {
   *   organizationEmail: ['organizationId', 'email'],
   * }
   * ```
   */
  uniqueConstraints?: { [constraintName: string]: string[] };
  settings?: {
    displayField?: string;

    /**
     * This enables the subscriptions on the backend.
     *
     * @remarks
     * This also controls the generation of graphql queries for subscriptions on the frontend.
     *
     * This will also give you the `useLiveCollection` hook on the frontend model. This is a collection that automatically adds/updates/removes items in a list.
     *
     * @defaultValue `true`
     */
    enableSubscriptions?: boolean;
  };
  extraImports?: {
    /**
     * @deprecated use the new `extraImports.baseEntity
     */
    dto?: string[];

    /**
     * Extra imports for the baseEntity file.
     *
     * @example
     * This can be used when you want field middleware for example
     * ```
     * extraImports: {
     *   dto: ["import userPrivateFieldMiddleware from '@/modules/user/userPrivateField.middleware';"]
     * }
     * ```
     */
    baseEntity?: string[];
  };

  /**
   * @deprecated DO NOT USE THIS!!!!!!
   */
  customCode?: {
    baseFilterArgs: string[];
  };

  adminUi?: {
    menu?: {
      /**
       * Should the entity be shown in the menu in the Admin UI.
       *
       * @defaultValue `true`
       */
      show?: boolean;

      /**
       * The name of the menu item in the Admin UI.
       *
       * @defaultValue `entities:pluralized(camelName)`
       */
      name?: string;

      /**
       * The menu group of this entity in the Admin UI.
       *
       * @defaultValue 'Entities'
       */
      group?: string;

      /**
       * The order of the menu item within the group.
       *
       * @defaultValue 0
       */
      order?: number;
    };
  };
}
