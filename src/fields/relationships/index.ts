import BelongsTo from './belongsTo';
import BelongsToMany from './belongsToMany';
import HasMany from './hasMany';
import HasOne from './hasOne';
import ManyToOne from './manyToOne';
import OneToMany from './oneToMany';

export const defaultPluralRelationshipValues = {
  pluralRelationship: true,
};

export { HasOne, BelongsTo, OneToMany, ManyToOne, HasMany, BelongsToMany };
