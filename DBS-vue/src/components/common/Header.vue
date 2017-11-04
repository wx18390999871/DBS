<template>
    <div id="header" class="header navbar navbar-fixed-top">
        <div class="navbar-header">
            <a class="navbar-brand">
                逍遥行后台管理系统
            </a>
        </div>
        <ul class="primary-nav nav navbar-nav navbar-right">
            <li><a href="#">杭州<span class="caret"></span></a></li>
            <li><a href="#" class="href">
                <span class="user-icon"><i class="iconfont icon-seeuser"></i></span>                    
                <span>{{username}},您好！</span>
            </a></li>
            <li class="user-option" style="margin-right: 50px;">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="user-info-icon iconfont icon-hamburgermenu"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="user-option-dropdown">
                        <el-dropdown-item command="change">修改密码</el-dropdown-item>
                        <el-dropdown-item command="loginout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'admin'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                } else if (command == 'change') {
                    this.$router.push('changePassword');
                }
            }
        }
    }
</script>
<style scoped>
    .primary-nav {
        font-size: 14px;
    }
    .user-icon {
        margin-right: 10px;
    }
    .user-option {
        margin-right: 50px;
        padding-top: 25px;
        cursor: pointer;
    }
    .user-option-dropdown {
        margin-top: 25px;
    }
    .user-info-icon:hover,
    .user-info-icon:focus {
        color: #fff;
        text-decoration: none;
    }
    .nav > li > a:hover,
    .nav > li > a:focus {
        background-color: #f7ac36;
        color: #fff;
    }
    .user-info-icon {
        color: #fff;
    }
</style>
