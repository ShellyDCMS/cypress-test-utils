import type { Type } from "@angular/core";
import type { ReactWebComponent } from "@lit/react";
import { spread } from "@open-wc/lit-helpers";
import type { MountConfig } from "cypress/angular";
import { type TemplateResult } from "lit";
import { templateContent } from "lit-html/directives/template-content.js";
import { html, unsafeStatic } from "lit/static-html.js";
import type { Attributes } from "react";
import ReactHtmlParser from "react-html-parser";
import { CypressHelper } from "..";
import { CypressAngularComponentHelper } from "../angular";
import { CypressLitComponentHelper } from "../lit";
import { CypressReactComponentHelper } from "../react";

/**
 *
 */
export interface FrameworkRenderers {
  renderLitComponent?: () => void;
  renderReactComponent?: () => void;
  renderAngularComponent?: () => void;
}
/**
 * render a component (in Component Test context) of specific framework (React/Lit/Angular) based on an env variable
 * @example
 * in cypress config file
 * ```json
 * env: {
 *       framework: 'lit',
 *   },
 * ```
 * @example
 * in cypress config file
 * ```json
 * env: {
 *       framework: 'react',
 *   },
 * ```
 * @example
 * in cypress config file
 * ```json
 * env: {
 *       framework: 'angular',
 *   },
 * ```
 */
export class Renderer<T> {
  constructor() {}

  public when = {
    render: ({
      renderReactComponent,
      renderLitComponent,
      renderAngularComponent
    }: FrameworkRenderers) => {
      const helper = new CypressHelper();
      const framework = helper.get.env("framework");
      if (framework === "angular" && renderAngularComponent)
        return renderAngularComponent();
      if (framework === "react" && renderReactComponent)
        return renderReactComponent();
      if (framework === "lit" && renderLitComponent)
        return renderLitComponent();
    },

    /**
     * @example
     * const renderer = new Renderer<DatagridElement>();
     * renderer.when.renderLit({ element: DropDownElement, selector: 'ids-dropdown', props: get.props(), children: get.children() });
     *
     * @example
     * const renderer = new Renderer<DatagridElement>();
     * renderer.when.renderLit({ element: DatagridElement, template });
     **/
    renderLit: ({
      element,
      selector,
      props,
      children = "",
      template
    }: {
      element?: { new (...args: any[]): T };
      selector?: string;
      children?: string;
      props?: Partial<T>;
      template?: TemplateResult;
    }) => {
      const litComponentHelper = new CypressLitComponentHelper();
      if (template) {
        litComponentHelper.when.unmount();
        litComponentHelper.when.mount<T>(template, element);
      } else {
        const templateResult = html`<${unsafeStatic(selector!)} ${spread(
          props!
        )}>${this.get.litChildren(children!)}</${unsafeStatic(selector!)}>`;
        litComponentHelper.when.unmount();
        litComponentHelper.when.mount<T>(templateResult, element);
      }
    },
    /**
     * @example
     *  const renderer = new Renderer<AlertElement>();
     * renderer.when.renderReact(AlertElement, { ...get.props(), children: get.children() });
     **/
    renderReact: (
      // @ts-ignore
      type: ReactWebComponent<T>,
      // @ts-ignore
      props?: (Attributes & Partial<ReactWebComponent<T>["props"]>) | null
    ) => {
      const reactComponentHelper = new CypressReactComponentHelper();
      reactComponentHelper.when.mount(
        type,
        props,
        this.get.reactChildren(props.children)
      );
    },

    /**
     * @example
     * const testConfig = {
     *   declarations: [AvatarComponent],
     * };
     * const renderer = new Renderer<AvatarComponent>();
     * renderer.when.renderAngular(AvatarComponent, testConfig get.props());
     **/
    renderAngular: (
      type: Type<T>,
      config: MountConfig<T>,
      props?: Partial<T>
    ) => {
      const angularComponentHelper = new CypressAngularComponentHelper();
      angularComponentHelper.when.mount(type, config, props);
    }
  };

  public get = {
    reactChildren: (children: string) => {
      return ReactHtmlParser(children);
    },
    litChildren: (children: string) => {
      const template = document.createElement("template");
      template.innerHTML = children;
      return templateContent(template);
    }
  };
}
