import AuthApi from "apis/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import TokenRepository from "repository/TokenRepository";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // user의 로그인/로그아웃 여부를 알 수 있는 state
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

// accessToken에 data 넣기
export const useAuth = () => {
  const [accessToken, setAccessToken] = useContext(AuthContext);
  const signIn = async ({ email, password }, option) => {
    try {
      const response = await AuthApi.signIn(email, password);
      setAccessToken(response.data.token);
      TokenRepository.setToken(response.data.token);
      if (TokenRepository.getToken()) {
        option.onSuccess();
      }
    } catch (err) {
      option.onFailure(err);
    }
  };

  // signUp이 여러 군데에 있다면 authProvider에 작성
  const signUp = async ({ email, password }, option) => {
    const response = await AuthApi.signUp(email, password);
    option.onSuccess(response);
  };

  const signOut = async () => {
    await AuthApi.signOut();
    setAccessToken(null); // 유효하지 않은 Token
    TokenRepository.deleteToken();
  };

  return {
    // !!accessToken > 값이 있는 거에 !! 붙이면 불리언 형태로 변함
    // isLogin: !!accessToken,
    accessToken,
    signIn,
    signUp,
    signOut,
  };
};
