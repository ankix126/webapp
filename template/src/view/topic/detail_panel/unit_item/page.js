define(function(require){
    var topicInfo;
    var domid,o={};

    o.init = function(_domid,topicInfo) {
        domid = _domid;

        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'north-'+domid, region:'north',height:38,style:"background:#FBF7EB;overflow:hidden;"},
                {id:'center-'+domid,region:'center',style:'background:#fff;'},
                {id:'cardview-'+domid, region:'east', width:300,split:true,collapsible:true,style:'background:#fff;'}
            ]
        }).init();

        require("./grid").init("center-"+domid, "north-"+domid, topicInfo);
        require("./card_preview").init('cardview-'+domid);
    };
    return o;
});
