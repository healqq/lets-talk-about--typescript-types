module StandardGenerics {
  type Partial<T> = {
    [P in keyof T]?: T[P]; 
  }
  type Person = {
    id: number;
    name: string;
  }
  // valid
  const partialPerson: Partial<Person> = { id: 1 };

  type Record<K extends keyof any, T> = {     
    [P in K]: T; 
  }

  const dictionary: Record<string, number> = {
    'a': 1,
    'b': 2,
  };

  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]; 
  }

  const allowedKeys: Pick<Person, 'id'> = { id: 1 };
}
