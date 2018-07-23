

$(function(){

        

        $('.yzm').text(randomCode(4));
        
       $('.yzm').click(function(){

  
        $('.yzm').text(randomCode(4));



       })
       function randomCode(n){
        
        var res = '';

            for(var i=0;i<n;i++){
                res += parseInt(Math.random()*10);
            }

            return res;
        }

        $('.r-btn').on('click',function(){

            var input2 = $('.input2').val();
            var input5 = $('.input5')[0];
            var username = $('.username').val();
            var password = $('.password').val();

            if(input5.checked){
                if(input2 ==   $('.yzm').text() && /^[^\s]{6,20}$/i.test(password) && /^1[3-9]\d{9}$/i.test(username)){

                    http.post('http://10.3.138.233:8080/register',{username:username,password:password},function(res){

                      
                           
                            if(res.status){
                                 
                                alert('注册成功');
                                
                                window.location.href = 'login.html';
                            }else{
                                alert('手机号号已被注册，请重新输入');
                                $('.input2')[0].value = '';
                                $('.username')[0].value = '';
                                $('.password')[0].value = '';
                                $('.username')[0].focus();
                                   
                            }
                    })
                      

                }else if(!/^1[3-9]\d{9}$/i.test(username)){


                        alert('手机号输入有误');

                        return false;
                }else if(!/^[^\s]{6,20}$/i.test(password)){

                        alert('密码格式输入有误');

                            return false;
                }else if(input2 !=  $('.yzm').text()){

                    alert('验证码输入不正确');
                }
            
            }else{
                alert('请勾选服务协议');
            }
        })

})



