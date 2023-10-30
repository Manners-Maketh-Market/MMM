import { createBrowserRouter } from "react-router-dom";
import Layout from "components/layout/layout";
import { LoginPage } from "pages/login-page";
import ProductListPage from "pages/product-list-page";
import SearchPage from "pages/search-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // useParams로 받을시 /: key가 되어서 페이지를 보여줌
      {
        path: "/products/:saleStatus",
        element: <ProductListPage />,
      },
      {
        path: "/products/search/:searchValue",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
