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
      asynFunc(): Promise<number>;
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
      mockMyInterface.propertyFunc(3);
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
      mockMyInterface.propertyFunc(3);
      then(
        get.assertableStub(mockMyInterface.asynFunc)
      ).shouldHaveBeenCalledWith(3);
    });

    it("should stub async function", async () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.asynFunc.returns(Promise.resolve(7));
      mockMyInterface.propertyFunc(3);
      expect(await mockMyInterface.asynFunc()).to.eq(7);
    });

    it("should stub async function using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          asynFunc: stub
        }
      );
      mockMyInterface.propertyFunc(3);
      expect(await mockMyInterface.asynFunc()).to.eq(7);
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

    it("should assert stub interface setter calls", () => {
      const mockMyInterface =
        given.stubbedInterface<MyInterface>("MyInterface");
      mockMyInterface.setter = 5;
      then(get.assertableStub(mockMyInterface.setter)).shouldHaveBeenCalledWith(
        5
      );
    });

    it("should allow setting properties", () => {
      const mockMyInterface = given.stubbedInterface<MyInterface>(
        "MyInterface",
        {
          property: 8
        }
      );
      mockMyInterface.property = 5;
      expect(mockMyInterface.property).to.eq(8);
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
      constructor(input: number) {}
      func(input: number, text: string) {
        console.log(text);
        return input;
      }
      property: number = 3;
      get getter(): number {
        return this.property;
      }
      set setter(value: number) {
        this.property = value;
      }

      propertyFunc = (int: number) => int;

      asyncPropertyFunc = async (int: number) => await Promise.resolve(int);
      async asynFunc() {
        return await Promise.resolve(9);
      }
    }

    it("should assert stub async function calls", async () => {
      const mockMyClass = given.stubbedInstance<MyClass>(MyClass);
      mockMyClass.asynFunc.returns(Promise.resolve(7));
      mockMyClass.propertyFunc(3);
      then(get.assertableStub(mockMyClass.asynFunc)).shouldHaveBeenCalledWith(
        3
      );
    });

    it("should assert stub async function calls using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyClass = given.stubbedInstance(MyClass, { asynFunc: stub });
      mockMyClass.propertyFunc(3);
      then(get.assertableStub(mockMyClass.asynFunc)).shouldHaveBeenCalledWith(
        3
      );
    });

    it("should stub async function", async () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.asynFunc.returns(Promise.resolve(7));
      mockMyClass.propertyFunc(3);
      expect(await mockMyClass.asynFunc()).to.eq(7);
    });

    it("should stub async function using overrides", async () => {
      const stub = given.stub().returns(Promise.resolve(7));
      const mockMyClass = given.stubbedInstance(MyClass, { asynFunc: stub });
      mockMyClass.propertyFunc(3);
      expect(await mockMyClass.asynFunc()).to.eq(7);
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

    it("should assert stub class setter calls", () => {
      const mockMyClass = given.stubbedInstance(MyClass);
      mockMyClass.setter = 5;
      then(get.assertableStub(mockMyClass.setter)).shouldHaveBeenCalledWith(5);
    });

    it("should allow setting properties", () => {
      const mockMyClass = given.stubbedInstance(MyClass, { property: 8 });
      mockMyClass.property = 5;
      expect(mockMyClass.property).to.eq(8);
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
