# test-utils
Cypress helpers to control your UI components that work in all test levels. From component tests, through integration tests to e2e tests, for all frameworks: angular, lit, react.
Making TDD fun in the modular UI area.

CypressHelper makes it saner to write UI testing. It enables creating component drivers that will work on all testing levels (component, integration, e2e).

## Component Drivers
Testing UI is hard. There are many reasons for that, but a big one relies in the fact that unlike functions or services, where the API is clearly defined, 
when dealing with graphical user interfaces, it's up for the developer to transform it into an "API" for testing purposes.
Back in the days, [PageObjects](https://martinfowler.com/bliki/PageObject.html) helped mitigate this fact, but once the world moved to modular components, 
our test code quality degraded and became bloated with repetition and lack of abstraction.  
Component drivers are just like page objects, but for your components.
Just like page objects, this is merely a pattern, and is not coupled to a specific implementation.
However, using CypressHelper as the basis for your component drivers will help you leverage years of trial and error and be able to fully re-use your drivers across testing levels.
This allows you to confidently write tests that use your actual implementation and keep focusing on the *"what"* and not the *"how"*

## Philosophy
CypressHelper aims to provide a framework agnostic (angular, lit, react) API for what a manual tester can do. 
This means that the API will not focus on implementation, but on the actual action a user would take.
For example, a user doesn't mouseUp, he/she hovers.

## Examples
In the [examples](/examples) folder you can find 3 small apps; an angular app, a lit app and a react app.
Each app contains a driver that uses helpers, component tests, integration tests and e2e tests.
As you can see, all test levels use the *same* driver, meaning that if the feature's implementation changes, you'll need to change the driver alone, not the tests.

## Usage
This library provides an API to interact with UI elements - `CypressHelper` that combines the common features. 
To add it to your repo use
`npm i -D @def/test-utils`
or
`yarn add -D @def/test-utils`

## [Cypress Knowlege Base](https://confluence.cec.lab.emc.com/display/eCDM/Cypress+KB)

## Developing
1. Set up the repo -  `npm i`
2. Build the project - `npm run build` 
3. Run tests - `npm run test`

## Road map
- ~~Add React Component support~~ - done
- ~~Add examples for each fremwork (angular, lit, react)~~ - done
- Add coverage report examples
- branding, documentation, more examples
- add some FAQs
- Add API testing and performance testing examples
