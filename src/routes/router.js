import Layout from "components/layout/layout";
import { LoginPage } from "pages/login-page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Layout />,
  //   children: [],
  // },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

export default router;
