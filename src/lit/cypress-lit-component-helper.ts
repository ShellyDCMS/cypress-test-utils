/// <reference types="cypress" />
import { getContainerEl } from "@cypress/mount-utils";
import { html, LitElement, render, TemplateResult } from "lit";
/**
 * @class CypressLitComponentHelper was designed designed for mounting lit components
 * @classdes CypressLitComponentHelper exposes the following public properties:
 * @property when - enables mounting of a li component
 */
export class CypressLitComponentHelper {
  public given = {};
  public when = {
    /**
     * Mount a LitElement web component
     * @example
     * litComponentHelper.when.mount<SpinnerElement>(
        new SpinnerElement(),
        html`<edf-spinner size="${this.props.size}" type="${this.props.type}" label="${this.props.label}"></edf-spinner>`
      );
     * @template T - element type
     * @param element 
     * @param template 
     */
    mount: <T extends LitElement>(element: T, template: TemplateResult) => {
      const target = getContainerEl();

      render(template, target);

      return (
        cy
          .wait(0, { log: false })
          .then(() => {
            const mountMessage = `<${String(element.constructor.name)} ... />`;

            Cypress.log({
              name: "mount",
              message: [mountMessage]
            })
              .snapshot("mounted")
              .end();
          })
          .get("[data-cy-root]", { log: false })
          .children({ log: false })
          .first({ log: false })
          // @ts-ignore
          .shadow({ log: false })
      );
    },
    unmount: <T extends LitElement>(element: T) =>
      this.when.mount(element, html`<slot></slot>`)
  };
  public get = {};
}
