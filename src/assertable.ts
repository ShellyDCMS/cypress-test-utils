export class Assertable<T> {
  constructor(private readonly chainable: Cypress.Chainable<T>) {}
  public should = (chainer: string, ...rest: any[]) =>
    this.chainable.should(chainer, ...rest);

  public shouldExist = () => this.chainable.should("exist");
  public shouldNotExist = () => this.chainable.should("not.exist");
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
  public shouldBeFocused = () => this.chainable.should("have.focus");
  public shouldNotBeFocused = () => this.chainable.should("not.have.focus");
  public shouldBeVisible = () => this.chainable.should("be.visible");
  public shouldContainText = (text: string) =>
    this.chainable.should("contain.text", text);
  public shouldBeSelected = () => this.chainable.should("be.selected");
  public shouldNotBeSelected = () => this.chainable.should("not.be.selected");
  public shouldHaveValue = (value: string) =>
    this.chainable.should("have.value", value);
  /**
   * Assert that at least one element of the selection is disabled, using `.is(':disabled')`.
   * @example
   * ```ts
   *    then(get.element("selector")).shouldBeDisabled()
   * ```
   */
  public shouldBeDisabled = () => this.chainable.should("be.disabled");
  /**
   * Assert that at least one element of the selection is enabled, using `.is(':enabled')`.
   * @example
   * ```ts
   *    then(get.element("selector")).shouldBeEnabled()
   * ```
   */
  public shouldBeEnabled = () => this.chainable.should("be.enabled");
  /**
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   * @example
   * ```ts
   * then(get.inputValue("name-input")).shouldEqual("John")
   * ```
   */
  public shouldEqual = (value: any) => this.chainable.should("eq", value);
  /**
   * Asserts that the target is a number or a date greater than the given number or date n respectively.
   * However, it's often best to assert that the target is equal to its expected value.
   * @example
   * ```ts
   *        then(get.numberOfElements("radio")).shouldBeGreaterThen(5);
   * ```
   */
  public shouldBeGreaterThen = (value: number) =>
    this.chainable.should("be.gt", value);
  public shouldBeLessThen = (value: number) =>
    this.chainable.should("be.gt", value);
  public shouldBeGreaterThenOrEqual = (value: number) =>
    this.chainable.should("be.gte", value);
  /**
   * Asserts that the target is a number or a date less than or equal to the given number or date n respectively.
   * However, it's often best to assert that the target is equal to its expected value.
   * @example
   *    helper.get.numberOfElements('list-item').shouldBeLessThenOrEqual(5)
   */
  public shouldBeLessThenOrEqual = (value: number) =>
    this.chainable.should("be.lte", value);
  public shouldBeChecked = () => this.chainable.should("be.checked");
  public shouldNotBeChecked = () => this.chainable.should("not.be.checked");
}
