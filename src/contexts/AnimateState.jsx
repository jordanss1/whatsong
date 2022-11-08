import { useCallback, useReducer } from "react";

export const useAnimateSearchManager = (initialState) => {
  const [animateStateSearch, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ANIMATE":
        return {
          initial: action.initial,
          exit: action.exit,
        };
    }
  }, initialState);

  const setAnimateStateSearch = useCallback((initial, exit) => {
    dispatch({
      type: "ANIMATE",
      initial,
      exit,
    });
  }, []);

  return { animateStateSearch, setAnimateStateSearch };
};

export const useAnimateListManager = (initialState) => {
  const [animateStateList, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ANIMATE":
        return {
          initial: action.initial,
          exit: action.exit,
        };
    }
  }, initialState);

  const setAnimateStateList = useCallback((initial, exit) => {
    dispatch({
      type: "ANIMATE",
      initial,
      exit,
    });
  }, []);

  return { animateStateList, setAnimateStateList };
};
