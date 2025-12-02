import type { HTMLAttributes } from "react";
import { CypressHelper } from "src/cypress-helper";
import type { IRenderer } from "src/renderer";

/**
 * @private
 */
const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
export class BaseTestDriver<T> {
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
    set(target: Partial<T> & any, prop: string, value: any) {
      if (!(this.framework === "angular" && typeof value === "function"))
        target[prop] = value;
      if (typeof value === "object") target[`.${prop}`] = value;
      if (typeof value === "function") target[`@${prop}`] = value;
      return value;
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
    cssPixel2Number: (value: string) => Number(value.replace("px", "")),
    elementByText: (text: string, index?: number) =>
      this.helper.get.elementByText(text, index),
    waitUntil: (condition: () => boolean) =>
      this.helper.when.waitUntil(condition)
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
