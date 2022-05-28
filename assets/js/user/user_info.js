var form = layui.form
var layer = layui.layer
// var userinfo
$(function () {
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 - 6个之间'
      }
    }
  })
})


initUserInfo()
// 获取用户信息
function initUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败！')
      }
      console.log(res)
      // userinfo = res
      //调用form.val() 快速为表单赋值
      form.val('formUserInfo', res.data)
      return res
    }
  })
}

// 重置表单的数据
$('#btnReset').on('click', function (e) {
  //阻止表单默认重置行为
  e.preventDefault();
  initUserInfo()
})

//更新用户信息
$('.layui-form').on('submit', function (e) {
  //阻止表单默认提交行为
  e.preventDefault()

  //发起ajax数据请求
  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: $(this).serialize(),  //该函数会提交所有信息，和后台不匹配，可能导致错误
    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg('更新用户信息失败！')
      }
      layer.msg('更新用户信息成功！')
      //调用父页面中的方法，重新渲染用户的头像和用户的信息
      //在子页面中调用父页面的函数 window.parent
      window.parent.getUserInfo()
    }
  })
})