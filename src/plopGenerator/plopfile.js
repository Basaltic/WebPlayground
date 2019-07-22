const promptDirectory = require('inquirer-directory')

module.exports = plop => {
  // Helper函数可以用在模板里面
  plop.setHelper('upperCase', txt => txt.toUpperCase())

  // 直接在模板里面这边使用 {{> myTitlePartial }}，会替换为第二个参数的值
  plop.setPartial('myTitlePartial', '<h1>{{titleCase name}}</h1>')

  // 自定义Action类型。所谓的Action就是在最后一步，具体的逻辑行为（比如生成文件，删除文件等等）
  plop.setActionType('testAction', (answers, config, plop) => {
    // answer:
    //
    //
    console.log(answers, config)
  })

  // 设置自定义的交互
  plop.setPrompt('directory', promptDirectory)

  plop.setPrompt('directory2', (args) => {
    console.log(args)
  })

  plop.setGenerator('test', {
    description: 'Test Generator',
    prompts: [
      {
        type: 'directory',
        name: 'from',
        message: 'Where you like to put this component?',
        basePath: './src',
      },
      {
        type: 'directory',
        name: 'from2',
        message: 'Where you like to put this component?',
        basePath: './src',
      }
    ],
    actions: [
      {
        type: 'testAction',
        params: 'something',
      },
    ],
  })

  // plop.setGenerator('controller', {
  //   description: 'application controller logic',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'controller name please',
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: 'src/{{name}}.js',
  //       templateFile: './templates/controller.hbs',
  //     },
  //   ],
  // })
}
