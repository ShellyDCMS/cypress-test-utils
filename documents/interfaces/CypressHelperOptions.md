[@shellygo/cypress-test-utils - v1.0.38](../README.md) / [Modules](../modules.md) / CypressHelperOptions

# Interface: CypressHelperOptions

## Table of contents

### Properties

- [defaultDataAttribute](CypressHelperOptions.md#defaultdataattribute)
- [handleSlotShadowDOM](CypressHelperOptions.md#handleslotshadowdom)
- [shadowSlotSuffix](CypressHelperOptions.md#shadowslotsuffix)

## Properties

### defaultDataAttribute

• `Optional` **defaultDataAttribute**: `string`

default data attribute for elements selection

___

### handleSlotShadowDOM

• `Optional` **handleSlotShadowDOM**: `boolean`

when set top true, cypress helper will automatically find the assigned dom element of elements with data selector
with `defaultShadowSlotSuffix` suffix

___

### shadowSlotSuffix

• `Optional` **shadowSlotSuffix**: `string`

slot data selector suffix (only relevant when handleSlotShadowDOM  is set to true)
