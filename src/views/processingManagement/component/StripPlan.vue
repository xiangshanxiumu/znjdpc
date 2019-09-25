<template>
  <div class="wrap">
    <el-form :model="FormData" ref="FormData">
      <div class="item" v-for="(item, index) in FormData.domains" :key="index">
        <el-form-item class="row" :label="item.label">
          <div class="row">
            <el-input v-model="item.Standards" clearable placeholder="请输入分条规格(如:30mm)" style="width:20rem"></el-input>
            <span class="division">*</span>
            <el-input
              v-model="item.Num"
              clearable
              placeholder="请输入分条数(如:2)"
              style="width:20rem"
              @change="changeHandle(item)"
            ></el-input>
            <span class="division">
              <i class="el-icon-circle-close" @click="removeItem(item,index)"></i>
            </span>
          </div>
        </el-form-item>
      </div>
      <el-form-item class="submit-btn">
        <span class="division">钢卷总宽度(mm):{{FormData.stripWidth}}</span>
        <span>分条余料(mm):</span>
        <div class="row">
          <el-input class="SurplusMaterial" v-model="FormData.SurplusMaterial" placeholder="余料"></el-input>
          <span class="division"></span>
          <el-button @click="addItem">新增分条</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  // 分条方案 组件
  name: "StripPlan",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      FormData: {
        domains: [
          {
            prop: "Striping1",
            label: "分条1",
            Standards: "30mm",
            Num: "3"
          }
        ],
        SurplusMaterial: 0 //分条余料
      },
      stripWidth: 0, //钢卷总宽度
      SurplusMaterial: 0 //分条余料
    };
  },
  watch: {
    formData: {
      handler(val, oldVal) {
        this.FormData = val;
        // 计算余料
        this.CalculationSurplusMaterial();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 删除
    removeItem(item, index) {
      this.FormData.domains.splice(index, 1);
    },
    addItem() {
      let len = this.FormData.domains.length;

      this.FormData.domains.push({
        prop: `Striping${len + 1}`,
        label: `分条${len + 1}`,
        Standards: "",
        num: ""
      });
    },
    // 分条数改变时 计算余料数
    changeHandle(item) {
      console.log(item)
      // this.CalculationSurplusMaterial();
    },
    // 计算当前余料函数
    CalculationSurplusMaterial(){
      let stripWidth = 0;``
      if(this.FormData.stripWidth){
        stripWidth = Number(this.FormData.stripWidth);
      }
      let useMaterial = 0; // 使用
      //计算余料数
      if (this.FormData.domains.length >= 1) {
        this.FormData.domains.map(item => {
          if (item.Standards && item.Num) {
            let Standards = parseInt(item.Standards); // 分条规格
            let Num = Number(item.Num); // 分条数
            useMaterial += Num * Standards;
          }
        });
        this.FormData.SurplusMaterial = stripWidth - useMaterial;
      }
    },
    // 确定
    submitForm() {
      this.DialogShow = false;
      this.$emit("submit", this.FormData);
    }
  }
};
</script>
<style scoped>
.wrap {
  display: inline-block;
}
.item {
  /* display: inline-block; */
  text-align: left;
}
.row {
  display: inline-flex;
}
.division {
  padding: 0rem 1rem;
}
.label {
  display: inline-block;
  width: 3rem;
}
.submit-btn {
  text-align: right;
  padding-top: 20px;
  padding-right: 20px;
}
.SurplusMaterial {
  width: 6rem;
}
</style>