# 注意事项

1. 引入vue组件路径必须为 `*.vue`  
2. 不允许使用 `vue-router`  
3. 会遍历`pages/App.page` 不存在将会在`html`中生成对应的出口html模板，存在则忽略  
4. 会判断`pages/App.page` 同级是否存在`main.js`,不存在将会自动生成  
5. 支持目录嵌套并按照嵌套规则编译为对应的路径，但是文件夹名称存在限制  
6. `vue` 无需手动`import`已经使用script方式引入了