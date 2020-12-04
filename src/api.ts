const lazyapi = require('@felbry/lazyapi').lazyapi

const o = {
  'get:/mock/1706/condition': true,
  'get:/mock/1706/table-list': true
}

export default lazyapi(o, {
  host: 'http://yapi.zuoyebang.cc'
})
