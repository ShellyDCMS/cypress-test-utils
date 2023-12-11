import { CypressHelper, loggable, match } from ".";

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
      get.elementsText("default").should("eq", "default data attribute");
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
      expect(
        get.responseBody("whatever").should("include", {
          shelly: "go"
        })
      );
    });

    it("given fixture should intercept request and mock response", async () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever**",
        response: { fixture: "user.json" },
        alias: "whatever"
      });

      fetch("https:/shellygo/whatever");
      expect(
        get.responseBody("whatever").should("include", {
          name: "Jane Doe",
          id: "1234",
          nested: {
            attr1: "something",
            attr2: "the other thing"
          }
        })
      );
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
        expect(
          get.requestQueryParams("shellygo").should("include", { shelly: "go" })
        );
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
        expect(
          get.requestQueryParams("shellygo").should("include", { shelly: "go" })
        );
      });
    });

    it("should intercept request and test query params", () => {
      fetch("https:/shellygo/whatever?shelly=go");
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever**",
        response: { shelly: "go" },
        alias: "shellygo"
      });
      expect(
        get.requestQueryParams("shellygo").should("include", { shelly: "go" })
      );
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
      expect(
        get.requestBody("shellygo").should("include", {
          shelly: "go"
        })
      );
    });

    it("should intercept request and test url", () => {
      given.interceptAndMockResponse({
        url: "**/shellygo/whatever/**",
        response: { shelly: "go" },
        alias: "shellygo"
      });

      fetch("https:/shellygo/whatever/18?param=value");
      expect(get.requestUrl("shellygo").should("contain", "whatever/18"));
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
      expect(
        get.requestHeader("shellygo").should("include", {
          shelly: "go"
        })
      );
    });
  });

  it("should get current location", () => {
    expect(
      get
        .currentLocation()
        .should(
          "eq",
          "https://htmlpreview.github.io/?https://raw.githubusercontent.com/ShellyDCMS/cypress-test-utils/main/index.html"
        )
    );
  });

  it("should type input", () => {
    when.clear("name-input");
    when.type("name-input", "shelly");
    expect(get.inputValue("name-input").should("eq", "shelly"));
  });

  it("should click button", () => {
    when.waitUntil(() => get.elementByTestId("name-input"));
    when.clear("name-input");
    when.type("name-input", "shelly");
    when.click("submit");
    expect(get.inputValue("name-input").should("eq", "John"));
  });

  it("should get initial text input", () => {
    expect(get.inputValue("last-name-input").should("eq", "Doe"));
  });

  it("should get initial select input", () => {
    expect(get.inputValue("select").should("eq", "volvo"));
  });

  it("should select input", () => {
    when.selectOption("select", "Saab");
    expect(get.inputValue("select").should("eq", "saab"));
  });

  it("should toggle radio within container", () => {
    when.within(() => when.toggle(1), "radio-group");
    expect(get.elementByTestId("radio", 1).should("be.checked"));
  });

  it("should toggle radio by selector", () => {
    when.toggleRadioBySelector("radio", 2);
    expect(get.elementByTestId("radio", 2).should("be.checked"));
  });

  it("should check checkbox", () => {
    when.check("checkbox", 1);
    expect(get.elementByTestId("checkbox", 1).should("be.checked"));
  });

  it("should uncheck checkbox", () => {
    when.check("checkbox", 2);
    when.uncheck("checkbox", 2);
    expect(get.elementByTestId("checkbox", 2).should("not.be.checked"));
  });

  it("should get computed style", () => {
    expect(
      get
        .elementsComputedStyle("button")
        .should("include", { backgroundColor: "rgb(255, 0, 0)" })
    );
  });

  it("should get style", () => {
    expect(
      get
        .elementsStyleAttribute("button", "background-color")
        .should("eq", "rgb(255, 0, 0)")
    );
  });

  it("should get image source", () => {
    expect(get.elementsAttribute("image", "src").should("eq", "w3schools.jpg"));
  });

  it("should get element's text", () => {
    get.elementsText("header").should("eq", "My First Heading");
  });

  it("should supply cypress pipe", () => {
    get
      .elementsText("header")
      .pipe(loggable(str => str.toLowerCase()))
      .should("eq", "my first heading");
  });

  it("should get env variable", () => {
    expect(get.env("env1")).to.eq("value1");
  });

  it("should get number of elements", () => {
    expect(get.numberOfElements("radio").should("eq", 3));
  });

  it("should get disabled element status", () => {
    expect(get.elementByTestId("button").should("be.disabled"));
  });

  it("should get enabled element status", () => {
    expect(get.elementByTestId("submit").should("be.enabled"));
  });

  describe("stubs and spies", () => {
    it("should spy on function", () => {
      const obj = {
        func: (param: number) => {}
      };
      given.spyOnObject(obj, "func");
      obj.func(3);
      expect(get.spyFromFunction(obj.func).should("have.been.calledWith", 3));
    });

    it("should partially match spy params", () => {
      const obj = {
        func: (param: Object) => {}
      };
      given.spyOnObject(obj, "func");
      obj.func({ shelly: "go", inner: { attr: "value" } });
      expect(
        get
          .spyFromFunction(obj.func)
          .should(
            "have.been.calledWithMatch",
            match({ inner: { attr: "value" } })
          )
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
    expect(get.elementByText("My first paragraph")).to.exist;
  });

  it("should get element by css", () => {
    expect(get.bySelector("dummy1 dummy2", "class")).to.exist;
  });

  it("should get fixture", () => {
    given.fixture("user.json", "user");
    expect(
      get.fixture("user").should("deep.nested.include", {
        name: "Jane Doe",
        id: "1234",
        nested: {
          attr1: "something",
          attr2: "the other thing"
        }
      })
    );
  });

  it("should get element's attribute", () => {
    expect(get.elementsProperty("image", "height").should("eq", 142));
  });
});
