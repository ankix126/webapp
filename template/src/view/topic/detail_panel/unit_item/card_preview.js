define(function(require){
    var topicCardsModel = require('model/topic_cards');
    var domid,topicInfo,o={};

    o.init = function(_domid,_topicInfo) {
        domid = _domid;
        topicInfo = _topicInfo;
        var carOptions = topicCardsModel.getOptions(topicInfo.topicId);

        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'north'+domid, region:'north',height:44,style:"background:#eee;padding-top:4px;overflow:hidden"},
                {id:'center'+domid,region:'center'}
            ]
        }).init();

        new mwt.ToolBar({
            render : 'north'+domid,
            style : 'background:none',
            items  : [
                '<label class="head-title">'+lan(['card','preview'])+'</label>',
                '->',
                {type:'select',id:'cardsel-'+domid,options:carOptions,
                    style:'width:160px;font-size:12px;',
                    handler:o.query}
            ]
        }).create();
    };

    var currentItem;

    o.show = function(item) {
        var elid = 'center'+domid;
        if (!item.fields || !item.fields.length) {
            textblock.empty(" ",elid);
            return;
        }
        currentItem = item;
        o.query();
    };

    o.query = function() {
        var cardId = mwt.get_select_value('cardsel-'+domid);
        var cardInfo = topicCardsModel.getCard(topicInfo.topicId, cardId);
        if (!cardInfo) { return; }

        var frontCode = cardInfo.front_code;
        var backCode = cardInfo.back_code;
        for (var i=0;i<topicInfo.fields.length;++i) {
            var field = topicInfo.fields[i];
            var k = "{{"+field.k+"}}";
            var v = '';
            if (currentItem.fields[i]) v=currentItem.fields[i];

            switch (parseInt(field.type)) {
                case 3: v = '<img src="'+v+'"></img>'; break;
                case 4: v = '<div name="card-audio" data-src="'+v+'"></div>'; break;
            }
            frontCode = frontCode.replaceAll(k,v);
            backCode = backCode.replaceAll(k,v);
        }

        var elid = 'center'+domid;
        var code = '<div class="card-canvas" style="text-align:center;padding:15px 0;">'+
                '<style>'+cardInfo.format_code+'</style>'+
                '<div class="card">'+
                    '<div class="front-code">'+frontCode+'</div>'+
                    (backCode==''?'':'<div class="back-code">'+backCode+'</div>')+
                '</div>'+
            '</div>';
        jQuery('#'+elid).html(code);

        var audio = jQuery("[name=card-audio]").audio();
        audio.play();
    };

    return o;
});
