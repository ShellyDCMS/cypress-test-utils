import Sinon from "sinon";
export type StubbedInstance<T> = Sinon.SinonStubbedInstance<T> & T;
export interface Stub extends Sinon.SinonStub {}

export const defaultExcludedMethods: string[] = [
  "__defineGetter__",
  "__defineSetter__",
  "hasOwnProperty",
  "__lookupGetter__",
  "__lookupSetter__",
  "propertyIsEnumerable",
  "toString",
  "valueOf",
  "__proto__",
  "toLocaleString",
  "isPrototypeOf",
  "then"
];

export const StubbedInstanceCreator = <T>(
  createStub: (prop: string) => Sinon.SinonStub = Sinon.stub(),
  excludedMethods = defaultExcludedMethods
) => {
  const createStubbedInstance = (
    overrides: Partial<T> = {}
  ): StubbedInstance<T> => {
    let overrideValues: Record<string, any> = overrides;
    const built: Record<string, unknown> = (<T>{ ...overrideValues }) as any;

    const createStubIfNeeded = (
      target: Record<string, unknown>,
      prop: string
    ) => {
      if (!target[prop] && !excludedMethods.includes(prop)) {
        const stub = createStub(prop);
        target[prop] = stub;
      }
    };

    const builder = new Proxy(built, {
      get(target, prop: string) {
        createStubIfNeeded(target, prop);
        return target[prop];
      },
      set(target, prop: string, args?: any) {
        built[prop] = args;
        return true;
      }
    });

    return builder as StubbedInstance<T>;
  };
  return createStubbedInstance;
};
