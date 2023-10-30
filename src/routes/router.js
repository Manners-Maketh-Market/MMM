import Layout from "components/layout/layout";
import HomePage from "pages/home-page";
import { LoginPage } from "pages/login-page";
import MyPage from "pages/my-page";

import ProductListPage from "pages/product-list-page";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // useParams로 받을시 /: key가 되어서 페이지를 보여줌
      {
        path: "/products/:saleStatus",
        element: <ProductListPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
