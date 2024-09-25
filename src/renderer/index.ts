import type { Type } from "@angular/core";
import { ReactWebComponent } from "@lit/react";
import { spread } from "@open-wc/lit-helpers";
import type { MountConfig } from "cypress/angular";
import type { LitElement, TemplateResult } from "lit";
import { templateContent } from "lit-html/directives/template-content.js";
import { html, unsafeStatic } from "lit/static-html.js";
import ReactHtmlParser from "react-html-parser";
import { CypressHelper } from "../";
import { CypressAngularComponentHelper } from "../angular";
import { CypressLitComponentHelper } from "../lit";
import { CypressReactComponentHelper } from "../react";

export interface IRenderer {
  render: () => void;
}

export interface getPropsAndchildren {}
export interface Options {
  getAngularOptions?: <T>() => {
    type: Type<T>;
    config: MountConfig<T>;
    props?: Partial<T>;
  };
  getReactOptions?: <T extends LitElement>() => {
    // @ts-ignore
    type: ReactWebComponent<T> | T;
    // @ts-ignore
    props?: (Attributes & Partial<ReactWebComponent<T>["props"]>) | null;
  };
  getLitOptions?: <T extends LitElement>() => {
    element?: { new (...args: any[]): LitElement };
    selector?: string;
    children?: string;
    props?: Partial<T>;
    template?: TemplateResult;
  };
}

/**
 * @classdesc Designed for running the same component tests  for different framework
 *
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
 * @example
 * ```ts
 * const children: string = `
 * <span slot="alert-title">Title</span>
 * <span slot="alert-details">Alert!!!</span>
 * `;
 * const renderFactory: RenderFactory = new RenderFactory({
 *           getLitOptions: () => ({ element: AlertElement, selector: 'my-alert', props: {type: "inline", status: "danger"}, children }),
 *           getReactOptions: () => ({ type: MyAlert, props: { type: "inline", status: "danger" , children} }),
 *       });
 * const renderer = renderFactory.createRenderer()
 * renderer.render()
 * ```
 *
 **/
export class RenderFactory {
  constructor(private readonly options: Options) {}

  /**
   * @returns IRenderer
   * @example
   */
  public createRenderer(): IRenderer {
    const helper = new CypressHelper();
    const framework = helper.get.env("framework");
    if (framework === "angular" && this.options.getAngularOptions)
      return {
        render: () => this.renderAngular(this.options.getAngularOptions!())
      };
    if (framework === "react" && this.options.getReactOptions)
      return {
        render: () => this.renderReact(this.options.getReactOptions!())
      };
    if (framework === "lit" && this.options.getLitOptions)
      return { render: () => this.renderLit(this.options.getLitOptions!()) };
    /** TODO: REMOVE hack for testing with missing components */
    if (this.options.getLitOptions)
      return { render: () => this.renderLit(this.options.getLitOptions!()) };
    return { render: () => {} };
  }

  private renderLit<T extends LitElement>({
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
  }) {
    const litComponentHelper = new CypressLitComponentHelper();
    if (template) {
      litComponentHelper.when.unmount();
      // @ts-ignore
      litComponentHelper.when.mount<T>(template, element);
    } else {
      const templateResult = html`<${unsafeStatic(selector!)} ${spread(
        props!
      )}>${this.get.litChildren(children!)}</${unsafeStatic(selector!)}>`;
      litComponentHelper.when.unmount();
      // @ts-ignore
      litComponentHelper.when.mount<T>(templateResult, element);
    }
  }

  private renderReact<T extends LitElement>({
    type,
    props
  }: {
    // @ts-ignore
    type: ReactWebComponent<T> | T;
    // @ts-ignore
    props?: (Attributes & Partial<ReactWebComponent<T>["props"]>) | null;
  }) {
    const reactComponentHelper = new CypressReactComponentHelper();
    reactComponentHelper.when.mount(
      // @ts-ignore
      type,
      props,
      this.get.reactChildren(props.children)
    );
  }

  private renderAngular<T>({
    type,
    config,
    props
  }: {
    type: Type<T>;
    config: MountConfig<T>;
    props?: Partial<T>;
  }) {
    const angularComponentHelper = new CypressAngularComponentHelper();
    angularComponentHelper.when.mount(type, config, props);
  }

  private get = {
    reactChildren: (children: string): React.ReactElement[] => {
      return ReactHtmlParser(children);
    },
    litChildren: (children: string) => {
      const template = document.createElement("template");
      template.innerHTML = children;
      return templateContent(template);
    }
  };
}
