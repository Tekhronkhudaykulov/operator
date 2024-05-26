import { lazy } from "react";

// const Home = lazy(() => import("./home/view"));
const Login = lazy(() => import("../views/role/view"));
const Home = lazy(() => import("../views/operator/view"));
const Net = lazy(() => import("../views/net/view"));

export { Login, Home, Net };
