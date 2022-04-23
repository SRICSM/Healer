$(function () {
    getUserInfo()

    var layer = layui.layer
    
    $('#btn_logout').on('click', function () {
        //提示用户是否退出 当点击确定时，执行回调函数
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地存储中的 token(用于身份认证)
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });
    })
})

//!!!!后台登录有问题  不能获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/uesrinfo',
        //请求头 身份认证字段
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                console.log(res)
                return layui.layer.msg('获取用户的基本信息失败！')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功或失败，最终都会调用complete回调函数 利用次函数实现有权限的访问
        // complete: function (res) {
        //     console.log(res)
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')
        //     {
        //         //1.强制清空 token
        //         localStorage.removeItem('token')
        //         //2.强制跳转登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //3.按需渲染用户信息
    if (user.user_pic != null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        //3.2渲染文字头像
        $('.layui-nav-img').hide();
        //文本头像的文本内容去用户名首位字符 字符串可以当数组使用
        var first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()
    }
}