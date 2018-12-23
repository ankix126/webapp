define(function(require){
    var domid,o={};

    o.init = function(_domid,topicInfo) {
        domid = _domid;
        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'north'+domid, region:'north',height:34,style:"background:#eee;padding-top:4px;"},
                {id:'center'+domid,region:'center'}
            ]
        }).init();

        new mwt.ToolBar({
            render : 'north'+domid,
            style : 'background:none',
            items  : [
                '<label class="head-title">'+lan(['card','preview'])+'</label>',
            ]
        }).create();
    };

    o.show = function(item) {
        var elid = 'center'+domid;
        if (!item.fields || !item.fields.length) {
            textblock.empty(" ",elid);
            return;
        }
        var code = '<div class="card-canvas" style="text-align:center;padding:15px 0;">'+
            item.fields.join('<hr>')+
        '</div>';
        jQuery('#'+elid).html(code);
    };

    return o;
});
