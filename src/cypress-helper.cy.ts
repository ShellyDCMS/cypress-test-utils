import { CypressHelper, match } from ".";
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
    when.waitUntil(() => get.elementByTestId("name-input"));
  });

  describe("stubbing an spying", () => {
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
      then(func()).shouldEqual(7);
    });

    it("should stub function with alias", () => {
      let func = (input: number) => input;
      func = given.stub("func");
      func(7);
      then(get.stub("func")).shouldHaveBeenCalledWith(7);
    });

    it("should stub object function", () => {
      const obj = {
        func: () => 5
      };
      given.stubObjectMethod(obj, "func").returns(7);
      then(obj.func()).shouldEqual(7);
    });

    it("should stub object getter", () => {
      const obj = {
        get count() {
          return 5;
        }
      };
      given.stubObjectMethod(obj, "count").get(() => 7);
      then(obj.count).shouldEqual(7);
    });
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
        url: "**/shellygo.com/whatever**",
        response: { shelly: "go" },
        alias: "whatever"
      });
      fetch("https://shellygo.com/whatever");
      then(get.responseBody("whatever")).shouldInclude({
        shelly: "go"
      });
    });

    it("given fixture should intercept request and mock response", async () => {
      given.interceptAndMockResponse({
        url: "**/shellygo.com/whatever**",
        response: { fixture: "user.json" },
        alias: "whatever"
      });

      fetch("https://shellygo.com/whatever");
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
          url: "**/shellygo.com/whatever**",
          response: { shelly: "go" },
          alias: "shellygo"
        });
        fetch("https://shellygo.com/whatever?shelly=1").then(() =>
          fetch("https://shellygo.com/whatever?shelly=2").then(() =>
            fetch("https://shellygo.com/whatever?shelly=3")
          )
        );
      });

      it("should wait for multiple responses", () => {
        when.waitForResponses("shellygo", 2);
        then(get.requestQueryParams("shellygo")).shouldInclude({
          shelly: "3"
        });
      });

      it("should assert number of calls", () => {
        then(get.numberOfRequests("shellygo")).shouldEqual(3);
      });
    });

    describe("interception negative tests", () => {
      beforeEach(() => {
        given.interceptAndMockResponse({
          url: "**/api/endpoint**",
          response: {
            data: {
              items: [
                { id: 1, name: "Apple" },
                { id: 2, name: "Banana" },
                { id: 3, name: "Cherry" }
              ]
            }
          },
          alias: "apiCall"
        });
        fetch("https://example.com/api/endpoint");
      });

      it("should not include a specific item", () => {
        then(get.responseBody("apiCall")).shouldNotInclude({
          data: {
            items: [{ id: 4, name: "Durian" }]
          }
        });
      });
    });

    describe("when waiting for last call", () => {
      beforeEach(() => {
        given.interceptAndMockResponse({
          url: "**/shellygo.com/whatever**",
          response: { shelly: "go" },
          alias: "shellygo"
        });
        fetch("https://shellygo.com/whatever");
        fetch("https://shellygo.com/whatever");
        when.waitForLastCall("shellygo");
        when.waitUntil(() => get.elementByTestId("name-input"));
      });

      it("should wait for last call", () => {
        fetch("https://shellygo.com/whatever?shelly=go");
        then(get.requestQueryParams("shellygo")).shouldInclude({
          shelly: "go"
        });
      });
    });

    it("should intercept request and test query params", () => {
      fetch("https://shellygo.com/whatever?shelly=go");
      given.interceptAndMockResponse({
        url: "**/shellygo.com/whatever**",
        response: { shelly: "go" },
        alias: "shellygo"
      });
      then(get.requestQueryParams("shellygo")).shouldInclude({ shelly: "go" });
    });

    it("should intercept request and test body", () => {
      given.interceptAndMockResponse({
        url: "**/shellygo.com/whatever",
        method: "POST",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https://shellygo.com/whatever", {
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
        url: "**/shellygo.com/whatever/**",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https://shellygo.com/whatever/18?param=value");
      then(get.requestUrl("shellygo")).shouldInclude("whatever/18");
    });

    it("should intercept request and wait for response", () => {
      given.intercept(
        `**/PokeAPI/sprites/master/sprites/pokemon/1.png`,
        "poke-image"
      );
      fetch(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
      );
      when.waitForResponse("poke-image");
    });

    it("should intercept request and test header", () => {
      given.interceptAndMockResponse({
        url: "**/shellygo.com/whatever*",
        method: "POST",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https://shellygo.com/whatever", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "*",
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

  it("should take snapshot and compare to previous", () => {
    get.imageSnapshot("homepage", { failureThreshold: 1 });
    get.imageSnapshot("radio-group", {
      dataTestID: "radio-group",
      failureThreshold: 0.2
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

  it("should click button", () => {
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
    when.doWithin(() => when.toggle(1), "radio-group");
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

  it("should assert element's text ends with suffix", () => {
    then(get.elementsText("header")).shouldEndWith("Heading");
  });

  it("should assert element's text starts with prefix", () => {
    then(get.elementsText("header")).shouldStartWith("My First");
  });

  it("should get env variable", () => {
    then(get.env("env1")).shouldEqual("value1");
  });

  it("should set env variable", () => {
    given.env("env1000", "1000");
    then(get.env("env1000")).shouldEqual("1000");
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

  it("should get element by text", () => {
    then(get.elementByText("My first paragraph")).shouldExist();
  });

  it("Non existing slot", () => {
    then(get.elementByTestId("non-existing-slot")).shouldNotExist();
  });

  it("Test non-existing element", () => {
    then(get.elementByTestId("non-existing-element")).shouldNotExist();
  });

  it("should have text", () => {
    then(get.elementByTestId("div-with-span")).shouldHaveText("Text");
  });

  it("should type special characters", () => {
    when.clear("name-input");
    when.type("name-input", "shelly");
    when.typeSpecialCharacter("name-input", "{backspace}");
    then(get.inputValue("name-input")).shouldEqual("shell");
  });

  it("should get element by css", () => {
    then(get.elementBySelector("dummy1 dummy2", "class")).shouldExist();
  });

  it("should get element by attribute", () => {
    then(get.elementByAttribute("class", "dummy1 dummy2")).shouldExist();
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

  it.skip("should get element's attribute", () => {
    then(get.elementsProperty("image", "height")).shouldEqual(142);
  });

  it("should not have text", () => {
    then(get.elementByTestId("header")).shouldNotHaveText("TEST");
  });

  it("should get the given style from the element", () => {
    then(get.elementComputedStyleProperty("image", "height")).shouldEqual(
      "142px"
    );
  });

  it("should get the given style from element with index", () => {
    then(
      get.elementComputedStyleProperty("image", "height", { index: 0 })
    ).shouldEqual("142px");
  });
});
