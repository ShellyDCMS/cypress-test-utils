[@shellygo/cypress-test-utils - v2.0.4](../README.md) / [Modules](../modules.md) / CypressReactComponentHelper

# Class: CypressReactComponentHelper

**`Classdes`**

CypressReactComponentHelper exposes the following public properties:

## Table of contents

### Constructors

- [constructor](CypressReactComponentHelper.md#constructor)

### Properties

- [component](CypressReactComponentHelper.md#component)
- [get](CypressReactComponentHelper.md#get)
- [when](CypressReactComponentHelper.md#when)

## Constructors

### constructor

• **new CypressReactComponentHelper**()

## Properties

### component

• `Private` **component**: `ReactNode`

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
