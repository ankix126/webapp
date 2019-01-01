define(function(require){
    /* 学习引擎 */
    var o={};
    // 页面入口
	o.execute = function() {
        var coverElid = 'cover-div';
        var engineElid = 'engine-div';

        var code = '<div id="'+coverElid+'" class="flashcard-cover"></div>'+
            '<div id="'+engineElid+'" style="width:100%;height:100%;display:none;"></div>';
        jQuery('#main').html(code);

        require('./cover').init(coverElid);
        require('./engine').init(engineElid);

/*
        alert("init page");

        ajax.post("study&action=aaa",{},function(){

        });
*/
	};


    


    return o;
});
