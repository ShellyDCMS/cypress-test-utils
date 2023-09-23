/*
 * Copyright (c) 2022 Dell Inc. or its subsidiaries. All Rights Reserved.
 */
/// <reference types="cypress" />
import chaiSubset from "chai-subset";
import "cypress-real-events";
import "cypress-wait-if-happens";
import "cypress-wait-until";

import { StringMatcher } from "cypress/types/net-stubbing";
/**
 * @class CypressHelper was designed to help you develop cypress tests faster.
 * @classdes CypressHelper exposes the following public properties:
 * @property given - The given property will hold methods which will allow us to set pre-conditions before something takes place.
 * This is a classic place to have methods which will set the inputs which are going to be passed down to our component.
 * @property when - The when property will hold methods of “events” which will take place like render, click, hover, etc.
 * @property get - The get property will hold methods which will give our tests access to the “output” of the component in a “black box” fashion
 */
export class CypressHelper {
  /**
   *
   * @param [defaultDataAttribute = "data-cy"]
   */
  constructor(private readonly defaultDataAttribute: string = "data-cy") {}

  beforeAndAfter = () => {
    before(() => {
      chai.use(chaiSubset);
    });
    beforeEach(() => {
      cy.on("uncaught:exception", (err, runnable) => {
        console.log(err);
        return false;
      });
    });
  };

  /**
   * @property given - The given property will hold methods which will allow us to set pre-conditions before something takes place.
   * This is a classic place to have methods which will set the inputs which are going to be passed down to our component.
   */
  public given = {
    /**
     * Use interceptAndMockResponse to stub and intercept HTTP requests and responses.
     * @example
     * // adds token to response header
     * ```ts
     * helper.given.interceptAndMockResponse({
     *   url: '** /sysmgmt/2015/bmc/session',
     *   response: {
     *     headers:{
     *        'XSRF-Token': 'token',
     *     },
     *   },
     *   alias: 'login'
     * })
     * ```
     * @example
     * // mocks response to login request
     * ```ts
     * helper.given.interceptAndMockResponse({
     *   method: "POST",
     *   url: "** /login",
     *   alias: "login",
     *   response : {
     *     token: 'token'
     *   }
     * })
     * ```
     *
     * @example
     * // mocks network error
     * ```ts
     * helper.given.interceptAndMockResponse({
     *   method: "POST",
     *   url: "** /avamars",
     *   alias: "avamar",
     *   response : {
     *     forceNetworkError: true
     *   }
     * })
     * ```
     * @example
     * // mocks network error
     * ```ts
     * helper.given.interceptAndMockResponse({
     *   method: "POST",
     *   url: "** /image.png",
     *   alias: "image",
     *   response: { headers: 404 }
     * })
     * ```
     */
    interceptAndMockResponse: (options: {
      url: StringMatcher;
      response: Object;
      alias?: string;
      method?: string;
    }) => {
      const { url, response, alias, method } = options;
      cy.intercept({ url, method: method || "GET" }, response).as(
        alias || "call"
      );
    },
    /**
     * Replace a function, record its usage and control its behavior.
     * @returns {Cypress.Agent<sinon.SinonStub<any[], any>>}

     */
    stub: (): Cypress.Agent<sinon.SinonStub<any[], any>> => cy.stub(),
    /**
     * Returns a new spy function, and creates an alias for the newly created spy
     * @param name - spy name
     * @returns {Cypress.Agent<sinon.SinonSpy<any[], any>>}
     */
    spy: (name: string): Cypress.Agent<sinon.SinonSpy<any[], any>> =>
      cy.spy().as(`${name}Spy`),
    /**
     * Spy on a method and create an alias for the spy
     * @param obj - object containing function to spy on
     * @param method function to spy on
     * @returns {Cypress.Agent<sinon.SinonSpy<any[], any>>}
     */
    spyOnObject: <T>(
      obj: T,
      method: keyof T
    ): Cypress.Agent<sinon.SinonSpy<any[], any>> =>
      cy.spy(obj, method).as(`${String(method)}Spy`)
  };

  /**
   * @property when - The when property will hold methods of “events” which will take place like render, click, hover, etc.
   */
  public when = {
    /**
     * Visit a given url
     */
    visit: (url: string) => {
      cy.visit(url);
    },
    /**
     * Wait for a number of milliseconds.
     */
    wait: (ms: number) => cy.wait(ms),
    /**
     * Wait for a specific request to complete.
     *  @param alias
     */
    waitForResponse: (alias: string) => cy.wait(`@${alias}`),
    /**
     * Wait for multiples requests to complete.
     * @param alias
     */
    waitForResponses: (alias: string, responses: number) =>
      cy.wait(Array(responses).fill(`@${alias}`)),
    /**
     * Wait for a last request to complete.
     */
    waitForLastCall: (alias: string, timeout: number = 1000) =>
      cy.waitIfHappens({
        alias: `@${alias}`,
        timeout,
        lastCall: true
      }),
    /**
     * @example
     * ```ts
     * helper.when.waitUntil(() =>
     *   helper.get.elementByTestId(selector, index)
     * );
     * ```
     */
    waitUntil: <ReturnType = any>(
      checkFunction: () =>
        | ReturnType
        | Cypress.Chainable
        | PromiseLike<ReturnType>,
      options?: WaitUntilOptions
    ) => cy.waitUntil(checkFunction, options),
    /**
     * Fires native system click event.
     *
     * @example
     * ```ts
     * <button data-cy="move-right">Move</button>
     * helper.when.realClick('move-right')
     * ```
     */
    realClick: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).realClick(),
    /**
     * Click a DOM element.
     *
     * @example
     * ```ts
     * <button data-cy="move-right">Move</button>
     * helper.when.click('move-right')
     * ```
     */
    click: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).click(),
    /**
     *
     * Double-click a DOM element.
     */
    dblclick: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).dblclick(),
    /**
     * Right click a DOM element.
     * @param selector
     * @param index
     */
    rightclick: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).rightclick(),
    /**
     * overrides native global functions related to time
     * allowing them to be controlled synchronously via helper.when.tick()
     * This includes controlling:
     *    setTimeout
     *    clearTimeout
     *    setInterval
     *    clearInterval
     *    Date Objects
     * The clock starts at the unix epoch (timestamp of 0).
     * This means that when you instantiate new Date in your application, it will have a time of January 1st, 1970.
     */
    clock: () => cy.clock(),
    /**
     * Fires native hover event. Yes, it can test :hover preprocessor.
     * @example
     * ```ts
     * helper.when.hover('consent-terms-agree')
     * ```
     */
    hover: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).realHover(),
    /**
     * Move time after overriding a native time function with helper.when.clock().
     * helper.when.clock() must be called before helper.when.tick()
     * @example
     * ```ts
     * helper.when.clock();
     * helper.when.click('login-button');
     * helper.when.tick(2000);
     * ```
     */
    tick: (ms: number) => cy.tick(ms),
    /**
     * Focus on a DOM element.
     */
    focus: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).focus(),
    /**
     * Blur a focused element.
     * This element must currently be in focus.
     * If you want to ensure an element is focused before blurring,
     * try using helper.when.focus() before helper.when.blur().
     */
    blur: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).blur(),
    /**
     * Clear the value of an input or textarea
     */
    clear: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).clear(),
    /**
     * Type into a DOM element.
     */
    type: (selector: string, keys: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).focus().type(keys),
    /**
     * Runs a sequence of native press event (via cy.press) Type event is global. Make sure that it is not attached to any field.
     */
    realType: (selector: string, keys: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).realType(keys),
    /**
     * Scroll to the bottom.
     */
    scrollToBottom: () => cy.scrollTo("bottom", { ensureScrollable: false }),
    /**
     * Check checkbox(es) or radio(s).
     * This element must be an html input element with type checkbox or radio.
     */
    check: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).check({ force: true }),
    /**
     * Uncheck checkbox(es).
     */
    uncheck: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).uncheck({ force: true }),
    /**
     *
     * Toggle radio(s) by selector
     * This element must be an html input element with type radio.
     */
    toggleRadioBySelector: (selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).check({ force: true }),
    /**
     *
     * Check radio(s).
     * This element must be an html input element with type radio.
     */
    toggle: (index: number) =>
      this.get.nthBySelector("radio", index, "type").check({ force: true }),
    /**
     * Select an option with specific text, value, or index within a select html element.
     */
    selectOption: (selector: string, label: string, index: number = 0) =>
      this.get.bySelector(selector).eq(index).select(label),
    /**
     * Drag an element and drop it in target element
     * @example
     * ```ts
     * helper.when.dragAndDrop(
     *   helper.get.elementByTestId('selected-item', 2),
     *   helper.get.elementByTestId('available-items')
     * )
     * ```
     * @param element - element to be dragged
     * @param targetElement - target of drag operation
     */
    dragAndDrop: (
      element: Cypress.Chainable<JQuery<HTMLElement>>,
      targetElement: Cypress.Chainable<JQuery<HTMLElement>>
    ) => {
      element
        .realMouseDown({ button: "left", position: "center" })
        .realMouseMove(0, 10, { position: "center" });
      targetElement.realMouseMove(0, 0, { position: "center" }).realMouseUp();
    },
    /**
     * Scopes all subsequent cy commands to within this element
     * @example
     * helper.when.within(() => expect(get.emcLogo()).to.exist, 'company-logo')
     */
    within: (fn: () => void, selector: string, index: number = 0) =>
      this.get.elementByTestId(selector, index).within(fn)
  };

  /**
   * @property get - The get property will hold methods which will give our tests access to the “output” of the component in a “black box” fashion
   */
  public get = {
    /**
     * Get one or more DOM elements by selector.
     * @example
     * Get an element with shape="filter-grid"
     * ```ts
     * <clr-icon shape="filter-grid"></clr-icon>
     * helper.get.bySelector("filter-grid", "shape")
     * ```
     * @param selector
     * @param [attribute = defaultDataAttribute (default is "data-cy")]
     */
    bySelector: (
      selector: string,
      attribute: string = this.defaultDataAttribute
    ) => cy.get(`[${attribute}="${selector}"]`),
    /**
     * Get A DOM element at a specific index from elements.
     * @example
     * // Get the 3rd checkbox
     * ```ts
     * helper.get.nthBySelector("checkbox", 3, "type")
     * ```
     * @param selector
     * @param [index=0]
     * @param [attribute= defaultDataAttribute (default is "data-cy")]
     */
    nthBySelector: (
      selector: string,
      index: number,
      attribute: string = this.defaultDataAttribute
    ) => this.get.bySelector(selector, attribute).eq(index),
    /**
     * Returns specific environment variable or undefined
     * @example
     * // Keeping password in cypress.config file
     * ```ts
     * e2e: {
     *  env: {
     *    password: "Changeme@1",
     *  }
     * }
     * ```
     * // using password during test
     * ```ts
     * helper.get.env("password");
     * ```
     */
    env: (key: string) => Cypress.env(key),
    /**
     * Get the current URL of the page that is currently active.
     * @returns {Cypress.Chainable<string>}
     */
    currentLocation: (): Cypress.Chainable<string> => cy.url(),

    /**
     * Returns element's style attribute
     *
     * @param selector : string
     * @param attribute : string
     * @param [index = 0]
     * @returns {Cypress.Chainable<string>}
     */
    elementsStyleAttribute: (
      selector: string,
      attribute: string,
      index: number = 0
    ) => this.get.elementByTestId(selector, index).invoke("css", attribute),

    /**
     * Returns element's computed style, including pseudo elements
     *
     * @param selector : string
     * @param [index = 0]
     * @param [pseudoElement]
     * @returns {Cypress.Chainable<CSSStyleDeclaration>}
     */
    elementsComputedStyle: (
      selector: string,
      index: number = 0,
      pseudoElement?: string
    ): Cypress.Chainable<CSSStyleDeclaration> =>
      this.get
        .elementByTestId(selector, index)
        .then($element =>
          window.getComputedStyle($element.get(0), pseudoElement)
        ),

    /**
     * @example
     * ```ts
     * expect(helper.get.elementsText("parent-job-name", 3).should("include", "Job 3 Name"))
     * ```
     * @param selector
     * @param [index = 0]
     * @returns {Cypress.Chainable<string>}
     */
    elementsText: (
      selector: string,
      index: number = 0
    ): Cypress.Chainable<string> =>
      this.get.nthBySelector(selector, index).invoke("text"),
    /**
     * Get value of input element
     * @example
     * ```ts
     * expect(helper.get.inputValue('credentials-password').should("eq","initial password"));
     * ```
     * @param selector
     * @param [index = 0]
     * @returns { Cypress.Chainable<string | number | string[]> }
     */
    inputValue: (
      selector: string,
      index: number = 0
    ): Cypress.Chainable<string | number | string[]> =>
      this.get.nthBySelector(selector, index).invoke("val"),
    /**
     * Get A DOM element at a specific index from elements.
     * @example
     * ```ts
     * helper.when.dragAndDrop(
     *   helper.get.elementByTestId('selected-item', 2),
     *   helper.get.elementByTestId('available-items')
     * ```
     * @param selector
     * @param [index = 0]
     */
    elementByTestId: (selector: string, index: number = 0) =>
      this.get.nthBySelector(selector, index),
    /**
     * Get the DOM element containing the text.
     * DOM elements can contain more than the desired text and still match.
     * Additionally, Cypress prefers some DOM elements over the deepest element found.
     * @example
     * ```ts
     * expect(helper.get.elementByText("Avamar")).to.exist;
     * ```
     * @param content
     * @param [index = 0]
     */
    elementByText: (content: string | RegExp, index: number = 0) =>
      cy.contains(content).eq(index),
    /**
     * Get number of elements with a specific selector
     * @example
     * ```ts
     *  expect(helper.get.numberOfElements("migrated-vcenter").should("eq",2));
     * ```
     * @param selector
     * @returns {Cypress.Chainable<number>}
     */
    numberOfElements: (selector: string): Cypress.Chainable<number> =>
      this.get.bySelector(selector).its("length"),
    /**
     * @example
     * ```ts
     * expect(helper.get.elementsAttribute('avatar-picture', 'style').should("include", 'background-image: url("assets/avatar/def-user-male.png")'))
     * ```
     * @param selector
     * @param attribute
     * @param [index = 0]
     * @returns {Cypress.Chainable<string | undefined>}
     */
    elementsAttribute: (
      selector: string,
      attribute: string,
      index = 0
    ): Cypress.Chainable<string | undefined> =>
      this.get.elementByTestId(selector, index).invoke("attr", attribute),
    /**
     * Get intercepted request's body
     * If a JSON Content-Type was used and the body was valid JSON, this will be an object.
     * If the body was binary content, this will be a buffer.
     * @param alias
     * @returns {Cypress.Chainable<any>}
     */
    requestBody: (alias: string): Cypress.Chainable<any> =>
      this.when.waitForResponse(alias).then(xhr => xhr.request.body),
    /**
     * Get intercepted request's url
     * @param alias
     * @returns {Cypress.Chainable<string>}
     */
    requestUrl: (alias: string): Cypress.Chainable<string> =>
      this.when.waitForResponse(alias).then(xhr => xhr.request.url),
    /**
     * Get intercepted request's header
     * @param alias
     * @returns { Cypress.Chainable<{ [key: string]: string | string[]}>}
     */
    requestHeader: (
      alias: string
    ): Cypress.Chainable<{ [key: string]: string | string[] }> =>
      this.when.waitForResponse(alias).then(xhr => xhr.request.headers),

    /**
     * Get intercepted request's query param
     * @param alias
     * @param queryParam
     * @returns { Cypress.Chainable<{[k: string]: string;}>}
     */
    requestQueryParams: (
      alias: string
    ): Cypress.Chainable<{ [k: string]: string }> =>
      this.when
        .waitForResponse(alias)
        .then(xhr =>
          Object.fromEntries(
            new URLSearchParams(new URL(xhr.request.url).search)
          )
        ),
    /**
     * Get spy by alias
     * @param name
     * @returns
     */
    spy: (name: string) => cy.get(`@${name}Spy`),
    /**
     * Get spy by function name alias
     * @param func
     * @returns
     */
    spyFromFunction: (func: Function) => cy.get(`@${func.name}`),
    /**
     * Get stub by alias
     * @param name
     * @returns
     */
    stub: (name: string) => cy.get(`@${name}`)
  };
}