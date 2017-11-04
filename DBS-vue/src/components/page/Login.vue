<template>
    <div>
        <div class="logo">逍遥行后台管理系统</div>
        <div class="bg-img">
            <!-- <div class="ms-title">后台管理系统</div> -->
            <div class="login-text">
                <h1>逍遥行</h1>
                <h2>平台管理系统</h2>
                <p>以用户感知为中心的精细化场景式运营</p>
            </div>
            <div class="login">
                <h1>登录</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" id="form-login" class="form-login form-sole">
                    <el-form-item prop="username">
                        <div class="error-reminder" v-show="showMessage">{{errorMessage}}</div>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" class="btn-F7AC36" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                errorMessage: '',
                showMessage: false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                var $error = this.$refs.errorLogin;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        const url = API_PATH + '/web/account-login.action';
                        var data = {
                            user_login: self.ruleForm.username,
                            user_password: self.ruleForm.password
                        }
                        data = JSON.stringify(data);
                        self.showMessage = false;
                        self.$axios.get(url, {
                            params: {
                                data: data
                            }
                        }).then(function(response) {
                            response = response.data;
                            if (response.errorCode === 0) {
                                localStorage.setItem('ms_username',self.ruleForm.username);
                                self.$router.push('/index'); 
                            } else if (response.errorCode == -1) {
                                self.showMessage = true;
                                setTimeout(function() {
                                    self.showMessage = false;
                                }, 3000);
                                self.errorMessage = response.errorMessage;
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            }
        }
    }
</script>

<style scoped>
    @import '../../../static/css/login.css';
    #app {
        overflow: auto!important;
    }
</style>