import { MemoryRouter, Router } from "react-router-dom";
import { useContext } from "react";
import { render } from "@testing-library/react";
import { history } from ".";

//This component great for testing <Link/> components as it uses MemoryRouter
//Only for route testing of Links (not useNavigate), no context, so provide the entry prop for initial route (initialEntries)

export const LinkRouterProvider = ({ children, entry }) => {
  return <MemoryRouter initialEntries={entry}>{children}</MemoryRouter>;
};

//This component great for testing navigation using useNavigate hook
//Custom history added already

export const NavigationRouter = ({ children }) => {
  return (
    <Router location={history.location} navigator={history}>
      {children}
    </Router>
  );
};

//These are HOCs that provide either useContext by itself or a mix of Context/useNavigate or Context/Link components
//Dynamically provide the required store/context

export const Context = ({ children, context }) => {
  const ContextComponent = context;
  const fullProviders = useContext(context);

  return (
    <ContextComponent.Provider value={fullProviders}>
      {children}
    </ContextComponent.Provider>
  );
};

export const Store = ({ children, store, context }) => {
  const StoreComponent = store;

  return (
    <StoreComponent>
      <Context context={context}>{children}</Context>
    </StoreComponent>
  );
};

export const NavigationAndStore = ({ children, store, context }) => {
  const StoreComponent = store;

  return (
    <Router location={history.location} navigator={history}>
      <StoreComponent>
        <Context context={context}>{children}</Context>
      </StoreComponent>
    </Router>
  );
};

export const LinkAndStoreWrapper = ({
  children,
  initialEntriesForMemRouter,
  store,
  context,
}) => {
  const StoreComponent = store;
  return (
    <MemoryRouter entry={initialEntriesForMemRouter}>
      <StoreComponent>
        <Context context={context}>{children}</Context>
      </StoreComponent>
    </MemoryRouter>
  );
};

//Creates customer component with a wrapper component

export const customRender = (wrapper, components) => {
  return render(components, { wrapper: wrapper });
};
