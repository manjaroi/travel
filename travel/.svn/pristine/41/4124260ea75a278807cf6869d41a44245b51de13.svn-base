require.config({
	paths : {
		'jquery' : '../lib/jquery-3.3.1',
		'http' : './httpclient',
	}
})

require(['jquery','http'],function($,http){
	$(window).scroll(function(){
        if($(window).scrollTop()>100){
            $(".l_message_r").css({"position":"fixed","top":20,"left":"1126px"});
        }else{
            $(".l_message_r").css({"position":"static","float":"right"});
        }
    });

    $(function(){

        $('.top').load('topCenter.html')
        let search = window.location.search;
       
        console.log(window.location.search);
        
        search = search.slice(1);

        if(search.indexOf('name') == 0){

            res1=search.split('&');
                   
            var obj={};

             res1.forEach(function(item){

                var arr = item.split('=');
                      

                obj[arr[0]]=decodeURI(arr[1]);

            });

            $('.show')[0].innerHTML = `<p>${obj.name}</p><p>产品编号 169231 &nbsp;&nbsp;<i>[${obj.place}]</i>[跟团游]</p><p>套餐类型 默认</p><p>出游日期<span>2018年07月26日 周四</span></p><p>出游人数 ${obj.num}</p>`

            $('.l_message_r')[0].innerHTML = `<p>结算单</p><p><span>订单信息</span><span>￥<i class="total"></i></span></p><p><span>成人</span><span><i>${obj.num}</i> x ￥<i class="one">${obj.price}</i></span></p><p><span>单房差</span><span><i>${obj.num}</i> x ￥<i class="two">340</i></span></p><p><span>费用合计</span><span><i>￥</i> <i class="total1">2028</i></span></p>`
            
            let one = parseInt($('.one').html());
            let two = parseInt($('.two').html());
            let total = obj.num*one + obj.num*two;
            console.log($('.total'))
            $('.total').html(total);
            $('.total1').html(total);
            $('.total3').html(total);


        }
        // }else{
            
        //     let storage = window.localStorage.getItem('key');
        //     if (typeof storage == 'string') {
        //         storage = JSON.parse(storage);
        //         let res = storage.map(function(item,i){
        //             if (item.id == search) {
        //                 return `<p>${item.name}</p><p>产品编号 169231 &nbsp;&nbsp;<i>[${item.start_place}]</i>[跟团游]</p><p>套餐类型 默认</p><p>出游日期<span>2018年07月26日 周四</span></p><p>出游人数 成人 1</p>`
        //             }
        //         })
        //         let str = storage.map(function(item,i){
        //             if (item.id == search) {
        //                 return `<p>结算单</p><p><span>订单信息</span><span>￥<i class="total"></i></span></p><p><span>成人</span><span><i>1</i>x ￥<i class="one">${item.price}</i></span></p><p><span>单房差</span><span><i>1</i>x ￥<i class="two">340</i></span></p><p><span>费用合计</span><span><i>￥</i> <i class="total1">2028</i></span></p>`
        //             }
        //         })
        //         $('.show').html(res);
        //         $('.l_message_r').html(str);
        //         let one = parseInt($('.one').html());
        //         let two = parseInt($('.two').html());
        //         let total = one + two;
        //         console.log($('.total'))
        //         $('.total').html(total);
        //         $('.total1').html(total);
        //         $('.total3').html(total);
        //     }
        // }
    })
})