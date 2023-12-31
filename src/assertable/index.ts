export class Assertable<T> {
  constructor(protected readonly chainable: Cypress.Chainable<T>) {}
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
   *    then(get.numberOfElements("radio")).shouldBeGreaterThen(5);
   * ```
   */
  public shouldBeGreaterThen = (value: number) =>
    this.chainable.should("be.gt", value);
  /** Asserts that the target is a number or a n date less than or equal to the given number or date n respectively. However, it's often best to assert that the target is equal to its expected value.
   * @example
   * ```ts
   *    then(get.numberOfElements("radio")).shouldBeLessThen(5);
   * ```
   */
  public shouldBeLessThen = (value: number) =>
    this.chainable.should("be.lt", value);
  /** Asserts that the target is a number or a date greater than or equal to the given number or date n respectively. However, it's often best to assert that the target is equal to its expected value.
   * @example
   * ```ts
   *   then(get.numberOfElements("radio")).shouldBeGreaterThenOrEqual(5);
   * ```
   */
  public shouldBeGreaterThenOrEqual = (value: number) =>
    this.chainable.should("be.gte", value);
  /**
   * Asserts that the target is a number or a date less than or equal to the given number or date n respectively.
   * However, it's often best to assert that the target is equal to its expected value.
   * @example
   *    then(get.numberOfElements('list-item')).shouldBeLessThenOrEqual(5)
   */
  public shouldBeLessThenOrEqual = (value: number) =>
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
  public shouldHaveAttribute = (value: string, expectedValue: string) =>
    this.chainable.should("have.attr", value, expectedValue);
  /** Assert spy was called at least once with the provided arguments.
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
}

export const then = (chainable: Cypress.Chainable<any>) =>
  new Assertable(chainable);
