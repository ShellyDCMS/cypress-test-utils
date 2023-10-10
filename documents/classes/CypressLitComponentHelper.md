[@shellygo/cypress-test-utils - v1.0.40](../README.md) / [Modules](../modules.md) / CypressLitComponentHelper

# Class: CypressLitComponentHelper

**`Classdes`**

CypressLitComponentHelper exposes the following public properties:

## Table of contents

### Constructors

- [constructor](CypressLitComponentHelper.md#constructor)

### Properties

- [get](CypressLitComponentHelper.md#get)
- [given](CypressLitComponentHelper.md#given)
- [when](CypressLitComponentHelper.md#when)

## Constructors

### constructor

• **new CypressLitComponentHelper**()

## Properties

### get

• **get**: `Object` = `{}`

___

### given

• **given**: `Object` = `{}`

___

### when

• **when**: `Object`

enables mounting of a li component

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mount` | <T\>(`element`: `T`, `template`: `TemplateResult`<`ResultType`\>) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `unmount` | <T\>(`element`: `T`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |

**mount**: <T\>(`element`: `T`, `template`: `TemplateResult`<`ResultType`\>) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Mount a LitElement web component

**`Example`**

```ts
litComponentHelper.when.mount<SpinnerElement>(
   new SpinnerElement(),
   html`<edf-spinner size="${this.props.size}" type="${this.props.type}" label="${this.props.label}"></edf-spinner>`
 );
 ```

-----

**unmount**: <T\>(`element`: `T`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

\-

-----
