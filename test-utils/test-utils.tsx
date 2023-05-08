import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { history } from ".";

//This component great for testing <Link/> components as it uses MemoryRouter
//Only for route testing of Links (not useNavigate), no context, so provide the entry prop for initial route (initialEntries)

export const LinkRouterProvider = ({
  children,
  entry,
}: {
  children: ReactNode | ReactNode[];
  entry: string[];
}): ReactElement => {
  return <MemoryRouter initialEntries={entry}>{children}</MemoryRouter>;
};

//This component great for testing navigation using useNavigate hook
//Custom history added already

export const NavigationRouter = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  return (
    <Router location={history.location} navigator={history}>
      {children}
    </Router>
  );
};

//These are HOCs that provide a mix of Context/useNavigate or Context/Link components
//Dynamically provide the required store

export const Store = ({
  children,
  store,
}: {
  children: ReactNode;
  store: JSXElementConstructor<{ children: ReactNode }>;
}): ReactElement => {
  const StoreComponent = store;

  return <StoreComponent>{children}</StoreComponent>;
};

export const NavigationAndStore = ({
  children,
  store,
}: {
  children: ReactNode;
  store: JSXElementConstructor<{ children: ReactNode }>;
}): ReactElement => {
  const StoreComponent = store;

  return (
    <Router location={history.location} navigator={history}>
      <StoreComponent>{children}</StoreComponent>
    </Router>
  );
};

export const LinkAndStoreWrapper = ({
  children,
  initialEntriesForMemRouter,
  store,
}: {
  children: ReactNode;
  initialEntriesForMemRouter: string[];
  store: JSXElementConstructor<{ children: ReactNode }>;
}): ReactElement => {
  const StoreComponent = store;
  return (
    <MemoryRouter initialEntries={initialEntriesForMemRouter}>
      <StoreComponent>{children}</StoreComponent>
    </MemoryRouter>
  );
};

//Creates customer component with a wrapper component

export const customRender = (
  wrapper: JSXElementConstructor<{ children: ReactNode | ReactNode[] }>,
  components: ReactElement
) => {
  return render(components, { wrapper: wrapper });
};
