import { type LitElement } from "lit";
import type { HTMLAttributes } from "react";
import { CypressHelper } from "src/cypress-helper";
import type { IRenderer } from "src/renderer";

/**
 * @private
 */
const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
export class BaseTestDriver<T extends LitElement> {
  /**
   * @private
   */
  protected children: string = "";
  /**
   * @private
   */
  protected helper = new CypressHelper();
  /**
   * @private
   */
  protected renderer: IRenderer = { render: () => {} };
  /**
   * @private
   */
  private _props: Partial<T> = {};

  /**
   * @private
   */
  private framework: string = this.helper.get.env("framework");
  /**
   * @private
   */
  private propsHandler = {
    framework: this.framework,
    isAngularSpy: (value: any) =>
      this.framework === "angular" && typeof value === "function",
    setProps: (target: any, prop: string, value: any) => {
      target[prop] = value;
      if (typeof value === "object") target[`.${prop}`] = value;
      if (typeof value === "function") target[`@${prop}`] = value;
    },
    set(target: Partial<T> & any, prop: string, value: any) {
      if (this.isAngularSpy(value)) return;
      this.setProps(target, prop, value);
      return (target[prop] = value);
    }
  };

  /**
   * @private
   */
  protected props = new Proxy(this._props, this.propsHandler) as Partial<T> &
    HTMLAttributes<T>;

  /**
   * @private
   */
  protected _given = {
    children: (value: string) => (this.children = value),
    renderer: (value: IRenderer) => {
      this.renderer = value;
    }
  };
  /**
   * @private
   */
  protected _get = {
    children: () => this.children,
    props: () => this.props as Partial<T>,
    cssPixel2Number: (value: string) => Number(value.replace("px", ""))
  };
  /**
   * @private
   */
  protected _when = {
    render: () => {
      this.renderer.render();
    }
  };
}
