define(function(require){
    /* data_area.js, (c) 2018 mawentao */
    var o={};

    o.init = function(domid,topicInfo) {

        new mwt.BorderLayout({
            render : domid,
            items : [
                {region:'west',width:200,split:true,style:'background:#f4f5f6',html:'单元'},
                {region:'center',style:'background:#fff;',html:'数据'}
            ]
        }).init();

        // alert("init data-area");
    };

    return o;
});
