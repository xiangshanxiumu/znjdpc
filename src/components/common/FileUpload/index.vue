<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 18:43:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="FileUpload-wrap">
    <div class="FileUpload-showItem" v-for="(item,index) in Files" :key="index">
      <div class="FileUpload-showItem-box">
        <img class="FileUpload-showItem-img" :src="item.base64" :title="item.fileName" v-if="item.fileType=='image'"/>
        <img class="FileUpload-showItem-img" src="@/assets/img/common/pdf.png" :title="item.fileName" v-if="item.fileType=='pdf'"/>
        <img class="FileUpload-showItem-img" src="@/assets/img/common/excel.png" :title="item.fileName" v-if="item.fileType=='sheet'"/>
        <img class="FileUpload-showItem-img" src="@/assets/img/common/word.png" :title="item.fileName" v-if="item.fileType=='document'"/>
        <img class="FileUpload-showItem-img" src="@/assets/img/common/ppt.png" :title="item.fileName" v-if="item.fileType=='ppt'"/>
      </div>
      <!-- <span class="FileUpload-showItem-name">{{item.fileName}}</span> -->
      <img
        class="FileUpload-showItem-delete"
        src="@/assets/img/common/img-delete.png"
        @click="fileDelete(item,index)"
      />
    </div>
    <div class="FileUpload-fileAddItem" @click="fileAddHandle">
      <img class="FileUpload-fileAdd" src="@/assets/img/common/fileUpload.png" />
      <span class="FileUpload-fileAdd-text">文件上传</span>
    </div>
  </div>
</template>
<script>
export default {
  // 文件上传
  name: "FileUpload",
  // v-model绑定时 需要的申明
  model: {
    prop: "files",
    event: "change"
  },
  props: {
    // 接收外部传入files
    files: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 接收外部传入limit
    limit: {
      type: Number,
      default: 100 // 默认100
    }
  },
  data() {
    return {
      Files: [],
      Limit: 9
    };
  },
  watch: {
    // 外部父组件传入files文件
    files: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.Files = newVal;
        }
      },
      immediate: true,
      deep: true
    },
    // 组件自身的Files文件
    Files: {
      handler(val) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    // 文件上传
    fileAddHandle() {
      // 动态创建 input type="file" 元素
      let fileInput = $('<input type="file" multiple="multiple" />');
      // 动态触发
      fileInput.click();
      let _this = this;
      // 文件添加
      fileInput.change(function() {
        for (let i = 0; i < this.files.length; i++) {
          _this.fileAdd(this.files[i]);
          // if (_this.fileTypeCheck(this.files[i]) == "image") {
          //   this.files[i].fileType = "image";
          //   _this.ImgFileAdd(this.files[i]);
          // } else {
          //   _this.fileAdd(this.files[i]);
          // }
        }
      });
    },
    // 综合文件上传
    fileAdd(file) {
      // 限制数
      this.Limit--;
      if (this.Limit < 0) {
        return;
      }
      let initSizeKB = (file.size / 1024).toFixed(2) + "KB";
      file.initSizeKB = initSizeKB;
      let initSizeMB = (file.size / 1024 / 1024).toFixed(3) + "MB";
      file.initSizeMB = initSizeMB;
      // fileType
      file.fileType = this.fileTypeCheck(file);
      let reader = new FileReader();
      reader.onload = e => {
        let base64 = e.target.result;
        let fileItem = {
          type:file.type,
          fileType: file.fileType,
          fileName: file.name,
          base64: base64,
          initSizeKB: file.initSizeKB,
          initSizeMB: file.initSizeMB
        };
        this.Files.push(fileItem);
        console.log(this.Files);
      };
      reader.readAsDataURL(file);
    },
    // 图片文件添加处理
    ImgFileAdd(file) {
      // 限制数
      this.Limit--;
      if (this.Limit < 0) {
        return;
      }
      let initSizeKB = (file.size / 1024).toFixed(2) + "KB";
      file.initSizeKB = initSizeKB;
      let initSizeMB = (file.size / 1024 / 1024).toFixed(3) + "MB";
      file.initSizeMB = initSizeMB;

      this.compress(file)
        .then(res => {
          let imgFile = {
            type:file.type,
            fileType: file.fileType,
            fileName: file.name,
            base64: res,
            initSizeKB: file.initSizeKB,
            initSizeMB: file.initSizeMB,
            compressedSize: this.getBase64Size(res)
          };
          this.Files.push(imgFile);
          console.log(this.Files);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 压缩图片文件
    compress(file) {
      // 当前图片大小
      let _this = this;
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = e => {
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            console.log(img.width, img.height);
            // if(img.width<img.height){
            //   //宽度<高度 树立图片 需旋转
            //    ctx.rotate(90*Math.PI/180);
            // }
            // 图片像素 Pixel
            img.imgPixel = img.width * img.height;
            // 铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            // 进行压缩
            let nowData = canvas.toDataURL("image/jpeg", 0.6);
            resolve(nowData);
          };
        };
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
      });
    },
    // 获取base64 size
    getBase64Size(base64Str) {
      let str = base64Str.replace("data:image/jpeg;base64,", "");
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2);
      let size = (fileLength / 1024).toFixed(2);
      return parseInt(size) + "KB";
    },
    // 文件添加处理
    fileTypeCheck(file) {
      if (file == undefined) return false;

      let type = file.type;
      // 图片文件
      if (type.match("image") != null) {
        file.fileType = "image";
      }
      // PDF文件
      if (type.match("pdf") != null) {
        file.fileType = "pdf";
      }
      // word
      if (type.match("document") != null) {
        file.fileType = "document";
      }
      // excel
      if (type.match("sheet") != null) {
        file.fileType = "sheet";
      }
      // PPT
      if (type.match("presentation") != null) {
        file.fileType = "ppt";
      }
      return file.fileType;
    },
    // 图片删除
    fileDelete(item, index) {
      this.Files.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.FileUpload-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  justify-content: flex-start;
}
.FileUpload-fileAddItem {
  margin: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.FileUpload-fileAdd {
  width: 5rem;
  height: 5rem;
}
.FileUpload-fileAdd-text {
  font-size: 0.8rem;
  text-align: center;
  color: #666;
}
.FileUpload-showItem {
  margin: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.FileUpload-showItem-img {
  width: 5rem;
  height: 5rem;
}
.FileUpload-showItem-name {
  width: 5rem;
  font-size: 0.8rem;
  text-align: center;
  color: #666;
  overflow: hidden;
}
.FileUpload-showItem-delete {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
}



















</style>