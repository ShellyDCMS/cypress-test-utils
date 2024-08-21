import "cypress-axe";
import type { Options } from "cypress-axe";
import "cypress-pipe";

/** Assertable wraps Cypress.Chainable so that your tests are as decoupled as possible from Cypress.
 * By using the Assertable class, you can use the same assertions in your tests, regardless of the testing framework you use.
 * All you need to do if you wish to replace Cypress with another testing framework and keep your tests, is to replace the implementation of the Assertable class.
 * You can also add assertions of your own, by extending Assertable class.
 * @example
 * ```ts
 * import { Assertable, CypressHelper, then } from "@shellygo/cypress-test-utils";
 *
 * class MyAssertable<T> extends Assertable<T> {
 *   private styleFromWindow = (win: Window) => {
 *     const styleItem = win.localStorage.getItem(`style`);
 *     return JSON.parse(styleItem || "");
 *   };
 *
 *   public shouldEqualToStoredStyle = () =>
 *     then(
 *       new CypressHelper().get.window().then((win) => {
 *          const style = styleFromWindow(win);
 *          then(this.chainable).shouldDeepNestedInclude(style);
 *       })
 *     );
 * }
 *
 * class Driver {
 *  public given = {
 *    // your code here
 *  };
 *  public when = {
 *    // your code here
 *  };
 *  public get = {
 *    // your code here
 *  };
 *  public then = (chainable: Cypress.Chainable<any>) => new MyAssertable(chainable);
 * }
 * ```
 */
export class Assertable<T> {
  constructor(
    /** private */
    protected readonly chainable: Cypress.Chainable<T>
  ) {}
  public should = (chainer: string, ...rest: any[]) =>
    this.chainable.should(chainer, ...rest);
  /**
   *
   * Assert that the selection is not empty.
   * Note that this overrides the built-in chai assertion.
   * If the object asserted against is not a jQuery object, the original implementation will be called.
   * @example
   * ```ts
   *   then(get.elementByTestId("selector")).shouldExist()
   * ```
   */
  public shouldExist = () => this.chainable.should("exist");
  /**
   * Assert that the selection is empty.
   * Note that this overrides the built-in chai assertion.
   * If the object asserted against is not a jQuery object, the original implementation will be called.
   * @example
   * ```ts
   *    then(get.elementByTestId("selector")).shouldNotExist()
   * ```
   */
  public shouldNotExist = () => this.chainable.should("not.exist");
  /**
   * Asserts that the target's length property is equal to the given number n..
   * @example
   * ```ts
   *    then(get.elementByTestId("selector")).shouldHaveLength(3)
   * ```
   */
  public shouldHaveLength = (length: number) =>
    this.chainable.should("have.length", length);
  /**
   * When the target is a string, `.include` asserts that the given string val is a substring of the target.
   * @example
   * ```ts
   *    then(helper.get.elementsText('selector)).shouldContain('test')
   * ```
   */
  public shouldInclude = (value: any) =>
    this.chainable.should("include", value);
  /**
   * When the target is a string, `not.include` asserts that the given string val is not a substring of the target.
   * @example
   * ```ts
   *    then(helper.get.elementsText('selector)).shouldNotContain('test')
   * ```
   */
  public shouldNotInclude = (value: any) =>
    this.chainable.should("not.include", value);
  /**
   * Asserts that text ends with value
   * @example
   * ```ts
   *   then(helper.get.elementsText('selector)).shouldEndWith('test')
   * ```
   */
  public shouldEndWith = (value: string) =>
    this.chainable
      .pipe(text => (text as string).slice(-value.length))
      .should("equal", value);

  /**
   * Asserts that text starts with value
   * @example
   * ```ts
   *   then(helper.get.elementsText('selector)).shouldStartWith('test')
   * ```
   */
  public shouldStartWith = (value: string) =>
    this.chainable
      .pipe(text => (text as string).slice(0, value.length))
      .should("equal", value);

  /**
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property` assertions that follow in the chain to use deep equality instead of strict (`===`) equality. See the `deep-eql` project page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   * @example
   * ```ts
   * then(
   *   get.fixture("user")).shouldDeepEqual({
   *     name: "Jane Doe",
   *     id: "1234"
   * })
   * ```
   */
  public shouldDeepEqual = (value: any) =>
    this.chainable.should("deep.equal", value);
  /**
   * Asserts that the target has a property with the given key `name`.
   * @example
   * ```ts
   * then(
   *   get.fixture("user")).shouldDeepNestedInclude({
   *     name: "Jane Doe",
   *     id: "1234",
   *     nested: {
   *       attr1: "something",
   *       attr2: "the other thing"
   *   }
   * })
   * ```
   */
  public shouldDeepNestedInclude = (value: any) =>
    this.chainable.should("deep.nested.include", value);
  /**
   *
   * Assert that at least one element of the selection is focused.
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldBeFocused()
   * ```
   */
  public shouldBeFocused = () => this.chainable.should("have.focus");
  /**
   *
   * Assert that no element of the selection is focused.
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldNotBeFocused()
   * ```
   */
  public shouldNotBeFocused = () => this.chainable.should("not.have.focus");
  /**
   *
   * Assert that at least one element of the selection is visible, using .is(':visible').
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldBeVisible()
   * ```
   */
  public shouldBeVisible = () => this.chainable.should("be.visible");
  /**
   *
   * Assert that at least one element of the selection is not visible, using .is(':visible').
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldNotBeVisible()
   * ```
   */
  public shouldNotBeVisible = () => this.chainable.should("not.be.visible");

  /**
   * Assert that the text of the first element of the selection partially contains the given text, using .text().
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldContainText("test")
   * ```
   */
  public shouldContainText = (text: string) =>
    this.chainable.should("contain.text", text);
  /** Assert that at least one element of the selection is selected, using .is(':selected').
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldBeSelected()
   * ```
   */
  public shouldBeSelected = () => this.chainable.should("be.selected");
  /**
   * Assert that at least one element of the selection is not selected, using .is(':selected').
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldNotBeSelected()
   * ```
   */
  public shouldNotBeSelected = () => this.chainable.should("not.be.selected");
  /** Assert that the first element of the selection has the given value, using .val().
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldHaveValue("test")
   *  ```
   */
  public shouldHaveValue = (value: string) =>
    this.chainable.should("have.value", value);
  /**
   * Assert that at least one element of the selection is disabled, using `.is(':disabled')`.
   * @example
   * ```ts
   *    then(get.elementByTestId("selector")).shouldBeDisabled()
   * ```
   */
  public shouldBeDisabled = () => this.chainable.should("be.disabled");
  /**
   * Assert that at least one element of the selection is enabled, using `.is(':enabled')`.
   * @example
   * ```ts
   *    then(get.elementByTestId("selector")).shouldBeEnabled()
   * ```
   */
  public shouldBeEnabled = () => this.chainable.should("be.enabled");
  /**
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   * @example
   * ```ts
   *    then(get.inputValue("name-input")).shouldEqual("John")
   * ```
   */
  public shouldEqual = (value: any) => this.chainable.should("eq", value);
  /**
   * Asserts that the target is a number or a date greater than the given number or date n respectively.
   * However, it's often best to assert that the target is equal to its expected value.
   * @example
   * ```ts
   *    then(get.numberOfElements("radio")).shouldBeGreaterThan(5);
   * ```
   */
  public shouldBeGreaterThan = (value: number) =>
    this.chainable.should("be.gt", value);
  /** Asserts that the target is a number or a n date less than or equal to the given number or date n respectively. However, it's often best to assert that the target is equal to its expected value.
   * @example
   * ```ts
   *    then(get.numberOfElements("radio")).shouldBeLessThen(5);
   * ```
   */
  public shouldBeLessThan = (value: number) =>
    this.chainable.should("be.lt", value);
  /** Asserts that the target is a number or a date greater than or equal to the given number or date n respectively. However, it's often best to assert that the target is equal to its expected value.
   * @example
   * ```ts
   *   then(get.numberOfElements("radio")).shouldBeGreaterThanOrEqual(5);
   * ```
   */
  public shouldBeGreaterThanOrEqual = (value: number) =>
    this.chainable.should("be.gte", value);
  /**
   * Asserts that the target is a number or a date less than or equal to the given number or date n respectively.
   * However, it's often best to assert that the target is equal to its expected value.
   * @example
   *    then(get.numberOfElements('list-item')).shouldBeLessThanOrEqual(5)
   */
  public shouldBeLessThanOrEqual = (value: number) =>
    this.chainable.should("be.lte", value);
  /** Assert that at least one element of the selection is checked, using .is(':checked').
   * @example
   * ```ts
   *    then(get.elementByTestId("checkbox-selector")).shouldBeChecked()
   * ```
   */
  public shouldBeChecked = () => this.chainable.should("be.checked");
  /** Assert that at least one element of the selection is not checked, using .is(':checked').
   * @example
   * ```ts
   *   then(get.elementByTestId("checkbox-selector")).shouldNotBeChecked()
   * ```
   */
  public shouldNotBeChecked = () => this.chainable.should("not.be.checked");

  /**
   *
   * Assert that at least one element of the selection is focused.
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldBeFocused()
   * ```
   */
  public shouldBeAccessible = (
    options: Options = {
      includedImpacts: ["critical"]
    }
  ) => this.chainable.checkA11y(undefined, options);
  /**
   * Assert that the text of the first element of the selection is equal to the given text, using .text().
   * @example
   * ```ts
   *  then(get.elementByTestId("selector")).shouldHaveText("test")
   * ```
   */
  public shouldHaveText = (value: string) =>
    this.chainable.should("have.text", value);
  /**
   * Assert that the selection has the given CSS class.
   * @example
   * ```ts
   *   then(get.elementByTestId("selector")).shouldHaveClass("test")
   * ```
   */
  public shouldHaveClass = (value: string) =>
    this.chainable.should("have.class", value);
  /**
   * Assert that the first element of the selection has the given attribute, using `.attr()`.
   * Optionally, assert a particular value as well. The return value is available for chaining.
   * @example
   * ```ts
   *  then(get.elementByTestId("selector")).shouldHaveAttribute("test")
   * ```
   */
  public shouldHaveAttribute = (attribute: string, expectedValue: string) =>
    this.chainable.should("have.attr", attribute, expectedValue);
  /**
   * Assert that the first element of the selection has the given attribute, using `.prop()`.
   * Optionally, assert a particular value as well. The return value is available for chaining.
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldHaveProperty("test")
   * ```
   */
  public shouldHaveProp = (property: string, expectedValue: string | boolean) =>
    this.chainable.should("have.prop", property, expectedValue);
  /**
   * Assert that an element has a css property with the given value.
   * @example
   * ```ts
   * then(get.elementByTestId("selector")).shouldHaveCss("color", "rgb(102, 102, 102)"")
   * ```
   */
  public shouldHaveCss = (property: string, expectedValue: string) =>
    this.chainable.should("have.css", property).and("eq", expectedValue);

  /**
   * Assert spy was called at least once with the provided arguments.
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalledWith({ id: 1 })
   * ```
   */
  public shouldHaveBeenCalledWith = (...args: any[]) =>
    this.chainable.should("have.been.calledWith", ...args);

  /** Assert spy was called with matching arguments (and possibly others).
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalledWithMatch(match({ id: 1 }))
   * ```
   *
   * @example
   * ```ts
   *  it('should call the get method of the HTTP client with a URL with query param filter = status', () => {
   *   healthService.fetchHealthResults(status);
   *   then(get.mock.httpClientService().get).shouldHaveBeenCalledWith(
   *     match(baseURL),
   *     match.hasNested(
   *       'params.updates[0]',
   *       match({ param: 'filter', value: `status eq ${status}` })
   *     )
   *   );
   * });
   * ```
   */
  public shouldHaveBeenCalledWithMatch = (...args: any[]) =>
    this.chainable.should("have.been.calledWithMatch", ...args);

  /** Asserts spy was called ate least once
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalled()
   * ```
   */
  public shouldHaveBeenCalled = () => this.chainable.should("have.been.called");

  /** Asserts spy was called exactly once
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalledOnce()
   * ```
   */
  public shouldHaveBeenCalledOnce = () =>
    this.chainable.should("have.been.calledOnce");

  /** Asserts spy was called exactly twice
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalledTwice()
   * ```
   */
  public shouldHaveBeenCalledTwice = () =>
    this.chainable.should("have.been.calledTwice");

  /** Asserts spy was called exactly thrice
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalledThrice()
   * ```
   */
  public shouldHaveBeenCalledThrice = () =>
    this.chainable.should("have.been.calledThrice");

  /** Asserts spy was called exactly n times
   * @param n number of times spy should have been called
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldHaveBeenCalledTimes(5)
   * ```
   */
  public shouldHaveBeenCalledTimes = (n: number) =>
    this.chainable.should("have.callCount", n);

  /** Asserts spy was NOT called exactly n times
   * @param n number of times spy should NOT have been called
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldNotHaveBeenCalledTimes(5)
   * ```
   */
  public shouldNotHaveBeenCalledTimes = (n: number) =>
    this.chainable.should("not.have.callCount", n);
  /**
   * Asserts spy was not called
   * @example
   * ```ts
   * then(get.spy("onSomething")).shouldNotHaveBeenCalled()
   * ```
   */
  public shouldNotHaveBeenCalled = () =>
    this.chainable.should("not.have.been.called");

  /***
   * When no arguments are provided, shouldThrow invokes the target function and asserts that no error is thrown.
   * When one argument is provided, and it's a string, shouldThrow invokes the target function and asserts that no error is thrown with a message that contains that string.
   *
   * @example
   * ```ts
   * function badFn() { console.log('Illegal salmon!') }
   * then(() => badFn()).shouldNotThrow()
   * then(() => badFn()).shouldNotThrow('salmon')
   * then(() => badFn()).shouldNotThrow(/salmon/)
   * ```
   */
  public shouldNotThrow = (value?: string | RegExp | undefined) =>
    this.chainable.should("not.throw", value);

  /***
   * When no arguments are provided, shouldThrow invokes the target function and asserts that an error is thrown.
   * When one argument is provided, and it's a string, shouldThrow invokes the target function and asserts that an error is thrown with a message that contains that string.
   *
   * @example
   * ```ts
   * function badFn() { throw new TypeError('Illegal salmon!') }
   * then(() => badFn()).shouldThrow()
   * then(() => badFn()).shouldThrow('salmon')
   * then(() => badFn()).shouldThrow(/salmon/)
   * ```
   */
  public shouldThrow = (value?: string | RegExp | undefined) =>
    this.chainable.should("throw", value);
}

/** Wraps Cypress.Chainable and returns Assertable, decoupling test code form cypress 'should' assertions.
 * This way you can add assertions of your own, by extending Assertable class.
 * @example
 * ```ts
 * then(get.elementByTestId("selector")).shouldHaveLength(3)
 * ```
 * @example
 * ```ts
 * import { Assertable, then } from "@shellygo/cypress-test-utils/assertable";
 *
 * class MyAssertable<T> extends Assertable<T> {
 *   private styleFromWindow = (win: Window) => {
 *     const styleItem = win.localStorage.getItem(`style`);
 *     const obj = JSON.parse(styleItem || "");
 *     return obj;
 *   };
 *   public shouldEqualToStoredStyle = () =>
 *     then(
 *       new CypressHelper().get.window().then((win) => {
 *          const style = styleFromWindow(win);
 *          then(this.chainable).shouldDeepNestedInclude(style);
 *       })
 *     );
 * }
 *
 * class Driver {
 *  public given = {
 *  .
 *  .
 *  };
 *  public when = {
 *  .
 *  .
 *  };
 *  public get = {
 *  .
 *  .
 *  };
 *  public then = (chainable: Cypress.Chainable<any>) => new MyAssertable(chainable);
 * }
 * ```
 */
export const then = (subject: Cypress.Chainable<any> | any) => {
  return new Assertable(
    subject && subject.chainerId ? subject : cy.wrap(subject)
  );
};
