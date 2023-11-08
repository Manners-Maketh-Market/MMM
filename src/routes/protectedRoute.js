import { isLoginSelector } from "Recoil/TokenAtom";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

// 회원 전용 페이지 (protected route)
const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  // 강제로 로그인 페이지로 들어온 경우, 직전에 유저가 하려던 일을 계속할 수 있도록 해주기
  const currentLocation = useLocation();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/sign-in"}
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
};
export default ProtectedRoute;
