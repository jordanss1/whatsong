import { MemoryRouter, Router } from "react-router-dom";
import { useContext } from "react";

//This component is great for wrapping the context in the store for a test
//Dynamically provide the store component prop

export const Store = ({ children, store }) => {
  const StoreComponent = store;
  return <StoreComponent>{children}</StoreComponent>;
};

//This component great for testing <Link/> components as it uses MemoryRouter
//Only for route testing of Links (not useNavigate), no context, so provide the entry prop for initial route (initialEntries)

export const LinkRouterProvider = ({ children, entry }) => {
  return <MemoryRouter initialEntries={entry}>{children}</MemoryRouter>;
};

//This component great for testing <Link/> components as it uses MemoryRouter
//Dynamically provide props for the store component and the initial route (initialEntries)

export const LinkRouterAndStore = ({ children, entry, store }) => {
  const StoreComponent = store;

  return (
    <MemoryRouter initialEntries={entry}>
      <StoreComponent>{children}</StoreComponent>
    </MemoryRouter>
  );
};

//This component great for testing navigation using useNavigate hook
//Provide customer history object as prop

export const NavigationRouter = ({ children, history }) => {
  return (
    <Router location={pathname} navigator={history}>
      {children}
    </Router>
  );
};

//Same as above but also dynamically provide store component as prop

export const NavigationAndStore = ({ children, history, store, pathname }) => {
  const StoreComponent = store;

  return (
    <Router location={pathname} navigator={history}>
      <StoreComponent>{children}</StoreComponent>
    </Router>
  );
};

//This component is great for supplying the context object to the child component
//Great for testing components that useContext
//These two at the bottom should be wrapped in any of the above

export const Context = ({ children, context }) => {
  const ContextComponent = context;
  const fullProviders = useContext(context);

  return (
    <ContextComponent.Provider value={fullProviders}>
      {children}
    </ContextComponent.Provider>
  );
};

//This component should not be exported, but defined in the test environment
//The tested component can be passed as the argument

const testComponent = (...component) => {
  return <Context>{component}</Context>;
};
