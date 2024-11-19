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
     * ```ts
     * litComponentHelper.when.mount<SpinnerElement>(
     *   html`<edf-spinner size="${this.props.size}" type="${this.props.type}" label="${this.props.label}"></edf-spinner>`
     *   SpinnerElement,
     * );
     * ```
     * 
     * @param template
     * @param element

     */
    mount: <T extends LitElement>(
      template: TemplateResult,
      constructor?: { new (...args: any[]): T }
    ) => {
      const target = getContainerEl();

      render(template, target);

      return cy
        .wait(0, { log: false })
        .then(() => {
          const mountMessage = `<${String(constructor?.name) || "empty"} />`;

          Cypress.log({
            name: "mount",
            message: [mountMessage]
          })
            .snapshot("mounted")
            .end();
        })
        .get("[data-cy-root]", { log: false })
        .children({ log: false })
        .first({ log: false });
    },
    unmount: () => this.when.mount(html`<slot></slot>`)
  };
  public get = {};
}
