import { useRoutes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import { mainRoute } from "./mainRoute";

export const routeConfig = [
  {
    element: <MainLayout />,
    children: mainRoute,
  },
];

const RouterManager = () => {
  return useRoutes(routeConfig);
};

export default RouterManager;
