import { SinonStub } from "cypress/types/sinon";

export interface Stub extends SinonStub {}

export type IStubBuilder<T> = {
  [k in keyof T]-?: ((arg: T[k]) => IStubBuilder<T>) & (() => T[k]) & Stub;
} & {};

type Clazz<T> = new (...args: unknown[]) => T;

export const createStubbedInstance = <T>() => {
  const buildStub = (
    typeOrTemplate?: Clazz<T> | Partial<T> | null,
    templateOrOverride?: Partial<T> | null,
    override?: Partial<T> & {
      className_1b3ec699_58d7_481f_bd83_e20dcf082a5e?: string;
    }
  ): IStubBuilder<T> => {
    let type: Clazz<T> | undefined;
    let template: Partial<T> | null | undefined;
    let overrideValues: Record<string, any> | null | undefined;

    if (typeOrTemplate instanceof Function) {
      type = typeOrTemplate;
      template = templateOrOverride;
      overrideValues = override;
    } else {
      template = typeOrTemplate;
      overrideValues = templateOrOverride;
    }

    const built: Record<string, unknown> = template
      ? Object.assign({}, template)
      : {};

    const createStubIfNeeded = (
      built: Record<string, unknown>,
      prop: string
    ) => {
      if (!built[prop]) {
        const stub = cy
          .stub()
          .as(
            overrideValues?.className_1b3ec699_58d7_481f_bd83_e20dcf082a5e
              ? overrideValues.className_1b3ec699_58d7_481f_bd83_e20dcf082a5e +
                  "." +
                  prop
              : prop
          );
        built[prop] = stub;
      }
    };

    const overrideBuiltValues = (
      built: Record<string, unknown>,
      prop: string
    ) => {
      if (overrideValues && overrideValues[prop] && !built[prop]) {
        built[prop] = overrideValues[prop];
      }
    };

    const setStubProp = (built: Record<string, unknown>, prop: string) => {
      overrideBuiltValues(built, prop);
      createStubIfNeeded(built, prop);
    };

    const builder = new Proxy(
      {},
      {
        get(target, prop: string) {
          setStubProp(built, prop);
          return built[prop];
        },
        set(target, prop: string, args?: any) {
          setStubProp(built, prop);
          // @ts-ignore
          args ? built[prop](args) : built[prop];
          return true;
        }
      }
    );

    return builder as IStubBuilder<T>;
  };
  return buildStub;
};
