import Layout from "components/layout/layout";
import DetailPage from "pages/detail-page";
import HomePage from "pages/home-page";
import { LoginPage } from "pages/login-page";
import PriceCheckPage from "pages/price-check-page";
import MyPage from "pages/my-page";
import RegisterPage from "pages/my-page/components/register-product/registered-product";
import ProductListPage from "pages/product-list-page";
import SearchPage from "pages/search-page";
import ChattingPage from "pages/chatting-page";
import { createBrowserRouter } from "react-router-dom";
import SignUpForm from "pages/login-page/components/signUp-form";
import ProtectedRoute from "./protectedRoute";
import ErrorPage from "pages/error-page";


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
        path: "/pricecheckpage/",
        element: <PriceCheckPage />,
      },
      {
        path: "/pricecheckpage/:title",
        element: <PriceCheckPage />,
      },
      {
        path: "/products/search/:searchValue",
        element: <SearchPage />,
      },
      {
        path: "/MMM/chat",
        element: <ChattingPage />,
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
  // sign-in & sign-up
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },

  /* protected route: users only */
  {
    element: <ProtectedRoute />,
    // children: [{path: "/my-page", element: <MyPage />,}, {path: "/my-page/registerProductForm", element: <RegisterPage />,},],
  },
]);

export default router;
