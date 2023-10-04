const fs = require("fs");
const features = fs
  .readdirSync("src/features")
  .map((it) => ({ name: it, value: it }));
module.exports = function (plop) {
  const normalComponentTemplatePath =
    "plop-templates/component/normal/normal.tsx.hbs";
  const pageComponentTemplatePath =
    "plop-templates/component/page/page.tsx.hbs";
  const defaultExportTemplatePath = "plop-templates/component/index.ts.hbs";
  const cssModulesTemplatePath =
    "plop-templates/component/module.module.css.hbs";
  plop.setGenerator("common", {
    description: "common component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name please (PascalCase)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
        templateFile: normalComponentTemplatePath,
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.module.css",
        templateFile: cssModulesTemplatePath,
      },
      {
        type: "add",
        path: "src/components/{{name}}/index.ts",
        templateFile: defaultExportTemplatePath,
      },
    ],
  });
  plop.setGenerator("feature", {
    description: "feature component",
    prompts: [
      {
        type: "list",
        name: "featureName",
        message: "feature name please",
        choices: features,
      },
      {
        type: "input",
        name: "name",
        message: "component name please (PascalCase)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/features/{{featureName}}/components/{{name}}/{{name}}.tsx",
        templateFile: normalComponentTemplatePath,
      },
      {
        type: "add",
        path: "src/features/{{featureName}}/components/{{name}}/{{name}}.module.css",
        templateFile: cssModulesTemplatePath,
      },
      {
        type: "add",
        path: "src/features/{{featureName}}/components/{{name}}/index.ts",
        templateFile: defaultExportTemplatePath,
      },
    ],
  });
  plop.setGenerator("page", {
    description: "page component",
    prompts: [
      { type: "input", name: "routeName", message: "route name please" },
      {
        type: "input",
        name: "name",
        message: "component name please (PascalCase)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/app/{{routeName}}/page.tsx",
        templateFile: pageComponentTemplatePath,
      },
      {
        type: "add",
        path: "src/app/{{routeName}}/page.module.css",
        templateFile: cssModulesTemplatePath,
      },
    ],
  });
};
