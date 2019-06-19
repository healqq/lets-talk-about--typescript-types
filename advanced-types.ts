module AdvancedTypes {
  // helper function
  type Diff<T extends string | number | symbol, U extends string> = (
    { [P in T]: P }
    & { [P in U]: never }
    & { [x: string]: never }
    & { [x: number]: never }
  )[T];

  type Keys<T extends string> = { [K in T]: K };
  const keys: Keys<'a' | 'b' | 'c'> = { a: 'a', b: 'b', c: 'c' };

  // try to run Diff with these types:
  type T1 = 'a' | 'b' | 'c';
  type U1 = 'c' | 'd';
  
  type result = {
    a: 'a',
    b: 'b',
    c: 'c', // will be overriden by next line
    c: never,
    d: never,
    [x: string]: never,
  }

  type result2 = {
    a: 'a',
    b: 'b',
    c: never,
    d: never,
    [x: string]: never,
    [x: number]: never,
  }['a' | 'b' | 'c']

  type result3 = {
    a: 'a',
    b: 'b',
    c: never,
    d: never,
    [x: string]: never,
    [x: number]: never,
  }['a'] 
  | {
    a: 'a',
    b: 'b',
    c: never,
    d: never,
    [x: string]: never,
    [x: number]: never,
  }['b']
  | {
    a: 'a',
    b: 'b',
    c: never,
    d: never,
    [x: string]: never,
    [x: number]: never,
  }['c']
  type result4 = 'a' | 'b';

  type DiffTU = Diff<T1, U1>;

  type Omit<T, U extends string> = Pick<T, Diff<keyof T, U>>
  type Omit2<T, U extends string> = Pick<T, Exclude<keyof T, U>>

  type SomeIndexType = {
    '1a': string,
    '2a': number,
    [key: number]: string
  }

  type DiffType = Omit<SomeIndexType, '1a'>;
  type ExcludeType = Omit2<SomeIndexType, '1a'>;

  // example on types
  type PrimitivePropertyNames<T> = {
    [K in keyof T]: T[K] extends object ? never : K;
  }[keyof T];
  type PrimitiveProperties<T> = Pick<T, PrimitivePropertyNames<T>>;
  
  const groupByField =
    <T, K extends keyof PrimitiveProperties<T>>(items: T[], key: K): Map<T[K], T[]> => {
      return items.reduce(
        (prev, item) => {
          const groupKey: T[K] = item[key];
  
          if (!prev.has(groupKey)) {
            prev.set(groupKey, []);
          }
  
          const group = prev.get(groupKey);
          group.push(item);
  
          return prev;
        },
        new Map<T[K], T[]>());
    };
  
  type SomeType = {
    id: number,
    date: string,
    cb: Function,
  };

  const obj: SomeType = {
    id: 1,
    date: '123',
    cb: () => {},
  };
  groupByField([obj], 'id');
  groupByField([obj], 'cb');
}
