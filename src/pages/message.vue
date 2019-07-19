<template>
	<div>
    <el-progress ref="progressModal"
     :message="progressMessage"
     :allWidth="progressWidth"
     :showCloseBtn="defaultShowCloseBtn"
     :title="progressTitle"> 
    </el-progress>
    <button @click="progressBtn">进度条</button>
<br>    
		<alert ref="defaultModal"
		 :sureBtn="defaultSureBtn"
		 :cancelBtn="defaultCancelBtn"
		 :type="defaultType"
     :iconType="defaultIconType"
     :showCloseBtn="defaultShowCloseBtn"
		 :message="defaultMessage"
		 :title="defaultTitle">	
		</alert>
		<button @click="defaultBtn">默认</button>
<br>
    <alert ref="successModal"
     :sureBtn="successSureBtn"
     :cancelBtn="successCancelBtn"
     :type="successType"
     :iconType="successIconType"
     :showCloseBtn="successShowCloseBtn"
     :message="successMessage"
     :title="successTitle">  
    </alert>
    <button @click="successBtn">成功</button>
<br>
    <alert ref="errorModal"
     :sureBtn="errorSureBtn"
     :cancelBtn="errorCancelBtn"
     :type="errorType"
     :iconType="errorIconType"
     :showCloseBtn="errorShowCloseBtn"
     :message="errorMessage"
     :title="errorTitle">  
    </alert>
    <button @click="errorBtn">失败</button>
<br>
    <alert ref="warnModal"
     :sureBtn="warnSureBtn"
     :cancelBtn="warnCancelBtn"
     :type="warnType"
     :iconType="warnIconType"
     :showCloseBtn="warnShowCloseBtn"
     :message="warnMessage"
     :title="warnTitle">  
    </alert>
    <button @click="warnBtn">提醒</button>


    <div class="msg-demo">
        <button @click="showMsgTipWarn">message</button>
    </div>
    <div class="msg-demo">
        <button @click="showMsgTipSuccess">message</button>
    </div>
    <div class="msg-demo">
        <button @click="showMsgTipError">message</button>
    </div>


	</div>


</template>
<script>
import alert from '@/components/message/Alert';
import elProgress from '@/components/message/progress';

export default {
    name: 'message',
    data() {
    	return {
        progressTitle: '批量导入',
        progressMessage: '正在导入中，请勿关闭当前页面...',
        progressShowCloseBtn:false,
        progressWidth: 50,
        // progressType: {
        //     sure: '完成',
        //     cancel: '取消',
        //     disabled:false
        // },
		defaultTitle: '默认',
		defaultMessage: '我是内容我是内容我是内容',
        defaultIconType:'',
        defaultShowCloseBtn:false,
    	defaultType: {
			sure: '确定',
			cancel: '取消',
        disabled:true
    	},
        successTitle: '成功',
        successMessage: '我是内容我是内容我是内容',
        successIconType:'success',
        successShowCloseBtn:false,
        successType: {
          sure: '确定',
          cancel: '取消'
        },
        errorTitle: '失败',
        errorMessage: '我是内容我是内容我是内容',
        errorIconType:'error',
        errorShowCloseBtn:false,
        errorType: {
          sure: '确定',
          cancel: '取消'
        },
        warnTitle: '提醒',
        warnMessage: '我是内容我是内容我是内容',
        warnIconType:'warning',
        warnShowCloseBtn:false,
        warnType: {
          sure: '确定',
          cancel: '取消'
        },                        
    	}
    },
    components: {
      alert,
      elProgress
    },
    methods: {
        progressBtn() {
            this.$refs.progressModal.show();
        },
        progressSureBtn() {
            this.$refs.progressModal.close();
        },
        progressCancelBtn() {
            this.$refs.progressModal.close();
        },
       defaultBtn() {
         this.$refs.defaultModal.show();
       },
       defaultSureBtn() {
         this.$refs.defaultModal.close();
       },
       defaultCancelBtn() {
       	 this.$refs.defaultModal.close();
       },

        successBtn() {
         this.$refs.successModal.show();
       },
       successSureBtn() {
         this.$refs.successModal.close();
       },
       successCancelBtn() {
         this.$refs.successModal.close();
       },

        errorBtn() {
         this.$refs.errorModal.show();
       },
       errorSureBtn() {
        this.$refs.errorModal.close();
       },
       errorCancelBtn() {
         this.$refs.errorModal.close();
       },

        warnBtn() {
         this.$refs.warnModal.show();
       },
       warnSureBtn() {
         this.$refs.warnModal.close();
       },
       warnCancelBtn() {
         this.$refs.warnModal.close();
       },
       showMsgTipWarn() {
        this.$message({
          content:'出现异常，请稍后重试！',
          type:'warn'
        });
       },
       showMsgTipSuccess() {
        this.$message({
          content:'出现异常，请稍后重试！',
          type:'success'
        });
       },
       showMsgTipError() {
        this.$message({
          content:'出现异常，请稍后重试！',
          type:'error'
        });
        
       }
    },
    mounted() {
      
    }
}
</script>
<style scoped>
  
</style>