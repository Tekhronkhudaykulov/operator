import { APP_ROUTES } from ".";
import { Home, Login, Net } from "../views";

export const _routes = [
  {
    path: APP_ROUTES.HOME,
    element: Home,
    exact: true,
  },
  {
    path: APP_ROUTES.NET,
    element: Net,
    exact: true,
  },
];

export const _auth_routes = [
  {
    path: APP_ROUTES.LOGIN,
    element: Login,
  },
];
