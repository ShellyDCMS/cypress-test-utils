[@shellygo/cypress-test-utils - v1.0.41](../README.md) / [Modules](../modules.md) / CypressHelperOptions

# Class: CypressHelperOptions

## Table of contents

### Constructors

- [constructor](CypressHelperOptions.md#constructor)

### Properties

- [defaultDataAttribute](CypressHelperOptions.md#defaultdataattribute)
- [handleSlotShadowDOM](CypressHelperOptions.md#handleslotshadowdom)
- [shadowSlotSuffix](CypressHelperOptions.md#shadowslotsuffix)

## Constructors

### constructor

• **new CypressHelperOptions**()

## Properties

### defaultDataAttribute

• `Optional` **defaultDataAttribute**: `string` = `"data-cy"`

default data attribute for elements selection

___

### handleSlotShadowDOM

• `Optional` **handleSlotShadowDOM**: `boolean` = `true`

when set top true, cypress helper will automatically find the assigned dom element of elements with data selector
with `defaultShadowSlotSuffix` suffix

___

### shadowSlotSuffix

• `Optional` **shadowSlotSuffix**: `string` = `"slot"`

slot data selector suffix (only relevant when handleSlotShadowDOM  is set to true)
