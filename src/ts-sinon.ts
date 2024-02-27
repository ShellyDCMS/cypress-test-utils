import sinon from "cypress/types/sinon";

export type StubbedInstance<T> = sinon.SinonStubbedInstance<T> & T;

export type AllowedKeys<T, Condition> = {
  [Key in keyof T]: T[Key] extends Condition ? Key : never;
}[keyof T];

export type ObjectMethodsKeys<T> = AllowedKeys<T, (...args: any[]) => any>[];

export type ObjectMethodsMap<T> = {
  [Key in keyof T]?: T[Key] extends (...args: any[]) => any
    ? ReturnType<T[Key]> | sinon.SinonStub
    : never;
};

export function stubObject<T extends object>(
  className: string,
  object: T,
  methods?: ObjectMethodsKeys<T> | ObjectMethodsMap<T>
): StubbedInstance<T> {
  const stubObject = Object.assign(<sinon.SinonStubbedInstance<T>>{}, object);
  const objectMethods = getObjectMethods(object);
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
    "isPrototypeOf"
  ];

  prepareMethodsList();
  setOverriddenMethods();
  stubObjectMethods();
  return stubObject;

  function stubObjectMethods() {
    if (Array.isArray(methods)) {
      for (let method of methods) {
        stubObject[method as keyof T] = createStub(className, method);
      }
    } else if (typeof methods == "object") {
      for (let method in methods) {
        stubObject[method as keyof T] = createStub(className, method);
        (stubObject[method as keyof T] as sinon.SinonStub).returns(
          methods[method]
        );
      }
    } else {
      for (let method of objectMethods) {
        if (shouldStubProperty<T>(object, method)) {
          stubObject[method as keyof T] = createStub(className, method);
        }
      }
    }
  }

  function setOverriddenMethods() {
    for (let method of objectMethods) {
      if (!excludedMethods.includes(method)) {
        // @ts-ignore
        stubObject[method as keyof T] = object[method];
      }
    }
  }

  function prepareMethodsList() {
    for (let method in object) {
      if (typeof object[method] == "function") {
        objectMethods.push(method);
      }
    }
  }
}

function shouldStubProperty<T extends object>(object: T, method: string) {
  return (
    typeof object[method as keyof T] == "function" && method !== "constructor"
  );
}

export function stubConstructor<T extends new (...args: any[]) => any>(
  constructor: T,
  ...constructorArgs: ConstructorParameters<T> | undefined[]
): StubbedInstance<InstanceType<T>> {
  return stubObject(constructor.name, new constructor(...constructorArgs));
}

export function stubInterface<T extends object>(
  className: string,
  methods: ObjectMethodsMap<T> = {},
  properties: Partial<T> = {}
): StubbedInstance<T> {
  const object = stubObject<T>(className, <T>{ ...properties }, methods);

  return new Proxy(object, {
    get: (target, name) => {
      if (!target.hasOwnProperty(name) && name !== "then") {
        // @ts-ignore
        target[name] = cy.stub().as(className + "." + name.toString());
      }
      // @ts-ignore
      return target[name];
    }
  });
}

function getObjectMethods(object: object): Array<string> {
  const methods: Array<string> = [];
  // @ts-ignore
  while ((object = Reflect.getPrototypeOf(object))) {
    const keys = Reflect.ownKeys(object);
    keys.forEach(key => {
      if (typeof key === "string") {
        methods.push(key);
      }
    });
  }

  return methods;
}

function createStub(className: string, method: string | number | symbol): any {
  return cy.stub().as(className + "." + <string>method);
}
