import type { Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { MountConfig } from "cypress/angular";
/**
 * @class CypressAngularComponentHelper was designed designed for mounting angular components
 * @template T - component type
 * @classdes CypressAngularComponentHelper exposes the following public properties:
 * @property when - enables mounting of an Angular component
 * @property get - enables getting the mounted component
 */
export class CypressAngularComponentHelper<T> {
  private fixture: any;
  public when = {
    /**
     * mount an angular component, with autoSpyOutputs set to true, meaning all event emitters are automatically spied on
     * and be accessed during a test using
     * ```ts
     * helper.get.spy("<EventEmitterName>")
     * ```
     * @example
     * ```ts
     * helper.when.mount(
     *  Type<AvatarComponent>,
     *  {
     *    declarations: [AvatarComponent],
     *  },
     *  {
     *    initials: 'JD',
     *    picture: 'assets/avatar/def-user-male.png',
     *  }
     * )
     * ```
     * @param componentType
     * @param config
     * @param componentProperties
     */
    mount: (
      componentType: Type<T> | string,
      config: MountConfig<T>,
      componentProperties?: Partial<{
        [P in keyof T]: T[P];
      }>
    ) => {
      // @ts-ignore
      const mountResponse = cy.mount<T>(componentType, {
        ...config,
        autoSpyOutputs: true,
        componentProperties: {
          ...config.componentProperties,
          ...componentProperties
        }
      });
      return mountResponse
        .its("fixture")
        .then((fixture: ComponentFixture<T>) => {
          this.fixture = fixture;
        }) as PromiseLike<ComponentFixture<T>>;
    }
  };
  public get = {
    /**
     * Get mounted component
     * @returns {ComponentFixture<T>}
     */
    component: (): T => this.fixture.componentInstance
  };
}
