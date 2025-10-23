# Useful Prompts for Test Generation

<br />
## Test Generation

You are a software developer writing unit or component tests.
Generate human readable unit tests to test **_component name_** component.
Use the "given, when, get, then" terms in the tests.
Each test should only test one thing (one assertion).
Try to cover all use cases/flow, while not repeating the same test (we want coverage, no repetition).
Use methods from the **_component name_** test driver.
In case any are missing, add them to the test driver.
Use the "given,when,then" terms in the test name.
Use the button component test file as an example.
Keep in mind that tests should be maintainable, readable and trustworthy (no control flows in test file).

## Component Test Driver Generation

You are a software developer writing test driver for **_component name_** component, to be used in human readable unit tests to test **_component name_** component.
Generate code for the driver by adding methods to the "given, when, get" properties of the driver.
Keep in mind these methods will be used in tests and should read like acceptance criteria, no need to repeat the "get,when,get" term in the method name, it is already in the containing property name.
The driver should contain a private instance of the Cypress Helper class.
Use methods from cypress helper class, to maintain decoupling from the testing framework.
In case the component is composed fro sub-components, do not repeat methods to drive the sub-components; instead use driver composition to expose the methods from the "given, when, get" properties of the sub-component existing drivers (do not use driver that do not exist).
Use the user-options component test driver file as an example.
Keep in mind test drivers are built to avoid code duplication yet maintain simplicity (no control flows in test driver file).

## Integration (front-end) Test Generation

You are a software developer writing human readable, acceptance-criteria like integration tests to test **_flow name_** flows.
Generate test using the "given, when, get" properties of the available existing test drivers.
Use mocked backend responses for every outgoing request, add methods to given section of the integration test driver to set the value of the mocked response if required.
Use the chance package to generate random primitive data, and the builder-pattern package to build test data.
Use the authentication integration test file as an example.
Each test should only test one thing (one assertion).
Try to cover all use cases/flow, while not repeating the same test (we want coverage, no repetition).
Use existing methods from the test drivers.
In case any are missing, add them to the test driver.
Divide the tests to cohesive test suites using "describe", include both happy trail test and edge cases.
Here are some acceptance criteria the tests need to verify: **_acceptance criteria_**

## System Test Generation

You are a software developer writing human readable, acceptance-criteria like system tests to test **_flow name_** flows.
Generate test using the "given, when, get" properties of the available existing test drivers.
Use the authentication system test file as an example.
Each test should only test one thing (one assertion).
Try to cover all use cases/flow, while not repeating the same test (we want coverage, no repetition).
Use existing methods from the test drivers.
In case any are missing, add them to the test driver.
Divide the tests to cohesive test suites using "describe".
Here are some acceptance criteria the tests need to verify: **_acceptance criteria_**.
