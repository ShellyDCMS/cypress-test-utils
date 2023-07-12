# Class: CypressHelper

**`Classdes`**

CypressHelper exposes the following public properties:

## Constructors

### constructor

• **new CypressHelper**(`defaultDataAttribute?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `defaultDataAttribute?` | `string` | `"data-cy"` |

#### Defined in

[cypress-helper.ts:24](https://github.com/ShellyDCMS/cypress-test-utils/blob/7a05a57/src/cypress-helper.ts#L24)

## Methods

### beforeAndAfter

▸ **beforeAndAfter**(): `void`

#### Returns

`void`

#### Defined in

[cypress-helper.ts:26](https://github.com/ShellyDCMS/cypress-test-utils/blob/7a05a57/src/cypress-helper.ts#L26)

## Properties

### defaultDataAttribute

• `Private` `Readonly` **defaultDataAttribute**: `string` = `"data-cy"`

#### Defined in

[cypress-helper.ts:24](https://github.com/ShellyDCMS/cypress-test-utils/blob/7a05a57/src/cypress-helper.ts#L24)

___

### get

• **get**: `Object`

The get property will hold methods which will give our tests access to the “output” of the component in a “black box” fashion

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bySelector` | (`selector`: `string`, `attribute?`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `currentLocation` | () => `PromiseLike`<`string`\> |
| `elementByTestId` | (`selector`: `string`, `index?`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `elementByText` | (`content`: `string` \| `RegExp`, `index?`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `elementExists` | (`selector`: `string`) => `PromiseLike`<`boolean`\> |
| `elementsAttribute` | (`selector`: `string`, `attribute`: `string`, `index?`: `number`) => `PromiseLike`<`unknown`\> |
| `elementsComputedStyle` | (`selector`: `string`, `index?`: `number`, `pseudoElement?`: `string`) => `PromiseLike`<`CSSStyleDeclaration`\> |
| `elementsText` | (`selector`: `string`, `index?`: `number`) => `PromiseLike`<`string`\> |
| `env` | (`key`: `string`) => `any` |
| `inputValue` | (`selector`: `string`, `index?`: `number`) => `PromiseLike`<`string` \| `number` \| `string`[]\> |
| `isElementDisabled` | (`selector`: `string`, `index?`: `number`) => `Promise`<`boolean`\> |
| `nthBySelector` | (`selector`: `string`, `index?`: `number`, `attribute?`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `numberOfElements` | (`selector`: `string`) => `PromiseLike`<`number`\> |
| `requestBody` | (`alias`: `string`) => `PromiseLike`<`Object`\> |
| `requestHeader` | (`alias`: `string`) => `PromiseLike`<`Object`\> |
| `requestQueryParam` | (`alias`: `string`, `queryParam`: `string`) => `PromiseLike`<``null`` \| `string`\> |
| `spy` | (`name`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `spyFromFunction` | (`func`: `Function`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `stub` | (`name`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |

#### Defined in

[cypress-helper.ts:266](https://github.com/ShellyDCMS/cypress-test-utils/blob/7a05a57/src/cypress-helper.ts#L266)

___

### given

• **given**: `Object`

The given property will hold methods which will allow us to set pre-conditions before something takes place.
This is a classic place to have methods which will set the inputs which are going to be passed down to our component.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `interceptAndMockResponse` | (`options`: { `alias?`: `string` ; `method?`: `string` ; `response`: `Object` ; `url`: `StringMatcher`  }) => `void` |
| `spy` | (`name`: `string`) => `Omit`<`SinonSpy`<`any`[], `any`\>, ``"withArgs"``\> & `SinonSpyAgent`<`SinonSpy`<`any`[], `any`\>\> & `SinonSpy`<`any`[], `any`\> |
| `spyOnObject` | <T\>(`obj`: `T`, `method`: keyof `T`) => `Omit`<`SinonSpy`<`any`[], `any`\>, ``"withArgs"``\> & `SinonSpyAgent`<`SinonSpy`<`any`[], `any`\>\> & `SinonSpy`<`any`[], `any`\> |
| `stub` | () => `Agent`<`SinonStub`<`any`[], `any`\>\> |

#### Defined in

[cypress-helper.ts:38](https://github.com/ShellyDCMS/cypress-test-utils/blob/7a05a57/src/cypress-helper.ts#L38)

___

### when

• **when**: `Object`

The when property will hold methods of “events” which will take place like render, click, hover, etc.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blur` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `check` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `click` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `clock` | () => `Chainable`<`Clock`\> |
| `dragAndDrop` | (`element`: `Chainable`<`JQuery`<`HTMLElement`\>\>, `targetElement`: `Chainable`<`JQuery`<`HTMLElement`\>\>) => `void` |
| `focus` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `hover` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `realType` | (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`void`\> |
| `scrollToBottom` | () => `Chainable`<`undefined`\> |
| `selectOption` | (`selector`: `string`, `label`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `tick` | (`ms`: `number`) => `Chainable`<`Clock`\> |
| `toggle` | (`index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `type` | (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `uncheck` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `visit` | (`url`: `string`) => `void` |
| `wait` | (`ms`: `number`) => `Chainable`<`undefined`\> |
| `waitForLastCall` | (`alias`: `string`, `timeout`: `number`) => `Chainable`<`undefined` \| `Interception`\> |
| `waitForResponse` | (`alias`: `string`) => `Chainable`<`Interception`\> |
| `waitUntil` | (`checkFunction`: `any`, `options?`: `any`) => `Chainable`<`undefined`\> |
| `within` | (`fn`: () => `void`, `selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |

#### Defined in

[cypress-helper.ts:112](https://github.com/ShellyDCMS/cypress-test-utils/blob/7a05a57/src/cypress-helper.ts#L112)
