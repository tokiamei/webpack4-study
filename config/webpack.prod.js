/* 
    2022年7月30日21:57:25
    【1】该文件是 webpack 的配置文件，所有的 webpack 的任务、用到额 loader、plugins 都要配置在这里
    【2】该文件要符合 CJS 模块化规范
    ,
    
*/

// 引入 html-webpack-plugin，用于加工 html 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 mini-css-extract-plugin，用于提取 css 为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 引入 node 中内置的 path 模块，专门用于解决路径问题
const {resolve} = require('path');

// 写一个 baseCssLoader
const baseCssLoader = [MiniCssExtractPlugin.loader, "css-loader"]
// const baseCssLoader = ["style-loader", "css-loader"]

// 使用 CJS 的模块化规范，暴露一个对象，该对象是 webpack 的详细配置对象【规则】
module.exports = {
  // 工作模式
  mode: 'development',
  // 入口文件，在入口文件加上 ./src/index.html 就可以解决浏览器无法自动刷新的问题
  // entry: ['./src/js/app.js', './src/index.html'],
  entry: './src/js/app.js', 
  // 输出（出口）
  output: {
    // 输出文件路径，【__dirname】：当前文件所在文件夹的目录
    path: resolve(__dirname, '../build'),
    // 输出文件名，如下不能加 /，不然就报错
    filename: 'js/app.js',
    publicPath: '/build/'  
  },
  // module.rules 中配置一个一个的 loader
  module: {
    rules: [
      //#region 
      // 配置解析 CSS
      /* {
        test: /\.css$/i, // 该 loader 要处理的文件，匹配正则【所有结尾是 .css 的文件】
        // 后指定的 loader 先干活
        use: [ // use 数组中 loader 执行顺序：从右到左，从下到上，依次执行【类似于栈的结构与】
          "style-loader", // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
          "css-loader" // 将 css 文件变成 commonjs 模块加载到 js 中，里面内容是样式字符串
        ], 
      } */
      //#endregion
      // 复用方式配置
      {
        test: /\.css$/i,
        use: [...baseCssLoader]
      },

      // 配置解析 less
      {
        test: /\.less$/i, 
        use: [...baseCssLoader, "less-loader",], 
      },
      // 配置解析 html 样式中的图片
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 配置图片加工后存放的位置
              outputPath: 'imgs',
              // publicPath: './build/imgs',
              // 配置图片生成的名字 + 后缀
              name: '[hash:5].[ext]',
              limit: 8 * 1024
            }
          }
        ],
      },
      // 配置解析 html 中的图片
      {
        test: /\.html$/i,
        use: ['html-loader']
      },
      // 配置解析字体文件【配置其他资源】
      {
        exclude: /\.(html|less|css|png|jpg|bmp|js|gif|json)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 配置图片加工后存放的位置
              outputPath: 'media',
              // 配置图片生成的名字 + 后缀
              name: '[hash:5].[ext]'
            }
          }
        ],
      }
    ],
  },
  // plugins 中专门用于配置插件，插件必须进行实例化这一环节
  plugins: [
    // 实例化 HtmlWebpackPlugin，这句话的意思就是简单的创建一个 html 文件
    new HtmlWebpackPlugin({
      // 告诉 webpack 生成的 html 文件的模板，告诉它模板的位置
      template: './src/index.html'
    }),
    // 实例化 MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: 'CSS/index.css'
    })
  ],
};