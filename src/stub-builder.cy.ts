import { CypressHelper } from ".";
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
      then(get.assertableStub(mockMyInterface.func)).shouldHaveBeenCalledWith(
        5,
        "whatever"
      );
    });

    it("should stub interface", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.func(5, "whatever");
      then(get.assertableStub(mockMyInterface.func)).shouldHaveBeenCalledWith(
        5,
        "whatever"
      );
    });

    it("should assert stub async function calls", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.asynFunc.returns(Promise.resolve(7));
      await mockMyInterface.asynFunc(3);
      then(
        get.assertableStub(mockMyInterface.asynFunc)
      ).shouldHaveBeenCalledWith(3);
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
      then(
        get.assertableStub(mockMyInterface.asynFunc)
      ).shouldHaveBeenCalledWith(3);
    });

    it("should stub async function", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.asynFunc.returns(Promise.resolve(7));
      expect(await mockMyInterface.asynFunc(3)).to.eq(7);
    });

    it("should stub async function using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          asynFunc: stub
        }
      );
      expect(await mockMyInterface.asynFunc(3)).to.eq(7);
    });

    it("should stub async property function", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      await mockMyInterface.asyncPropertyFunc(3);
      then(
        get.assertableStub(mockMyInterface.asyncPropertyFunc)
      ).shouldHaveBeenCalledWith(3);
    });

    it("should override class property Function", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.propertyFunc.returns(7);
      expect(mockMyInterface.propertyFunc(3)).to.eq(7);
    });

    it("should stub interface property function", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.propertyFunc(3);
      then(
        get.assertableStub(mockMyInterface.propertyFunc)
      ).shouldHaveBeenCalledWith(3);
    });

    it("should override interface property", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          property: 5
        }
      );
      expect(mockMyInterface.property).to.eq(5);
    });

    it("should override interface getter", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          getter: 5
        }
      );
      expect(mockMyInterface.getter).to.eq(5);
    });

    it("should stub interface setter with override", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          property: 8
        }
      );
      expect(mockMyInterface.property).to.eq(8);
    });

    it("should allow setter calls", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      expect((mockMyInterface.setter = 5)).not.to.throw;
    });

    it("should allow setting properties", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.property = 5;
      expect(mockMyInterface.property).to.eq(5);
    });

    it("should stub interface function return value", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.func.returns(7);
      expect(mockMyInterface.func(5, "whatever")).to.eq(7);
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
        this.property = value;
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
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.asynFunc.resolves(7);
        await mockMyInheritedClass.asynFunc(3);
        then(
          get.assertableStub(mockMyInheritedClass.asynFunc)
        ).shouldHaveBeenCalledWith(3);
      });

      it("should assert stub async function calls using overrides", async () => {
        const stub = given.stub().as("kuku").returns(Promise.resolve(7));
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          asynFunc: stub
        });
        await mockMyInheritedClass.asynFunc(3);
        then(
          get.assertableStub(mockMyInheritedClass.asynFunc)
        ).shouldHaveBeenCalledWith(3);
      });

      it("should stub async function", async () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.asynFunc.returns(Promise.resolve(7));
        expect(await mockMyInheritedClass.asynFunc(3)).to.eq(7);
      });

      it("should stub async function using overrides", async () => {
        const stub = given.stub().returns(Promise.resolve(7));
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          asynFunc: stub
        });
        expect(await mockMyInheritedClass.asynFunc(3)).to.eq(7);
      });

      it("should stub async property function", async () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        await mockMyInheritedClass.asyncPropertyFunc(3);
        then(
          get.assertableStub(mockMyInheritedClass.asyncPropertyFunc)
        ).shouldHaveBeenCalledWith(3);
      });

      it("should override class property Function", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.propertyFunc.returns(7);
        expect(mockMyInheritedClass.propertyFunc(3)).to.eq(7);
      });

      it("should stub class property function", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.propertyFunc(3);
        then(
          get.assertableStub(mockMyInheritedClass.propertyFunc)
        ).shouldHaveBeenCalledWith(3);
      });

      it("should override class property", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          property: 5
        });
        expect(mockMyInheritedClass.property).to.eq(5);
      });

      it("should override class getter", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          getter: 5
        });
        expect(mockMyInheritedClass.getter).to.eq(5);
      });

      it("should stub class setter with override", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          property: 8
        });
        expect(mockMyInheritedClass.property).to.eq(8);
      });

      it("should assert stub class setter calls", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.setter = 5;
        // then(
        //   get.assertableStub(mockMyInheritedClass.setter)
        // ).shouldHaveBeenCalledWith(5);
      });

      it("should allow setting properties", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.property = 5;
        expect(mockMyInheritedClass.property).to.eq(5);
      });

      it("should allow setting optional properties", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass, {
          optionalProperty: 8
        });
        expect(mockMyInheritedClass.optionalProperty).to.eq(8);
        mockMyInheritedClass.optionalProperty = 5;
        expect(mockMyInheritedClass.optionalProperty).to.eq(5);
      });

      it("should stub class", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.func(5, "whatever");
        then(
          get.assertableStub(mockMyInheritedClass.func)
        ).shouldHaveBeenCalledWith(5, "whatever");
      });

      it("should stub class function return value", () => {
        const mockMyInheritedClass = given.stubbedInstance(MyInheritedClass);
        mockMyInheritedClass.func.returns(7);
        expect(mockMyInheritedClass.func(5, "whatever")).to.eq(7);
      });
    });

    it("should assert stub async function calls", async () => {
      const mockMyClass = given.stubbedInstance<MyClass>(MyClass);
      mockMyClass.asynFunc.returns(Promise.resolve(7));
      await mockMyClass.asynFunc(3);
      then(get.assertableStub(mockMyClass.asynFunc)).shouldHaveBeenCalledWith(
        3
      );
    });

    it("should assert stub async function calls using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyClass = given.stubbedInstance(MyClass, { asynFunc: stub });
      await mockMyClass.asynFunc(3);
      then(get.assertableStub(mockMyClass.asynFunc)).shouldHaveBeenCalledWith(
        3
      );
    });

    it("should stub async function", async () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.asynFunc.returns(Promise.resolve(7));
      expect(await mockMyClass.asynFunc(3)).to.eq(7);
    });

    it("should stub async function using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyClass = given.stubbedInstance(MyClass, {
        asynFunc: given.stub().resolves(7)
      });
      expect(await mockMyClass.asynFunc(3)).to.eq(7);
    });

    it("should stub async property function", async () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      await mockMyClass.asyncPropertyFunc(3);
      then(
        get.assertableStub(mockMyClass.asyncPropertyFunc)
      ).shouldHaveBeenCalledWith(3);
    });

    it("should override class property Function", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.propertyFunc.returns(7);
      expect(mockMyClass.propertyFunc(3)).to.eq(7);
    });

    it("should stub class property function", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.propertyFunc(3);
      then(
        get.assertableStub(mockMyClass.propertyFunc)
      ).shouldHaveBeenCalledWith(3);
    });

    it("should override class property", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { property: 5 });
      expect(mockMyClass.property).to.eq(5);
    });

    it("should override class getter", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { getter: 5 });
      expect(mockMyClass.getter).to.eq(5);
    });

    it("should stub class setter with override", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { property: 8 });
      expect(mockMyClass.property).to.eq(8);
    });

    it("should class setter calls", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      expect((mockMyClass.setter = 5)).not.to.throw;
    });

    it("should allow setting properties", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.property = 5;
      expect(mockMyClass.property).to.eq(5);
    });

    it("should allow setting optional properties", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.optionalProperty = 5;
      expect(mockMyClass.optionalProperty).to.eq(5);
    });

    it("should stub class", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.func(5, "whatever");
      then(get.assertableStub(mockMyClass.func)).shouldHaveBeenCalledWith(
        5,
        "whatever"
      );
    });

    it("should stub class function return value", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.func.returns(7);
      expect(mockMyClass.func(5, "whatever")).to.eq(7);
    });
  });
});
