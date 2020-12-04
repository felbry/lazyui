<template>
  <el-form v-if="form" inline>
    <el-form-item
      v-for="item in condition"
      :key="item.key"
      :label="item.label">
      <el-input
        v-if="item['type:text']"
        v-model="form[item.key]"
        :placeholder="item['type:text'].placeholder || '请输入'">
      </el-input>
      <el-select
        v-if="item['type:select'] || item['type:multiselect']"
        v-model="form[item.key]"
        :multiple="!!item['type:multiselect']"
        :placeholder="(item['type:select'] || item['type:multiselect']).placeholder || '请选择'">
        <el-option
          v-for="option in ((item['type:select'] || item['type:multiselect']).options || [])"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        />
      </el-select>
      <el-date-picker
        v-if="item['type:daterange']"
        v-model="form[item.key]"
        type="daterange"
        value-format="yyyy-MM-dd"
        :start-placeholder="item['type:daterange'].startPlaceholder || '开始月份'"
        :end-placeholder="item['type:daterange'].endPlaceholder || '结束月份'"
      />
      <template
        v-if="item['type:numrange']">
        <el-input
          class="num-range-item"
          v-model.number="form[item.key][0]"
          @change="changeNum(item.key, 'front')"
          :placeholder="item['type:numrange'].startPlaceholder || '开始序号'"
        />
        <el-input
          class="num-range-item"
          v-model.number="form[item.key][1]"
          @change="changeNum(item.key, 'end')"
          :placeholder="item['type:numrange'].endPlaceholder || '结束序号'"
        />
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="$emit('search', form)">查询</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button v-if="exportPath" @click="download">导出</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    condition: {
      type: Array,
      default: () => []
    },
    exportPath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: null
    }
  },
  methods: {
    initForm () {
      const defFormVal = {}
      this.condition.forEach(item => {
        const { key, defaultVal } = item
        defFormVal[key] = Array.isArray(defaultVal)
          ? defaultVal.slice()
          : defaultVal
      })
      this.form = defFormVal
    },
    reset () {
      this.initForm()
      this.$emit('search', this.form)
    },
    changeNum (key, position) {
      if (position === 'front') {
        if (
          this.form[key][0] !== '' &&
          (typeof this.form[key][1] !== 'number' ||
          this.form[key][0] > this.form[key][1])
        ) {
          this.$set(this.form[key], 1, this.form[key][0])
        }
      } else {
        if (
          typeof this.form[key][1] === 'number' &&
          this.form[key][0] > this.form[key][1]
        ) {
          this.$set(this.form[key], 1, this.form[key][0])
        }
      }
    },
    download () {
      window.open(
        `${this.exportPath}?${Object.entries(
          this.form
        )
          .map(([k, v]) => `${k}=${v}`)
          .join('&')}
        `
      )
    }
  },
  watch: {
    condition: {
      handler: function (newVal) {
        if (newVal && newVal.length) {
          this.initForm()
          this.$emit('search', this.form)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.el-form {
  padding: 16px 16px 0;
  margin-bottom: 16px;
  background-color: #fff;
}
.num-range-item {
  width: 80px!important;
  & + & {
    margin-left: 12px;
  }
}
</style>
