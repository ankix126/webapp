define(function(require){
    /* data_area.js, (c) 2018 mawentao */
    var o={};

    o.init = function(domid,topicInfo) {

        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'unit-'+domid,region:'west',width:200,split:true,style:'background:#f4f5f6',html:'单元'},
                {id:'item-'+domid,region:'center',style:'background:#fff;',html:'数据'}
            ]
        }).init();

        require('./unit/page').init('unit-'+domid,topicInfo);
        require('./unit_item/page').init('item-'+domid,topicInfo);
    };

    return o;
});
