<template>
  <div>
    <Condition :condition="condition" @search="search" />
    <TableList :list="list" :list-title="listTitle" />
    <el-pagination
      background
      :current-page.sync="pn"
      :page-size.sync="rn"
      :total="total"
      @size-change="search()"
      @current-change="search()"
    />
  </div>
</template>
<script>
import Condition from '@/components/condition.vue'
import TableList from '@/components/table-list.vue'
export default {
  components: {
    Condition,
    TableList
  },
  props: {
    getConditionFunc: {
      type: Function,
      default: () => Promise.resolve([])
    },
    getListFunc: {
      type: Function,
      default: () => Promise.resolve({ list: [], listTitle: [], total: 0 })
    }
  },
  data () {
    return {
      condition: [],
      list: [],
      listTitle: [],
      pn: 1,
      rn: 10,
      total: 0
    }
  },
  created () {
    this.getConditionFunc()
      .then(data => {
        this.condition = data
      })
  },
  methods: {
    search (conditionForm) {
      if (conditionForm) {
        this.pn = 1
      }
      this.getListFunc()
        .then(data => {
          const { list, listTitle, total } = data
          this.list = list
          this.listTitle = listTitle
          this.total = total
        })
    }
  }
}
</script>
<style lang="less" scoped></style>
