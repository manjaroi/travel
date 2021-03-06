$(function(){
	var baseUrl = config.baseUrl;

	getOrderList().then((result)=>{
		generateTable(result);
	});
	getOrdersCounts().then((counts) => {
		let num = Math.ceil(counts[0].total / 10);
		console.log(counts);
		createPageBox(num);
		changePage();
	});




	function getOrderList(page=1,qty=10){
		return new Promise((resolve,reject)=>{
			$.ajax({
				url : baseUrl + "/orders",
				data : {
					page : page,
					qty : qty
				},
				success : function(res){
					resolve(res);
				},
				error : function(err){
					reject(err);
				}
			});
		});
	}

	function generateTable(datas){
		let tbody = $("tbody");
		tbody.text("");
		$(datas).each((idx,item) => {
			let status = item.status == 0 ? "未支付" : "已支付";
			tbody.append(`<tr>
							<td>${item.id}</td>
							<td>${item.phone}</td>
							<td>${item.product_id}</td>
							<td>${item.name}</td>
							<td><span class="pay-status ${item.status == 0 ? "unpayed" : "payed"}">${status}</span></td>
							<td>2018-08-25</td>
							<td colspan="2">操作</td>
						 </tr>`);
		});
	}

	function getOrdersCounts(){
		return new Promise((resolve,reject) => {
			$.ajax({
				url : baseUrl + "/orderCounts",
				success : function(res){
					resolve(res);
				},
				error : function(err){
					reject(err);
				}
			});
		});
	}

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

	function changePage(){
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

						getOrderList(currentPage,10).then((res) => {
							generateTable(res);
						})
						//改变页码样式
						let lis = $(".pageBox ul li");
						lis.attr("class","");
						lis[currentPage].classList.add("active");
					}

			});
	}

})