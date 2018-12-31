define(function(require){
    /* 学习模块 */
    var BasePage = require('core/BasePage');
    var o = new BasePage({
        name : 'study',
        id   : 'study',
    });

    // 页面入口
	o.execute = function(domid,query) {

        new mwt.BorderLayout({
            render : domid,
            items : [
                // {id:'topic-'+domid,region:'north',height:80,collapsible:true,split:true,style:'background:#eee'},
                {id:'center-'+domid,region:'center',style:'background:#eee;padding:20px;'}
            ]
        }).init();

        require('./grid').init('center-'+domid);
/*
        require('./detail_panel/page').init('detail-'+domid);
        require('./topic_panel/page').execute('topic-'+domid,query);*/
	};

    return o;
});
