import Layout from "components/layout/layout";
import DetailPage from "pages/detail-page";
import HomePage from "pages/home-page";
import { LoginPage } from "pages/login-page";
import MyPage from "pages/my-page";
import RegisterPage from "pages/my-page/components/register-product/registered-product";
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
        path: "/products/detail/:id",
        element: <DetailPage />,
      },
      {  
        path: "/my-page",
        element: <MyPage />,
      },
      {
        path: "/my-page/registerProductForm",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
