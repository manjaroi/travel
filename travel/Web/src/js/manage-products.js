    var modifyid;
	var travelPic;
	$(function(){
	// console.log(config);
	var baseUrl = config.baseUrl;
	var currentPage = 1;
	getDatas(1,10);
	//点击添加
	$(".addData").on("click",function(e){
		$(".mask").show();
		$(".addForm").show(200);
		$(".submitForm").show();
		$(".modifyForm").hide();
	});
	//取消
	$(".cancel").on("click",function(e){
		$(this).parent().find("input").val("");
		$(".mask").hide();
		// $(".addForm").hide();
		// alert("取消");
	});
	// 添加保存
	$(".submitForm").on("click",function(e){
			let fd = new FormData();

			let route = $("#travel-route").val();
			let price = $("#traval-price").val();
			let place = $("#traval-place").val();
			let time = $("#traval-departure").val();
			// let pic = $("#traval-showPic").val();
			let photos = $("#traval-showPic")[0].files[0];
			let photoName = photos.name;
			fd.append("route",route);
			fd.append("price",price);
			fd.append("place",place);
			fd.append("time",time);
			fd.append("photos",photos);
			fd.append("pic",photoName);

			$.ajax({
				url: baseUrl + "/addForm",
				type:"post",
				data : fd,
				contentType : false,
				processData : false,
				success : function(res){
					if(res.affectedRows > 0){
						$(this).parent().find("input").val("");
						alert("添加成功");
						$(".mask").hide();
					    $(".addForm").hide();
					}
					
				}
			});
	})
	


	//-----------------------------------------华丽的分割线----------------------

		$.ajax({
			url: baseUrl + "/counts",
			success:function(count){
				let num = Math.ceil(count[0].total/10);
				createPageBox(num);

				//点击切换页面
				$(".pageBox").on("click",function(e){
					if(e.target.tagName == "LI"){
						let page = $(e.target).attr("data-operate") ? $(e.target).attr("data-operate") : $(e.target).attr("data-page");
						// console.log(page);
						if(page == "previous"){
							if(currentPage <= 1){
								currentPage = 1;
							}else{
								currentPage = currentPage-1;
							}
							page = currentPage;
						}
						if(page == "next"){
							if(currentPage >= num){
								currentPage = num;
							}else{
								currentPage = currentPage * 1 + 1;
							}
							page = currentPage;
						}
						currentPage = page;

						getDatas(page,10);
						//改变页码样式
						let lis = $(".pageBox ul li");
						lis.attr("class","");
						lis[currentPage].classList.add("active");
					}

				});
			}
		});


		//创建分页盒子
		function createPageBox(num){
			let $pageBox = $("<div/>").addClass("pageBox");
				let $ul = $("<ul>");
				let $previous = $("<li data-operate='previous'>上一页</li>");
				$previous.appendTo($ul);
				for(let i=1;i<=num;i++){
					
					let $li = $("<li data-page='" + i + "'>");
					$li.text(i);
					if(i==1){
						$li.addClass("active");
					}
					$li.appendTo($ul);
				}
				let $next = $("<li data-operate='next'>下一页</li>");
				$next.appendTo($ul);
				$ul.appendTo($pageBox);
				let page = $('.page-box');
				$pageBox.appendTo(page);
		}

		//获取分页数据
		function getDatas(page,qty){
			$.ajax({
				url: baseUrl + "/getDatas",
				type:"post",
				data : {
					page : page,
					qty : qty
				},
				success : function(res){
					let tbody = $("tbody");
					tbody.text("");
					res.forEach(function(item,idx){
						tbody.append(`<tr>
					<td>${item.id}</td>
					<td>${item.name}</td>
					<td>${item.price}</td>
					<td>${item.imgurl}</td>
					<td>${item.start_place}</td>
					<td>2018-07-16</td>
					<td><button class="btn btn-warning remove_route">删除</button></td>
					<td><button class="btn btn-info modify_route">修改</button></td>
					</tr>`)
					});
					// 删除
					$(".remove_route").on("click",function(e){
						var popup = new Popup({
							'type': 'submit',
							'title': '删除操作',
							'text': '确认删除该内容吗？',
							'cancelbutton': true,
							'closeCallBack': () => {
							},
							'submitCallBack': () => {
								let id = $(this).parent().parent().find("td:first").text();
								 console.log($(this).parent().parent().remove());
								$.ajax({
									url : baseUrl + "/removeRoute",
									data : {
										routeId : id
									},
									type: "post",
									success : function(res){
										if(res.affectedRows > 0){
										}
									}
								});
							}
						})
					});

					// 修改
					
					$(".modify_route").on("click",function(){
							$(".mask").show();
							$(".addForm").show();
							$(".modifyForm").show();
							$(".submitForm").hide();
							modifyid = $(this).parent().parent().find("td:eq(0)").text();
							let route = $(this).parent().parent().find("td:eq(1)").text();
							let price = $(this).parent().parent().find("td:eq(2)").text();
							travelPic = $(this).parent().parent().find("td:eq(3)").text();
							let place = $(this).parent().parent().find("td:eq(4)").text();
							let time = $(this).parent().parent().find("td:eq(5)").text()
							$("#travel-route").val(route);
							$("#traval-price").val(price);
							$("#traval-place").val(place);
							$("#traval-departure").val(time);
							
					})
					

				}

			});
		}

		$(".mask").on("click",function(e){
				if(e.target.classList.contains("modifyForm")){
				
					let _route = $("#travel-route").val();
					let _price = $("#traval-price").val();
					let _place = $("#traval-place").val();
					let _time = $("#traval-departure").val();
					let _pic = $("#traval-showPic").val();

					$.ajax({
						url: baseUrl + "/modifyForm",
						type:"post",
						data : {
							routeId : modifyid,
							route : _route,
							price : _price,
							place : _place,
							time : _time,
							pic : _pic ? _pic : travelPic 
						},
						success : function(res){
							if(res.affectedRows > 0){
								$(this).parent().find("input").val("");
								$(".mask").hide();
								$(".addForm").hide();
							}
						}
					});

				}
			})
	})
