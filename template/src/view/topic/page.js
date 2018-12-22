define(function(require){
    /* PR单管理 */
    var BasePage = require('core/BasePage');
    var o = new BasePage({
        name : 'create',
        id   : 'topic',
    });

    // 页面入口
	o.execute = function(domid,query) {
        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'topic-'+domid,region:'west',width:250,collapsible:true,split:true,style:'background:#eee'},
                {id:'detail-'+domid,region:'center',style:'background:#fff;'}
            ]
        }).init();

        require('./detail_panel/page').init('detail-'+domid);
        require('./topic_panel/page').execute('topic-'+domid,query);
	};

    return o;
});
