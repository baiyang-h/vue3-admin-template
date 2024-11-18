// 是否字符串
export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

// 是否数字
export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

// 是否boolean
export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

// 是否函数
export const isFunction = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

// 是否为null
export const isNull = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

// 是否undefined
export const isUndefined = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

// 是否对象
export const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

// 是否数组
export const isArray = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

// 是否时间
export const isDate = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

// 是否正则
export const isRegExp = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

// 是否错误对象
export const isError = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

// 是否Symbol函数
export const isSymbol = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

// 是否Promise对象
export const isPromise = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

// 是否Set对象
export const isSet = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}

// 判断给定变量是否是未定义，当变量值为 null时，也会认为其是未定义
export const isUndef = (v) => {
  return v === undefined || v === null
}

// 判断给定变量是否是定义，当变量值为 null时，也会认为其是未定义
export const isDef = (v) => {
  return v !== undefined && v !== null
}

// 判断给定变量是否是原始类型值，即：string、number、boolean以及 symbol
export const isPrimitive  = (value) => {
  return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'symbol' ||
      typeof value === 'boolean'
  )
}
