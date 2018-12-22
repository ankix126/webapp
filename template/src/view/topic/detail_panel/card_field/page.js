define(function(require){
    var topicInfo;
    var domid,o={};


    function showFields(fields) {

        var trs = [];

        for (var i=0;i<fields.length; ++i) {
            var im = fields[i];
            var code = '<tr>'+
                    '<td><input type="text" name="fname" value="'+im.k+'" class="mwt-field"></td>'+
                    '<td></td>'+
                '<td style="text-align: right;">删除</td>'+
                    '</tr>';
            trs.push(code);
        }

        var code = '<table class="infotb" style="margin-top: 0">'+
                '<tr class="partition"><td>'+lan('field')+'</td>'+
                    '<td>'+lan('field','type')+'</td>'+
                    '<td></td>'+
                '</tr>'+
                    trs.join('')+
                '<tr><td>'+
                    '<button class="mwt-btn mwt-btn-primary mwt-btn-xs">添加</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '<button class="mwt-btn mwt-btn-primary mwt-btn-xs">保存</button>'+
                '</td></tr>'+
            '</table>';
        jQuery("#"+domid).html(code);
    }



    o.init = function(_domid,_topicInfo) {
        domid = _domid;
        topicInfo = _topicInfo;
        require("./grid").init(domid,topicInfo);
        //require("./grid").init(domid,topicInfo.topicId);

        // jQuery('#'+domid).css({'background':'#f1f2f3','padding':'10px'});

        //showFields(topicInfo.fields);

    };

    return o;
});
