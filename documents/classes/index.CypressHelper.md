[@shellygo/cypress-test-utils - v1.0.13](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / CypressHelper

# Class: CypressHelper

[index](../modules/index.md).CypressHelper

**`Classdes`**

CypressHelper exposes the following public properties:

## Table of contents

### Constructors

- [constructor](index.CypressHelper.md#constructor)

### Properties

- [defaultDataAttribute](index.CypressHelper.md#defaultdataattribute)
- [get](index.CypressHelper.md#get)
- [given](index.CypressHelper.md#given)
- [when](index.CypressHelper.md#when)

### Methods

- [beforeAndAfter](index.CypressHelper.md#beforeandafter)

## Constructors

### constructor

• **new CypressHelper**(`defaultDataAttribute?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `defaultDataAttribute?` | `string` | `"data-cy"` |

#### Defined in

[cypress-helper.ts:24](https://github.com/ShellyDCMS/cypress-test-utils/blob/2d07010/src/cypress-helper.ts#L24)

## Properties

### defaultDataAttribute

• `Private` `Readonly` **defaultDataAttribute**: `string` = `"data-cy"`

#### Defined in

[cypress-helper.ts:24](https://github.com/ShellyDCMS/cypress-test-utils/blob/2d07010/src/cypress-helper.ts#L24)

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

**bySelector**: (`selector`: `string`, `attribute?`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get one or more DOM elements by selector.

**`Example`**

Get an element with shape="filter-grid"
```ts
<clr-icon shape="filter-grid"></clr-icon>
helper.get.bySelector("filter-grid", "shape")
```

-----

**currentLocation**: () => `PromiseLike`<`string`\>

Get the current URL of the page that is currently active.

-----

**elementByTestId**: (`selector`: `string`, `index?`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get A DOM element at a specific index from elements.

**`Example`**

```ts
helper.when.dragAndDrop(
  helper.get.elementByTestId('selected-item', 2),
  helper.get.elementByTestId('available-items')
```

-----

**elementByText**: (`content`: `string` \| `RegExp`, `index?`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get the DOM element containing the text.
DOM elements can contain more than the desired text and still match.
Additionally, Cypress prefers some DOM elements over the deepest element found.

**`Example`**

```ts
expect(helper.get.elementByText("Avamar")).to.exist;
```

-----

**elementExists**: (`selector`: `string`) => `PromiseLike`<`boolean`\>

**`Example`**

```ts
expect(await helper.get.elementExists('option-group-separator')).to.be.true
```

-----

**elementsAttribute**: (`selector`: `string`, `attribute`: `string`, `index?`: `number`) => `PromiseLike`<`unknown`\>

**`Example`**

```ts
expect(await helper.get.elementsAttribute('avatar-picture', 'style')).to.include('background-image: url("assets/avatar/def-user-male.png")')
```

-----

**elementsComputedStyle**: (`selector`: `string`, `index?`: `number`, `pseudoElement?`: `string`) => `PromiseLike`<`CSSStyleDeclaration`\>

Returns element's computed style, including pseudo elements

-----

**elementsText**: (`selector`: `string`, `index?`: `number`) => `PromiseLike`<`string`\>

**`Example`**

```ts
expect(await .helper.get.elementsText("parent-job-name", 3)).includes("Job 3 Name")
```

-----

**env**: (`key`: `string`) => `any`

Returns specific environment variable or undefined

**`Example`**

// Keeping password in cypress.config file
```ts
e2e: {
 env: {
   password: "Changeme@1",
 }
}
```
// using password during test
```ts
helper.get.env("password");
```

-----

**inputValue**: (`selector`: `string`, `index?`: `number`) => `PromiseLike`<`string` \| `number` \| `string`[]\>

Get value of input element

**`Example`**

```ts
expect(await helper.get.inputValue('credentials-password')).to.eq("initial password");
```

-----

**isElementDisabled**: (`selector`: `string`, `index?`: `number`) => `Promise`<`boolean`\>

**`Example`**

```ts
expect(await helper.get.isElementDisabled('login-button')).to.eq(true)
```

-----

**nthBySelector**: (`selector`: `string`, `index?`: `number`, `attribute?`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get A DOM element at a specific index from elements.

**`Example`**

// Get the 3rd checkbox
```ts
helper.get.nthBySelector("checkbox", 3, "type")
```

-----

**numberOfElements**: (`selector`: `string`) => `PromiseLike`<`number`\>

Get number of elements with a specific selector

**`Example`**

```ts
 expect(await helper.get.numberOfElements("migrated-vcenter")).to.eq(2);
```

-----

**requestBody**: (`alias`: `string`) => `PromiseLike`<`Object`\>

Get intercepted request's body

-----

**requestHeader**: (`alias`: `string`) => `PromiseLike`<`Object`\>

Get intercepted request's header

-----

**requestQueryParam**: (`alias`: `string`, `queryParam`: `string`) => `PromiseLike`<``null`` \| `string`\>

Get intercepted request's query param

-----

**spy**: (`name`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get spy by alias

-----

**spyFromFunction**: (`func`: `Function`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get spy by function name alias

-----

**stub**: (`name`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Get stub by alias

-----

#### Defined in

[cypress-helper.ts:286](https://github.com/ShellyDCMS/cypress-test-utils/blob/2d07010/src/cypress-helper.ts#L286)

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

**interceptAndMockResponse**: (`options`: { `alias?`: `string` ; `method?`: `string` ; `response`: `Object` ; `url`: `StringMatcher`  }) => `void`

Use interceptAndMockResponse to stub and intercept HTTP requests and responses.

**`Example`**

// adds token to response header
```ts
helper.given.interceptAndMockResponse({
  url: '** /sysmgmt/2015/bmc/session',
  response: {
    headers:{
       'XSRF-Token': 'token',
    },
  },
  alias: 'login'
})
```

**`Example`**

// mocks response to login request
```ts
helper.given.interceptAndMockResponse({
  method: "POST",
  url: "** /login",
  alias: "login",
  response : {
    token: 'token'
  }
})
```

**`Example`**

// mocks network error
```ts
helper.given.interceptAndMockResponse({
  method: "POST",
  url: "** /avamars",
  alias: "avamar",
  response : {
    forceNetworkError: true
  }
})
```

**`Example`**

// mocks network error
```ts
helper.given.interceptAndMockResponse({
  method: "POST",
  url: "** /image.png",
  alias: "image",
  response: { headers: 404 }
})
```

-----

**spy**: (`name`: `string`) => `Omit`<`SinonSpy`<`any`[], `any`\>, ``"withArgs"``\> & `SinonSpyAgent`<`SinonSpy`<`any`[], `any`\>\> & `SinonSpy`<`any`[], `any`\>

Returns a new spy function, and creates an alias for the newly created spy

-----

**spyOnObject**: <T\>(`obj`: `T`, `method`: keyof `T`) => `Omit`<`SinonSpy`<`any`[], `any`\>, ``"withArgs"``\> & `SinonSpyAgent`<`SinonSpy`<`any`[], `any`\>\> & `SinonSpy`<`any`[], `any`\>

Spy on a method and create an alias for the spy

-----

**stub**: () => `Agent`<`SinonStub`<`any`[], `any`\>\>

Replace a function, record its usage and control its behavior.

-----

#### Defined in

[cypress-helper.ts:42](https://github.com/ShellyDCMS/cypress-test-utils/blob/2d07010/src/cypress-helper.ts#L42)

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

**blur**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Blur a focused element.
This element must currently be in focus.
If you want to ensure an element is focused before blurring,
try using helper.when.focus() before helper.when.blur().

-----

**check**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Check checkbox(es) or radio(s).
This element must be an <input> with type checkbox or radio.

-----

**click**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Fires native system click event.

**`Example`**

```ts
<button data-cy="move-right">Move</button>
helper.when.click('move-right')
```

-----

**clock**: () => `Chainable`<`Clock`\>

overrides native global functions related to time
allowing them to be controlled synchronously via helper.when.tick()
This includes controlling:
   setTimeout
   clearTimeout
   setInterval
   clearInterval
   Date Objects
The clock starts at the unix epoch (timestamp of 0).
This means that when you instantiate new Date in your application, it will have a time of January 1st, 1970.

-----

**dragAndDrop**: (`element`: `Chainable`<`JQuery`<`HTMLElement`\>\>, `targetElement`: `Chainable`<`JQuery`<`HTMLElement`\>\>) => `void`

Drag an element and drop it in target element

**`Example`**

```ts
helper.when.dragAndDrop(
  helper.get.elementByTestId('selected-item', 2),
  helper.get.elementByTestId('available-items')
)
```

-----

**focus**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Focus on a DOM element.

-----

**hover**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Fires native hover event. Yes, it can test :hover preprocessor.

**`Example`**

```ts
helper.when.hover('consent-terms-agree')
```

-----

**realType**: (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`void`\>

Type into a DOM element.

-----

**scrollToBottom**: () => `Chainable`<`undefined`\>

Scroll to the bottom.

-----

**selectOption**: (`selector`: `string`, `label`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Select an <option> with specific text, value, or index within a <select>.

-----

**tick**: (`ms`: `number`) => `Chainable`<`Clock`\>

Move time after overriding a native time function with helper.when.clock().
helper.when.clock() must be called before helper.when.tick()

**`Example`**

```ts
helper.when.clock();
helper.when.click('login-button');
helper.when.tick(2000);
```

-----

**toggle**: (`index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Check radio(s).
This element must be an <input> with type radio.

-----

**type**: (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Type into a DOM element.

-----

**uncheck**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Uncheck checkbox(es).

-----

**visit**: (`url`: `string`) => `void`

Visit a given url

-----

**wait**: (`ms`: `number`) => `Chainable`<`undefined`\>

Wait for a number of milliseconds.

-----

**waitForLastCall**: (`alias`: `string`, `timeout`: `number`) => `Chainable`<`undefined` \| `Interception`\>

Wait for a last request to complete.

-----

**waitForResponse**: (`alias`: `string`) => `Chainable`<`Interception`\>

Wait for a specific request to complete.

-----

**waitUntil**: (`checkFunction`: `any`, `options?`: `any`) => `Chainable`<`undefined`\>

**`Example`**

```ts
helper.when.waitUntil(() =>
  helper.get.elementByTestId(selector, index).should("be.visible")
);
```

-----

**within**: (`fn`: () => `void`, `selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Scopes all subsequent cy commands to within this element

**`Example`**

```ts
helper.when.within(() => expect(get.emcLogo()).to.exist, 'company-logo)
```

-----

#### Defined in

[cypress-helper.ts:125](https://github.com/ShellyDCMS/cypress-test-utils/blob/2d07010/src/cypress-helper.ts#L125)

## Methods

### beforeAndAfter

▸ **beforeAndAfter**(): `void`

#### Returns

`void`

#### Defined in

[cypress-helper.ts:26](https://github.com/ShellyDCMS/cypress-test-utils/blob/2d07010/src/cypress-helper.ts#L26)
