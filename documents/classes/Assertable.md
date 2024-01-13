[@shellygo/cypress-test-utils - v2.0.28](../README.md) / [Modules](../modules.md) / Assertable

# Class: Assertable<T\>

Assertable wraps Cypress.Chainable so that your tests are as decoupled as possible from Cypress.
By using the Assertable class, you can use the same assertions in your tests, regardless of the testing framework you use.
All you need to do if you wish to replace Cypress with another testing framework and keep your tests, is to replace the implementation of the Assertable class.
You can also add assertions of your own, by extending Assertable class.

**`Example`**

```ts
import { Assertable, then } from "@shellygo/cypress-test-utils/assertable";
import { CypressHelper } from "@shellygo/cypress-test-utils";

class MyAssertable<T> extends Assertable<T> {
  private styleFromWindow = (win: Window) => {
    const styleItem = win.localStorage.getItem(`style`);
    return JSON.parse(styleItem || "");
  };

  public shouldEqualToStoredStyle = () =>
    then(
      new CypressHelper().get.window().then((win) => {
         const style = styleFromWindow(win);
         then(this.chainable).shouldDeepNestedInclude(style);
      })
    );
}

class Driver {
 public given = {
 .
 .
 };
 public when = {
 .
 .
 };
 public get = {
 .
 .
 };
 public then = (chainable: Cypress.Chainable<any>) => new MyAssertable(chainable);
}
```

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](Assertable.md#constructor)

### Properties

- [chainable](Assertable.md#chainable)

### Methods

- [should](Assertable.md#should)
- [shouldBeChecked](Assertable.md#shouldbechecked)
- [shouldBeDisabled](Assertable.md#shouldbedisabled)
- [shouldBeEnabled](Assertable.md#shouldbeenabled)
- [shouldBeFocused](Assertable.md#shouldbefocused)
- [shouldBeGreaterThen](Assertable.md#shouldbegreaterthen)
- [shouldBeGreaterThenOrEqual](Assertable.md#shouldbegreaterthenorequal)
- [shouldBeLessThen](Assertable.md#shouldbelessthen)
- [shouldBeLessThenOrEqual](Assertable.md#shouldbelessthenorequal)
- [shouldBeSelected](Assertable.md#shouldbeselected)
- [shouldBeVisible](Assertable.md#shouldbevisible)
- [shouldContainText](Assertable.md#shouldcontaintext)
- [shouldDeepEqual](Assertable.md#shoulddeepequal)
- [shouldDeepNestedInclude](Assertable.md#shoulddeepnestedinclude)
- [shouldEndWith](Assertable.md#shouldendwith)
- [shouldEqual](Assertable.md#shouldequal)
- [shouldExist](Assertable.md#shouldexist)
- [shouldHaveAttribute](Assertable.md#shouldhaveattribute)
- [shouldHaveBeenCalled](Assertable.md#shouldhavebeencalled)
- [shouldHaveBeenCalledOnce](Assertable.md#shouldhavebeencalledonce)
- [shouldHaveBeenCalledThrice](Assertable.md#shouldhavebeencalledthrice)
- [shouldHaveBeenCalledTimes](Assertable.md#shouldhavebeencalledtimes)
- [shouldHaveBeenCalledTwice](Assertable.md#shouldhavebeencalledtwice)
- [shouldHaveBeenCalledWith](Assertable.md#shouldhavebeencalledwith)
- [shouldHaveBeenCalledWithMatch](Assertable.md#shouldhavebeencalledwithmatch)
- [shouldHaveClass](Assertable.md#shouldhaveclass)
- [shouldHaveCss](Assertable.md#shouldhavecss)
- [shouldHaveLength](Assertable.md#shouldhavelength)
- [shouldHaveText](Assertable.md#shouldhavetext)
- [shouldHaveValue](Assertable.md#shouldhavevalue)
- [shouldInclude](Assertable.md#shouldinclude)
- [shouldNotBeChecked](Assertable.md#shouldnotbechecked)
- [shouldNotBeFocused](Assertable.md#shouldnotbefocused)
- [shouldNotBeSelected](Assertable.md#shouldnotbeselected)
- [shouldNotBeVisible](Assertable.md#shouldnotbevisible)
- [shouldNotExist](Assertable.md#shouldnotexist)
- [shouldNotHaveBeenCalled](Assertable.md#shouldnothavebeencalled)
- [shouldNotHaveBeenCalledTimes](Assertable.md#shouldnothavebeencalledtimes)
- [shouldStartWith](Assertable.md#shouldstartwith)

## Constructors

### constructor

• **new Assertable**<`T`\>(`chainable`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainable` | `Chainable`<`T`\> |

## Properties

### chainable

• `Protected` `Readonly` **chainable**: `Chainable`<`T`\>

## Methods

### should

▸ **should**(`chainer`, `...rest`): `Chainable`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainer` | `string` |
| `...rest` | `any`[] |

#### Returns

`Chainable`<`T`\>

___

### shouldBeChecked

▸ **shouldBeChecked**(): `Chainable`<`T`\>

Assert that at least one element of the selection is checked, using .is(':checked').

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.elementByTestId("checkbox-selector")).shouldBeChecked()
```

___

### shouldBeDisabled

▸ **shouldBeDisabled**(): `Chainable`<`T`\>

Assert that at least one element of the selection is disabled, using `.is(':disabled')`.

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.elementByTestId("selector")).shouldBeDisabled()
```

___

### shouldBeEnabled

▸ **shouldBeEnabled**(): `Chainable`<`T`\>

Assert that at least one element of the selection is enabled, using `.is(':enabled')`.

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.elementByTestId("selector")).shouldBeEnabled()
```

___

### shouldBeFocused

▸ **shouldBeFocused**(): `Chainable`<`T`\>

Assert that at least one element of the selection is focused.

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldBeFocused()
```

___

### shouldBeGreaterThen

▸ **shouldBeGreaterThen**(`value`): `Chainable`<`T`\>

Asserts that the target is a number or a date greater than the given number or date n respectively.
However, it's often best to assert that the target is equal to its expected value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.numberOfElements("radio")).shouldBeGreaterThen(5);
```

___

### shouldBeGreaterThenOrEqual

▸ **shouldBeGreaterThenOrEqual**(`value`): `Chainable`<`T`\>

Asserts that the target is a number or a date greater than or equal to the given number or date n respectively. However, it's often best to assert that the target is equal to its expected value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
  then(get.numberOfElements("radio")).shouldBeGreaterThenOrEqual(5);
```

___

### shouldBeLessThen

▸ **shouldBeLessThen**(`value`): `Chainable`<`T`\>

Asserts that the target is a number or a n date less than or equal to the given number or date n respectively. However, it's often best to assert that the target is equal to its expected value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.numberOfElements("radio")).shouldBeLessThen(5);
```

___

### shouldBeLessThenOrEqual

▸ **shouldBeLessThenOrEqual**(`value`): `Chainable`<`T`\>

Asserts that the target is a number or a date less than or equal to the given number or date n respectively.
However, it's often best to assert that the target is equal to its expected value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.numberOfElements('list-item')).shouldBeLessThenOrEqual(5)
```

___

### shouldBeSelected

▸ **shouldBeSelected**(): `Chainable`<`T`\>

Assert that at least one element of the selection is selected, using .is(':selected').

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldBeSelected()
```

___

### shouldBeVisible

▸ **shouldBeVisible**(): `Chainable`<`T`\>

Assert that at least one element of the selection is visible, using .is(':visible').

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldBeVisible()
```

___

### shouldContainText

▸ **shouldContainText**(`text`): `Chainable`<`T`\>

Assert that the text of the first element of the selection partially contains the given text, using .text().

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldContainText("test")
```

___

### shouldDeepEqual

▸ **shouldDeepEqual**(`value`): `Chainable`<`T`\>

Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property` assertions that follow in the chain to use deep equality instead of strict (`===`) equality. See the `deep-eql` project page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(
  get.fixture("user")).shouldDeepEqual({
    name: "Jane Doe",
    id: "1234"
})
```

___

### shouldDeepNestedInclude

▸ **shouldDeepNestedInclude**(`value`): `Chainable`<`T`\>

Asserts that the target has a property with the given key `name`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(
  get.fixture("user")).shouldDeepNestedInclude({
    name: "Jane Doe",
    id: "1234",
    nested: {
      attr1: "something",
      attr2: "the other thing"
  }
})
```

___

### shouldEndWith

▸ **shouldEndWith**(`value`): `Chainable`<`string`\>

Asserts that text ends with value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Chainable`<`string`\>

**`Example`**

```ts
  then(helper.get.elementsText('selector)).shouldEndWith('test')
```

___

### shouldEqual

▸ **shouldEqual**(`value`): `Chainable`<`T`\>

Asserts that the target is strictly (`===`) equal to the given `val`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.inputValue("name-input")).shouldEqual("John")
```

___

### shouldExist

▸ **shouldExist**(): `Chainable`<`T`\>

Assert that the selection is not empty.
Note that this overrides the built-in chai assertion.
If the object asserted against is not a jQuery object, the original implementation will be called.

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
  then(get.elementByTestId("selector")).shouldExist()
```

___

### shouldHaveAttribute

▸ **shouldHaveAttribute**(`attribute`, `expectedValue`): `Chainable`<`T`\>

Assert that the first element of the selection has the given attribute, using `.attr()`.
Optionally, assert a particular value as well. The return value is available for chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `expectedValue` | `string` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
 then(get.elementByTestId("selector")).shouldHaveAttribute("test")
```

___

### shouldHaveBeenCalled

▸ **shouldHaveBeenCalled**(): `Chainable`<`T`\>

Asserts spy was called ate least once

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalled()
```

___

### shouldHaveBeenCalledOnce

▸ **shouldHaveBeenCalledOnce**(): `Chainable`<`T`\>

Asserts spy was called exactly once

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalledOnce()
```

___

### shouldHaveBeenCalledThrice

▸ **shouldHaveBeenCalledThrice**(): `Chainable`<`T`\>

Asserts spy was called exactly thrice

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalledThrice()
```

___

### shouldHaveBeenCalledTimes

▸ **shouldHaveBeenCalledTimes**(`n`): `Chainable`<`T`\>

Asserts spy was called exactly n times

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | number of times spy should have been called |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalledTimes(5)
```

___

### shouldHaveBeenCalledTwice

▸ **shouldHaveBeenCalledTwice**(): `Chainable`<`T`\>

Asserts spy was called exactly twice

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalledTwice()
```

___

### shouldHaveBeenCalledWith

▸ **shouldHaveBeenCalledWith**(`...args`): `Chainable`<`T`\>

Assert spy was called at least once with the provided arguments.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalledWith({ id: 1 })
```

___

### shouldHaveBeenCalledWithMatch

▸ **shouldHaveBeenCalledWithMatch**(`...args`): `Chainable`<`T`\>

Assert spy was called with matching arguments (and possibly others).

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldHaveBeenCalledWithMatch(match({ id: 1 }))
```

___

### shouldHaveClass

▸ **shouldHaveClass**(`value`): `Chainable`<`T`\>

Assert that the selection has the given CSS class.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
  then(get.elementByTestId("selector")).shouldHaveClass("test")
```

___

### shouldHaveCss

▸ **shouldHaveCss**(`property`, `expectedValue`): `Chainable`<`T`\>

Assert that an element has a css property with the given value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` |
| `expectedValue` | `string` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldHaveCss("color", "rgb(102, 102, 102)"")
```

___

### shouldHaveLength

▸ **shouldHaveLength**(`length`): `Chainable`<`T`\>

Asserts that the target's length property is equal to the given number n..

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.elementByTestId("selector")).shouldHaveLength(3)
```

___

### shouldHaveText

▸ **shouldHaveText**(`value`): `Chainable`<`T`\>

Assert that the text of the first element of the selection is equal to the given text, using .text().

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
 then(get.elementByTestId("selector")).shouldHaveText("test")
```

___

### shouldHaveValue

▸ **shouldHaveValue**(`value`): `Chainable`<`T`\>

Assert that the first element of the selection has the given value, using .val().

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldHaveValue("test")
 ```

___

### shouldInclude

▸ **shouldInclude**(`value`): `Chainable`<`T`\>

When the target is a string, `.include` asserts that the given string val is a substring of the target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(helper.get.elementsText('selector)).shouldContain('test')
```

___

### shouldNotBeChecked

▸ **shouldNotBeChecked**(): `Chainable`<`T`\>

Assert that at least one element of the selection is not checked, using .is(':checked').

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
  then(get.elementByTestId("checkbox-selector")).shouldNotBeChecked()
```

___

### shouldNotBeFocused

▸ **shouldNotBeFocused**(): `Chainable`<`T`\>

Assert that no element of the selection is focused.

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldNotBeFocused()
```

___

### shouldNotBeSelected

▸ **shouldNotBeSelected**(): `Chainable`<`T`\>

Assert that at least one element of the selection is not selected, using .is(':selected').

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldNotBeSelected()
```

___

### shouldNotBeVisible

▸ **shouldNotBeVisible**(): `Chainable`<`T`\>

Assert that at least one element of the selection is not visible, using .is(':visible').

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldNotBeVisible()
```

___

### shouldNotExist

▸ **shouldNotExist**(): `Chainable`<`T`\>

Assert that the selection is empty.
Note that this overrides the built-in chai assertion.
If the object asserted against is not a jQuery object, the original implementation will be called.

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
   then(get.elementByTestId("selector")).shouldNotExist()
```

___

### shouldNotHaveBeenCalled

▸ **shouldNotHaveBeenCalled**(): `Chainable`<`T`\>

Asserts spy was not called

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldNotHaveBeenCalled()
```

___

### shouldNotHaveBeenCalledTimes

▸ **shouldNotHaveBeenCalledTimes**(`n`): `Chainable`<`T`\>

Asserts spy was NOT called exactly n times

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | number of times spy should NOT have been called |

#### Returns

`Chainable`<`T`\>

**`Example`**

```ts
then(get.spy("onSomething")).shouldNotHaveBeenCalledTimes(5)
```

___

### shouldStartWith

▸ **shouldStartWith**(`value`): `Chainable`<`string`\>

Asserts that text starts with value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Chainable`<`string`\>

**`Example`**

```ts
  then(helper.get.elementsText('selector)).shouldStartWith('test')
```
