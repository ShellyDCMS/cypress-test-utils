import { CypressHelper, type StubbedInstance } from ".";
import { then } from "./assertable";

describe("stub builder tests", () => {
  let { beforeAndAfter, given, when, get } = new CypressHelper();
  beforeAndAfter();
  beforeEach(() => {
    ({ given, when, get } = new CypressHelper());
  });

  describe("stubbing interface", () => {
    interface MyInterface {
      func(input: number, text: string): number;
      property: number;
      get getter(): number;
      set setter(value: number);
      propertyFunc: (int: number) => number;
      asyncPropertyFunc: (int: number) => Promise<number>;
      asynFunc(value: number): Promise<number>;
    }

    it("should stub interface", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.func(5, "whatever");
      then(mockMyInterface.func).shouldHaveBeenCalledWith(5, "whatever");
    });

    it("should stub interface", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.func(5, "whatever");
      then(mockMyInterface.func).shouldHaveBeenCalledWith(5, "whatever");
    });

    it("should assert stub async function calls", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.asynFunc.returns(Promise.resolve(7));
      await mockMyInterface.asynFunc(3);
      then(mockMyInterface.asynFunc).shouldHaveBeenCalledWith(3);
    });

    it("should assert stub async function calls using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          asynFunc: stub
        }
      );
      await mockMyInterface.asynFunc(3);
      then(mockMyInterface.asynFunc).shouldHaveBeenCalledWith(3);
    });

    it("should stub async function", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.asynFunc.returns(Promise.resolve(7));
      then(await mockMyInterface.asynFunc(3)).shouldEqual(7);
    });

    it("should stub async function using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          asynFunc: stub
        }
      );
      then(await mockMyInterface.asynFunc(3)).shouldEqual(7);
    });

    it("should stub async property function", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      await mockMyInterface.asyncPropertyFunc(3);
      then(mockMyInterface.asyncPropertyFunc).shouldHaveBeenCalledWith(3);
    });

    it("should override class property Function", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.propertyFunc.returns(7);
      then(mockMyInterface.propertyFunc(3)).shouldEqual(7);
    });

    it("should stub interface property function", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.propertyFunc(3);
      then(mockMyInterface.propertyFunc).shouldHaveBeenCalledWith(3);
    });

    it("should override interface property", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          property: 5
        }
      );
      then(mockMyInterface.property).shouldEqual(5);
    });

    it("should override interface getter", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          getter: 5
        }
      );
      then(mockMyInterface.getter).shouldEqual(5);
    });

    it("should stub interface setter with override", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          property: 8
        }
      );
      then(mockMyInterface.property).shouldEqual(8);
    });

    it("should allow setter calls", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      then(() => (mockMyInterface.setter = 5)).shouldNotThrow();
    });

    it("should allow setting properties", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.property = 5;
      then(mockMyInterface.property).shouldEqual(5);
    });

    it("should stub interface function return value", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.func.returns(7);
      then(mockMyInterface.func(5, "whatever")).shouldEqual(7);
    });
  });

  describe("stubbing class", () => {
    class MyClass {
      constructor(input: number) {
        throw new Error("Should not be called");
      }
      func(input: number, text: string) {
        console.log(text);
        return input;
      }
      property: number = 3;
      optionalProperty?: number;
      get getter(): number {
        return this.property;
      }
      set setter(value: number) {
        throw new Error("Should not be called");
      }

      propertyFunc = (int: number) => int;

      asyncPropertyFunc = async (int: number) => await Promise.resolve(int);
      async asynFunc(value: number) {
        return await Promise.resolve(9);
      }
    }

    class MyInheritedClass extends MyClass {
      constructor() {
        super(5);
        throw new Error("Should not be called");
      }
    }

    describe("Given inherited class", () => {
      it("should assert stub async function calls", async () => {
        const mockMyInheritedClass: StubbedInstance<MyInheritedClass> =
          given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.asynFunc.resolves(7);
        await mockMyInheritedClass.asynFunc(3);
        then(mockMyInheritedClass.asynFunc).shouldHaveBeenCalledWith(3);
      });

      it("should assert stub async function calls using overrides", async () => {
        const stub = given.stub().as("kuku").returns(Promise.resolve(7));
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          asynFunc: stub
        });
        await mockMyInheritedClass.asynFunc(3);
        then(mockMyInheritedClass.asynFunc).shouldHaveBeenCalledWith(3);
      });

      it("should stub async function", async () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.asynFunc.returns(Promise.resolve(7));
        then(await mockMyInheritedClass.asynFunc(3)).shouldEqual(7);
      });

      it("should stub async function using overrides", async () => {
        const stub = given.stub().returns(Promise.resolve(7));
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          asynFunc: stub
        });
        then(await mockMyInheritedClass.asynFunc(3)).shouldEqual(7);
      });

      it("should stub async property function", async () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        await mockMyInheritedClass.asyncPropertyFunc(3);
        then(mockMyInheritedClass.asyncPropertyFunc).shouldHaveBeenCalledWith(
          3
        );
      });

      it("should override class property Function", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.propertyFunc.returns(7);
        then(mockMyInheritedClass.propertyFunc(3)).shouldEqual(7);
      });

      it("should stub class property function", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.propertyFunc(3);
        then(mockMyInheritedClass.propertyFunc).shouldHaveBeenCalledWith(3);
      });

      it("should override class property", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          property: 5
        });
        then(mockMyInheritedClass.property).shouldEqual(5);
      });

      it("should override class getter", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          getter: 5
        });
        then(mockMyInheritedClass.getter).shouldEqual(5);
      });

      it("should stub class setter with override", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          property: 8
        });
        then(mockMyInheritedClass.property).shouldEqual(8);
      });

      it("should assert stub class setter calls", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.setter = 5;
      });

      it("should allow setting properties", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.property = 5;
        then(mockMyInheritedClass.property).shouldEqual(5);
      });

      it("should allow setting optional properties", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          optionalProperty: 8
        });
        then(mockMyInheritedClass.optionalProperty).shouldEqual(8);
        mockMyInheritedClass.optionalProperty = 5;
        then(mockMyInheritedClass.optionalProperty).shouldEqual(5);
      });

      it("should stub class", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.func(5, "whatever");
        then(mockMyInheritedClass.func).shouldHaveBeenCalledWith(5, "whatever");
      });

      it("should stub class function return value", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.func.returns(7);
        then(mockMyInheritedClass.func(5, "whatever")).shouldEqual(7);
      });
    });

    it("should assert stub async function calls", async () => {
      const mockMyClass = given.stubbedInstance<MyClass>(MyClass);
      mockMyClass.asynFunc.returns(Promise.resolve(7));
      await mockMyClass.asynFunc(3);
      then(mockMyClass.asynFunc).shouldHaveBeenCalledWith(3);
    });

    it("should assert stub async function calls using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyClass = given.stubbedInstance(MyClass, { asynFunc: stub });
      await mockMyClass.asynFunc(3);
      then(mockMyClass.asynFunc).shouldHaveBeenCalledWith(3);
    });

    it("should stub async function", async () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.asynFunc.returns(Promise.resolve(7));
      then(await mockMyClass.asynFunc(3)).shouldEqual(7);
    });

    it("should stub async function using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyClass = given.stubbedInstance(MyClass, {
        asynFunc: given.stub().resolves(7)
      });
      then(await mockMyClass.asynFunc(3)).shouldEqual(7);
    });

    it("should stub async property function", async () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      await mockMyClass.asyncPropertyFunc(3);
      then(mockMyClass.asyncPropertyFunc).shouldHaveBeenCalledWith(3);
    });

    it("should override class property Function", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.propertyFunc.returns(7);
      then(mockMyClass.propertyFunc(3)).shouldEqual(7);
    });

    it("should stub class property function", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.propertyFunc(3);
      then(mockMyClass.propertyFunc).shouldHaveBeenCalledWith(3);
    });

    it("should override class property", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { property: 5 });
      then(mockMyClass.property).shouldEqual(5);
    });

    it("should override class getter", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { getter: 5 });
      then(mockMyClass.getter).shouldEqual(5);
    });

    it("should stub class setter", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { property: 8 });
      mockMyClass.setter = 5;
      then(mockMyClass.property).shouldEqual(8);
    });
    it("should stub setter calls", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      then(() => (mockMyClass.setter = 5)).shouldNotThrow();
    });

    it("should allow setting properties", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.property = 5;
      then(mockMyClass.property).shouldEqual(5);
    });

    it("should allow setting optional properties", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.optionalProperty = 5;
      then(mockMyClass.optionalProperty).shouldEqual(5);
    });

    it("should stub class", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.func(5, "whatever");
      then(mockMyClass.func).shouldHaveBeenCalledWith(5, "whatever");
    });

    it("should stub class function return value", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.func.returns(7);
      then(mockMyClass.func(5, "whatever")).shouldEqual(7);
    });
  });
});
