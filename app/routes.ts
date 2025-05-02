import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),

    layout("routes/(idle)/layout.tsx", [
      route("settings/players", "routes/(idle)/settings/players.tsx"),
      route("settings/rules", "routes/(idle)/settings/rules.tsx"),
      route("results/:id", "routes/(idle)/results.tsx"),

      //route("histories", "routes/home.tsx"),
      //route("histories/:id", "routes/home.tsx"),
      //route("results", "routes/home.tsx"),
    ]),
    layout("routes/(playing)/layout.tsx", [
      route("game", "routes/(playing)/game.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
