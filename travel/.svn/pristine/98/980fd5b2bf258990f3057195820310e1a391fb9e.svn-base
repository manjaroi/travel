var config = {
    modules: {
        'price-calendar': {
            fullpath: 'price-calendar.js', //根据项目路径调整
            type    : 'js',
            requires: ['price-calendar-css']
        },
        'price-calendar-css': {
            fullpath: 'price-calendar.css', //根据项目路径调整
            type    : 'css'
        }
    }
};
YUI(config).use('price-calendar', function(Y) {
    var oCalendar = new Y.PriceCalendar();    
    //do something
})