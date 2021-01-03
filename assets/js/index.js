$(function() {
        //调用getuserInfo获取用户基本信息
        getUserInfo()
        var layer = layui.layer
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
                function(index) {
                    //do something
                    //1清空本地存储中的token
                    localStorage.removeItem('token')
                        //2重新跳转到登录页面
                    location.href = '/login.html'
                    layer.close(index);
                });
        })
    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        },
        //不论成功还是失败,最终都会调用complete回调函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         //1强制清空token
        //         localStorage.removeItem('token')
        //             //2强制跳转页面
        //         localStorage.href = '/login.html'

        //     }
        // }

    })

}
//渲染用户头像
function renderAvatar(user) {
    //1获取用户的名称
    var name = user.nickname || user.username
        //2设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3按需求渲染用户头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('scr', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first)
            .show()
    }

}