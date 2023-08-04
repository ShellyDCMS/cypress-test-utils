import { CypressHelper } from "./cypress-helper";

describe("cypress helper tests", () => {
  let { beforeAndAfter, given, when, get } = new CypressHelper("data-hook");
  beforeAndAfter();
  beforeEach(() => {
    ({ given, when, get } = new CypressHelper("data-hook"));

    when.visit(
      "https://htmlpreview.github.io/?https://raw.githubusercontent.com/ShellyDCMS/cypress-test-utils/main/index.html"
    );
  });

  it("should intercept request and mock response", async () => {
    given.interceptAndMockResponse({
      url: "**/shellygo/whatever",
      response: { shelly: "go" }
    });
    expect(await (await fetch("https:/shellygo/whatever")).json()).to.include({
      shelly: "go"
    });
  });

  it("should intercept request and test body", async () => {
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
    expect(await get.requestBody("shellygo")).to.include({
      shelly: "go"
    });
  });

  it("should intercept request and test header", async () => {
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
    expect(await get.requestHeader("shellygo")).to.include({
      shelly: "go"
    });
  });

  it("should get current location", async () => {
    expect(await get.currentLocation()).to.eq(
      "https://htmlpreview.github.io/?https://raw.githubusercontent.com/ShellyDCMS/cypress-test-utils/main/index.html"
    );
  });

  it("should type input", async () => {
    when.clear("name-input");
    when.type("name-input", "shelly");
    expect(await get.inputValue("name-input")).to.eq("shelly");
  });

  it("should click button", async () => {
    when.clear("name-input");
    when.type("name-input", "shelly");
    when.click("submit");
    expect(await get.inputValue("name-input")).to.eq("John");
  });

  it("should get initial text input", async () => {
    expect(await get.inputValue("last-name-input")).to.eq("Doe");
  });

  it("should get initial select input", async () => {
    expect(await get.inputValue("select")).to.eq("volvo");
  });

  it("should select input", async () => {
    when.selectOption("select", "Saab");
    expect(await get.inputValue("select")).to.eq("saab");
  });

  it("should toggle radio within container", () => {
    when.within(() => when.toggle(1), "radio-group");
    expect(get.elementByTestId("radio", 1).should("be.checked"));
  });

  it("should toggle radio by selector", () => {
    when.toggleRadio("radio", 2);
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

  it("should get computed style", async () => {
    expect((await get.elementsComputedStyle("button")).backgroundColor).to.eq(
      "rgb(255, 0, 0)"
    );
  });

  it("should get image source", async () => {
    expect(await get.elementsAttribute("image", "src")).to.eq("w3schools.jpg");
  });

  it("should get element's text", async () => {
    expect(await get.elementsText("header")).to.eq("My First Heading");
  });
});
