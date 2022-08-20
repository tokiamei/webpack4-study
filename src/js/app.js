/* 
    原来的理解：app.js 是汇总各个 js 模块的文件，所有模块需要引入到这里去使用
    理解进阶：app.js 是 webpack 的入口，所有外部文件(js、json、css、less等等)都需要在这里引入使用
*/
import { sum, sub } from './module01'
import {SLS, printPlus, msg} from './module02'
import school from './module03'

/* 为什么 json 文件不需要使用 ES6 暴露的语法也可以被引入 ？
    【理由】：json 文件内部默认使用了默认暴露的方式进行暴露
*/
import data from '../json/test.json'

/* 直接引入即可，引入样式直接会执行，接收了也没什么用，所以不用接受 */
import '../CSS/demo.css'
import '../CSS/demo01.less'
import '../CSS/iconfont.css'

sub(2, 1)
sum(10, 20)
console.log(SLS, msg, school)
printPlus()
console.log(data);
const a = 100
console.log(a);