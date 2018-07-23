require.config({
	paths : {
		'jquery' : '../lib/jquery-3.3.1',
		'http' : './httpclient1',
	}
})



require(['jquery','http'],function($,http){
	$(function(){
		$('#box').load('head.html');
		$('#l_foot').load('foot.html');

// ===================================请求拿到页码=====================================
		function page(){
			http.get('http://10.3.138.233:8080/counts').then(function(res){
				let page = Math.ceil(res[0].total / 15);
				var res = '';
				for(var i = 0;i < page;i ++){
					res += `<a href="javascript:;" class="now_page">${i+1}</a>`;
					$('.page').html(res);
				}
				let now_page = $('.now_page');
				$(now_page[0]).addClass('select');

				current2();
			})	
		}

				

// ======================================生成列表页======================================		
		http.get('http://10.3.138.233:8080/travel').then(function(res){
			console.log(res);
			let li_id;	
			function render(){
				let str = '';
				str += res.map(function(item,idx){
					let date = item.date;
					date = date.slice(0,10);
					return `<div class="l_content" data-id="${item.id}"><img src="${item.imgurl}" alt=""><div class="l_content_r"><div class="l_content_r_c"><p>${item.name}</p><p class="clearfix"><span>超值行程</span></p><p>出发地: <span>${item.start_place}</span></p><p>出发日期: <span>${date}</span></p></div></div><div class="l_content_r_r"><p><span>￥</span><span>${item.price}</span>起</p><a href="javascript:;" class="book" target="_blank">立即预定</a></div></div>`
				}).join(' ');
				$('.show').html(str);
				page();
				
			}
			render();


			let data = window.localStorage.getItem('key') || [];
			if(typeof data == 'string'){
				data = JSON.parse(data);
			}
			function read(){
				let result = '';
				result += data.map(function(item,i){
					return `<div class="block clearfix"><img src="${item.imgurl}" alt=""><div class="third_r"><span>${item.name}</span><span><i>￥</i><i>${item.price}</i>起</span></div></div>`
				}).join(' ');
				$('.near').html(result);
			}

			read();
			function show(){
				$('.show').click(function(e){
					let target = e.target;
					if (target.className == 'book') {
						let id = $(target.parentNode.parentNode).attr('data-id');
						let idx;
						let has = data.some(function(item,i){
							idx = i;
							return item.id == id;
						})
						if (has) {
							
						}else{
							let goodslist = {
								id : id,
								price : target.parentNode.children[0].children[1].innerText,
								name : target.parentNode.parentNode.children[1].children[0].children[0].innerText,
								imgurl : $(target.parentNode.parentNode.children[0]).attr('src'),
								start_place : $(target.parentNode.parentNode.children[1].children[0].children[2].children[0]).text(),
								qty : 1,
							}
							data.push(goodslist);
						}
						let storage = window.localStorage.setItem('key',JSON.stringify(data));

						// ================================最近浏览=================================		
						read();


						// ==================================跳转传参数===============================


						li_id = $(target.parentNode.parentNode).attr('data-id')
						console.log(li_id);
						console.log($(target).attr('href','details.html?'+ li_id +''));
					}	
				})
			}
			show();

		})	
		
// =============================================分页======================================
		function current2(){
			$('.now_page').click(function(){
				$(this).addClass("select");
				$(this).siblings().removeClass("select");
				http.get(`http://10.3.138.233:8080/travel?page=${$(this).text()}&&qty=15`).then(function(res){
					let str = '';
					str += res.map(function(item,idx){
						let date = item.date;
						date = date.slice(0,10);
						return `<div class="l_content" data-id="${item.id}"><img src="${item.imgurl}" alt=""><div class="l_content_r"><div class="l_content_r_c"><p>${item.name}</p><p class="clearfix"><span>超值行程</span></p><p>出发地: <span>${item.start_place}</span></p><p>出发日期: <span>${date}</span></p></div></div><div class="l_content_r_r"><p><span>￥</span><span>${item.price}</span>起</p><a href="javascript:;" class="book" target="_blank">立即预定</a></div></div>`
					}).join(' ');
					$('.show').html(str);
				})
			})
		}	


		$('.show').mousemove(function(e){
			let target = e.target;
			if ($(target).attr('class') == 'l_content') {
				$(target).addClass("select1");
				// $(target).siblings().removeClass("select1");
			}	
		})
		
		$('.show').mouseout(function(e){
			let target = e.target;
			if ($(target).attr('class') == 'select1' || 'l_content') {
				$(target).removeClass("select1");
			}	
		})



		let hover = $('.l_route');		
		hover.mouseover(function(e){
			let target = e.target;
			if (target.tagName == 'A' || target.tagName == 'I') {
				$(target).css('color','#58bc58');
			}
		})	
		hover.mouseout(function(e){
			let target = e.target;
			if (target.tagName == 'A' || target.tagName == 'I') {
				$(target).css('color','#333');
			}
		})	
	})

	// ============================价格排序=============================
	let params = {priceSort:'up'};
	let params1 = {priceSort:'down'};		

	function current1(option){
		$('.now_page').click(function(){
			$(this).addClass("select");
			$(this).siblings().removeClass("select");
			http.get(`http://10.3.138.233:8080/sort?page=${$(this).text()}`,option).then(function(res){
				let str = '';
				str += res.map(function(item,idx){
					let date = item.date;
					date = date.slice(0,10);
					return `<div class="l_content" data-id="${item.id}"><img src="${item.imgurl}" alt=""><div class="l_content_r"><div class="l_content_r_c"><p>${item.name}</p><p class="clearfix"><span>超值行程</span></p><p>出发地: <span>${item.start_place}</span></p><p>出发日期: <span>${date}</span></p></div></div><div class="l_content_r_r"><p><span>￥</span><span>${item.price}</span>起</p><a href="javascript:;" class="book" target="_blank">立即预定</a></div></div>`
				}).join(' ');
				$('.show').html(str);
			})
		})
	}


	let sort = 'down';
	let sort1 = 'up';
	let show1 = true;
	$('.l_general').click(function(e){
		let target = e.target;
		if (target.className == 'last') {
			if (show1) {
				console.log(666);
				$('.show').html('');
				http.get('http://10.3.138.233:8080/sort',{priceSort:'up'}).then(function(res){
					let str = '';
					str += res.map(function(item,idx){
						let date = item.date;
						date = date.slice(0,10);
						return `<div class="l_content" data-id="${item.id}"><img src="${item.imgurl}" alt=""><div class="l_content_r"><div class="l_content_r_c"><p>${item.name}</p><p class="clearfix"><span>超值行程</span></p><p>出发地: <span>${item.start_place}</span></p><p>出发日期: <span>${date}</span></p></div></div><div class="l_content_r_r"><p><span>￥</span><span>${item.price}</span>起</p><a href="javascript:;" class="book" target="_blank">立即预定</a></div></div>`
					}).join(' ');
					$('.show').html(str);
					current1(params);
				})
			}else if (!show1) {
				console.log(777);
				$('.show').html('');
				$('.page').children(0).eq(0).addClass('select');
				$('.page').children(0).eq(0).siblings().removeClass('select');
				http.get('http://10.3.138.233:8080/sort',{priceSort:'down'}).then(function(res){
					let str = '';
					str += res.map(function(item,idx){
						let date = item.date;
						date = date.slice(0,10);
						return `<div class="l_content" data-id="${item.id}"><img src="${item.imgurl}" alt=""><div class="l_content_r"><div class="l_content_r_c"><p>${item.name}</p><p class="clearfix"><span>超值行程</span></p><p>出发地: <span>${item.start_place}</span></p><p>出发日期: <span>${date}</span></p></div></div><div class="l_content_r_r"><p><span>￥</span><span>${item.price}</span>起</p><a href="javascript:;" class="book" target="_blank">立即预定</a></div></div>`
					}).join(' ');
					$('.show').html(str);
				})
				current1(params1);
			}
			show1 = !show1;
			console.log(show1);
		}
	})

})