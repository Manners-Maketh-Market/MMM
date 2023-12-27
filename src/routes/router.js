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
import EditMyPost from "pages/my-page/components/register-product/edit-post";

const router = createBrowserRouter([
  // sign-in & sign-up
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/MMM",
    element: <Layout />,
    children: [
      {
        path: "/MMM/home",
        element: <HomePage />,
      },
      // useParams로 받을시 /: key가 되어서 페이지를 보여줌
      {
        path: "/MMM/products/:saleStatus",
        element: <ProductListPage />,
      },
      {
        path: "/MMM/products/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/MMM/pricecheckpage/",
        element: <PriceCheckPage />,
      },
      {
        path: "/MMM/pricecheckpage/:title",
        element: <PriceCheckPage />,
      },
      {
        path: "/MMM/products/search/:searchValue",
        element: <SearchPage />,
      },
      {
        path: "/MMM/chat",
        element: <ChattingPage />,
      },
      {
        path: "/MMM/my-page",
        element: <MyPage />,
      },
      {
        path: "/MMM/my-page/registerProductForm",
        element: <RegisterPage />,
      },
      {
        path: "/MMM/edit-post/:editPostId",
        element: <EditMyPost />,
      },
    ],
  },
]);

export default router;
