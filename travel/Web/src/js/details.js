
















$(function(){






// **********************吸顶菜单***********************************
    $(window).on('scroll',function(){
        
        var x = window.scrollY;
     
       
        if(x >= 1060){

            $('.oyw_mounting')[0].style.display = 'block';

        }else{

            $('.oyw_mounting')[0].style.display = 'none';
        }  


        if(x>=1757 & x<=4090){
            $('.timeline_mod').addClass('timeline0');
        }else{
             $('.timeline_mod').removeClass('timeline0');
        }   
    });



   // ********************逻辑运算****************************************
  

    var j_sub = $('.j_sub');
  
    for(var i = 0;i<j_sub.length;i++){
        
        j_sub.eq(i).on('click',function(){

              
            var input = this.parentNode.children[1];
            
            var j_price = $('.price')[1].innerText;

            $('.price')[0].innerText = j_price;


            if(input.value > 0){
                
                input.value--;
                 
                var total = $('.num','.total')[0].innerText*1;
                 
                $(this).removeClass('disabled');
                
                total -= j_price*1;;

                $('.num','.total')[0].innerText = total;
                
                $('.price1').html(total);
            }
         

        });
    }
    var j_add = $('.j_add');
    
    
    for(var i = 0;i<j_add.length;i++){
        // console.log(i)
        j_add.eq(i).on('click',function(){

              
            var input = this.parentNode.children[1];
            
            var j_price = $('.price')[1].innerText;
            
            var a = this.parentNode.children[0];

                $('.price')[0].innerText = j_price;

                input.value++;
                
                var total = $('.num','.total')[0].innerText*1;
               
                 total += j_price*1;

                $('.num','.total')[0].innerText = total;
                
                $('.price1').html(total);

                if(input.value > 0){

                    $(a).removeClass('disabled');

                }
               
        });
    }





 


         //***********************导航条切换*****************        
                
                //水平
               
               $('.oyw_ul').onePageNav(); 

                //垂直  
               $('.timeline_list').onePageNav();  



        let search = window.location.search;
       
        search = search.slice(1);
         
         if(search.indexOf('name') == 0){

            res1=search.split('&');
                   
            var obj={};

             res1.forEach(function(item){

                var arr = item.split('=');
                      

                obj[arr[0]]=decodeURI(arr[1]);

            });

                  
            $('.main-c')[0].innerHTML = `<div class="main-cl fl"><img src="${obj.img}" alt="" / style="width:480px;height="320px";"></div><div class="main-cr fr"><h3>${obj.name}</h3><h5><em>参考价：</em><span  class="price">${obj.price}</span><em>起/人</em></h5><dl><dt>出 发 地</dt><dd class="place">${obj.place}</dd></dl><dl><dt>目 的 地</dt><dd>曼谷</dd><dd>芭提雅</dd><dd>沙美岛</dd></dl><dl><dt>相关服务</dt><dd>本产品由康辉集团北京国际旅行社有限公司提供相关服务</dd></dl><p class="p2"><i></i><span>康辉定制游</span><em>行程自己做主，时间无拘无束</em><a href="#">立即定制</a></p></div> `


            $('.num','.total').html($('.price').text());

            $('.price1').text($('.price').text());

            $('title').text($('h3','.main-cr').text());
            
         
            

            $('.btn1').click(function(){

            let price = $('.price').eq(1).text();
            let name = $('h3','.main-cr').text();
            let place = $('.place').text();
           
            let num1 = $('#standard_count').val();

            let num2 = $('#child_count').val();
            
            let num = num1*1 + num2*1;


                console.log($('.btn1').attr('href','order.html?'+ 'name=' + name + '&place=' + place +'&num=' + num  + '&price=' + price));
            })


            $('.btn2').click(function(){

                let price = $('.price').eq(1).text();

                let name = $('h3','.main-cr').text();
                let place = $('.place').text();
               
                let num1 = $('#standard_count').val();

                let num2 = $('#child_count').val();
                
                let num = num1*1 + num2*1;
                
                console.log($('.btn2').attr('href','order.html?'+  'name=' + name + '&place=' + place +'&num=' + num  + '&price=' + price));
            })
         
        }else{
            
            let storage = window.localStorage.getItem('key');
           
            if (typeof storage == 'string') {
            
            storage = JSON.parse(storage);
            
            let res = storage.map(function(item,i){
                
                if (item.id == search) {
                     return `<div class="main-cl fl"><img src="${item.imgurl}" alt="" / style="width:480px;height="320px";"></div><div class="main-cr fr"><h3>${item.name}</h4><h5><em>参考价：</em><span  class="price">${item.price}</span><em>起/人</em></h5><dl><dt>出 发 地</dt><dd class="place">${item.start_place}</dd></dl><dl><dt>目 的 地</dt><dd>曼谷</dd><dd>芭提雅</dd><dd>沙美岛</dd></dl><dl><dt>相关服务</dt><dd>本产品由康辉集团北京国际旅行社有限公司提供相关服务</dd></dl><p class="p2"><i></i><span>康辉定制游</span><em>行程自己做主，时间无拘无束</em><a href="#">立即定制</a></p></div> `
                }
                    
                    
               
            })
        
            $('.main-c').html(res); 


             }
            $('.num','.total').html($('.price').text());

            $('.price1').text($('.price').text());

             $('title').text($('h3','.main-cr').text());
             $('.btn1').click(function(){

                let price = $('.price').eq(1).text();    
                let name = $('h3','.main-cr').text();
                let place = $('.place').text();
              
                let num1 = $('#standard_count').val();

                let num2 = $('#child_count').val();
                
                let num = num1*1 + num2*1;
                 console.log(place)

                console.log($('.btn1').attr('href','order.html?'+ 'name=' + name + '&place=' + place +'&num=' + num  + '&price=' + price));
            })


            $('.btn2').click(function(){

                let price = $('.price').eq(1).text();
                let name = $('h3','.main-cr').text();
                let place = $('.place').text();
               
                let num1 = $('#standard_count').val();

                let num2 = $('#child_count').val();
                
                let num = num1*1 + num2*1;
                console.log(place)
                
                console.log($('.btn2').attr('href','order.html?'+  'name=' + name + '&place=' + place +'&num=' + num  + '&price=' + price));
            })
        }
         
        



        





            var uls = $('.uls');
            
            var b;
            
            var a = 0;
            
            $('.i2-btn').on('click',function(){
                
               
                a++;
                
                b = a;
                
       
                for(var i = 0;i<uls.length;i++){
             
                    uls.eq(i)[0].style.transform = `translateY(-${a*68}px)`;

                }
                
               if(a>0){
                $('.i3-btn').css('display','block');
                $('.i1-btn').css('display','none');
               }else{
                $('.i3-btn').css('display','none');
                $('.i1-btn').css('display','block');
               }
           
      
                if(a>=5){
                    
                    b = a - 1;
                    
                    a = 4;
   
                    for(var i = 0;i<uls.length;i++){
             
                        uls.eq(i)[0].style.transform = `translateY(-${a*68}px)`;

                    }
                }
               
                
            });
            
            $('.i3-btn').on('click',function(){

                b--;
                 
                for(var i = 0;i<uls.length;i++){
             
                    uls.eq(i)[0].style.transform = `translateY(-${b*68}px)`;
                    

                }
      
                if(b<=0){


                    $('.i3-btn').css('display','none');
                    $('.i1-btn').css('display','block');

                    for(var i = 0;i<uls.length;i++){
             
                        uls.eq(i)[0].style.transform = "translateY(0px)";

                    }
                    
                    b = 0;
                    
                }
                a = b 
            });

            

            http.get('http://10.3.138.233:8080/travel?page=1&qty=6',{},function(res){

                
                res.forEach(function(item,idx){                
                    $('ul','.main-c0').children(0).eq(idx).prop('id',item.id);
                    $('img','.main-c0')[idx].src = item.imgurl;
                    $('p','.main-c0').eq(idx).children(1).eq(0)[0].innerText = item.name;
                    $('p','.main-c0').eq(idx).children(1).eq(1)[0].innerText = item.price;
                });

            });



              let show = true;
              $('.j_port').click(function(){
                http.get('src/api/region.json',{},function(res){
                  let arr;
                  for(var key in res){
                    arr = res.regions;
                  }
                 
                  let str = '';
                  str += arr.map(function(item,i){
                    if (item.hot == true) {
                      return `<a href="javascript:;">${item.name}</a>`;
                    }
                  }).join('')
                  $('.hotCities').html(str);

                  let word = 'ABCDEFGHJKLMNPQRSTWXYZ';
                  word = word.split('');
                  let word_html = '';
                  word_html += word.map(function(item, index) {
                    return `<a class="index j_index" href="#a${index}">${item}</a>`;
                  }).join("");

                  $('.cityIndexes').html(word_html);
                  let A = $('.cityIndexes').eq(0).find('span').eq(0);
                  A.addClass('on');
                  let city = $('.cityIndexes').eq(0).find('span');
                  $('.cityIndexes').mouseover(function(e){
                    let target = e.target;
                    $(target).addClass("on");
                    $(target).siblings().removeClass("on");
                  })
                })
                if (show) {
                  $('.layer').css('display','block');
                }else if (!show) {
                  $('.layer').css('display','none');
                }
                show = !show;

              })

              http.get('src/api/region.json',{},function(res){
                let city_html = '';
                let abc = '';
                let arr1;
                let word1 = 'ABCDEFGHJKLMNPQRSTWXYZ';
                word1 = word1.split('');
                for(var key in res){
                  arr1 = res.regions;
                }

                let arr2 = [];
                let dd = '';
                for(var i = 0;i < word1.length;i ++){
                  let dl = `<dl class="section j_section" id="a${i}"></dl>`;
                  dd = `<dd class="value"></dd>`
                  for(let key in res){
                    let arr = res['regions'];
                    city_html = arr.map(function(item,idx) {
                      var res = item.pinyin.slice(0, 1);
                      var area = item.regions;
                      if(item.municipality && res == word1[i]) {
                        return `<a href="javascript:;" data-letter="${item.pinyin}">${item.name}</a>`;
                      } else if(area) {
                        return area.map(function(item,idx) {
                          if(item.pinyin) {
                            var begin2 = item.pinyin.slice(0, 1);
                            if(begin2 == word1[i]) {
                              return `<a href="javascript:;" data-letter="${item.pinyin}">${item.name}</a>`;
                            }
                          }
                        }).join("");
                      }
                    }).join("");
                    arr2.push(city_html);
                  }


                  $('.scrollBody').append(dl);
                }

                




                $('.j_section').each(function(idx,item){
                  $('<dt class="index">'+ word1[idx] +'</dt>').appendTo($(item));
                      // $(arr2[idx]).appendTo($(item));  
                    })


                $('.j_section').append(dd);

                $('.value').each(function(idx,item){
                  $(arr2[idx]).appendTo($(item));
                })
                $('.searchInput').focus(function(){
                  $('.searchPlaceholder').css('display','none');
                })
                $('.searchInput').blur(function(){
                  if ($('.searchInput').val() == '') {
                    $('.searchPlaceholder').css('display','block');
                  }
                })

                let search = '';
                let arr3 = [];
                $('.searchInput').bind('input propertychange',function(){
                  let input_value = $('.searchInput').val();
                  for(let i = 0;i < word1.length;i ++){
                    for(let key in res){
                      let arr = res['regions'];
                      search = arr.map(function(item,idx){
                        var res = item.pinyin.slice(0, i);
                              // console.log(res);
                              var area = item.regions;
                              if(input_value == res.toLowerCase() && input_value != '') {
                                if (item.name != $('.searchResult').text()) {
                                  return `<a href="javascript:;">${item.name}</a>`;
                                }
                              }else if (area) {
                                return area.map(function(item,idx){
                                  if (typeof item.pinyin == 'string') {
                                    let str = item.pinyin.slice(0, i);
                                    if (input_value == str.toLowerCase() && input_value != '') {
                                      if (item.name != $('.searchResult').text()) {
                                        return `<a href="javascript:;">${item.name}</a>`;
                                      }
                                    }
                                  }
                                }).join('');
                              }
                            }).join('');
                    }
                    arr3.push(search);
                    let arr4 = arr3[arr3.length-1]
                    // console.log(arr4);
                    $('.searchResult').append(arr3[arr3.length-1]);
                    $('.searchInput').keydown(function(){
                      $('.searchResult').html('');
                    })  

                  }
                })
              })             



});






 


