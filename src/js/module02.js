// module02 使用统一暴露
const obj = { name: '混沌魔君索伦森', area: '宇宙', age: 20000 }

function f() { console.log("++++++++++++++++")}

const msg = "new sky"

export { obj as SLS, f as printPlus, msg }