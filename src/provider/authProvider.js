import AuthApi from "apis/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";
import TokenRepository from "repository/TokenRepository";

const AuthContext = createContext();
// const navigate = Navigate();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(TokenRepository.getToken());
  useEffect(() => {
    const token = TokenRepository.getToken();
    if (token) setAccessToken(token);
  });

  return (
    <AuthContext.Provider value={[accessToken, setAccessToken]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const [accessToken, setAccessToken] = useContext(AuthContext);
  // TypeError: undefined is not iterable
  const signIn = async ({ email, password }, option) => {
    try {
      const response = await AuthApi.signIn(email, password);
      setAccessToken(response.data.token);
      TokenRepository.setToken(response.data.token);
      if (TokenRepository.getToken()) {
        option.onSuccess();
        // navigate("/");
      }
    } catch (err) {
      option.onFailure(err);
    }
  };

  const signUp = async ({ email, password }, option) => {
    const response = await AuthApi.signUp(email, password);
    option.onSuccess(response);
  };

  const signOut = async () => {
    await AuthApi.signOut();
    setAccessToken(null);
    TokenRepository.deleteToken();
    // navigate("/");
  };

  return {
    isLogin: !!accessToken,
    accessToken,
    signIn,
    signUp,
    signOut,
  };
};
