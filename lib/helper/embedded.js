/**
 * 一维数组转内嵌对象，数据分组
 * @param {*} data 输入数组
 * @param {*} id 指定要转换的id
 * @param {*} fieldName 分组字段
 */
let embedded = function (data, id, fieldName) {

   // 数组转对象
   let objData = {}
   for (let item of data) {
      objData[item[id]] = item
   }

   // 父ID分组
   let container = {}
   for (let item of data) {
      if (!container[item[fieldName]]) {
         container[item[fieldName]] = []
      }
      container[item[fieldName]].push(item)
   }

   // 水平转内嵌
   let Root = []
   for (let item of data) {
      let parent = objData[item[fieldName]]
      if (parent) {
         if (!parent.sub) {
            parent.sub = []
         }
         parent.sub.push(item)
      } else {
         Root.push(item)
      }
   }

   return Root

}

// let data = [
//    { id: 1, pid: 0 },
//    { id: 2, pid: 0 },
//    { id: 3, pid: 1 },
//    { id: 4, pid: 2 },
//    { id: 5, pid: 1 },
//    { id: 6, pid: 0 },
//    { id: 7, pid: 4 }
// ]


// data = embedded(data, 'id', 'pid')

// console.log(JSON.stringify(data))


module.exports = embedded