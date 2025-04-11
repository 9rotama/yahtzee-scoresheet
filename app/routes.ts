import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    layout("routes/idle-layout.tsx", [
      index("routes/home.tsx"),
      //route("settings/players", "routes/home.tsx"),
      //route("settings/rules", "routes/home.tsx"),
      //route("histories", "routes/home.tsx"),
      //route("histories/:id", "routes/home.tsx"),
      //route("results/:id", "routes/home.tsx"),
    ]),
    //layout("routes/playing-layout.tsx", [route("playing", "routes/home.tsx")]),
  ]),
] satisfies RouteConfig;
