[@shellygo/cypress-test-utils - v2.0.54](../README.md) / [Modules](../modules.md) / CypressHelperOptions

# Class: CypressHelperOptions

## Table of contents

### Constructors

- [constructor](CypressHelperOptions.md#constructor)

### Properties

- [defaultDataAttribute](CypressHelperOptions.md#defaultdataattribute)
- [handleSlotShadowDOM](CypressHelperOptions.md#handleslotshadowdom)
- [shadowSlotSuffix](CypressHelperOptions.md#shadowslotsuffix)
- [waitForElementsToLoad](CypressHelperOptions.md#waitforelementstoload)

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

when set to true, cypress helper will automatically find the assigned dom element of elements with dataTestID
with `defaultShadowSlotSuffix` suffix

___

### shadowSlotSuffix

• `Optional` **shadowSlotSuffix**: `string` = `"slot"`

slot dataTestID suffix (only relevant when handleSlotShadowDOM  is set to true)

___

### waitForElementsToLoad

• `Optional` **waitForElementsToLoad**: `boolean` = `true`

when set to true, waits until elements are loaded before returning them
