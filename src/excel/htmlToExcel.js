// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// import { export_json_to_excel } from '@/excel/Export2Excel'

export default {
  // 导出Excel表格
  // exportExcel (name, tableName) {
  //   // name表示生成excel的文件名     tableName表示表格的id
  //   var sel = XLSX.utils.table_to_book(document.querySelector(tableName))
  //   var selIn = XLSX.write(sel, { bookType: 'xlsx', bookSST: true, type: 'array' })
  //   try {
  //     FileSaver.saveAs(new Blob([selIn], { type: 'application/octet-stream' }), name)
  //   } catch (e) { if (typeof console !== 'undefined') console.log(e, selIn) }
  //   return selIn
  // }
  export2Excel (excelData, tHeader, filterVal, title) {
    console.log('进入')
    require.ensure([], () => {
      const { export_json_to_excel } = require('@/excel/Export2Excel')
      // 这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
      const data = this.formatJson(filterVal, excelData)

      export_json_to_excel(tHeader, data, title) // 导出的表格名称，根据需要自己命名
    })
  },
  // 格式转换，直接复制即可,不需要修改什么
  formatJson (filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  }
}
