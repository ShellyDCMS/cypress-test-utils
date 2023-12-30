import { CypressHelper, loggable, match } from ".";
import { then } from "./assertable";

describe("cypress helper tests", () => {
  let { beforeAndAfter, given, when, get } = new CypressHelper({
    defaultDataAttribute: "data-hook"
  });
  beforeAndAfter();
  beforeEach(() => {
    ({ given, when, get } = new CypressHelper({
      defaultDataAttribute: "data-hook"
    }));

    when.visit(
      "https://htmlpreview.github.io/?https://raw.githubusercontent.com/ShellyDCMS/cypress-test-utils/main/index.html"
    );
  });

  describe("default data attribute", () => {
    let { beforeAndAfter, given, when, get } = new CypressHelper();
    it("should get element's text", () => {
      then(get.elementsText("default")).shouldEqual("default data attribute");
    });

    it("should get element's text using then", () => {
      then(get.elementsText("default")).shouldEqual("default data attribute");
    });

    it("should get element's text using then and shouldExist", () => {
      then(get.elementsText("default")).shouldEqual("default data attribute");
    });
  });

  describe("interception", () => {
    it("should intercept request and mock response", async () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever**",
        response: { shelly: "go" },
        alias: "whatever"
      });
      fetch("https:/shellygo/whatever");
      then(get.responseBody("whatever")).shouldInclude({
        shelly: "go"
      });
    });

    it("given fixture should intercept request and mock response", async () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever**",
        response: { fixture: "user.json" },
        alias: "whatever"
      });

      fetch("https:/shellygo/whatever");
      then(get.responseBody("whatever")).shouldInclude({
        name: "Jane Doe",
        id: "1234",
        nested: {
          attr1: "something",
          attr2: "the other thing"
        }
      });
    });

    describe("given multiple requests", () => {
      beforeEach(() => {
        given.interceptAndMockResponse({
          url: "**/shellygo/whatever**",
          response: { shelly: "go" },
          alias: "shellygo"
        });
        fetch("https:/shellygo/whatever");
        fetch("https:/shellygo/whatever");
      });

      it("should wait for multiple responses", () => {
        fetch("https:/shellygo/whatever?shelly=go");
        when.waitForResponses("shellygo", 2);
        then(get.requestQueryParams("shellygo")).shouldInclude({
          shelly: "go"
        });
      });
    });

    describe("when waiting for last call", () => {
      beforeEach(() => {
        given.interceptAndMockResponse({
          url: "**/shellygo/whatever**",
          response: { shelly: "go" },
          alias: "shellygo"
        });
        fetch("https:/shellygo/whatever");
        fetch("https:/shellygo/whatever");
        when.waitForLastCall("shellygo");
      });

      it("should wait for last call", () => {
        fetch("https:/shellygo/whatever?shelly=go");
        then(get.requestQueryParams("shellygo")).shouldInclude({
          shelly: "go"
        });
      });
    });

    it("should intercept request and test query params", () => {
      fetch("https:/shellygo/whatever?shelly=go");
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever**",
        response: { shelly: "go" },
        alias: "shellygo"
      });
      then(get.requestQueryParams("shellygo")).shouldInclude({ shelly: "go" });
    });

    it("should intercept request and test body", () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever",
        method: "POST",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https:/shellygo/whatever", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ shelly: "go" })
      });
      then(get.requestBody("shellygo")).shouldInclude({
        shelly: "go"
      });
    });

    it("should intercept request and test url", () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever/**",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https:/shellygo/whatever/18?param=value");
      then(get.requestUrl("shellygo")).shouldInclude("whatever/18");
    });

    it("should intercept request and test header", () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever",
        method: "POST",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https:/shellygo/whatever", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          shelly: "go"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ shelly: "go" })
      });
      then(get.requestHeader("shellygo")).shouldInclude({
        shelly: "go"
      });
    });
  });

  it("should get current location", () => {
    then(get.currentLocation()).shouldEqual(
      "https://htmlpreview.github.io/?https://raw.githubusercontent.com/ShellyDCMS/cypress-test-utils/main/index.html"
    );
  });

  it("should type input", () => {
    when.clear("name-input");
    when.type("name-input", "shelly");
    then(get.inputValue("name-input")).shouldEqual("shelly");
  });

  it("should type tab", () => {
    when.tab("name-input");
    then(get.focusedElement()).shouldHaveAttribute(
      "data-hook",
      "last-name-input"
    );
  });

  it.skip("should click button", () => {
    when.waitUntil(() => get.elementByTestId("name-input"));
    when.clear("name-input");
    when.type("name-input", "shelly");
    when.click("submit");
    then(get.inputValue("name-input")).shouldEqual("John");
  });

  it("should select element", () => {
    when.check("checkbox", 1);
    then(get.element("input[type='checkbox']", 1)).shouldBeChecked();
  });
  it("should get initial text input", () => {
    then(get.inputValue("last-name-input")).shouldEqual("Doe");
  });

  it("should get initial select input", () => {
    then(get.inputValue("select")).shouldEqual("volvo");
  });

  it("should select input by label", () => {
    when.selectOption("select", "Saab");
    then(get.inputValue("select")).shouldEqual("saab");
  });

  it("should select input by value", () => {
    when.selectOption("select", "saab");
    then(get.inputValue("select")).shouldEqual("saab");
  });

  it("should select input by index", () => {
    when.selectOption("select", 1);
    then(get.inputValue("select")).shouldEqual("saab");
  });

  it("should toggle radio within container", () => {
    when.within(() => when.toggle(1), "radio-group");
    then(get.elementByTestId("radio", 1)).shouldBeChecked();
  });

  it("should toggle radio by selector", () => {
    when.toggleRadioBySelector("radio", 2);
    then(get.elementByTestId("radio", 2)).shouldBeChecked();
  });

  it("should check checkbox", () => {
    when.check("checkbox", 1);
    then(get.elementByTestId("checkbox", 1)).shouldBeChecked();
  });

  it("should uncheck checkbox", () => {
    when.check("checkbox", 2);
    when.uncheck("checkbox", 2);
    then(get.elementByTestId("checkbox", 2)).shouldNotBeChecked();
  });

  it("should get computed style", () => {
    then(get.elementsComputedStyle("button")).shouldInclude({
      backgroundColor: "rgb(255, 0, 0)"
    });
  });

  it("should get style", () => {
    then(get.elementsStyleAttribute("button", "background-color")).shouldEqual(
      "rgb(255, 0, 0)"
    );
  });

  it("should get image source", () => {
    then(get.elementsAttribute("image", "src")).shouldEqual("w3schools.jpg");
  });

  it("should get element's text", () => {
    then(get.elementsText("header")).shouldEqual("My First Heading");
  });

  it("should supply cypress pipe", () => {
    then(
      get.elementsText("header").pipe(loggable(str => str.toLowerCase()))
    ).shouldEqual("my first heading");
  });

  it("should get env variable", () => {
    expect(get.env("env1")).to.eq("value1");
  });

  it("should get number of elements", () => {
    then(get.numberOfElements("radio")).shouldEqual(3);
  });

  it("should get disabled element status", () => {
    then(get.elementByTestId("button")).shouldBeDisabled();
  });

  it("should get enabled element status", () => {
    then(get.elementByTestId("submit")).shouldBeEnabled();
  });

  describe("stubs and spies", () => {
    it("should spy on function", () => {
      const obj = {
        func: (param: number) => {}
      };
      given.spyOnObject(obj, "func");
      obj.func(3);
      then(get.spyFromFunction(obj.func)).shouldHaveBeenCalledWith(3);
    });

    it("should partially match spy params", () => {
      const obj = {
        func: (param: Object) => {}
      };
      given.spyOnObject(obj, "func");
      obj.func({ shelly: "go", inner: { attr: "value" } });
      then(get.spyFromFunction(obj.func)).shouldHaveBeenCalledWithMatch(
        match({ inner: { attr: "value" } })
      );
    });

    it("should stub function", () => {
      let func = () => 5;
      func = given.stub().returns(7);
      expect(func()).to.eq(7);
    });

    it("should stub object function", () => {
      const obj = {
        func: () => 5
      };
      given.stubObjectMethod(obj, "func").returns(7);
      expect(obj.func()).to.eq(7);
    });

    it("should stub object getter", () => {
      const obj = {
        get count() {
          return 5;
        }
      };
      given.stubObjectMethod(obj, "count").get(() => 7);
      expect(obj.count).to.eq(7);
    });
  });

  it("should get element by text", () => {
    then(get.elementByText("My first paragraph")).shouldExist();
  });

  it("should get element by css", () => {
    then(get.bySelector("dummy1 dummy2", "class")).shouldExist();
  });

  it("should get fixture", () => {
    given.fixture("user.json", "user");
    then(get.fixture("user")).shouldDeepNestedInclude({
      name: "Jane Doe",
      id: "1234",
      nested: {
        attr1: "something",
        attr2: "the other thing"
      }
    });
  });

  it("should get element's attribute", () => {
    then(get.elementsProperty("image", "height")).shouldEqual(142);
  });
});
