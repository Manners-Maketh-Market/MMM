import Layout from "components/layout/layout";
import { HomePage } from "pages/home-page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Layout />,
  //   children: [],
  // },
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default router;
