/** Define `Y` or `N` */
export type YesOrNo = 'Y' | 'N';

/** Define predicate */
export type Predicate = 'read' | 'create' | 'update' | 'delete';

export type PlainObject = Record<PropertyKey, unknown>;

export type RecipeModel<T> = T | ((cur: T) => T);

/**
 * Defines the valid values for the charset. It can only be one of the following: `UTF-8`, `UTF-16`, or `UTF-32`.
 */
export type Charset = `UTF-${'8' | '16' | '32'}`;

/**
 * Defines the type `Nil` that represents a value that can be either `null` or `undefined`.
 */
export type Nil = null | undefined;

/**
 * Defines the signature of a comparator function used for comparing values of type `T`.
 * It takes two parameters `pre` and `cur` of type `T` and returns a boolean value indicating the result of the comparison.
 */
export interface ComparatorFunc<T = unknown> {
  (pre: T, cur: T): boolean;
}

/**
 * Utility type.
 * Represents a constrained function interface that imposes constraints on the shape of a generic function
 */
export interface ConstrainedFunc<T extends (...args: any[]) => ReturnType<T>> {
  (...args: any[]): ReturnType<T>;
}

/**
 * Utility type.
 * It will output the key with value type `A` in `T`.
 */
export type ExtractKey<T, A> = {
  [K in keyof T]-?: T[K] extends A ? K : never;
}[keyof T];

/**
 * Utility type.
 * It will output keys with a value type other than `A` in `T`.
 */
export type ExcludeKey<T, A> = {
  [K in keyof T]-?: T[K] extends A ? never : K;
}[keyof T];

/**
 * Utility type.
 * It creates a new type by picking all properties from `T` except for the ones specified in `K`.
 */
export type OmitOf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Utility type.
 * It creates a new type by picking properties from `T` specified in `K` and making them mandatory.
 */
export type RequiredPick<T, K extends keyof T> = Required<{
  [P in K]: T[P];
}>;

/**
 * Utility type.
 * It creates a new type by picking properties from `T` specified in `K` and making them optional.
 */
export type PartialPick<T, K extends keyof T> = {
  [P in K]?: T[P];
};

/**
 * Utility type.
 */
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/**
 * Utility type.
 * It creates a new type by checking if `A` extends `B`, and if true, returns `A`, otherwise returns `B`.
 */
export type Cast<A, B> = A extends B ? A : B;

/**
 * Utility type.
 * It creates a new type by checking if `A` extends an array with at least two elements,
 * and if true, returns the first element of `A`, otherwise returns `A`.
 */
export type Pop<A extends unknown[]> = A extends [infer B, unknown?] ? B : A;

/**
 * Define a type called Assemble that takes two type parameters:
 * - T: the object type being assembled
 * - K: the keys of the object type T that should be included in the assembled type
 */
export type Assemble<T, K extends keyof T = keyof T> = K extends string
  ? // If K is a string (i.e. not a union type), return either K or a recursive call to Assemble
    K | (T[K] extends object ? `${K}:${Assemble<T[K]>}` : never)
  : // Otherwise, return never
    never;

/**
 * Define a type called KeyPath that takes two type parameters:
 * - T: the object type being assembled
 * - P: a string literal type that represents the predicate for filtering keys of T
 */
export type KeyPath<
  T,
  P extends string = Predicate,
> = `${Assemble<T>}:${P | '*' | '!'}`;

export interface AssertFunc<T, S = never> {
  (val: unknown, key?: keyof T): val is S;
}
