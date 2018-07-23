require.config({
	paths : {
		'jquery' : '../lib/jquery-3.3.1',
		'http' : './HttpClient1',
	}
})

require(['jquery','http'],function(){
	$('.r-btn').click(function(){
		let params = {username : $('.username').val(),password : $('.input2').val()};
		if(!/^1[3-9]\d{9}$/i.test(params.username)){
             $('.sjyz span').css("display","block");
             $('.username').css("border-bottom","2px solid red") ;     
              return false;
         }else{
             $('.sjyz span').css("display","none");
             $('.username').css("border-bottom","2px solid green") ;  
                              }
        if(params.password == ""){ 
         	$('.mima span').text("密码不能为空"); 
         	$('.mima span').css("display","block");
         	$('.input2').css("border-bottom","2px solid red") 
         	     return false;
          }else{
          	if(!/^[^\s]{6,20}$/i.test(params.password)){
            		$('.mima span').text("请输入六位以上的正确密码！");   
                    return false;
            }else{
            		$('.mima span').css("display","none");
            		$('.input2').css("border-bottom","2px solid green")    
                              }
          }
        
		$.post('http://10.3.138.233:8080/login',params).then(function(res){
			console.log(res);
			if(res.status){
				    if($('.input5')[0].checked){
	                var d = new Date();
	                d.setDate(d.getDate()+7);
	                document.cookie = 'username=' +  $('.username').val() + ';expires='+d.toUTCString(); 
                      }
                     window.location.href ="index.html";
            }else{
				alert("登录失败，请重新登录！");
				$('.username')[0].value = "";
				$('.input2')[0].value = "";
				$('.username')[0].focus();
				$('.input2').css("border-bottom","none");
				$('.username').css("border-bottom","none"); 
		}
		})
	    })
	
})