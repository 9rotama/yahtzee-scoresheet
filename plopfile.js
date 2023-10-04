const fs = require("fs");

const features = fs
  .readdirSync("src/features")
  .map((it) => ({ name: it, value: it }));

module.exports = function (plop) {
  plop.setGenerator("normal", {
    description: "normal component",
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
        path: "src/components/{{name}}/index.tsx",
        templateFile: "plop-templates/component/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{name}}/index.module.css",
        templateFile: "plop-templates/component/index.module.css.hbs",
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
        path: "src/features/{{featureName}}/components/{{name}}/index.tsx",
        templateFile: "plop-templates/component/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/features/{{featureName}}/components/{{name}}/index.module.css",
        templateFile: "plop-templates/component/index.module.css.hbs",
      },
    ],
  });
  plop.setGenerator("page", {
    description: "page component",
    prompts: [
      {
        type: "input",
        name: "routeName",
        message: "route name please",
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
        path: "src/app/{{routeName}}/page.tsx",
        templateFile: "plop-templates/page-component/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/app/{{routeName}}/page.module.css",
        templateFile: "plop-templates/page-component/index.module.css.hbs",
      },
    ],
  });
};
