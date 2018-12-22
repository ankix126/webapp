define(function(require){
    var topicInfo;
    var domid,o={};

    o.init = function(_domid,topicInfo) {
        domid = _domid;

        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'center-'+domid,region:'center',style:'background:#fff;'}/*,
                {id:'south-'+domid, region:'south', height:200,split:true,style:'background:#fff;border-top:solid 1px #ddd',
                    html:textblock.empty("item detail")}*/
            ]
        }).init();
        require("./grid").init("center-"+domid, topicInfo);
    };
    return o;
});
