$(function() {
  var form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function(value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function(value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  //更新密码的操作
  $('.layui-form').on('submit', function (e) {
    console.log(111)

    let oldPwd = $("input[name='oldPwd']").val()
    let newPwd = $("input[name='newPwd']").val()
    
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      // data: $(this).serialize(),
      // 不需要rewPwd参数，改后台或者改前端
      data: {
        oldPwd: oldPwd,
        newPwd: newPwd
      },
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单 将jquery元素转换为原生的dom元素，再调用reset()方法
        $('.layui-form')[0].reset()
      }
    })
  })
})