import { SinonStub } from "cypress/types/sinon";

export interface Stub extends SinonStub {}

export type StubbedInstance<T> = sinon.SinonStubbedInstance<T> & T;

const excludedMethods: string[] = [
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

export const createStubbedInstance = <T>() => {
  const buildStub = (
    className: string,
    overrides: Partial<T> = {}
  ): StubbedInstance<T> => {
    let overrideValues: Record<string, any> = overrides;
    const built: Record<string, unknown> = (<T>{ ...overrideValues }) as any;

    const createStubIfNeeded = (
      target: Record<string, unknown>,
      prop: string
    ) => {
      if (!target[prop] && !excludedMethods.includes(prop)) {
        const stub = createStub(className, prop);
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
  return buildStub;
};

function createStub(className: string, method: string | number | symbol): any {
  return cy.stub().as(className + "." + <string>method);
}
