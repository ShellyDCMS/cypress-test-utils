import { SinonStub } from "cypress/types/sinon";

export interface Stub extends SinonStub {}

export type IStubBuilder<T> = {
  [k in keyof T]-?: ((arg: T[k]) => IStubBuilder<T>) & (() => T[k]) & Stub;
} & {};

export const createStubbedInstance = <T>() => {
  const buildStub = (
    className: string,
    overrides: Partial<T> = {}
  ): IStubBuilder<T> => {
    let overrideValues: Record<string, any> = overrides;
    const built: Record<string, unknown> = Object.assign({}, overrideValues);

    const createStubIfNeeded = (
      built: Record<string, unknown>,
      prop: string
    ) => {
      if (!built[prop]) {
        const stub = cy.stub().as(className + "." + prop);
        built[prop] = stub;
      }
    };

    const builder = new Proxy(
      {},
      {
        get(target, prop: string) {
          createStubIfNeeded(built, prop);
          return built[prop];
        },
        set(target, prop: string, args?: any) {
          createStubIfNeeded(built, prop);
          args && "function" === typeof built[prop]
            ? // @ts-ignore
              built[prop](args)
            : built[prop];
          return true;
        }
      }
    );

    return builder as IStubBuilder<T>;
  };
  return buildStub;
};
