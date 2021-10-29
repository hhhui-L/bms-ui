<template>
  <div style="padding: 10px">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="2">
        <el-select v-model="conditionQueryAlarmType.alarmType" placeholder="请选择报警类型">
          <el-option
            v-for="item in alarmType"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="conditionQueryAlarmType.alarmLevel" placeholder="请选择报警等级">
          <el-option
            v-for="item in alarmLevel"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="conditionQuery">查询</el-button>
        <el-button type="primary" icon="el-icon-add-location" @click="dialogFormAdd = true">添加</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearCondition">清空</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="alarmTypeTable"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
    >
      <el-table-column
        type="index"
        label="序号"
        prop="order"
        width="55"
        :index="dataIndex"
        align="center">
      </el-table-column>
      <el-table-column label="id" v-if="false" min-width="150px" prop="id" align="center"></el-table-column>
      <el-table-column label="报警类型" min-width="150px" prop="alarmType" align="center"></el-table-column>
      <el-table-column label="报警等级" min-width="150px" prop="alarmLevel" align="center"></el-table-column>
      <el-table-column label="创建时间" min-width="150px" prop="createTime" align="center"></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加报警信息" :visible.sync="dialogFormAdd" width="25%">
      <el-form :model="alarmTypeFormAdd" :rules="rules" ref="ruleForm">
        <el-form-item label="报警类型" prop="alarmType" :label-width="formLabelWidth">
          <el-select v-model="alarmTypeFormAdd.alarmType" placeholder="请选择报警类型">
            <el-option
              v-for="item in alarmType"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="报警等级" prop="alarmLevel" :label-width="formLabelWidth">
          <el-select v-model="alarmTypeFormAdd.alarmLevel" placeholder="请选择报警等级">
            <el-option
              v-for="item in alarmLevel"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="submitAlramtypeAdd('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改报警信息" :visible.sync="dialogFormEdit" width="25%">
      <el-form :model="alarmTypeFormEdit" :rules="rulesEdit" ref="ruleFormEdit">
        <el-form-item label="报警类型" prop="alarmType" :label-width="formLabelWidth">
          <el-select v-model="alarmTypeFormEdit.alarmType" :disabled="canNotEdit" placeholder="请选择报警类型">
            <el-option
              v-for="item in alarmType"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="报警等级" prop="alarmLevel" :label-width="formLabelWidth">
          <el-select v-model="alarmTypeFormEdit.alarmLevel" placeholder="请选择报警等级">
            <el-option
              v-for="item in alarmLevel"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <!--        dialogFormAdd = false-->
        <el-button type="primary" @click="updateAlarmType('ruleFormEdit')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDelete"
      width="30%"
    >
      <span style="font-size: 20px">确定要进行删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="danger" @click="doDelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { formatDate } from '@/network/time'
import {
  addAlarmType, conditionQueryAlarmType,
  deleteAlarmType,
  getAlarmType,
  updateAlarmType
} from '@/network/alarmType'

export default {
  name: 'type',
  data () {
    return {
      alarmTypeTable: [],
      dialogFormAdd: false,
      dialogFormEdit: false,
      dialogVisibleDelete: false,
      canNotEdit: true,
      findAlarmType: {
        alarmType: '',
        alarmLevel: '',
        createTime: '',
        id: ''
      },
      conditionQueryAlarmType: {
        alarmType: '',
        alarmLevel: ''
      },
      alarmTypeFormAdd: {
        alarmType: '',
        alarmLevel: '',
        createTime: ''
      },
      alarmTypeFormEdit: {
        alarmType: '',
        alarmLevel: ''
      },
      rules: {
        alarmType: [
          { required: true, message: '请选择报警类型', trigger: 'blur' }
        ],
        alarmLevel: [
          { required: true, message: '请选择报警等级', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        alarmType: [
          { required: true, message: '请选择报警类型', trigger: 'blur' }
        ],
        alarmLevel: [
          { required: true, message: '请选择报警等级', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      alarmTypeAdd: {
        alarmType: '',
        alarmLevel: '',
        createTime: '',
        id: '0'
      },
      alarmTypeUpdate: {
        alarmType: '',
        alarmLevel: '',
        createTime: '',
        id: ''
      },
      alarmTypeDelete: {
        alarmType: '',
        alarmLevel: '',
        createTime: '',
        id: ''
      },
      queryInfo: {
        alarmType: '',
        alarmLevel: '',
        createTime: '',
        id: ''
      },
      dataIndex: 1,

      laboratory: [{
        value: '1',
        label: '湖南大学实验室'
      }],
      alarmType: [
        {
          value: '0',
          label: '温度过高'
        }, {
          value: '1',
          label: '温度过低'
        }, {
          value: '2',
          label: '电压过高'
        }, {
          value: '3',
          label: '电压过低'
        }, {
          value: '4',
          label: '电池电量低'
        }, {
          value: '5',
          label: '电池内阻过高'
        }
        // {
      //   value: '0',
      //   label: '环境温度超温报警'
      // }, {
      //   value: '1',
      //   label: '整组低压'
      // }, {
      //   value: '2',
      //   label: '预维护报警'
      // }, {
      //   value: '3',
      //   label: '传感器故障'
      // }, {
      //   value: '4',
      //   label: '内阻报警'
      // }, {
      //   value: '5',
      //   label: '整组过压'
      // }, {
      //   value: '6',
      //   label: 'SOC过低'
      // }, {
      //   value: '7',
      //   label: '应急放电过流'
      // }, {
      //   value: '8',
      //   label: '单体电压过高'
      // }, {
      //   value: '9',
      //   label: '充电过流'
      // }, {
      //   value: '10',
      //   label: '电容量过低'
      // }
      ],
      alarmLevel: [{
        value: '1',
        label: '一级'
      }, {
        value: '2',
        label: '二级'
      }, {
        value: '3',
        label: '三级'
      }]
    }
  },
  mounted () {
    this.getAlarmType()
  },
  methods: {
    submitAlramtypeAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alarmTypeAdd.alarmType = this.alarmTypeFormAdd.alarmType
          this.alarmTypeAdd.alarmLevel = this.alarmTypeFormAdd.alarmLevel
          this.alarmTypeAdd.createTime = formatDate()
          console.log('---this.alarmTypeAdd--' + JSON.stringify(this.alarmTypeAdd))
          addAlarmType(this.alarmTypeAdd).then(res => {
            console.log('-----' + JSON.stringify(res.data))
            if (res.data.code === 200) {
              alert('添加成功!')
              this.dialogFormAdd = false
              this.getAlarmType()
            } else {
              alert('添加失败!')
              this.dialogFormAdd = false
            }
          }).catch(res => {
            console.log(res.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateAlarmType (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alarmTypeUpdate.alarmType = this.alarmTypeFormEdit.alarmType
          this.alarmTypeUpdate.alarmLevel = this.alarmTypeFormEdit.alarmLevel
          this.alarmTypeUpdate.createTime = formatDate()
          this.alarmTypeUpdate.id = this.alarmTypeFormEdit.id
          console.log('---this.alarmTypeUpdate--' + JSON.stringify(this.alarmTypeUpdate))

          updateAlarmType(this.alarmTypeUpdate).then(res => {
            console.log('-----' + res.data)
            if (res.data.code === 200) {
              this.getAlarmType()
              alert('修改成功!')
              this.dialogFormEdit = false
            } else {
              alert('修改失败!')
              this.dialogFormEdit = false
            }
          }).catch(res => {
            console.log('-----' + res.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取数据
    getAlarmType () {
      getAlarmType(this.findAlarmType).then(res => {
        console.log('---this.findAlarmType--' + JSON.stringify(this.findAlarmType))
        console.log('-----' + JSON.stringify(res.data))
        this.alarmTypeTable = res.data
      }).catch(res => {
        console.log(res.data)
      })
    },
    conditionQuery () {
      this.queryInfo.alarmType = this.conditionQueryAlarmType.alarmType
      this.queryInfo.alarmLevel = this.conditionQueryAlarmType.alarmLevel
      console.log(JSON.stringify(this.queryInfo))
      conditionQueryAlarmType(this.queryInfo).then(res => {
        console.log('-----' + JSON.stringify(res.data))
        this.alarmTypeTable = res.data
      }).catch(res => {
        console.log(res.data)
      })
    },
    clearCondition () {
      this.conditionQueryAlarmType.alarmType = ''
      this.conditionQueryAlarmType.alarmLevel = ''
    },
    handleEdit (val) {
      console.log(val.id)
      this.dialogFormEdit = true
      this.alarmTypeFormEdit.alarmType = val.alarmType
      this.alarmTypeFormEdit.alarmLevel = val.alarmLevel
      this.alarmTypeFormEdit.id = val.id
    },
    handleDelete (val) {
      this.alarmTypeDelete.alarmType = val.alarmType
      this.alarmTypeDelete.createTime = val.createTime
      this.alarmTypeDelete.alarmLevel = val.alarmLevel
      this.alarmTypeDelete.id = val.id
      console.log('---this.alarmTypeDelete--' + JSON.stringify(this.alarmTypeDelete))
      this.dialogVisibleDelete = true
    },
    doDelete () {
      console.log('---this.alarmTypeDelete--' + JSON.stringify(this.alarmTypeDelete))
      deleteAlarmType(this.alarmTypeDelete).then(res => {
        console.log('-----' + res.data)
        if (res.data.code === 200) {
          this.getAlarmType()
          alert('删除成功!')
          this.dialogVisibleDelete = false
        } else {
          alert('删除失败!')
          this.dialogVisibleDelete = false
        }
      })
      this.dialogVisibleDelete = false
    }
  }
}
</script>

<style scoped>

</style>
