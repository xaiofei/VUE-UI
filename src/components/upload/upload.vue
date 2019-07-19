<template>
    <div class="el-upload" @click="clickUpload">
        <UploadDragger
            name="uploadDragger"
            v-if="this.drag"
            :disabled="this.config.disabled"
            @file="uploadFiles"
            @onChange="this.config.onChange"
        >
            <slot></slot>
        </UploadDragger>
        <slot v-if="!this.drag"></slot>
        <input
            class="el-upload-input"
            type="file"
            ref="avatarInput"
            :name="this.config.name"
            @change="handleChange"
            :multiple="this.config.multiple"
            :accept="this.config.accept"
        />
    </div>
</template>

<script>
    import httpRequest from './ajax';
    import UploadDragger from './upload-dragger';
    export default {
        name: 'upload',
        data() {
            return {
                fileList: [],
                drag: this.config.drag || false
            }
        },
        props: {
            config: {
                type: Object,
            }
        },
        computed: {
        },
        methods: {
            handleChange(e) {
                const files = e.target.files;
                if (!files) return;
                this.config.onChange(files);
                this.uploadFiles(files);
            },
            submit() {
                this.fileList
                    .forEach(file => {
                        this.upload(file);
                    });
            },
            uploadFiles(files) {
                if (this.config.limit &&  files.length > this.config.limit) {
                    // console.log('******文件超出限制',files.length,this.config.limit);
                    return '文件个数超出限制';
                }
                let postFiles = Array.prototype.slice.call(files);
                this.fileList = postFiles;
                if (!this.config.multiple) {
                    postFiles = postFiles.slice(0, 1);
                }
                if (postFiles.length === 0) {
                    return;
                }
                postFiles.forEach(rawFile => {
                    if (this.config.autoUpload) this.upload(rawFile);
                });
            },
            upload(rawFile, file) {
                this.$refs.avatarInput.value = null;
                if (!this.config.beforeUpload) {
                    return this.post(rawFile);
                }
                const before =  this.config.beforeUpload(rawFile);
                if (before && before.then) {
                    before.then(processedFile => {
                        const fileType = Object.prototype.toString.call(processedFile);
                        if (fileType === '[object File]' || fileType === '[object Blob]') {
                            this.post(processedFile);
                        } else {
                            this.post(rawFile);
                        }
                    }, () => {
                    });
                } else if (before !== false) {
                    this.post(rawFile);
                } else {

                }
            },
            post(rawFile) {
                const { uid } = rawFile;
                const options = {
                    headers: this.config.headers,
                    withCredentials: this.config.withCredentials,
                    file: rawFile,
                    data: this.config.data,
                    filename: this.config.name,
                    action: this.config.url,
                    onProgress: e => {
                        this.config.onProgress(e, rawFile);
                    },
                    onSuccess: res => {
                        this.config.onSuccess(res, rawFile);
                        //delete this.reqs[uid];
                    },
                    onError: err => {
                        this.config.onError(err, rawFile);
                        //delete this.reqs[uid];
                    }
                };
                const req = httpRequest(options);
                // this.reqs[uid] = req;
                if (req && req.then) {
                    req.then(options.onSuccess, options.onError);
                }
            },
            clickUpload() {
                this.$refs.avatarInput.click();
            },
        },
        components: {
            UploadDragger,
        }
    };
</script>

<style lang="less" scoped>
    .el-upload {
        display: inline-block;
        .el-upload-input {
            display: none;
        }
    }
</style>
