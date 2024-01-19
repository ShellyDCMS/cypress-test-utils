import { mount } from "cypress/react18";
import type {
  Attributes,
  ComponentClass,
  FunctionComponent,
  ReactNode
} from "react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

/**
 * @class CypressReactComponentHelper was designed designed for mounting react components
 * @classdes CypressReactComponentHelper exposes the following public properties:
 * @property when - enables mounting of a React component
 * @property get - enables getting the mounted component
 */
export class CypressReactComponentHelper {
  private component: React.ReactNode;

  public when = {
    /**
     * Mount a react component
     * @param type
     * @param props
     * @param children
     */
    mount: <
      P extends {},
      T extends
        | FunctionComponent<P>
        | ComponentClass<P>
        | ((props: P) => JSX.Element)
    >(
      type: T | string,
      props?: (Attributes & P) | null,
      ...children: ReactNode[]
    ) => {
      const mountResponse = mount(
        React.createElement(type, props, ...children)
      );
      mountResponse.its("component").then((component: React.ReactNode) => {
        this.component = component;
      });
    },
    /**
     * Mount a react component wrapped in a route
     * @param component
     * @param route
     * @param path
     * @example
     * ```ts
     *  const id = '9';
     *  reactComponentHelper.when.routeWrappedMount({ typeof PokemonDetails, `/id/${id}`, "id/:id" });
     * ```
     */
    routeWrappedMount: <
      P extends {},
      T extends
        | FunctionComponent<P>
        | ComponentClass<P>
        | ((props: P) => JSX.Element)
    >(
      {
        type,
        route,
        path
      }: {
        type: T | string;
        route: string;
        path: string;
      },
      props?: (Attributes & P) | null,
      ...children: ReactNode[]
    ) => {
      window.history.pushState({}, "", route);
      const wrapped = (
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route
              element={React.createElement(type, props, ...children)}
              path={path}
            />
          </Routes>
        </MemoryRouter>
      );
      const mountResponse = mount(wrapped);
      mountResponse.its("component").then((component: React.ReactNode) => {
        this.component = component;
      });
    }
  };
  public get = {
    /**
     * Get mounted component
     * @returns {ReactNode}
     */
    component: () => this.component
  };
}
