import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const Detail = React.lazy(() => import("../pages/detail/Detail"));
export const mainRoute = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:category/search/:keyword",
    element: <Catalog />,
  },
  {
    path: "/:movie",
    element: <Catalog />,
  },
  {
    path: "/:category/:id",
    element: <Detail />,
  },
  {
    path: "401",
    element: <p>No Authorization Found</p>,
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
];
