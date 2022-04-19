$(function () {
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //点击 ”去注册账号的链接 ”
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 从 Layui 中获取到 form 对象
    var form = layui.form
    // 在 layui 中获取到 layer 对象
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果不相等，则return一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // !!!监听注册表单的提交事件  功能问题？？？？后台有问题
    $('#form_reg').on('submit', function (e) {
        //阻止表单的默认行为 不要立即提交 发请求再提交
        e.preventDefault()
        var data = {
            username: $('#form_reg [name = username]'),
            password: $('#form_reg [name = password]').val()
        }
        //！！！在post执行过程中发生堆栈溢出错误
        $.post('/api/reguser',data,
            //!!!这里需要改进，如果不成功会产生堆栈溢出
            //!!!成功时返回的数据res
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                //模拟人的点击行为 注册成功自动跳转登录页面
                $('#link_login').click()
            })
    })

    //!!!监听登录表单的提交事件 后台有问题！！！
    $('#form_login').submit(function (e){
        //阻止默认行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // jQuery ajax - serialize()方法 快速获取表单（form)中的数据 用 & 拼接
            data:$(this).serialize(),
            //!!! res为请求成功服务器返回的数据 请求无效不执行该函数
            success: function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')

                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                //登录成功跳转到后台主页
                location.href='/index.html'
            }
        })
    })
})