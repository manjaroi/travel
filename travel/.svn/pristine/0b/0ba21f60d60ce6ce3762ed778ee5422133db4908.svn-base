var http = {
    baseUrl: 'http://10.3.136.216:88/',
    filterUrl: function(_url){
        if(_url.startsWith('http')){
            return _url;
        }
        return this.baseUrl + _url;
    },
    get: function(_url, _params, _callback){
        _url = this.filterUrl(_url);
        $.ajax({
            url: _url,
            data: _params || {},
            beforeSend: function(){
                if($('.mask')[0]){
                    $('.mask').show();
                } else {
                    var _mask = `<div class="mask" style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: #ccc; opacity: .3;">
                            <i class="fa fa-refresh fa-spin"></i>
                        </div>`;
                    $(_mask).appendTo('body').show();
                }
            },
            success: function(res){
                _callback(res);
            },
            error: function(error){
                console.log(error);
            },
            complete: function(){
                $('.mask').hide();
                $('.mask').remove();
            }
        })
    },
    post: function(_url, _params, _callback){
        _url = this.filterUrl(_url);
        $.ajax({
            url: _url,
            data: _params || {},
            type: 'post',
            beforeSend: function(xhr){
      
                if($('.mask')[0]){
                    $('.mask').show();//
                } else {
                    var _mask = `<div class="mask" style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: #ccc; opacity: .3;">
                            <i class="fa fa-refresh fa-spin"></i>
                        </div>`;
                    $(_mask).appendTo('body').show();
                }
            },
            success: function(res){
                _callback(res);
            },
            error: function(error){
                console.log(error);
            },
            complete: function(){
                $('.mask').hide();
                $('.mask').remove();
            }
        })
    }
}

var Cookie = {
    get:function(key){

        var cookies = document.cookie;
        if(cookies.length === 0){
            return '';
        }
        cookies = cookies.split('; ');

        for(var i=0;i<cookies.length;i++){
            var arr = cookies[i].split('=');

            if(arr[0] === key){
                return arr[1];
            }
        }
    },

    set:function(key,value,date,path){
        var str = key + '=' + value;
        if(date){
            str += ';expires=' + date.toUTCString();
        }
        if(path){
            str += ';path='+path;
        }

        document.cookie = str;
    },

    remove:function(key,path){
        var d = new Date();
        d.setDate(d.getDate()-1);

        this.set(key,'x',d,path);
    },

    clear:function(){

    }
}

