[@shellygo/cypress-test-utils - v2.1.0](README.md) / Modules

# @shellygo/cypress-test-utils - v2.1.0

## Table of contents

### Classes

- [Assertable](classes/Assertable.md)
- [CypressAngularComponentHelper](classes/CypressAngularComponentHelper.md)
- [CypressHelper](classes/CypressHelper.md)
- [CypressHelperOptions](classes/CypressHelperOptions.md)
- [CypressLitComponentHelper](classes/CypressLitComponentHelper.md)
- [CypressReactComponentHelper](classes/CypressReactComponentHelper.md)

### Functions

- [loggable](modules.md#loggable)
- [match](modules.md#match)
- [then](modules.md#then)

## Functions

### loggable

▸ **loggable**<`T`\>(`name`, `fn`): `T`

Decorate a function with meta-data to be used with `cy.pipe`. Adds
a display name and arguments of a function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Function` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the function to be displayed in the Cypress Command Log. The parameter is only required if the function passed to `cy.pipe` is anonymous |
| `fn` | `T` | Function to decorate |

#### Returns

`T`

**`Example`**

```ts
const getProp = loggable('getProp', prop => obj => obj[prop])
```

▸ **loggable**<`T`\>(`fn`): `T`

Decorate a function with meta-data to be used with `cy.pipe`. Adds
arguments of a function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Function` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `T` | Function to decorate |

#### Returns

`T`

**`Example`**

```ts
const getProp = loggable(prop => function getProp(obj) { return obj[prop] })
```

___

### match

▸ **match**(`value`): `SinonMatcher`

Sinon matcher for stubs/spy comparison

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`SinonMatcher`

**`Example`**

// partial match of spy function params called with
```ts
  let { given, when, get } = new CypressHelper();
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
```
For more information see [Sinon.match documentation](https://sinonjs.org/releases/latest/matchers/)

▸ **match**(`value`): `SinonMatcher`

Sinon matcher for stubs/spy comparison

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`SinonMatcher`

**`Example`**

// partial match of spy function params called with
```ts
  let { given, when, get } = new CypressHelper();
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
```
For more information see [Sinon.match documentation](https://sinonjs.org/releases/latest/matchers/)

▸ **match**(`expr`): `SinonMatcher`

Sinon matcher for stubs/spy comparison

#### Parameters

| Name | Type |
| :------ | :------ |
| `expr` | `RegExp` |

#### Returns

`SinonMatcher`

**`Example`**

// partial match of spy function params called with
```ts
  let { given, when, get } = new CypressHelper();
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
```
For more information see [Sinon.match documentation](https://sinonjs.org/releases/latest/matchers/)

▸ **match**(`callback`, `message?`): `SinonMatcher`

Sinon matcher for stubs/spy comparison

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`value`: `any`) => `boolean` |
| `message?` | `string` |

#### Returns

`SinonMatcher`

**`Example`**

// partial match of spy function params called with
```ts
  let { given, when, get } = new CypressHelper();
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
```
For more information see [Sinon.match documentation](https://sinonjs.org/releases/latest/matchers/)

▸ **match**(`obj`): `SinonMatcher`

Sinon matcher for stubs/spy comparison

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `object` |

#### Returns

`SinonMatcher`

**`Example`**

// partial match of spy function params called with
```ts
  let { given, when, get } = new CypressHelper();
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
```
For more information see [Sinon.match documentation](https://sinonjs.org/releases/latest/matchers/)

___

### then

▸ **then**(`subject`): [`Assertable`](classes/Assertable.md)<`unknown`\>

Wraps Cypress.Chainable and returns Assertable, decoupling test code form cypress 'should' assertions.
This way you can add assertions of your own, by extending Assertable class.

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `any` |

#### Returns

[`Assertable`](classes/Assertable.md)<`unknown`\>

**`Example`**

```ts
then(get.elementByTestId("selector")).shouldHaveLength(3)
```

**`Example`**

```ts
import { Assertable, then } from "@shellygo/cypress-test-utils/assertable";

class MyAssertable<T> extends Assertable<T> {
  private styleFromWindow = (win: Window) => {
    const styleItem = win.localStorage.getItem(`style`);
    const obj = JSON.parse(styleItem || "");
    return obj;
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
