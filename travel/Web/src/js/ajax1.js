var http = {
    baseUrl:'http://192.168.111.1:89/',
    filterUrl: function(url){
        if(url.startsWith('http')){
            return url;
        }
        return this.baseUrl + url;
    },


    get: function(_url,_params,_callback){
        _url = this.filterUrl(_url);

        $.ajax({
            url:_url,
            data:_params || {},
            beforesend:function(){
                if($('.msk')[0]){
                    $('.msk').show();
                }else{
                    var msk = `<div class="msk" style="position:fixed;top:0;right:0;bottom:0;left:0;background-color:#ccc;opacity:0.4">
                    <i class="fa fa-refresh fa-spin"></i>
                    </div>`;
                    $('.msk').appendTo('body').show();
                }
            },
            success:function(res){
                _callback(res);
            },
            complete:function(){
                $('.msk').hide();
            }
        })
    },
    post: function(_url,_params,_callback){
        _url = this.filterUrl(_url);

        $.ajax({
            url:_url,
            type:'post',
            data:_params || {},
            headers:{
                Authorization:"bearer " + window.localStorage.getItem('access_token')
            },
            beforesend:function(){
                if($('.msk')[0]){
                    $('.msk').show();
                }else{
                    var msk = `<div class="msk" style="position:fixed;top:0;right:0;bottom:0;left:0;background-color:#ccc;opacity:0.4">
                    <i class="fa fa-refresh fa-spin"></i>
                    </div>`;
                    $('.msk').appendTo('body').show();
                }
            },
            success:function(res){
                _callback(res);
            },
            error:function(error){
                if(error.responseJSON==4001){
                    window.location.href = 'login.html';
                }
            },
            complete:function(){
                $('.msk').hide();
            }
        })
    }
}