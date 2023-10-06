[@shellygo/cypress-test-utils - v1.0.37](../README.md) / [Modules](../modules.md) / CypressHelperOptions

# Interface: CypressHelperOptions

## Table of contents

### Properties

- [defaultDataAttribute](CypressHelperOptions.md#defaultdataattribute)
- [defaultShadowSlotSuffix](CypressHelperOptions.md#defaultshadowslotsuffix)
- [handleSlotShadowDOM](CypressHelperOptions.md#handleslotshadowdom)

## Properties

### defaultDataAttribute

• `Optional` **defaultDataAttribute**: `string`

default data attribute for elements selection

___

### defaultShadowSlotSuffix

• `Optional` **defaultShadowSlotSuffix**: `string`

default slot data selector suffix (only relevant when handleSlotShadowDOM  is set to true)

___

### handleSlotShadowDOM

• `Optional` **handleSlotShadowDOM**: `boolean`

when set top true, cypress helper will automatically find the assigned dom element of elements with data selector
with `defaultShadowSlotSuffix` suffix
