/// <reference types="cypress" />
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
     * mount an angular component
     * @see example {@link https://eos2git.cec.lab.emc.com/data-manager/test-utils/blob/8c3d553c9b7c63005c4f681324257e93f03af442/examples/angular/pokemon-catalog/src/app/pokemon-catalog/pokemon-catalog.component.driver.ts#L30}
     * @example
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
      mountResponse.its("fixture").then((fixture: ComponentFixture<T>) => {
        this.fixture = fixture;
      });
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
