module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'application component files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `src/components/{{ name }}/styles.module.scss`,
        templateFile: 'generator-templates/styles.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `src/components/{{ name }}/index.tsx`,
        templateFile: 'generator-templates/component.hbs',
        abortOnFail: true,
      },
    ],
  });
};
