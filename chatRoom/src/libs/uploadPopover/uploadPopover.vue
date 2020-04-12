<template>
    <div class="uploadPopover">
        <el-popover
                placement="top"
                width="250"
                trigger="manual"
                v-model="visible">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="/v/api/uploadFile"
                        :file-list="fileList"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :before-upload="beforeUpload"
                        name="f"
                        :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">Select file</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Uploading</el-button>
                    <div slot="tip" class="el-upload__tip">The size of file can not beyond 2M</div>
                </el-upload>
                <span slot="reference">
                    <slot></slot>
                </span>
        </el-popover>
    </div>
</template>

<script>
    export default{
        name: 'uploadPopover',
        props: ['visible'],
        data() {
            return {
                fileList: []
            };
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleSuccess(res, file) {
                this.$emit('handleSuccess', res, file);
                this.$refs.upload.clearFiles();
            },
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleError(err) {
                this.$message.error('文件上传失败!');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
