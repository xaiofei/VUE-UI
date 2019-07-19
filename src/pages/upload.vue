<template>
    <div class="upload-demo">
        <p>点击按钮上传</p>
        <upload :config="config" ref="uploads">
            <div class="demo" >
                {{this.file.name}}
            </div>
        </upload>
        <div>
            <btn  :type="btnConfig.style"
                  :name="btnConfig.name"
                  :value="btnConfig.value"
                  :disabled="btnConfig.disabled"
                  @onClick="btnConfig.onClick"
                  v-html="btnConfig.text"
                  class="btn-upload"

            >
            </btn>

        </div>

        <p>拖拽上传</p>
        <upload :config="config2">
            <div class="upload-drag-demo">
                {{this.file2.name}}
            </div>
        </upload>
    </div>
</template>

<script>
    import upload from '@/components/upload/upload';
    import Button from '../components/basic/Button';

    export default {
        name: 'form',
        data() {
            let that = this;
            return {
                aaa: false,
                title: 'upload',
                file: {name:''},
                file2: {name:''},
                config: {
                    name: 'file',
                    title: '上传',
                    require: true,
                    type: 'file',
                    value: '',
                    data: {
                        "appkey": "TEST0116"
                    },
                    limit: 2, // 文件个数限制
                    multiple: true,
                    accept: "",
                    url: "/console/applet/face/user/detect",
                    withCredentials: true, // 支持发送cookie凭证
                    headers: {}, // 设置请求头部
                    autoUpload: true, // 是否在选择文件后立即上传
                    drag: true,
                    disabled: false,
                    beforeUpload(f) {
                        console.log('开始上传前', f);
                        // 以下为返回Promise的用法，不使用Promise直接return true、false
                        that.file = f;
                        return new Promise((resolve, reject) => {
                            if (f.name) {
                                window.alert('文件名：' + f.name + '大小' + f.size / 1024);
                                resolve(f);
                            }
                            else {
                                reject(f);
                            }
                        })

                    },
                    onSuccess() {
                        console.log('上传成功');
                    },
                    onProgress() {
                        console.log('progress');
                    },
                    onError() {
                        console.log('上传失败');
                    },
                    onChange(v) {
                        that.file = v[0];
                    }
                },
                config2: {
                    name: 'file',
                    title: '上传',
                    require: true,
                    type: 'file',
                    value: '',
                    limit: 2, // 文件个数限制
                    multiple: true,
                    accept: "",
                    url: "/console/qa/importExcel/123",
                    withCredentials: true, // 支持发送cookie凭证
                    headers: {}, // 设置请求头部
                    autoUpload: true, // 是否在选择文件后立即上传
                    drag: true,
                    disabled: false,
                    beforeUpload(f) {
                        console.log('开始上传前', f);
                        // 以下为返回Promise的用法，不使用Promise直接return true、false
                        that.file2 = f;
                        return new Promise((resolve, reject) => {
                            if (f.name) {
                                window.alert('文件名：' + f.name + '大小' + f.size / 1024);
                                resolve(f);
                            }
                            else {
                                reject(f);
                            }
                        })

                    },
                    onSuccess() {
                        console.log('上传成功');
                    },
                    onProgress() {
                        console.log('progress');
                    },
                    onError() {
                        console.log('上传失败');
                    },
                    onChange(v) {
                        that.file2 = v[0];
                    }
                },
                btnConfig: {
                    name: '',
                    title: '提交',
                    type: 'default',
                    style: 'warning',
                    text: '提交',
                    value: '',
                    disabled: false,
                    onClick (v) {
                        that.submitUpload();
                    }
                }
            }
        },
        components: {
            upload,
            btn: Button
        },
        methods: {
            submitUpload() {
                this.$refs.uploads.submit();
            },
        },
        mounted() {

        }
    };
</script>

<style lang="less" scoped>
    .upload-demo {
        padding-left: 20px;
        .demo {
            width: 100px;
            height: 60px;
            border: 1px solid gray;
            font-size: 12px;
            overflow: hidden;
        }
        p {
            height: 36px;
            line-height: 36px;
            margin: 25px 0;
        }
        .upload-drag-demo {
            width: 100px;
            height: 100px;
            border: 1px solid gray;
        }
    }
</style>
