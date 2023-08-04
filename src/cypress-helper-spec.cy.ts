import { CypressHelper } from "./cypress-helper";

describe("cypress helper tests", () => {
  const { beforeAndAfter, given, when, get } = new CypressHelper();
  beforeAndAfter();

  it("should intercept request and mock response", async () => {
    given.interceptAndMockResponse({url: "**/shellygo/whatever", response: {shelly: "go"}})
    expect(await(await fetch("https:/shellygo/whatever")).json()).to.include({shelly: "go"})
  })
})