[@shellygo/cypress-test-utils - v2.0.38](../README.md) / [Modules](../modules.md) / CypressAngularComponentHelper

# Class: CypressAngularComponentHelper<T\>

**`Classdes`**

CypressAngularComponentHelper exposes the following public properties:

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | component type |

## Table of contents

### Constructors

- [constructor](CypressAngularComponentHelper.md#constructor)

### Properties

- [fixture](CypressAngularComponentHelper.md#fixture)
- [get](CypressAngularComponentHelper.md#get)
- [when](CypressAngularComponentHelper.md#when)

## Constructors

### constructor

• **new CypressAngularComponentHelper**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### fixture

• `Private` **fixture**: `any`

___

### get

• **get**: `Object`

enables getting the mounted component

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component` | () => `T` |

**component**: () => `T`

Get mounted component

-----

___

### when

• **when**: `Object`

enables mounting of an Angular component

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mount` | (`componentType`: `string` \| `Type`<`T`\>, `config`: `MountConfig`<`T`\>, `componentProperties?`: `Partial`<{ [P in string \| number \| symbol]: T[P] }\>) => `void` |

**mount**: (`componentType`: `string` \| `Type`<`T`\>, `config`: `MountConfig`<`T`\>, `componentProperties?`: `Partial`<{ [P in string \| number \| symbol]: T[P] }\>) => `void`

mount an angular component, with autoSpyOutputs set to true, meaning all event emitters are automatically spied on
and be accessed during a test using
```ts
helper.get.spy("<EventEmitterName>")
```

**`Example`**

```ts
helper.when.mount(
 Type<AvatarComponent>,
 {
   declarations: [AvatarComponent],
 },
 {
   initials: 'JD',
   picture: 'assets/avatar/def-user-male.png',
 }
)
```

-----
