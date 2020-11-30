<template>
  <div>
    <Condition :condition="condition" export-path="/ff" @search="search" />
    <TableList />
  </div>
</template>
<script lang="ts">
import { Condition, TableList } from '@/export.ts'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    Condition,
    TableList
  }
})
export default class Home extends Vue {
  condition = [
    {
      key: 'taskId',
      label: '任务ID：',
      defaultVal: '',
      'type:text': {
        placeholder: '请输入任务ID'
      }
    },
    {
      key: 'sxtj',
      label: '筛选途径：',
      defaultVal: '',
      'type:select': {}
    },
    {
      key: 'cst',
      label: '拆书投放状态：',
      defaultVal: '',
      'type:select': {}
    },
    {
      key: 'yxj',
      label: '优先级：',
      defaultVal: '',
      'type:select': {}
    },
    {
      key: 'yfdffg',
      label: '创建时间：',
      defaultVal: [],
      'type:daterange': {}
    },
    {
      key: 'yffdddffg',
      label: '序号范围：',
      defaultVal: [],
      'type:numrange': {}
    }
  ]

  search () {
    // console.log(form)
  }
}
</script>
<style lang="less" scoped></style>
