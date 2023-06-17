import { useCallback, useReducer } from "react";

const ANIMATE_REDUCER_ACTIONS = {
  ANIMATE: "ANIMATE",
};

const animateActionsArray = [
  ...Object.values(ANIMATE_REDUCER_ACTIONS),
] as const;

type AnimateActionReturnedTypes = (typeof animateActionsArray)[number];

export interface SearchAnimationObject {
  opacity: number;
  y?: number;
  x?: number;
}

export type SearchAnimateState = {
  initial: SearchAnimationObject;
  exit: SearchAnimationObject;
};

type SearchReducerAction = {
  type: AnimateActionReturnedTypes;
  payload: SearchAnimateState;
};

type SetAnimateStateSearchType = (
  initial: SearchAnimationObject,
  exit: SearchAnimationObject
) => void;

export const searchAnimateInit = {
  initial: { opacity: 0.5, y: 100 },
  exit: { opacity: 0, y: 0 },
};

export const useAnimateSearchManager = () => {
  const [animateStateSearch, dispatch] = useReducer(
    (
      state: SearchAnimateState,
      action: SearchReducerAction
    ): SearchAnimateState => {
      switch (action.type) {
        case ANIMATE_REDUCER_ACTIONS.ANIMATE:
          if (!action.payload) {
            throw new Error("Search animate state must have payload");
          }

          return {
            ...state,
            initial: action.payload.initial,
            exit: action.payload.exit,
          };
        default:
          return { ...state };
      }
    },
    searchAnimateInit
  );

  const setAnimateStateSearch = useCallback<SetAnimateStateSearchType>(
    (initial, exit) => {
      dispatch({
        type: ANIMATE_REDUCER_ACTIONS.ANIMATE,
        payload: {
          initial,
          exit,
        },
      });
    },
    []
  );

  return { animateStateSearch, setAnimateStateSearch };
};

export type SearchListAnimationObject = Required<
  Omit<SearchAnimationObject, "y">
>;

export type SearchListAnimateState = {
  initial: SearchListAnimationObject;
  exit: SearchListAnimationObject;
};

type SearchListReducerAction = {
  type: AnimateActionReturnedTypes;
  payload: SearchListAnimateState;
};

type SetAnimateStateSearchListType = (
  initial: SearchListAnimationObject,
  exit: SearchListAnimationObject
) => void;

export const searchListAnimateInit = {
  initial: { x: -300, opacity: 0 },
  exit: { x: -300, opacity: 0 },
};

export const useAnimateListManager = () => {
  const [animateStateList, dispatch] = useReducer(
    (
      state: SearchListAnimateState,
      action: SearchListReducerAction
    ): SearchListAnimateState => {
      switch (action.type) {
        case ANIMATE_REDUCER_ACTIONS.ANIMATE: {
          if (!action.payload) {
            throw new Error("Search animate state must have payload");
          }
          return {
            ...state,
            initial: action.payload.initial,
            exit: action.payload.exit,
          };
        }
        default: {
          return { ...state };
        }
      }
    },
    searchListAnimateInit
  );

  const setAnimateStateList = useCallback<SetAnimateStateSearchListType>(
    (initial, exit) => {
      dispatch({
        type: "ANIMATE",
        payload: {
          initial,
          exit,
        },
      });
    },
    []
  );

  return { animateStateList, setAnimateStateList };
};
