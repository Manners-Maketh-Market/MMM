import AuthApi from "apis/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";
import TokenRepository from "repository/TokenRepository";

const AuthContext = createContext();
//const navigate = Navigate();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(TokenRepository.getToken());

  // 새로고침 시 데이터 다시 넣어주기
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

// accessToken에 data 넣기
export const useAuth = () => {
  const [accessToken, setAccessToken] = useContext(AuthContext);

  // option : success & failure
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

  const signUp = async ({ email, password, nickName }, option) => {
    const response = await AuthApi.signUp(email, password, nickName);
    option.onSuccess(response);
  };

  const signOut = async () => {
    await AuthApi.signOut();
    setAccessToken(null);
    TokenRepository.deleteToken();
    // navigate("/sign-in"); // 다시 signIn 하세요
  };

  return {
    isLogin: !!accessToken,
    accessToken,
    signIn,
    signUp,
    signOut,
  };
};
