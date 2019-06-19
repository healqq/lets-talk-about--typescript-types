module ObjectTypes {
  const obj = {}
  obj.someKey = 5;
  const obj2: object = {};
  obj.someKey = 5;
  const obj3: Object = {};
  obj.someKey = 5;
  const obj4: {} = {};
  obj.someKey = 5;
  // Error: Property 'someKey' does not exist on type '{}'.

  const fixedKeysObj: { someKey?: number } = {};
  fixedKeysObj.someKey = 5;

  const dynamicKeysObj = {};
  const otherObj = { a: 1, b: 2, c: 3};
  Object.keys(otherObj).forEach(key => 
    dynamicKeysObj[key] = otherObj[key]);
  // Error: Property 'someKey' does not exist on type '{}'.
  console.log(dynamicKeysObj.f);

  type Dictionary = {
    [key: string]: any
  }
  const dictionary: Dictionary = {};
  Object.keys(otherObj).forEach(key => 
    dictionary[key] = otherObj[key]);
  // no error even if key doesn't exist
  console.log(dictionary.f);

  type PredefinedKeysDictionary = {
    [key in 'key1' |  'key2']?: any
  }
  const predefinedKeysDictionary: PredefinedKeysDictionary = {};
  // typehints
  predefinedKeysDictionary.key1
  predefinedKeysDictionary.key2

  interface SomeInterface {
    id: number;
    name: string;
  }

  type DictionaryFromInterface = {
    [key in keyof SomeInterface]?: SomeInterface[key];
  }

  const dictionaryFromInterface: DictionaryFromInterface = {};
  // typehints
  dictionaryFromInterface.id
  dictionaryFromInterface.name

  enum SomeEnum {
    A,
    B,
    C
  }

  type DictionaryFromEnum = {
    [key in keyof typeof SomeEnum]?: string
  }

  const dictionaryFromEnum: DictionaryFromEnum = {};
  dictionaryFromEnum.A
  dictionaryFromEnum.B
  dictionaryFromEnum.C
}

