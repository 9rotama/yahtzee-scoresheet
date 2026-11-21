import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),

    layout("routes/(idle)/layout.tsx", [
      route("settings/players", "routes/(idle)/settings/players.tsx"),
      route("settings/rules", "routes/(idle)/settings/rules.tsx"),
      route("results/:id", "routes/(idle)/results.tsx"),
      route("histories", "routes/(idle)/histories/index.tsx"),
      route("histories/:id", "routes/(idle)/histories/detail.tsx"),
      route("credits", "routes/(idle)/credits.tsx"),

      //route("results", "routes/home.tsx"),
    ]),
    layout("routes/(playing)/layout.tsx", [
      route("game", "routes/(playing)/game.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
