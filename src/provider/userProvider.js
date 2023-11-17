import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  userList: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...state,
        userList: state.userList.concat(action.user),
      };
    case "SIGN_IN":
      return {
        ...state,
        user: {
          email: action.email,
          pw: action.pw,
          nickName: action.nickName,
          phone: action.phone,
          region: action.region,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider");
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider");
  return dispatch;
};
