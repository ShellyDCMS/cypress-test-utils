export type IStubBuilder<T> = {
  [k in keyof T]-?: ((arg: T[k]) => IStubBuilder<T>) & (() => T[k]);
} & {};

type Clazz<T> = new (...args: unknown[]) => T;

/**
 * Create a Builder for a class. Returned objects will be of the class type.
 *
 * e.g. let obj: MyClass = Builder(MyClass).setA(5).setB("str").build();
 *
 * @param type the name of the class to instantiate.
 * @param template optional class partial which the builder will derive initial params from.
 * @param override optional class partial which the builder will override params from when calling build().
 */
export function StubBuilder<T>(
  type: Clazz<T>,
  template?: Partial<T> | null,
  override?: Partial<T> | null
): IStubBuilder<T>;

/**
 * Create a Builder for an interface. Returned objects will be untyped.
 *
 * e.g. let obj: Interface = Builder<Interface>().setA(5).setB("str").build();
 *
 * @param template optional partial object which the builder will derive initial params from.
 * @param override optional partial object which the builder will override params from when calling build().
 */
export function StubBuilder<T>(
  template?: Partial<T> | null,
  override?: Partial<T> | null
): IStubBuilder<T>;

export function StubBuilder<T>(
  typeOrTemplate?: Clazz<T> | Partial<T> | null,
  templateOrOverride?: Partial<T> | null,
  override?: Partial<T> | null
): IStubBuilder<T> {
  let type: Clazz<T> | undefined;
  let template: Partial<T> | null | undefined;
  let overrideValues: Partial<T> | null | undefined;

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

  const builder = new Proxy(
    {},
    {
      get(target, prop) {
        debugger;
        if (overrideValues && overrideValues[prop.toString()]) {
          return overrideValues[prop.toString()];
        }
        if (built[prop.toString()]) {
          return built[prop.toString()];
        } else {
          built[prop.toString()] = cy.stub().as(prop.toString());
          return built[prop.toString()];
        }
        // return cy.stub().as(prop.toString());
        // return (...args: unknown[]): unknown => {
        //   debugger;
        //   // If no arguments passed return current value.
        //   if (
        //     0 === args.length &&
        //     "undefined" === typeof built[prop.toString()]
        //   ) {
        //     built[prop.toString()] = cy.stub().as(prop.toString());
        //     return builder;
        //   } else {
        //     if ("function" === typeof built[prop.toString()]) {
        //       return built[prop.toString()](args[0]);
        //     }
        //   }

        //   built[prop.toString()] = args[0];
        //   return builder;
        // };
      }
    }
  );

  return builder as IStubBuilder<T>;
}
