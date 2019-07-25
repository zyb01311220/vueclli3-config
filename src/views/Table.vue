<template>
   <div class="table">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column  label="" align="center" width="150" show-overflow-tooltip>
         <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="handleItem"></el-checkbox>
         </template>
         <template slot="header" slot-scope="slot">
            <el-checkbox v-model="checkall" :indeterminate="isIndeterminate" @change="handleChange"></el-checkbox>
         </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-button :type="change">保存选择</el-button>
   </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  name: "Table",
  data(){
    return{
       tableData: [{
            date: '2016-05-02',
            name: '王小1',
            address: '上海市普陀区金沙江路 1518 弄',
            checked:false
          }, {
            date: '2016-05-04',
            name: '王小2',
            address: '上海市普陀区金沙江路 1517 弄',
           checked:false
          }, {
            date: '2016-05-01',
            name: '王小3',
            address: '上海市普陀区金沙江路 1519 弄',
           checked:false
          }, {
            date: '2016-05-03',
            name: '王小4',
            address: '上海市普陀区金沙江路 1516 弄',
            checked:false
          }],
          change:'',
          multipleSelection:[],
          checkall:false,
          isIndeterminate: false
    }
  },
  methods:{
     rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData .splice(oldIndex, 1)[0]
            _this.tableData .splice(newIndex, 0, currRow)
            let newArray = _this.tableData.slice(0)
            _this.tableData= []
            _this.$nextTick(() => {
                _this.tableData = newArray
            })
        },
        onUpdate(){
            _this.change='primary';
        }
      })
    },
    handleChange(val){
         if(val){
             this.tableData.forEach(item=>{
                 item.checked=true;
             })
         }else{
             this.tableData.forEach(item=>{
                 item.checked=false;
             })
         }
    },
    handleItem(){
        let flag=this.tableData.every(item=>{
            return item.checked==true;
       })
        if(flag){
            this.isIndeterminate=false;
        }else{
            this.isIndeterminate=true;
            this.checkall=true;
        }
    }
  },
  mounted(){
   this.rowDrop();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /*color: #42b983;*/
  color:$bg;
}
</style>
