[@shellygo/cypress-test-utils - v1.0.32](../README.md) / [Modules](../modules.md) / CypressHelper

# Class: CypressHelper

**`Classdes`**

CypressHelper exposes the following public properties:

## Table of contents

### Constructors

- [constructor](CypressHelper.md#constructor)

### Properties

- [defaultDataAttribute](CypressHelper.md#defaultdataattribute)
- [get](CypressHelper.md#get)
- [given](CypressHelper.md#given)
- [when](CypressHelper.md#when)

### Methods

- [beforeAndAfter](CypressHelper.md#beforeandafter)

## Constructors

### constructor

• **new CypressHelper**(`defaultDataAttribute?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `defaultDataAttribute?` | `string` | `"data-cy"` |

## Properties

### defaultDataAttribute

• `Private` `Readonly` **defaultDataAttribute**: `string` = `"data-cy"`

___

### get

• **get**: `Object`

The get property will hold methods which will give our tests access to the “output” of the component in a “black box” fashion

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bySelector` | (`selector`: `string`, `attribute?`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `currentLocation` | () => `Chainable`<`string`\> |
| `elementByTestId` | (`selector`: `string`, `index?`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `elementByText` | (`content`: `string` \| `RegExp`, `index?`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `elementsAttribute` | (`selector`: `string`, `attribute`: `string`, `index?`: `number`) => `Chainable`<`undefined` \| `string`\> |
| `elementsComputedStyle` | (`selector`: `string`, `index?`: `number`, `pseudoElement?`: `string`) => `Chainable`<`CSSStyleDeclaration`\> |
| `elementsText` | (`selector`: `string`, `index?`: `number`) => `Chainable`<`string`\> |
| `env` | (`key`: `string`) => `any` |
| `inputValue` | (`selector`: `string`, `index?`: `number`) => `Chainable`<`string` \| `number` \| `string`[]\> |
| `nthBySelector` | (`selector`: `string`, `index?`: `number`, `attribute?`: `string`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `numberOfElements` | (`selector`: `string`) => `Chainable`<`number`\> |
| `requestBody` | (`alias`: `string`) => `Chainable`<`any`\> |
| `requestHeader` | (`alias`: `string`) => `Chainable`<{ `[key: string]`: `string` \| `string`[];  }\> |
| `requestQueryParams` | (`alias`: `string`) => `Chainable`<{ `[k: string]`: `string`;  }\> |
| `requestUrl` | (`alias`: `string`) => `Chainable`<`string`\> |
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

**currentLocation**: () => `Chainable`<`string`\>

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

**elementsAttribute**: (`selector`: `string`, `attribute`: `string`, `index?`: `number`) => `Chainable`<`undefined` \| `string`\>

**`Example`**

```ts
expect(helper.get.elementsAttribute('avatar-picture', 'style').should("include", 'background-image: url("assets/avatar/def-user-male.png")'))
```

-----

**elementsComputedStyle**: (`selector`: `string`, `index?`: `number`, `pseudoElement?`: `string`) => `Chainable`<`CSSStyleDeclaration`\>

Returns element's computed style, including pseudo elements

-----

**elementsText**: (`selector`: `string`, `index?`: `number`) => `Chainable`<`string`\>

**`Example`**

```ts
expect(helper.get.elementsText("parent-job-name", 3).should("include", "Job 3 Name"))
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

**inputValue**: (`selector`: `string`, `index?`: `number`) => `Chainable`<`string` \| `number` \| `string`[]\>

Get value of input element

**`Example`**

```ts
expect(helper.get.inputValue('credentials-password').should("eq","initial password"));
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

**numberOfElements**: (`selector`: `string`) => `Chainable`<`number`\>

Get number of elements with a specific selector

**`Example`**

```ts
 expect(helper.get.numberOfElements("migrated-vcenter").should("eq",2));
```

-----

**requestBody**: (`alias`: `string`) => `Chainable`<`any`\>

Get intercepted request's body
If a JSON Content-Type was used and the body was valid JSON, this will be an object.
If the body was binary content, this will be a buffer.

-----

**requestHeader**: (`alias`: `string`) => `Chainable`<{ `[key: string]`: `string` \| `string`[];  }\>

Get intercepted request's header

-----

**requestQueryParams**: (`alias`: `string`) => `Chainable`<{ `[k: string]`: `string`;  }\>

Get intercepted request's query param

-----

**requestUrl**: (`alias`: `string`) => `Chainable`<`string`\>

Get intercepted request's url

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

___

### given

• **given**: `Object`

The given property will hold methods which will allow us to set pre-conditions before something takes place.
This is a classic place to have methods which will set the inputs which are going to be passed down to our component.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `interceptAndMockResponse` | (`options`: { `alias?`: `string` ; `method?`: `string` ; `response`: `Object` ; `url`: `StringMatcher`  }) => `void` |
| `spy` | (`name`: `string`) => `Agent`<`SinonSpy`<`any`[], `any`\>\> |
| `spyOnObject` | <T\>(`obj`: `T`, `method`: keyof `T`) => `Agent`<`SinonSpy`<`any`[], `any`\>\> |
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

**spy**: (`name`: `string`) => `Agent`<`SinonSpy`<`any`[], `any`\>\>

Returns a new spy function, and creates an alias for the newly created spy

-----

**spyOnObject**: <T\>(`obj`: `T`, `method`: keyof `T`) => `Agent`<`SinonSpy`<`any`[], `any`\>\>

Spy on a method and create an alias for the spy

-----

**stub**: () => `Agent`<`SinonStub`<`any`[], `any`\>\>

Replace a function, record its usage and control its behavior.

-----

___

### when

• **when**: `Object`

The when property will hold methods of “events” which will take place like render, click, hover, etc.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blur` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `check` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `clear` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `click` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `clock` | () => `Chainable`<`Clock`\> |
| `dblclick` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `dragAndDrop` | (`element`: `Chainable`<`JQuery`<`HTMLElement`\>\>, `targetElement`: `Chainable`<`JQuery`<`HTMLElement`\>\>) => `void` |
| `focus` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `hover` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `realClick` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `realType` | (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`void`\> |
| `rightclick` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `scrollToBottom` | () => `Chainable`<`undefined`\> |
| `selectOption` | (`selector`: `string`, `label`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `tick` | (`ms`: `number`) => `Chainable`<`Clock`\> |
| `toggle` | (`index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `toggleRadioBySelector` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `type` | (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `uncheck` | (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |
| `visit` | (`url`: `string`) => `void` |
| `wait` | (`ms`: `number`) => `Chainable`<`undefined`\> |
| `waitForLastCall` | (`alias`: `string`, `timeout`: `number`) => `Chainable`<`undefined` \| `Interception`\> |
| `waitForResponse` | (`alias`: `string`) => `Chainable`<`Interception`\> |
| `waitForResponses` | (`alias`: `string`, `responses`: `number`) => `Chainable`<`Interception`[]\> |
| `waitUntil` | <ReturnType\>(`checkFunction`: () => `Chainable`<`any`\> \| `ReturnType` \| `PromiseLike`<`ReturnType`\>, `options?`: `WaitUntilOptions`<`any`\>) => `Chainable`<`undefined`\> |
| `within` | (`fn`: () => `void`, `selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\> |

**blur**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Blur a focused element.
This element must currently be in focus.
If you want to ensure an element is focused before blurring,
try using helper.when.focus() before helper.when.blur().

-----

**check**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Check checkbox(es) or radio(s).
This element must be an html input element with type checkbox or radio.

-----

**clear**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Clear the value of an input or textarea

-----

**click**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Click a DOM element.

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

**dblclick**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Double-click a DOM element.

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

**realClick**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Fires native system click event.

**`Example`**

```ts
<button data-cy="move-right">Move</button>
helper.when.realClick('move-right')
```

-----

**realType**: (`selector`: `string`, `keys`: `string`, `index`: `number`) => `Chainable`<`void`\>

Runs a sequence of native press event (via cy.press) Type event is global. Make sure that it is not attached to any field.

-----

**rightclick**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Right click a DOM element.

-----

**scrollToBottom**: () => `Chainable`<`undefined`\>

Scroll to the bottom.

-----

**selectOption**: (`selector`: `string`, `label`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Select an option with specific text, value, or index within a select html element.

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
This element must be an html input element with type radio.

-----

**toggleRadioBySelector**: (`selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Toggle radio(s) by selector
This element must be an html input element with type radio.

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

**waitForResponses**: (`alias`: `string`, `responses`: `number`) => `Chainable`<`Interception`[]\>

Wait for multiples requests to complete.

-----

**waitUntil**: <ReturnType\>(`checkFunction`: () => `Chainable`<`any`\> \| `ReturnType` \| `PromiseLike`<`ReturnType`\>, `options?`: `WaitUntilOptions`<`any`\>) => `Chainable`<`undefined`\>

**`Example`**

```ts
helper.when.waitUntil(() =>
  helper.get.elementByTestId(selector, index)
);
```

-----

**within**: (`fn`: () => `void`, `selector`: `string`, `index`: `number`) => `Chainable`<`JQuery`<`HTMLElement`\>\>

Scopes all subsequent cy commands to within this element

**`Example`**

```ts
helper.when.within(() => expect(get.emcLogo()).to.exist, 'company-logo')
```

-----

## Methods

### beforeAndAfter

▸ **beforeAndAfter**(): `void`

#### Returns

`void`