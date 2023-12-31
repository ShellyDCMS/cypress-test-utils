[@shellygo/cypress-test-utils - v2.0.17](README.md) / Modules

# @shellygo/cypress-test-utils - v2.0.17

## Table of contents

### Classes

- [CypressAngularComponentHelper](classes/CypressAngularComponentHelper.md)
- [CypressHelper](classes/CypressHelper.md)
- [CypressHelperOptions](classes/CypressHelperOptions.md)
- [CypressLitComponentHelper](classes/CypressLitComponentHelper.md)
- [CypressReactComponentHelper](classes/CypressReactComponentHelper.md)

### Functions

- [loggable](modules.md#loggable)
- [match](modules.md#match)

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
```
For more information see [Sinon.match documentation](https://sinonjs.org/releases/latest/matchers/)
