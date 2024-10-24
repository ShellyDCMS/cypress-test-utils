import type { Type } from "@angular/core";
import { spread } from "@open-wc/lit-helpers";
import type { MountConfig } from "cypress/angular";
import type { LitElement, TemplateResult } from "lit";
import { templateContent } from "lit-html/directives/template-content.js";
import { html, unsafeStatic } from "lit/static-html.js";
import type { Attributes, ComponentClass, FunctionComponent } from "react";
import ReactHtmlParser from "react-html-parser";
import { CypressHelper } from "../";
import { CypressAngularComponentHelper } from "../angular";
import { CypressLitComponentHelper } from "../lit";
import { CypressReactComponentHelper } from "../react";
export interface IRenderer {
  render: () => void;
}

export interface AngularOptions<T> {
  type: Type<T>;
  config: MountConfig<T>;
  props?: Partial<T>;
  children?: string;
  template?: string;
  selector?: string;
}

export interface ReactOptions<
  P extends {},
  T extends
    | FunctionComponent<P>
    | ComponentClass<P>
    | ((props: P) => JSX.Element)
> {
  type: T;
  props?: (Attributes & P) | null;
  children?: string;
}

export interface LitOptions<T extends LitElement> {
  element?: { new (...args: any[]): LitElement };
  selector?: string;
  children?: string;
  props?: Partial<T>;
  template?: TemplateResult;
}

export interface Options {
  getAngularOptions?: <T>() => AngularOptions<T>;
  getReactOptions?: <
    P extends {},
    T extends
      | FunctionComponent<P>
      | ComponentClass<P>
      | ((props: P) => JSX.Element)
  >() => ReactOptions<P, T>;
  getLitOptions?: <T extends LitElement>() => LitOptions<T>;
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
 *           getAngularOptions: () => ({ type: AlertComponent, config: {declarations: [AlertComponent]}, props: get.props() })
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
  }: LitOptions<T>) {
    const litComponentHelper = new CypressLitComponentHelper();
    if (template) {
      litComponentHelper.when.unmount();
      litComponentHelper.when.mount(template, element);
    } else {
      const templateResult = html`<${unsafeStatic(selector!)} ${spread(
        props!
      )}>${this.get.litChildren(children!)}</${unsafeStatic(selector!)}>`;
      litComponentHelper.when.unmount();
      litComponentHelper.when.mount(templateResult, element);
    }
  }

  private renderReact<
    P extends {},
    T extends
      | FunctionComponent<P>
      | ComponentClass<P>
      | ((props: P) => JSX.Element)
  >({ type, props, children = "" }: ReactOptions<P, T>) {
    const reactComponentHelper = new CypressReactComponentHelper();
    reactComponentHelper.when.mount(
      type,
      props,
      this.get.reactChildren(children)
    );
  }

  private renderAngular<T>({
    type,
    config,
    props,
    children = "",
    template,
    selector
  }: AngularOptions<T>) {
    const angularComponentHelper = new CypressAngularComponentHelper();
    if (selector)
      return angularComponentHelper.when.mount(
        `<${selector!}>${children}</${selector!}>`,
        config,
        props
      );
    if (template)
      return angularComponentHelper.when.mount(template, config, props);
    return angularComponentHelper.when.mount(type, config, props);
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
