# cypress-test-utils

![cypress-test-utils](https://github.com/ShellyDCMS/cypress-test-utils/actions/workflows/npm-publish.yml/badge.svg)

Cypress helpers to control your UI components that work in all test levels. From component tests, through integration tests to e2e tests, for all frameworks: angular, lit, react.
Making TDD fun in the modular UI area.

CypressHelper makes it saner to write UI testing. It enables creating component drivers that will work on all testing levels (component, integration, e2e).

Cypress Helpers can help you develop tests faster
CypressHelper is designed to be used in any test level, and holds common methods used in Cypress tests
![image](https://github.com/ShellyDCMS/cypress-test-utils/assets/60476837/d9aa07d8-2c05-4968-970a-be8445a113c3)

CypressComponent helpers are designed to be used in component tests and are NOT framework agnostic, their sole purpose is to mount components into the browser.

## Component Drivers

Testing UI is hard. There are many reasons for that, but a big one relies in the fact that unlike functions or services, where the API is clearly defined,
when dealing with graphical user interfaces, it's up for the developer to transform it into an "API" for testing purposes.
Back in the days, [PageObjects](https://martinfowler.com/bliki/PageObject.html) helped mitigate this fact, but once the world moved to modular components,
our test code quality degraded and became bloated with repetition and lack of abstraction.  
Component drivers are just like page objects, but for your components.
Just like page objects, this is merely a pattern, and is not coupled to a specific implementation.
However, using CypressHelper as the basis for your component drivers will help you leverage years of trial and error and be able to fully re-use your drivers across testing levels.
This allows you to confidently write tests that use your actual implementation and keep focusing on the _"what"_ and not the _"how"_

![image](https://github.com/ShellyDCMS/cypress-test-utils/assets/60476837/dc972638-e80c-4516-85be-4c3f657fc6ec)

Component Drivers can be used as building blocks for integration and E2E test driver, using Driver Composition
![image](https://github.com/ShellyDCMS/cypress-test-utils/assets/60476837/17175620-ad91-4e4a-af63-6d83665de794)

## Philosophy

CypressHelper aims to provide a framework agnostic (angular, lit, react) API for what a manual tester can do.
This means that the API will not focus on implementation, but on the actual action a user would take.
For example, a user doesn't mouseUp, he/she hovers.

## [Markdown Documentation](https://github.com/ShellyDCMS/cypress-test-utils/blob/main/documents/modules.md)

[CypressTestHelper](https://github.com/ShellyDCMS/cypress-test-utils/blob/main/documents/classes/CypressHelper.md)

[Assertable](https://github.com/ShellyDCMS/cypress-test-utils/blob/main/documents/classes/Assertable.md)

[CypressAngularComponentHelper](https://github.com/ShellyDCMS/cypress-test-utils/blob/main/documents/classes/CypressAngularComponentHelper.md)

[CypressReactComponentHelper](https://github.com/ShellyDCMS/cypress-test-utils/blob/main/documents/classes/CypressReactComponentHelper.md)

[CypressLitComponentHelper](https://github.com/ShellyDCMS/cypress-test-utils/blob/main/documents/classes/CypressLitComponentHelper.md)

## [HTML Documentation](https://shellydcms.github.io/cypress-test-utils/modules.html)

## Examples

In the [examples](https://github.com/ShellyDCMS/cypress-test-utils-examples/tree/main) repo you can find 3 small apps; an angular app, a lit app and a react app.
Each app contains a driver that uses helpers, component tests, integration tests and e2e tests.
As you can see, all test levels use the _same_ driver, meaning that if the feature's implementation changes, you'll need to change the driver alone, not the tests.

## Framework Spesific Information

### Using Shadow DOM

When using <slot> elements with shadow dom, some things may not be where you expect them, fo example the text of this button is not directly inside the slot containing it.
![image](https://github.com/ShellyDCMS/cypress-test-utils/assets/60476837/c14b0877-4c9a-4f37-ba18-0220b9192b0f)
CypressHelper will look for the assignedNode to retrieve the text, given that the selector of the slot has a '-slot' suffix.
You may change this behaviour by overriding the default values when creating CypressHelper.

### Angular

When mounting an angular component, autoSpyOutputs is set to true, meaning all event emitters are automatically spied on and may be accessed during a test using `helper.get.spy("<EventEmitterName>")`

###

## Usage

This library provides an API to interact with UI elements - `CypressHelper` that combines the common features.
To add it to your repo use

`npm i -D @shellygo/cypress-test-utils`

or

`yarn add -D @shellygo/cypress-test-utils`

## Developing

1. Set up the repo - `yarn`
2. Build the project - `npm run build`
3. Running tests - `npm run cy:run`
