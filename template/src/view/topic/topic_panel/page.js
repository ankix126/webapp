define(function(require){
    // 主题列表
    var gridPanel = require("./grid");
    var o={};

	o.execute = function(domid,query) {
        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'tbar-'+domid, region:'north', height:33, style:"border-bottom:0px solid #ddd;"},
                {id:'center-'+domid,region:'center',style:'background:#F2F2F2;'}
            ]
        }).init();

        new mwt.ToolBar({
            render : 'tbar-'+domid,
            items  : [
                '<label class="head-title">我的学习集</label>',
                '->',
                {label:iconlabel.plus(''),cls:'mwt-btn-primary tbtn',handler:function(){
                    var params = {tid:0};
                    require('./dialog').open(params,gridPanel.query);
                }},
            ]
        }).create();

        var topicId = query.tid ? query.tid : 0;
        gridPanel.init('center-'+domid, topicId);
	};

    return o;
});
