import type { OutputEmitterRef, Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { MountConfig } from "cypress/angular";
import type { SinonStub } from "cypress/types/sinon";
import { StubbedInstanceCreator } from "ts-stubber";

/**
 * @class CypressAngularComponentHelper was designed designed for mounting angular components
 * @template T - component type
 * @classdes CypressAngularComponentHelper exposes the following public properties:
 * @property when - enables mounting of an Angular component
 * @property get - enables getting the mounted component
 */
export class CypressAngularComponentHelper<T> {
  /** @private */
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
     * @param component
     * @param config
     * @param props
     */
    mount: (
      component: Type<T> | string,
      config: MountConfig<T>,
      props?: Partial<{
        [P in keyof T]: T[P];
      }>
    ) => {
      // @ts-ignore
      const mountResponse = cy.mount<T>(component, {
        ...config,
        autoSpyOutputs: true,
        componentProperties: {
          ...config.componentProperties,
          ...props
        }
      });
      return mountResponse
        .its("fixture")
        .then((fixture: ComponentFixture<T>) => {
          this.fixture = fixture;
          this.stubAngularOutputSignals(fixture);
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

  private stubAngularOutputSignals(fixture: ComponentFixture<any>) {
    const component = fixture.componentInstance;
    const createStub = (prop: string) =>
      cy.stub().as("OutputEventEmitterRef." + prop) as unknown as SinonStub;
    const stubbedInstanceCreator = StubbedInstanceCreator<
      OutputEmitterRef<any>,
      SinonStub
    >(createStub);

    Object.keys(component)
      .filter(key =>
        component[key].constructor.name.startsWith("OutputEmitter")
      )
      .forEach(key => {
        if (!component[key].emit.isSinonProxy)
          component[key] = stubbedInstanceCreator.createStubbedInstance();
        component[key].emit = cy.spy().as(`${key}Spy`);
      });
  }
}
