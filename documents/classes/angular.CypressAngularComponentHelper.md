[@shellygo/cypress-test-utils - v1.0.15](../README.md) / [Modules](../modules.md) / [angular](../modules/angular.md) / CypressAngularComponentHelper

# Class: CypressAngularComponentHelper<T\>

[angular](../modules/angular.md).CypressAngularComponentHelper

**`Classdes`**

CypressAngularComponentHelper exposes the following public properties:

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | component type |

## Table of contents

### Constructors

- [constructor](angular.CypressAngularComponentHelper.md#constructor)

### Properties

- [fixture](angular.CypressAngularComponentHelper.md#fixture)
- [get](angular.CypressAngularComponentHelper.md#get)
- [when](angular.CypressAngularComponentHelper.md#when)

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

#### Defined in

[angular/cypress-angular-component-helper.ts:13](https://github.com/ShellyDCMS/cypress-test-utils/blob/a0c3d13/src/angular/cypress-angular-component-helper.ts#L13)

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

#### Defined in

[angular/cypress-angular-component-helper.ts:59](https://github.com/ShellyDCMS/cypress-test-utils/blob/a0c3d13/src/angular/cypress-angular-component-helper.ts#L59)

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

#### Defined in

[angular/cypress-angular-component-helper.ts:14](https://github.com/ShellyDCMS/cypress-test-utils/blob/a0c3d13/src/angular/cypress-angular-component-helper.ts#L14)
