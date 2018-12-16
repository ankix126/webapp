define(function(require){
    /* template_area.js, (c) 2018 mawentao */
    var o={};

    o.init = function(domid,topicInfo) {

        var width = jQuery('#'+domid).width();

        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'fields-'+domid,region:'west',width:width/2.5,style:'background:#fff',html:'字段'},
                {id:'cards-'+domid,region:'center',style:'background:#fff;border-left:solid 1px #ddd;',html:'卡片'}
            ]
        }).init();

        require('./field_panel/page').init('fields-'+domid,topicInfo);
        require('./card_panel/page').init('cards-'+domid,topicInfo);

        // require('./cards_grid').init('cards-'+domid,topicInfo);

        /*
        // 字段工具栏
        new mwt.ToolBar({
            render : 'fields-'+domid,
            items  : [
                '<label class="head-title">字段</label>',
                '->',
                {label:"<i class='icon icon-plus' style='font-size:14px;'></i>",cls:'mwt-btn-primary',handler:function(){
                    //var params = {tid:0};
                    //require('./dialog').open(params,gridPanel.query);
                }},
            ]
        }).create();

        // 卡片工具栏

        new mwt.ToolBar({
            render : 'cards-'+domid,
            items  : [
                '<label class="head-title">我的学习集</label>',
                '->',
                {label:"<i class='icon icon-plus' style='font-size:14px;'></i>",cls:'mwt-btn-primary',handler:function(){
                    var params = {tid:0};
                    require('./dialog').open(params,gridPanel.query);
                }},
            ]
        }).create();
*/

    };

    return o;
});
