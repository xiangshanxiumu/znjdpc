<template>
<div class="FileUpload-wrap">
    <div>

    </div>
    <div class="FileUpload-fileAddItem" @click="fileAddHandle">
        <img class="FileUpload-fileAdd"  src="@/assets/img/common/fileUpload.png"/>
    </div>
</div>
</template>
<script>
export default {
    // 文件上传
    name:"FileUpload",
    methods:{
        // 文件上传
        fileAddHandle(){
            console.log("ok");
            let fileAdd = $('<input type="file" multiple="multiple"/>')
            fileAdd.click();
            // 
            let _this = this;
            fileAdd.change(function(){
                console.log("files",this,this.files)
                
                // this.files.map((item,index)=>{
                //     console.log(item)
                // })
                // image/jpeg 图片文件格式
                // application/pdf PDF文件后缀格式
                // application/vnd.openxmlformats-officedocument.wordprocessingml.document doc word文件
                // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet excel表文件
                // application/vnd.openxmlformats-officedocument.presentationml.presentation PPT文件
                // text/plain text文件
            })
        },
        // 文件添加处理
        fileTypeHandle(file){
            if(file==undefined) return false;

            let type = file.type;
            // 图片文件
            if(type.match('image')!=null){
                file.fileType = "image";
            }
            // PDF文件
            if(type.match('pdf')!=null){
                file.fileType = "pdf";
            }
            // word
            if(type.match('document')!=null){
                file.fileType = "document";
            }
            // excel
            if(type.match('sheet')!=null){
                file.fileType = "sheet";
            }
            // PPT
            if(type.match('presentation')!=null){
                file.fileType = "ppt";
            }
            file.fileSize = file.size;
        }
    }
}
</script>
<style scoped>
.FileUpload-wrap{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    border:1px solid #ccc;
    justify-content: flex-end;
}
.FileUpload-fileAddItem{
    margin:1rem;
    position: relative;
    cursor: pointer;
}
.FileUpload-fileAdd{
    width:6rem;
    height:6rem;
}
</style>