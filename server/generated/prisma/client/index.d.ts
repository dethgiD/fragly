
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>
/**
 * Model PlayerMatchStats
 * 
 */
export type PlayerMatchStats = $Result.DefaultSelection<Prisma.$PlayerMatchStatsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playerMatchStats`: Exposes CRUD operations for the **PlayerMatchStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlayerMatchStats
    * const playerMatchStats = await prisma.playerMatchStats.findMany()
    * ```
    */
  get playerMatchStats(): Prisma.PlayerMatchStatsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Player: 'Player',
    Match: 'Match',
    PlayerMatchStats: 'PlayerMatchStats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "player" | "match" | "playerMatchStats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
      PlayerMatchStats: {
        payload: Prisma.$PlayerMatchStatsPayload<ExtArgs>
        fields: Prisma.PlayerMatchStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerMatchStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerMatchStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>
          }
          findFirst: {
            args: Prisma.PlayerMatchStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerMatchStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>
          }
          findMany: {
            args: Prisma.PlayerMatchStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>[]
          }
          create: {
            args: Prisma.PlayerMatchStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>
          }
          createMany: {
            args: Prisma.PlayerMatchStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerMatchStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>[]
          }
          delete: {
            args: Prisma.PlayerMatchStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>
          }
          update: {
            args: Prisma.PlayerMatchStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>
          }
          deleteMany: {
            args: Prisma.PlayerMatchStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerMatchStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerMatchStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>[]
          }
          upsert: {
            args: Prisma.PlayerMatchStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchStatsPayload>
          }
          aggregate: {
            args: Prisma.PlayerMatchStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayerMatchStats>
          }
          groupBy: {
            args: Prisma.PlayerMatchStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerMatchStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerMatchStatsCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerMatchStatsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    player?: PlayerOmit
    match?: MatchOmit
    playerMatchStats?: PlayerMatchStatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    stats: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | PlayerCountOutputTypeCountStatsArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerMatchStatsWhereInput
  }


  /**
   * Count Type MatchCountOutputType
   */

  export type MatchCountOutputType = {
    stats: number
  }

  export type MatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | MatchCountOutputTypeCountStatsArgs
  }

  // Custom InputTypes
  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchCountOutputType
     */
    select?: MatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerMatchStatsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    gameAuthCode: string | null
    lastMatchCode: string | null
    playerId: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    gameAuthCode: string | null
    lastMatchCode: string | null
    playerId: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    gameAuthCode: number
    lastMatchCode: number
    playerId: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    gameAuthCode?: true
    lastMatchCode?: true
    playerId?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    gameAuthCode?: true
    lastMatchCode?: true
    playerId?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    gameAuthCode?: true
    lastMatchCode?: true
    playerId?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    gameAuthCode: string | null
    lastMatchCode: string | null
    playerId: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    gameAuthCode?: boolean
    lastMatchCode?: boolean
    playerId?: boolean
    createdAt?: boolean
    player?: boolean | User$playerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    gameAuthCode?: boolean
    lastMatchCode?: boolean
    playerId?: boolean
    createdAt?: boolean
    player?: boolean | User$playerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    gameAuthCode?: boolean
    lastMatchCode?: boolean
    playerId?: boolean
    createdAt?: boolean
    player?: boolean | User$playerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    gameAuthCode?: boolean
    lastMatchCode?: boolean
    playerId?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "gameAuthCode" | "lastMatchCode" | "playerId" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | User$playerArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | User$playerArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | User$playerArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      gameAuthCode: string | null
      lastMatchCode: string | null
      playerId: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends User$playerArgs<ExtArgs> = {}>(args?: Subset<T, User$playerArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly gameAuthCode: FieldRef<"User", 'String'>
    readonly lastMatchCode: FieldRef<"User", 'String'>
    readonly playerId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.player
   */
  export type User$playerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    steamId: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    steamId: string | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    steamId: number
    _all: number
  }


  export type PlayerMinAggregateInputType = {
    id?: true
    steamId?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    steamId?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    steamId?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    steamId: string
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    steamId?: boolean
    user?: boolean | Player$userArgs<ExtArgs>
    stats?: boolean | Player$statsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    steamId?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    steamId?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    steamId?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "steamId", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Player$userArgs<ExtArgs>
    stats?: boolean | Player$statsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      stats: Prisma.$PlayerMatchStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      steamId: string
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Player$userArgs<ExtArgs> = {}>(args?: Subset<T, Player$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    stats<T extends Player$statsArgs<ExtArgs> = {}>(args?: Subset<T, Player$statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly steamId: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.user
   */
  export type Player$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Player.stats
   */
  export type Player$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    where?: PlayerMatchStatsWhereInput
    orderBy?: PlayerMatchStatsOrderByWithRelationInput | PlayerMatchStatsOrderByWithRelationInput[]
    cursor?: PlayerMatchStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerMatchStatsScalarFieldEnum | PlayerMatchStatsScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    team1Score: number | null
    team2Score: number | null
  }

  export type MatchSumAggregateOutputType = {
    team1Score: number | null
    team2Score: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    team1Score: number | null
    team2Score: number | null
    playedAt: Date | null
  }

  export type MatchMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    team1Score: number | null
    team2Score: number | null
    playedAt: Date | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    matchId: number
    team1Score: number
    team2Score: number
    playedAt: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    team1Score?: true
    team2Score?: true
  }

  export type MatchSumAggregateInputType = {
    team1Score?: true
    team2Score?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    matchId?: true
    team1Score?: true
    team2Score?: true
    playedAt?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    matchId?: true
    team1Score?: true
    team2Score?: true
    playedAt?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    matchId?: true
    team1Score?: true
    team2Score?: true
    playedAt?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: string
    matchId: string
    team1Score: number
    team2Score: number
    playedAt: Date
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    team1Score?: boolean
    team2Score?: boolean
    playedAt?: boolean
    stats?: boolean | Match$statsArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    team1Score?: boolean
    team2Score?: boolean
    playedAt?: boolean
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    team1Score?: boolean
    team2Score?: boolean
    playedAt?: boolean
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    matchId?: boolean
    team1Score?: boolean
    team2Score?: boolean
    playedAt?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "team1Score" | "team2Score" | "playedAt", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | Match$statsArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      stats: Prisma.$PlayerMatchStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      team1Score: number
      team2Score: number
      playedAt: Date
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends Match$statsArgs<ExtArgs> = {}>(args?: Subset<T, Match$statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'String'>
    readonly matchId: FieldRef<"Match", 'String'>
    readonly team1Score: FieldRef<"Match", 'Int'>
    readonly team2Score: FieldRef<"Match", 'Int'>
    readonly playedAt: FieldRef<"Match", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.stats
   */
  export type Match$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    where?: PlayerMatchStatsWhereInput
    orderBy?: PlayerMatchStatsOrderByWithRelationInput | PlayerMatchStatsOrderByWithRelationInput[]
    cursor?: PlayerMatchStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerMatchStatsScalarFieldEnum | PlayerMatchStatsScalarFieldEnum[]
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Model PlayerMatchStats
   */

  export type AggregatePlayerMatchStats = {
    _count: PlayerMatchStatsCountAggregateOutputType | null
    _avg: PlayerMatchStatsAvgAggregateOutputType | null
    _sum: PlayerMatchStatsSumAggregateOutputType | null
    _min: PlayerMatchStatsMinAggregateOutputType | null
    _max: PlayerMatchStatsMaxAggregateOutputType | null
  }

  export type PlayerMatchStatsAvgAggregateOutputType = {
    teamNumber: number | null
    accuracy: number | null
    accuracySpotted: number | null
    hsAccuracy: number | null
    timeToDamage: number | null
    crosshairPlacement: number | null
    counterStrafing: number | null
    totalKills: number | null
    totalDeaths: number | null
    openingKills: number | null
    tradeKills: number | null
    tradeKillPercentage: number | null
    tradedDeaths: number | null
    tradedDeathPercentage: number | null
    multiKillRounds: number | null
    multiKillPercentage: number | null
  }

  export type PlayerMatchStatsSumAggregateOutputType = {
    teamNumber: number | null
    accuracy: number | null
    accuracySpotted: number | null
    hsAccuracy: number | null
    timeToDamage: number | null
    crosshairPlacement: number | null
    counterStrafing: number | null
    totalKills: number | null
    totalDeaths: number | null
    openingKills: number | null
    tradeKills: number | null
    tradeKillPercentage: number | null
    tradedDeaths: number | null
    tradedDeathPercentage: number | null
    multiKillRounds: number | null
    multiKillPercentage: number | null
  }

  export type PlayerMatchStatsMinAggregateOutputType = {
    id: string | null
    playerId: string | null
    matchId: string | null
    steamId: string | null
    username: string | null
    teamNumber: number | null
    accuracy: number | null
    accuracySpotted: number | null
    hsAccuracy: number | null
    timeToDamage: number | null
    crosshairPlacement: number | null
    counterStrafing: number | null
    totalKills: number | null
    totalDeaths: number | null
    openingKills: number | null
    tradeKills: number | null
    tradeKillPercentage: number | null
    tradedDeaths: number | null
    tradedDeathPercentage: number | null
    multiKillRounds: number | null
    multiKillPercentage: number | null
  }

  export type PlayerMatchStatsMaxAggregateOutputType = {
    id: string | null
    playerId: string | null
    matchId: string | null
    steamId: string | null
    username: string | null
    teamNumber: number | null
    accuracy: number | null
    accuracySpotted: number | null
    hsAccuracy: number | null
    timeToDamage: number | null
    crosshairPlacement: number | null
    counterStrafing: number | null
    totalKills: number | null
    totalDeaths: number | null
    openingKills: number | null
    tradeKills: number | null
    tradeKillPercentage: number | null
    tradedDeaths: number | null
    tradedDeathPercentage: number | null
    multiKillRounds: number | null
    multiKillPercentage: number | null
  }

  export type PlayerMatchStatsCountAggregateOutputType = {
    id: number
    playerId: number
    matchId: number
    steamId: number
    username: number
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
    _all: number
  }


  export type PlayerMatchStatsAvgAggregateInputType = {
    teamNumber?: true
    accuracy?: true
    accuracySpotted?: true
    hsAccuracy?: true
    timeToDamage?: true
    crosshairPlacement?: true
    counterStrafing?: true
    totalKills?: true
    totalDeaths?: true
    openingKills?: true
    tradeKills?: true
    tradeKillPercentage?: true
    tradedDeaths?: true
    tradedDeathPercentage?: true
    multiKillRounds?: true
    multiKillPercentage?: true
  }

  export type PlayerMatchStatsSumAggregateInputType = {
    teamNumber?: true
    accuracy?: true
    accuracySpotted?: true
    hsAccuracy?: true
    timeToDamage?: true
    crosshairPlacement?: true
    counterStrafing?: true
    totalKills?: true
    totalDeaths?: true
    openingKills?: true
    tradeKills?: true
    tradeKillPercentage?: true
    tradedDeaths?: true
    tradedDeathPercentage?: true
    multiKillRounds?: true
    multiKillPercentage?: true
  }

  export type PlayerMatchStatsMinAggregateInputType = {
    id?: true
    playerId?: true
    matchId?: true
    steamId?: true
    username?: true
    teamNumber?: true
    accuracy?: true
    accuracySpotted?: true
    hsAccuracy?: true
    timeToDamage?: true
    crosshairPlacement?: true
    counterStrafing?: true
    totalKills?: true
    totalDeaths?: true
    openingKills?: true
    tradeKills?: true
    tradeKillPercentage?: true
    tradedDeaths?: true
    tradedDeathPercentage?: true
    multiKillRounds?: true
    multiKillPercentage?: true
  }

  export type PlayerMatchStatsMaxAggregateInputType = {
    id?: true
    playerId?: true
    matchId?: true
    steamId?: true
    username?: true
    teamNumber?: true
    accuracy?: true
    accuracySpotted?: true
    hsAccuracy?: true
    timeToDamage?: true
    crosshairPlacement?: true
    counterStrafing?: true
    totalKills?: true
    totalDeaths?: true
    openingKills?: true
    tradeKills?: true
    tradeKillPercentage?: true
    tradedDeaths?: true
    tradedDeathPercentage?: true
    multiKillRounds?: true
    multiKillPercentage?: true
  }

  export type PlayerMatchStatsCountAggregateInputType = {
    id?: true
    playerId?: true
    matchId?: true
    steamId?: true
    username?: true
    teamNumber?: true
    accuracy?: true
    accuracySpotted?: true
    hsAccuracy?: true
    timeToDamage?: true
    crosshairPlacement?: true
    counterStrafing?: true
    totalKills?: true
    totalDeaths?: true
    openingKills?: true
    tradeKills?: true
    tradeKillPercentage?: true
    tradedDeaths?: true
    tradedDeathPercentage?: true
    multiKillRounds?: true
    multiKillPercentage?: true
    _all?: true
  }

  export type PlayerMatchStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayerMatchStats to aggregate.
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatchStats to fetch.
     */
    orderBy?: PlayerMatchStatsOrderByWithRelationInput | PlayerMatchStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerMatchStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatchStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatchStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlayerMatchStats
    **/
    _count?: true | PlayerMatchStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerMatchStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerMatchStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMatchStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMatchStatsMaxAggregateInputType
  }

  export type GetPlayerMatchStatsAggregateType<T extends PlayerMatchStatsAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayerMatchStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayerMatchStats[P]>
      : GetScalarType<T[P], AggregatePlayerMatchStats[P]>
  }




  export type PlayerMatchStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerMatchStatsWhereInput
    orderBy?: PlayerMatchStatsOrderByWithAggregationInput | PlayerMatchStatsOrderByWithAggregationInput[]
    by: PlayerMatchStatsScalarFieldEnum[] | PlayerMatchStatsScalarFieldEnum
    having?: PlayerMatchStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerMatchStatsCountAggregateInputType | true
    _avg?: PlayerMatchStatsAvgAggregateInputType
    _sum?: PlayerMatchStatsSumAggregateInputType
    _min?: PlayerMatchStatsMinAggregateInputType
    _max?: PlayerMatchStatsMaxAggregateInputType
  }

  export type PlayerMatchStatsGroupByOutputType = {
    id: string
    playerId: string
    matchId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
    _count: PlayerMatchStatsCountAggregateOutputType | null
    _avg: PlayerMatchStatsAvgAggregateOutputType | null
    _sum: PlayerMatchStatsSumAggregateOutputType | null
    _min: PlayerMatchStatsMinAggregateOutputType | null
    _max: PlayerMatchStatsMaxAggregateOutputType | null
  }

  type GetPlayerMatchStatsGroupByPayload<T extends PlayerMatchStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerMatchStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerMatchStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerMatchStatsGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerMatchStatsGroupByOutputType[P]>
        }
      >
    >


  export type PlayerMatchStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    matchId?: boolean
    steamId?: boolean
    username?: boolean
    teamNumber?: boolean
    accuracy?: boolean
    accuracySpotted?: boolean
    hsAccuracy?: boolean
    timeToDamage?: boolean
    crosshairPlacement?: boolean
    counterStrafing?: boolean
    totalKills?: boolean
    totalDeaths?: boolean
    openingKills?: boolean
    tradeKills?: boolean
    tradeKillPercentage?: boolean
    tradedDeaths?: boolean
    tradedDeathPercentage?: boolean
    multiKillRounds?: boolean
    multiKillPercentage?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerMatchStats"]>

  export type PlayerMatchStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    matchId?: boolean
    steamId?: boolean
    username?: boolean
    teamNumber?: boolean
    accuracy?: boolean
    accuracySpotted?: boolean
    hsAccuracy?: boolean
    timeToDamage?: boolean
    crosshairPlacement?: boolean
    counterStrafing?: boolean
    totalKills?: boolean
    totalDeaths?: boolean
    openingKills?: boolean
    tradeKills?: boolean
    tradeKillPercentage?: boolean
    tradedDeaths?: boolean
    tradedDeathPercentage?: boolean
    multiKillRounds?: boolean
    multiKillPercentage?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerMatchStats"]>

  export type PlayerMatchStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    matchId?: boolean
    steamId?: boolean
    username?: boolean
    teamNumber?: boolean
    accuracy?: boolean
    accuracySpotted?: boolean
    hsAccuracy?: boolean
    timeToDamage?: boolean
    crosshairPlacement?: boolean
    counterStrafing?: boolean
    totalKills?: boolean
    totalDeaths?: boolean
    openingKills?: boolean
    tradeKills?: boolean
    tradeKillPercentage?: boolean
    tradedDeaths?: boolean
    tradedDeathPercentage?: boolean
    multiKillRounds?: boolean
    multiKillPercentage?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerMatchStats"]>

  export type PlayerMatchStatsSelectScalar = {
    id?: boolean
    playerId?: boolean
    matchId?: boolean
    steamId?: boolean
    username?: boolean
    teamNumber?: boolean
    accuracy?: boolean
    accuracySpotted?: boolean
    hsAccuracy?: boolean
    timeToDamage?: boolean
    crosshairPlacement?: boolean
    counterStrafing?: boolean
    totalKills?: boolean
    totalDeaths?: boolean
    openingKills?: boolean
    tradeKills?: boolean
    tradeKillPercentage?: boolean
    tradedDeaths?: boolean
    tradedDeathPercentage?: boolean
    multiKillRounds?: boolean
    multiKillPercentage?: boolean
  }

  export type PlayerMatchStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playerId" | "matchId" | "steamId" | "username" | "teamNumber" | "accuracy" | "accuracySpotted" | "hsAccuracy" | "timeToDamage" | "crosshairPlacement" | "counterStrafing" | "totalKills" | "totalDeaths" | "openingKills" | "tradeKills" | "tradeKillPercentage" | "tradedDeaths" | "tradedDeathPercentage" | "multiKillRounds" | "multiKillPercentage", ExtArgs["result"]["playerMatchStats"]>
  export type PlayerMatchStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type PlayerMatchStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type PlayerMatchStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }

  export type $PlayerMatchStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlayerMatchStats"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>
      match: Prisma.$MatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playerId: string
      matchId: string
      steamId: string
      username: string
      teamNumber: number
      accuracy: number
      accuracySpotted: number
      hsAccuracy: number
      timeToDamage: number
      crosshairPlacement: number
      counterStrafing: number
      totalKills: number
      totalDeaths: number
      openingKills: number
      tradeKills: number
      tradeKillPercentage: number
      tradedDeaths: number
      tradedDeathPercentage: number
      multiKillRounds: number
      multiKillPercentage: number
    }, ExtArgs["result"]["playerMatchStats"]>
    composites: {}
  }

  type PlayerMatchStatsGetPayload<S extends boolean | null | undefined | PlayerMatchStatsDefaultArgs> = $Result.GetResult<Prisma.$PlayerMatchStatsPayload, S>

  type PlayerMatchStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerMatchStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerMatchStatsCountAggregateInputType | true
    }

  export interface PlayerMatchStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlayerMatchStats'], meta: { name: 'PlayerMatchStats' } }
    /**
     * Find zero or one PlayerMatchStats that matches the filter.
     * @param {PlayerMatchStatsFindUniqueArgs} args - Arguments to find a PlayerMatchStats
     * @example
     * // Get one PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerMatchStatsFindUniqueArgs>(args: SelectSubset<T, PlayerMatchStatsFindUniqueArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlayerMatchStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerMatchStatsFindUniqueOrThrowArgs} args - Arguments to find a PlayerMatchStats
     * @example
     * // Get one PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerMatchStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerMatchStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlayerMatchStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsFindFirstArgs} args - Arguments to find a PlayerMatchStats
     * @example
     * // Get one PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerMatchStatsFindFirstArgs>(args?: SelectSubset<T, PlayerMatchStatsFindFirstArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlayerMatchStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsFindFirstOrThrowArgs} args - Arguments to find a PlayerMatchStats
     * @example
     * // Get one PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerMatchStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerMatchStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlayerMatchStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.findMany()
     * 
     * // Get first 10 PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerMatchStatsWithIdOnly = await prisma.playerMatchStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerMatchStatsFindManyArgs>(args?: SelectSubset<T, PlayerMatchStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlayerMatchStats.
     * @param {PlayerMatchStatsCreateArgs} args - Arguments to create a PlayerMatchStats.
     * @example
     * // Create one PlayerMatchStats
     * const PlayerMatchStats = await prisma.playerMatchStats.create({
     *   data: {
     *     // ... data to create a PlayerMatchStats
     *   }
     * })
     * 
     */
    create<T extends PlayerMatchStatsCreateArgs>(args: SelectSubset<T, PlayerMatchStatsCreateArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlayerMatchStats.
     * @param {PlayerMatchStatsCreateManyArgs} args - Arguments to create many PlayerMatchStats.
     * @example
     * // Create many PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerMatchStatsCreateManyArgs>(args?: SelectSubset<T, PlayerMatchStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlayerMatchStats and returns the data saved in the database.
     * @param {PlayerMatchStatsCreateManyAndReturnArgs} args - Arguments to create many PlayerMatchStats.
     * @example
     * // Create many PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlayerMatchStats and only return the `id`
     * const playerMatchStatsWithIdOnly = await prisma.playerMatchStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerMatchStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerMatchStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlayerMatchStats.
     * @param {PlayerMatchStatsDeleteArgs} args - Arguments to delete one PlayerMatchStats.
     * @example
     * // Delete one PlayerMatchStats
     * const PlayerMatchStats = await prisma.playerMatchStats.delete({
     *   where: {
     *     // ... filter to delete one PlayerMatchStats
     *   }
     * })
     * 
     */
    delete<T extends PlayerMatchStatsDeleteArgs>(args: SelectSubset<T, PlayerMatchStatsDeleteArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlayerMatchStats.
     * @param {PlayerMatchStatsUpdateArgs} args - Arguments to update one PlayerMatchStats.
     * @example
     * // Update one PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerMatchStatsUpdateArgs>(args: SelectSubset<T, PlayerMatchStatsUpdateArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlayerMatchStats.
     * @param {PlayerMatchStatsDeleteManyArgs} args - Arguments to filter PlayerMatchStats to delete.
     * @example
     * // Delete a few PlayerMatchStats
     * const { count } = await prisma.playerMatchStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerMatchStatsDeleteManyArgs>(args?: SelectSubset<T, PlayerMatchStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayerMatchStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerMatchStatsUpdateManyArgs>(args: SelectSubset<T, PlayerMatchStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayerMatchStats and returns the data updated in the database.
     * @param {PlayerMatchStatsUpdateManyAndReturnArgs} args - Arguments to update many PlayerMatchStats.
     * @example
     * // Update many PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlayerMatchStats and only return the `id`
     * const playerMatchStatsWithIdOnly = await prisma.playerMatchStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerMatchStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerMatchStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlayerMatchStats.
     * @param {PlayerMatchStatsUpsertArgs} args - Arguments to update or create a PlayerMatchStats.
     * @example
     * // Update or create a PlayerMatchStats
     * const playerMatchStats = await prisma.playerMatchStats.upsert({
     *   create: {
     *     // ... data to create a PlayerMatchStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayerMatchStats we want to update
     *   }
     * })
     */
    upsert<T extends PlayerMatchStatsUpsertArgs>(args: SelectSubset<T, PlayerMatchStatsUpsertArgs<ExtArgs>>): Prisma__PlayerMatchStatsClient<$Result.GetResult<Prisma.$PlayerMatchStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlayerMatchStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsCountArgs} args - Arguments to filter PlayerMatchStats to count.
     * @example
     * // Count the number of PlayerMatchStats
     * const count = await prisma.playerMatchStats.count({
     *   where: {
     *     // ... the filter for the PlayerMatchStats we want to count
     *   }
     * })
    **/
    count<T extends PlayerMatchStatsCountArgs>(
      args?: Subset<T, PlayerMatchStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerMatchStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlayerMatchStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerMatchStatsAggregateArgs>(args: Subset<T, PlayerMatchStatsAggregateArgs>): Prisma.PrismaPromise<GetPlayerMatchStatsAggregateType<T>>

    /**
     * Group by PlayerMatchStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerMatchStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerMatchStatsGroupByArgs['orderBy'] }
        : { orderBy?: PlayerMatchStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerMatchStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerMatchStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlayerMatchStats model
   */
  readonly fields: PlayerMatchStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlayerMatchStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerMatchStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlayerMatchStats model
   */
  interface PlayerMatchStatsFieldRefs {
    readonly id: FieldRef<"PlayerMatchStats", 'String'>
    readonly playerId: FieldRef<"PlayerMatchStats", 'String'>
    readonly matchId: FieldRef<"PlayerMatchStats", 'String'>
    readonly steamId: FieldRef<"PlayerMatchStats", 'String'>
    readonly username: FieldRef<"PlayerMatchStats", 'String'>
    readonly teamNumber: FieldRef<"PlayerMatchStats", 'Int'>
    readonly accuracy: FieldRef<"PlayerMatchStats", 'Float'>
    readonly accuracySpotted: FieldRef<"PlayerMatchStats", 'Float'>
    readonly hsAccuracy: FieldRef<"PlayerMatchStats", 'Float'>
    readonly timeToDamage: FieldRef<"PlayerMatchStats", 'Float'>
    readonly crosshairPlacement: FieldRef<"PlayerMatchStats", 'Float'>
    readonly counterStrafing: FieldRef<"PlayerMatchStats", 'Float'>
    readonly totalKills: FieldRef<"PlayerMatchStats", 'Int'>
    readonly totalDeaths: FieldRef<"PlayerMatchStats", 'Int'>
    readonly openingKills: FieldRef<"PlayerMatchStats", 'Int'>
    readonly tradeKills: FieldRef<"PlayerMatchStats", 'Int'>
    readonly tradeKillPercentage: FieldRef<"PlayerMatchStats", 'Float'>
    readonly tradedDeaths: FieldRef<"PlayerMatchStats", 'Int'>
    readonly tradedDeathPercentage: FieldRef<"PlayerMatchStats", 'Float'>
    readonly multiKillRounds: FieldRef<"PlayerMatchStats", 'Int'>
    readonly multiKillPercentage: FieldRef<"PlayerMatchStats", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * PlayerMatchStats findUnique
   */
  export type PlayerMatchStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatchStats to fetch.
     */
    where: PlayerMatchStatsWhereUniqueInput
  }

  /**
   * PlayerMatchStats findUniqueOrThrow
   */
  export type PlayerMatchStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatchStats to fetch.
     */
    where: PlayerMatchStatsWhereUniqueInput
  }

  /**
   * PlayerMatchStats findFirst
   */
  export type PlayerMatchStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatchStats to fetch.
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatchStats to fetch.
     */
    orderBy?: PlayerMatchStatsOrderByWithRelationInput | PlayerMatchStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayerMatchStats.
     */
    cursor?: PlayerMatchStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatchStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatchStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayerMatchStats.
     */
    distinct?: PlayerMatchStatsScalarFieldEnum | PlayerMatchStatsScalarFieldEnum[]
  }

  /**
   * PlayerMatchStats findFirstOrThrow
   */
  export type PlayerMatchStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatchStats to fetch.
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatchStats to fetch.
     */
    orderBy?: PlayerMatchStatsOrderByWithRelationInput | PlayerMatchStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayerMatchStats.
     */
    cursor?: PlayerMatchStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatchStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatchStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayerMatchStats.
     */
    distinct?: PlayerMatchStatsScalarFieldEnum | PlayerMatchStatsScalarFieldEnum[]
  }

  /**
   * PlayerMatchStats findMany
   */
  export type PlayerMatchStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatchStats to fetch.
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatchStats to fetch.
     */
    orderBy?: PlayerMatchStatsOrderByWithRelationInput | PlayerMatchStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlayerMatchStats.
     */
    cursor?: PlayerMatchStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatchStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatchStats.
     */
    skip?: number
    distinct?: PlayerMatchStatsScalarFieldEnum | PlayerMatchStatsScalarFieldEnum[]
  }

  /**
   * PlayerMatchStats create
   */
  export type PlayerMatchStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a PlayerMatchStats.
     */
    data: XOR<PlayerMatchStatsCreateInput, PlayerMatchStatsUncheckedCreateInput>
  }

  /**
   * PlayerMatchStats createMany
   */
  export type PlayerMatchStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlayerMatchStats.
     */
    data: PlayerMatchStatsCreateManyInput | PlayerMatchStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlayerMatchStats createManyAndReturn
   */
  export type PlayerMatchStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * The data used to create many PlayerMatchStats.
     */
    data: PlayerMatchStatsCreateManyInput | PlayerMatchStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlayerMatchStats update
   */
  export type PlayerMatchStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a PlayerMatchStats.
     */
    data: XOR<PlayerMatchStatsUpdateInput, PlayerMatchStatsUncheckedUpdateInput>
    /**
     * Choose, which PlayerMatchStats to update.
     */
    where: PlayerMatchStatsWhereUniqueInput
  }

  /**
   * PlayerMatchStats updateMany
   */
  export type PlayerMatchStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlayerMatchStats.
     */
    data: XOR<PlayerMatchStatsUpdateManyMutationInput, PlayerMatchStatsUncheckedUpdateManyInput>
    /**
     * Filter which PlayerMatchStats to update
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * Limit how many PlayerMatchStats to update.
     */
    limit?: number
  }

  /**
   * PlayerMatchStats updateManyAndReturn
   */
  export type PlayerMatchStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * The data used to update PlayerMatchStats.
     */
    data: XOR<PlayerMatchStatsUpdateManyMutationInput, PlayerMatchStatsUncheckedUpdateManyInput>
    /**
     * Filter which PlayerMatchStats to update
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * Limit how many PlayerMatchStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlayerMatchStats upsert
   */
  export type PlayerMatchStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the PlayerMatchStats to update in case it exists.
     */
    where: PlayerMatchStatsWhereUniqueInput
    /**
     * In case the PlayerMatchStats found by the `where` argument doesn't exist, create a new PlayerMatchStats with this data.
     */
    create: XOR<PlayerMatchStatsCreateInput, PlayerMatchStatsUncheckedCreateInput>
    /**
     * In case the PlayerMatchStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerMatchStatsUpdateInput, PlayerMatchStatsUncheckedUpdateInput>
  }

  /**
   * PlayerMatchStats delete
   */
  export type PlayerMatchStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
    /**
     * Filter which PlayerMatchStats to delete.
     */
    where: PlayerMatchStatsWhereUniqueInput
  }

  /**
   * PlayerMatchStats deleteMany
   */
  export type PlayerMatchStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayerMatchStats to delete
     */
    where?: PlayerMatchStatsWhereInput
    /**
     * Limit how many PlayerMatchStats to delete.
     */
    limit?: number
  }

  /**
   * PlayerMatchStats without action
   */
  export type PlayerMatchStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatchStats
     */
    select?: PlayerMatchStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerMatchStats
     */
    omit?: PlayerMatchStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchStatsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    gameAuthCode: 'gameAuthCode',
    lastMatchCode: 'lastMatchCode',
    playerId: 'playerId',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    steamId: 'steamId'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    team1Score: 'team1Score',
    team2Score: 'team2Score',
    playedAt: 'playedAt'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const PlayerMatchStatsScalarFieldEnum: {
    id: 'id',
    playerId: 'playerId',
    matchId: 'matchId',
    steamId: 'steamId',
    username: 'username',
    teamNumber: 'teamNumber',
    accuracy: 'accuracy',
    accuracySpotted: 'accuracySpotted',
    hsAccuracy: 'hsAccuracy',
    timeToDamage: 'timeToDamage',
    crosshairPlacement: 'crosshairPlacement',
    counterStrafing: 'counterStrafing',
    totalKills: 'totalKills',
    totalDeaths: 'totalDeaths',
    openingKills: 'openingKills',
    tradeKills: 'tradeKills',
    tradeKillPercentage: 'tradeKillPercentage',
    tradedDeaths: 'tradedDeaths',
    tradedDeathPercentage: 'tradedDeathPercentage',
    multiKillRounds: 'multiKillRounds',
    multiKillPercentage: 'multiKillPercentage'
  };

  export type PlayerMatchStatsScalarFieldEnum = (typeof PlayerMatchStatsScalarFieldEnum)[keyof typeof PlayerMatchStatsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    gameAuthCode?: StringNullableFilter<"User"> | string | null
    lastMatchCode?: StringNullableFilter<"User"> | string | null
    playerId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    player?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    gameAuthCode?: SortOrderInput | SortOrder
    lastMatchCode?: SortOrderInput | SortOrder
    playerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    player?: PlayerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    playerId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    gameAuthCode?: StringNullableFilter<"User"> | string | null
    lastMatchCode?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    player?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
  }, "id" | "email" | "playerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    gameAuthCode?: SortOrderInput | SortOrder
    lastMatchCode?: SortOrderInput | SortOrder
    playerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    gameAuthCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastMatchCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    playerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    steamId?: StringFilter<"Player"> | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    stats?: PlayerMatchStatsListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    steamId?: SortOrder
    user?: UserOrderByWithRelationInput
    stats?: PlayerMatchStatsOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    steamId?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    stats?: PlayerMatchStatsListRelationFilter
  }, "id" | "steamId">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    steamId?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    steamId?: StringWithAggregatesFilter<"Player"> | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: StringFilter<"Match"> | string
    matchId?: StringFilter<"Match"> | string
    team1Score?: IntFilter<"Match"> | number
    team2Score?: IntFilter<"Match"> | number
    playedAt?: DateTimeFilter<"Match"> | Date | string
    stats?: PlayerMatchStatsListRelationFilter
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    playedAt?: SortOrder
    stats?: PlayerMatchStatsOrderByRelationAggregateInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    matchId?: string
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    team1Score?: IntFilter<"Match"> | number
    team2Score?: IntFilter<"Match"> | number
    playedAt?: DateTimeFilter<"Match"> | Date | string
    stats?: PlayerMatchStatsListRelationFilter
  }, "id" | "matchId">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    playedAt?: SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Match"> | string
    matchId?: StringWithAggregatesFilter<"Match"> | string
    team1Score?: IntWithAggregatesFilter<"Match"> | number
    team2Score?: IntWithAggregatesFilter<"Match"> | number
    playedAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
  }

  export type PlayerMatchStatsWhereInput = {
    AND?: PlayerMatchStatsWhereInput | PlayerMatchStatsWhereInput[]
    OR?: PlayerMatchStatsWhereInput[]
    NOT?: PlayerMatchStatsWhereInput | PlayerMatchStatsWhereInput[]
    id?: StringFilter<"PlayerMatchStats"> | string
    playerId?: StringFilter<"PlayerMatchStats"> | string
    matchId?: StringFilter<"PlayerMatchStats"> | string
    steamId?: StringFilter<"PlayerMatchStats"> | string
    username?: StringFilter<"PlayerMatchStats"> | string
    teamNumber?: IntFilter<"PlayerMatchStats"> | number
    accuracy?: FloatFilter<"PlayerMatchStats"> | number
    accuracySpotted?: FloatFilter<"PlayerMatchStats"> | number
    hsAccuracy?: FloatFilter<"PlayerMatchStats"> | number
    timeToDamage?: FloatFilter<"PlayerMatchStats"> | number
    crosshairPlacement?: FloatFilter<"PlayerMatchStats"> | number
    counterStrafing?: FloatFilter<"PlayerMatchStats"> | number
    totalKills?: IntFilter<"PlayerMatchStats"> | number
    totalDeaths?: IntFilter<"PlayerMatchStats"> | number
    openingKills?: IntFilter<"PlayerMatchStats"> | number
    tradeKills?: IntFilter<"PlayerMatchStats"> | number
    tradeKillPercentage?: FloatFilter<"PlayerMatchStats"> | number
    tradedDeaths?: IntFilter<"PlayerMatchStats"> | number
    tradedDeathPercentage?: FloatFilter<"PlayerMatchStats"> | number
    multiKillRounds?: IntFilter<"PlayerMatchStats"> | number
    multiKillPercentage?: FloatFilter<"PlayerMatchStats"> | number
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }

  export type PlayerMatchStatsOrderByWithRelationInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
    steamId?: SortOrder
    username?: SortOrder
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
    player?: PlayerOrderByWithRelationInput
    match?: MatchOrderByWithRelationInput
  }

  export type PlayerMatchStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlayerMatchStatsWhereInput | PlayerMatchStatsWhereInput[]
    OR?: PlayerMatchStatsWhereInput[]
    NOT?: PlayerMatchStatsWhereInput | PlayerMatchStatsWhereInput[]
    playerId?: StringFilter<"PlayerMatchStats"> | string
    matchId?: StringFilter<"PlayerMatchStats"> | string
    steamId?: StringFilter<"PlayerMatchStats"> | string
    username?: StringFilter<"PlayerMatchStats"> | string
    teamNumber?: IntFilter<"PlayerMatchStats"> | number
    accuracy?: FloatFilter<"PlayerMatchStats"> | number
    accuracySpotted?: FloatFilter<"PlayerMatchStats"> | number
    hsAccuracy?: FloatFilter<"PlayerMatchStats"> | number
    timeToDamage?: FloatFilter<"PlayerMatchStats"> | number
    crosshairPlacement?: FloatFilter<"PlayerMatchStats"> | number
    counterStrafing?: FloatFilter<"PlayerMatchStats"> | number
    totalKills?: IntFilter<"PlayerMatchStats"> | number
    totalDeaths?: IntFilter<"PlayerMatchStats"> | number
    openingKills?: IntFilter<"PlayerMatchStats"> | number
    tradeKills?: IntFilter<"PlayerMatchStats"> | number
    tradeKillPercentage?: FloatFilter<"PlayerMatchStats"> | number
    tradedDeaths?: IntFilter<"PlayerMatchStats"> | number
    tradedDeathPercentage?: FloatFilter<"PlayerMatchStats"> | number
    multiKillRounds?: IntFilter<"PlayerMatchStats"> | number
    multiKillPercentage?: FloatFilter<"PlayerMatchStats"> | number
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }, "id">

  export type PlayerMatchStatsOrderByWithAggregationInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
    steamId?: SortOrder
    username?: SortOrder
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
    _count?: PlayerMatchStatsCountOrderByAggregateInput
    _avg?: PlayerMatchStatsAvgOrderByAggregateInput
    _max?: PlayerMatchStatsMaxOrderByAggregateInput
    _min?: PlayerMatchStatsMinOrderByAggregateInput
    _sum?: PlayerMatchStatsSumOrderByAggregateInput
  }

  export type PlayerMatchStatsScalarWhereWithAggregatesInput = {
    AND?: PlayerMatchStatsScalarWhereWithAggregatesInput | PlayerMatchStatsScalarWhereWithAggregatesInput[]
    OR?: PlayerMatchStatsScalarWhereWithAggregatesInput[]
    NOT?: PlayerMatchStatsScalarWhereWithAggregatesInput | PlayerMatchStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlayerMatchStats"> | string
    playerId?: StringWithAggregatesFilter<"PlayerMatchStats"> | string
    matchId?: StringWithAggregatesFilter<"PlayerMatchStats"> | string
    steamId?: StringWithAggregatesFilter<"PlayerMatchStats"> | string
    username?: StringWithAggregatesFilter<"PlayerMatchStats"> | string
    teamNumber?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    accuracy?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    accuracySpotted?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    hsAccuracy?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    timeToDamage?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    crosshairPlacement?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    counterStrafing?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    totalKills?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    totalDeaths?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    openingKills?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    tradeKills?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    tradeKillPercentage?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    tradedDeaths?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    tradedDeathPercentage?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
    multiKillRounds?: IntWithAggregatesFilter<"PlayerMatchStats"> | number
    multiKillPercentage?: FloatWithAggregatesFilter<"PlayerMatchStats"> | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    gameAuthCode?: string | null
    lastMatchCode?: string | null
    createdAt?: Date | string
    player?: PlayerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    gameAuthCode?: string | null
    lastMatchCode?: string | null
    playerId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gameAuthCode?: NullableStringFieldUpdateOperationsInput | string | null
    lastMatchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gameAuthCode?: NullableStringFieldUpdateOperationsInput | string | null
    lastMatchCode?: NullableStringFieldUpdateOperationsInput | string | null
    playerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    gameAuthCode?: string | null
    lastMatchCode?: string | null
    playerId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gameAuthCode?: NullableStringFieldUpdateOperationsInput | string | null
    lastMatchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gameAuthCode?: NullableStringFieldUpdateOperationsInput | string | null
    lastMatchCode?: NullableStringFieldUpdateOperationsInput | string | null
    playerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateInput = {
    id?: string
    steamId: string
    user?: UserCreateNestedOneWithoutPlayerInput
    stats?: PlayerMatchStatsCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    steamId: string
    user?: UserUncheckedCreateNestedOneWithoutPlayerInput
    stats?: PlayerMatchStatsUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPlayerNestedInput
    stats?: PlayerMatchStatsUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    user?: UserUncheckedUpdateOneWithoutPlayerNestedInput
    stats?: PlayerMatchStatsUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateManyInput = {
    id?: string
    steamId: string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
  }

  export type MatchCreateInput = {
    id?: string
    matchId: string
    team1Score: number
    team2Score: number
    playedAt?: Date | string
    stats?: PlayerMatchStatsCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateInput = {
    id?: string
    matchId: string
    team1Score: number
    team2Score: number
    playedAt?: Date | string
    stats?: PlayerMatchStatsUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    team1Score?: IntFieldUpdateOperationsInput | number
    team2Score?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerMatchStatsUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    team1Score?: IntFieldUpdateOperationsInput | number
    team2Score?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerMatchStatsUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchCreateManyInput = {
    id?: string
    matchId: string
    team1Score: number
    team2Score: number
    playedAt?: Date | string
  }

  export type MatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    team1Score?: IntFieldUpdateOperationsInput | number
    team2Score?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    team1Score?: IntFieldUpdateOperationsInput | number
    team2Score?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerMatchStatsCreateInput = {
    id?: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
    player: PlayerCreateNestedOneWithoutStatsInput
    match: MatchCreateNestedOneWithoutStatsInput
  }

  export type PlayerMatchStatsUncheckedCreateInput = {
    id?: string
    playerId: string
    matchId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
  }

  export type PlayerMatchStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
    player?: PlayerUpdateOneRequiredWithoutStatsNestedInput
    match?: MatchUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PlayerMatchStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PlayerMatchStatsCreateManyInput = {
    id?: string
    playerId: string
    matchId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
  }

  export type PlayerMatchStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PlayerMatchStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlayerNullableScalarRelationFilter = {
    is?: PlayerWhereInput | null
    isNot?: PlayerWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    gameAuthCode?: SortOrder
    lastMatchCode?: SortOrder
    playerId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    gameAuthCode?: SortOrder
    lastMatchCode?: SortOrder
    playerId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    gameAuthCode?: SortOrder
    lastMatchCode?: SortOrder
    playerId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PlayerMatchStatsListRelationFilter = {
    every?: PlayerMatchStatsWhereInput
    some?: PlayerMatchStatsWhereInput
    none?: PlayerMatchStatsWhereInput
  }

  export type PlayerMatchStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    steamId?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    steamId?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    steamId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    playedAt?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    team1Score?: SortOrder
    team2Score?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    playedAt?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    playedAt?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    team1Score?: SortOrder
    team2Score?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput
    isNot?: MatchWhereInput
  }

  export type PlayerMatchStatsCountOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
    steamId?: SortOrder
    username?: SortOrder
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
  }

  export type PlayerMatchStatsAvgOrderByAggregateInput = {
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
  }

  export type PlayerMatchStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
    steamId?: SortOrder
    username?: SortOrder
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
  }

  export type PlayerMatchStatsMinOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
    steamId?: SortOrder
    username?: SortOrder
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
  }

  export type PlayerMatchStatsSumOrderByAggregateInput = {
    teamNumber?: SortOrder
    accuracy?: SortOrder
    accuracySpotted?: SortOrder
    hsAccuracy?: SortOrder
    timeToDamage?: SortOrder
    crosshairPlacement?: SortOrder
    counterStrafing?: SortOrder
    totalKills?: SortOrder
    totalDeaths?: SortOrder
    openingKills?: SortOrder
    tradeKills?: SortOrder
    tradeKillPercentage?: SortOrder
    tradedDeaths?: SortOrder
    tradedDeathPercentage?: SortOrder
    multiKillRounds?: SortOrder
    multiKillPercentage?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PlayerCreateNestedOneWithoutUserInput = {
    create?: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutUserInput
    connect?: PlayerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlayerUpdateOneWithoutUserNestedInput = {
    create?: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutUserInput
    upsert?: PlayerUpsertWithoutUserInput
    disconnect?: PlayerWhereInput | boolean
    delete?: PlayerWhereInput | boolean
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutUserInput, PlayerUpdateWithoutUserInput>, PlayerUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPlayerInput = {
    create?: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlayerInput
    connect?: UserWhereUniqueInput
  }

  export type PlayerMatchStatsCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutPlayerInput, PlayerMatchStatsUncheckedCreateWithoutPlayerInput> | PlayerMatchStatsCreateWithoutPlayerInput[] | PlayerMatchStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutPlayerInput | PlayerMatchStatsCreateOrConnectWithoutPlayerInput[]
    createMany?: PlayerMatchStatsCreateManyPlayerInputEnvelope
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedOneWithoutPlayerInput = {
    create?: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlayerInput
    connect?: UserWhereUniqueInput
  }

  export type PlayerMatchStatsUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutPlayerInput, PlayerMatchStatsUncheckedCreateWithoutPlayerInput> | PlayerMatchStatsCreateWithoutPlayerInput[] | PlayerMatchStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutPlayerInput | PlayerMatchStatsCreateOrConnectWithoutPlayerInput[]
    createMany?: PlayerMatchStatsCreateManyPlayerInputEnvelope
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutPlayerNestedInput = {
    create?: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlayerInput
    upsert?: UserUpsertWithoutPlayerInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlayerInput, UserUpdateWithoutPlayerInput>, UserUncheckedUpdateWithoutPlayerInput>
  }

  export type PlayerMatchStatsUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutPlayerInput, PlayerMatchStatsUncheckedCreateWithoutPlayerInput> | PlayerMatchStatsCreateWithoutPlayerInput[] | PlayerMatchStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutPlayerInput | PlayerMatchStatsCreateOrConnectWithoutPlayerInput[]
    upsert?: PlayerMatchStatsUpsertWithWhereUniqueWithoutPlayerInput | PlayerMatchStatsUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PlayerMatchStatsCreateManyPlayerInputEnvelope
    set?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    disconnect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    delete?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    update?: PlayerMatchStatsUpdateWithWhereUniqueWithoutPlayerInput | PlayerMatchStatsUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PlayerMatchStatsUpdateManyWithWhereWithoutPlayerInput | PlayerMatchStatsUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PlayerMatchStatsScalarWhereInput | PlayerMatchStatsScalarWhereInput[]
  }

  export type UserUncheckedUpdateOneWithoutPlayerNestedInput = {
    create?: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlayerInput
    upsert?: UserUpsertWithoutPlayerInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlayerInput, UserUpdateWithoutPlayerInput>, UserUncheckedUpdateWithoutPlayerInput>
  }

  export type PlayerMatchStatsUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutPlayerInput, PlayerMatchStatsUncheckedCreateWithoutPlayerInput> | PlayerMatchStatsCreateWithoutPlayerInput[] | PlayerMatchStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutPlayerInput | PlayerMatchStatsCreateOrConnectWithoutPlayerInput[]
    upsert?: PlayerMatchStatsUpsertWithWhereUniqueWithoutPlayerInput | PlayerMatchStatsUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PlayerMatchStatsCreateManyPlayerInputEnvelope
    set?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    disconnect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    delete?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    update?: PlayerMatchStatsUpdateWithWhereUniqueWithoutPlayerInput | PlayerMatchStatsUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PlayerMatchStatsUpdateManyWithWhereWithoutPlayerInput | PlayerMatchStatsUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PlayerMatchStatsScalarWhereInput | PlayerMatchStatsScalarWhereInput[]
  }

  export type PlayerMatchStatsCreateNestedManyWithoutMatchInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutMatchInput, PlayerMatchStatsUncheckedCreateWithoutMatchInput> | PlayerMatchStatsCreateWithoutMatchInput[] | PlayerMatchStatsUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutMatchInput | PlayerMatchStatsCreateOrConnectWithoutMatchInput[]
    createMany?: PlayerMatchStatsCreateManyMatchInputEnvelope
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
  }

  export type PlayerMatchStatsUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutMatchInput, PlayerMatchStatsUncheckedCreateWithoutMatchInput> | PlayerMatchStatsCreateWithoutMatchInput[] | PlayerMatchStatsUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutMatchInput | PlayerMatchStatsCreateOrConnectWithoutMatchInput[]
    createMany?: PlayerMatchStatsCreateManyMatchInputEnvelope
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlayerMatchStatsUpdateManyWithoutMatchNestedInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutMatchInput, PlayerMatchStatsUncheckedCreateWithoutMatchInput> | PlayerMatchStatsCreateWithoutMatchInput[] | PlayerMatchStatsUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutMatchInput | PlayerMatchStatsCreateOrConnectWithoutMatchInput[]
    upsert?: PlayerMatchStatsUpsertWithWhereUniqueWithoutMatchInput | PlayerMatchStatsUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: PlayerMatchStatsCreateManyMatchInputEnvelope
    set?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    disconnect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    delete?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    update?: PlayerMatchStatsUpdateWithWhereUniqueWithoutMatchInput | PlayerMatchStatsUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: PlayerMatchStatsUpdateManyWithWhereWithoutMatchInput | PlayerMatchStatsUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: PlayerMatchStatsScalarWhereInput | PlayerMatchStatsScalarWhereInput[]
  }

  export type PlayerMatchStatsUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<PlayerMatchStatsCreateWithoutMatchInput, PlayerMatchStatsUncheckedCreateWithoutMatchInput> | PlayerMatchStatsCreateWithoutMatchInput[] | PlayerMatchStatsUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchStatsCreateOrConnectWithoutMatchInput | PlayerMatchStatsCreateOrConnectWithoutMatchInput[]
    upsert?: PlayerMatchStatsUpsertWithWhereUniqueWithoutMatchInput | PlayerMatchStatsUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: PlayerMatchStatsCreateManyMatchInputEnvelope
    set?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    disconnect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    delete?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    connect?: PlayerMatchStatsWhereUniqueInput | PlayerMatchStatsWhereUniqueInput[]
    update?: PlayerMatchStatsUpdateWithWhereUniqueWithoutMatchInput | PlayerMatchStatsUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: PlayerMatchStatsUpdateManyWithWhereWithoutMatchInput | PlayerMatchStatsUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: PlayerMatchStatsScalarWhereInput | PlayerMatchStatsScalarWhereInput[]
  }

  export type PlayerCreateNestedOneWithoutStatsInput = {
    create?: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutStatsInput
    connect?: PlayerWhereUniqueInput
  }

  export type MatchCreateNestedOneWithoutStatsInput = {
    create?: XOR<MatchCreateWithoutStatsInput, MatchUncheckedCreateWithoutStatsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutStatsInput
    connect?: MatchWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlayerUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutStatsInput
    upsert?: PlayerUpsertWithoutStatsInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutStatsInput, PlayerUpdateWithoutStatsInput>, PlayerUncheckedUpdateWithoutStatsInput>
  }

  export type MatchUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<MatchCreateWithoutStatsInput, MatchUncheckedCreateWithoutStatsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutStatsInput
    upsert?: MatchUpsertWithoutStatsInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutStatsInput, MatchUpdateWithoutStatsInput>, MatchUncheckedUpdateWithoutStatsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PlayerCreateWithoutUserInput = {
    id?: string
    steamId: string
    stats?: PlayerMatchStatsCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutUserInput = {
    id?: string
    steamId: string
    stats?: PlayerMatchStatsUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutUserInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
  }

  export type PlayerUpsertWithoutUserInput = {
    update: XOR<PlayerUpdateWithoutUserInput, PlayerUncheckedUpdateWithoutUserInput>
    create: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutUserInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutUserInput, PlayerUncheckedUpdateWithoutUserInput>
  }

  export type PlayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    stats?: PlayerMatchStatsUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    stats?: PlayerMatchStatsUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type UserCreateWithoutPlayerInput = {
    id?: string
    email: string
    gameAuthCode?: string | null
    lastMatchCode?: string | null
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutPlayerInput = {
    id?: string
    email: string
    gameAuthCode?: string | null
    lastMatchCode?: string | null
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutPlayerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
  }

  export type PlayerMatchStatsCreateWithoutPlayerInput = {
    id?: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
    match: MatchCreateNestedOneWithoutStatsInput
  }

  export type PlayerMatchStatsUncheckedCreateWithoutPlayerInput = {
    id?: string
    matchId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
  }

  export type PlayerMatchStatsCreateOrConnectWithoutPlayerInput = {
    where: PlayerMatchStatsWhereUniqueInput
    create: XOR<PlayerMatchStatsCreateWithoutPlayerInput, PlayerMatchStatsUncheckedCreateWithoutPlayerInput>
  }

  export type PlayerMatchStatsCreateManyPlayerInputEnvelope = {
    data: PlayerMatchStatsCreateManyPlayerInput | PlayerMatchStatsCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPlayerInput = {
    update: XOR<UserUpdateWithoutPlayerInput, UserUncheckedUpdateWithoutPlayerInput>
    create: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlayerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlayerInput, UserUncheckedUpdateWithoutPlayerInput>
  }

  export type UserUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gameAuthCode?: NullableStringFieldUpdateOperationsInput | string | null
    lastMatchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gameAuthCode?: NullableStringFieldUpdateOperationsInput | string | null
    lastMatchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerMatchStatsUpsertWithWhereUniqueWithoutPlayerInput = {
    where: PlayerMatchStatsWhereUniqueInput
    update: XOR<PlayerMatchStatsUpdateWithoutPlayerInput, PlayerMatchStatsUncheckedUpdateWithoutPlayerInput>
    create: XOR<PlayerMatchStatsCreateWithoutPlayerInput, PlayerMatchStatsUncheckedCreateWithoutPlayerInput>
  }

  export type PlayerMatchStatsUpdateWithWhereUniqueWithoutPlayerInput = {
    where: PlayerMatchStatsWhereUniqueInput
    data: XOR<PlayerMatchStatsUpdateWithoutPlayerInput, PlayerMatchStatsUncheckedUpdateWithoutPlayerInput>
  }

  export type PlayerMatchStatsUpdateManyWithWhereWithoutPlayerInput = {
    where: PlayerMatchStatsScalarWhereInput
    data: XOR<PlayerMatchStatsUpdateManyMutationInput, PlayerMatchStatsUncheckedUpdateManyWithoutPlayerInput>
  }

  export type PlayerMatchStatsScalarWhereInput = {
    AND?: PlayerMatchStatsScalarWhereInput | PlayerMatchStatsScalarWhereInput[]
    OR?: PlayerMatchStatsScalarWhereInput[]
    NOT?: PlayerMatchStatsScalarWhereInput | PlayerMatchStatsScalarWhereInput[]
    id?: StringFilter<"PlayerMatchStats"> | string
    playerId?: StringFilter<"PlayerMatchStats"> | string
    matchId?: StringFilter<"PlayerMatchStats"> | string
    steamId?: StringFilter<"PlayerMatchStats"> | string
    username?: StringFilter<"PlayerMatchStats"> | string
    teamNumber?: IntFilter<"PlayerMatchStats"> | number
    accuracy?: FloatFilter<"PlayerMatchStats"> | number
    accuracySpotted?: FloatFilter<"PlayerMatchStats"> | number
    hsAccuracy?: FloatFilter<"PlayerMatchStats"> | number
    timeToDamage?: FloatFilter<"PlayerMatchStats"> | number
    crosshairPlacement?: FloatFilter<"PlayerMatchStats"> | number
    counterStrafing?: FloatFilter<"PlayerMatchStats"> | number
    totalKills?: IntFilter<"PlayerMatchStats"> | number
    totalDeaths?: IntFilter<"PlayerMatchStats"> | number
    openingKills?: IntFilter<"PlayerMatchStats"> | number
    tradeKills?: IntFilter<"PlayerMatchStats"> | number
    tradeKillPercentage?: FloatFilter<"PlayerMatchStats"> | number
    tradedDeaths?: IntFilter<"PlayerMatchStats"> | number
    tradedDeathPercentage?: FloatFilter<"PlayerMatchStats"> | number
    multiKillRounds?: IntFilter<"PlayerMatchStats"> | number
    multiKillPercentage?: FloatFilter<"PlayerMatchStats"> | number
  }

  export type PlayerMatchStatsCreateWithoutMatchInput = {
    id?: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
    player: PlayerCreateNestedOneWithoutStatsInput
  }

  export type PlayerMatchStatsUncheckedCreateWithoutMatchInput = {
    id?: string
    playerId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
  }

  export type PlayerMatchStatsCreateOrConnectWithoutMatchInput = {
    where: PlayerMatchStatsWhereUniqueInput
    create: XOR<PlayerMatchStatsCreateWithoutMatchInput, PlayerMatchStatsUncheckedCreateWithoutMatchInput>
  }

  export type PlayerMatchStatsCreateManyMatchInputEnvelope = {
    data: PlayerMatchStatsCreateManyMatchInput | PlayerMatchStatsCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type PlayerMatchStatsUpsertWithWhereUniqueWithoutMatchInput = {
    where: PlayerMatchStatsWhereUniqueInput
    update: XOR<PlayerMatchStatsUpdateWithoutMatchInput, PlayerMatchStatsUncheckedUpdateWithoutMatchInput>
    create: XOR<PlayerMatchStatsCreateWithoutMatchInput, PlayerMatchStatsUncheckedCreateWithoutMatchInput>
  }

  export type PlayerMatchStatsUpdateWithWhereUniqueWithoutMatchInput = {
    where: PlayerMatchStatsWhereUniqueInput
    data: XOR<PlayerMatchStatsUpdateWithoutMatchInput, PlayerMatchStatsUncheckedUpdateWithoutMatchInput>
  }

  export type PlayerMatchStatsUpdateManyWithWhereWithoutMatchInput = {
    where: PlayerMatchStatsScalarWhereInput
    data: XOR<PlayerMatchStatsUpdateManyMutationInput, PlayerMatchStatsUncheckedUpdateManyWithoutMatchInput>
  }

  export type PlayerCreateWithoutStatsInput = {
    id?: string
    steamId: string
    user?: UserCreateNestedOneWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutStatsInput = {
    id?: string
    steamId: string
    user?: UserUncheckedCreateNestedOneWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutStatsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
  }

  export type MatchCreateWithoutStatsInput = {
    id?: string
    matchId: string
    team1Score: number
    team2Score: number
    playedAt?: Date | string
  }

  export type MatchUncheckedCreateWithoutStatsInput = {
    id?: string
    matchId: string
    team1Score: number
    team2Score: number
    playedAt?: Date | string
  }

  export type MatchCreateOrConnectWithoutStatsInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutStatsInput, MatchUncheckedCreateWithoutStatsInput>
  }

  export type PlayerUpsertWithoutStatsInput = {
    update: XOR<PlayerUpdateWithoutStatsInput, PlayerUncheckedUpdateWithoutStatsInput>
    create: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutStatsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutStatsInput, PlayerUncheckedUpdateWithoutStatsInput>
  }

  export type PlayerUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    user?: UserUncheckedUpdateOneWithoutPlayerNestedInput
  }

  export type MatchUpsertWithoutStatsInput = {
    update: XOR<MatchUpdateWithoutStatsInput, MatchUncheckedUpdateWithoutStatsInput>
    create: XOR<MatchCreateWithoutStatsInput, MatchUncheckedCreateWithoutStatsInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutStatsInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutStatsInput, MatchUncheckedUpdateWithoutStatsInput>
  }

  export type MatchUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    team1Score?: IntFieldUpdateOperationsInput | number
    team2Score?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    team1Score?: IntFieldUpdateOperationsInput | number
    team2Score?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerMatchStatsCreateManyPlayerInput = {
    id?: string
    matchId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
  }

  export type PlayerMatchStatsUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
    match?: MatchUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PlayerMatchStatsUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PlayerMatchStatsUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PlayerMatchStatsCreateManyMatchInput = {
    id?: string
    playerId: string
    steamId: string
    username: string
    teamNumber: number
    accuracy: number
    accuracySpotted: number
    hsAccuracy: number
    timeToDamage: number
    crosshairPlacement: number
    counterStrafing: number
    totalKills: number
    totalDeaths: number
    openingKills: number
    tradeKills: number
    tradeKillPercentage: number
    tradedDeaths: number
    tradedDeathPercentage: number
    multiKillRounds: number
    multiKillPercentage: number
  }

  export type PlayerMatchStatsUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
    player?: PlayerUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PlayerMatchStatsUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PlayerMatchStatsUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    steamId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    accuracySpotted?: FloatFieldUpdateOperationsInput | number
    hsAccuracy?: FloatFieldUpdateOperationsInput | number
    timeToDamage?: FloatFieldUpdateOperationsInput | number
    crosshairPlacement?: FloatFieldUpdateOperationsInput | number
    counterStrafing?: FloatFieldUpdateOperationsInput | number
    totalKills?: IntFieldUpdateOperationsInput | number
    totalDeaths?: IntFieldUpdateOperationsInput | number
    openingKills?: IntFieldUpdateOperationsInput | number
    tradeKills?: IntFieldUpdateOperationsInput | number
    tradeKillPercentage?: FloatFieldUpdateOperationsInput | number
    tradedDeaths?: IntFieldUpdateOperationsInput | number
    tradedDeathPercentage?: FloatFieldUpdateOperationsInput | number
    multiKillRounds?: IntFieldUpdateOperationsInput | number
    multiKillPercentage?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}