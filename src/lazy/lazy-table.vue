<template>
  <div>
    <Condition ref="condition" :condition="condition" @search="search({}, ...arguments)" />
    <TableList :list="list" :list-title="listTitle" @operation="operation" />
    <el-pagination
      background
      layout="sizes, prev, pager, next, jumper, ->, total"
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
    },
    extraCondition: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      conditionFormCache: {},
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
    search (
      config = {
        isResetPn: false,
        isResetCondition: false
      },
      conditionForm
    ) {
      if (config.isResetCondition) {
        return this.$refs.condition.reset()
      }
      if (conditionForm) {
        this.conditionFormCache = conditionForm
      }
      if (conditionForm || config.isResetPn) {
        this.pn = 1
      }
      this.getListFunc({
        ...this.conditionFormCache,
        ...this.extraCondition,
        pn: this.pn,
        rn: this.rn
      })
        .then(data => {
          const { list, listTitle, total } = data
          this.list = list
          this.listTitle = listTitle
          this.total = total
        })
    },
    operation (operationOption) {
      this.$emit('operation', operationOption)
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  padding: 8px;
  margin-top: 16px;
  background-color: #fff;
}
</style>
