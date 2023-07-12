[@shellygo/cypress-test-utils - v1.0.15](../README.md) / [Modules](../modules.md) / [react](../modules/react.md) / CypressReactComponentHelper

# Class: CypressReactComponentHelper

[react](../modules/react.md).CypressReactComponentHelper

**`Classdes`**

CypressReactComponentHelper exposes the following public properties:

## Table of contents

### Constructors

- [constructor](react.CypressReactComponentHelper.md#constructor)

### Properties

- [component](react.CypressReactComponentHelper.md#component)
- [get](react.CypressReactComponentHelper.md#get)
- [when](react.CypressReactComponentHelper.md#when)

## Constructors

### constructor

• **new CypressReactComponentHelper**()

## Properties

### component

• `Private` **component**: `ReactNode`

#### Defined in

[react/cypress-react-component-helper.ts:18](https://github.com/ShellyDCMS/cypress-test-utils/blob/a0c3d13/src/react/cypress-react-component-helper.ts#L18)

___

### get

• **get**: `Object`

enables getting the mounted component

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component` | () => `ReactNode` |

**component**: () => `ReactNode`

Get mounted component

-----

#### Defined in

[react/cypress-react-component-helper.ts:46](https://github.com/ShellyDCMS/cypress-test-utils/blob/a0c3d13/src/react/cypress-react-component-helper.ts#L46)

___

### when

• **when**: `Object`

enables mounting of a React component

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mount` | <P, T\>(`type`: `string` \| `T`, `props?`: ``null`` \| `Attributes` & `P`, ...`children`: `ReactNode`[]) => `void` |

**mount**: <P, T\>(`type`: `string` \| `T`, `props?`: ``null`` \| `Attributes` & `P`, ...`children`: `ReactNode`[]) => `void`

Mount a react component

-----

#### Defined in

[react/cypress-react-component-helper.ts:20](https://github.com/ShellyDCMS/cypress-test-utils/blob/a0c3d13/src/react/cypress-react-component-helper.ts#L20)
