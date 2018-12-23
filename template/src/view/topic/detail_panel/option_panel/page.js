define(function(require){
    var domid,topicInfo,form,o={};

    function createForm() {
        form = new mwt.Form();
        form.addField('flash_seconds',new mwt.TextField({
            type : 'number',
            render: 'flash_seconds'+domid,
            value: '5',
            empty: false,
            errmsg: 'flash_seconds must > 0',
            checkfun: function(v){return v>0;}
        }));
        form.addField('auto_play',new mwt.RadioField({
            render: 'auto_play'+domid,
            value: '1',
            options: [{text:lan('yes'),value:1},{text:lan('no'),value:0}]
        }));
        form.create();
    }

    o.init = function(_domid,_topicInfo) {
        domid = _domid;
        topicInfo = _topicInfo;
        var code = '<div id="tbar-'+domid+'" style="margin-top: 5px"></div>'+
            '<table class="mwt-formtab">'+
                //
                '<tr><th colspan="3" class="partition">'+lan('Play Option')+'</th></tr>'+
                '<tr><th width="110">'+lan('flash seconds')+': </th>'+
                    '<td width="300"><div id="flash_seconds'+domid+'"></div></td>'+
                    '<td class="tips"></td></tr>'+
                '<tr><th>'+lan(['auto play audio'])+': </th>'+
                    '<td><div id="auto_play'+domid+'"></div></td>'+
                    '<td class="tips"></td></tr>'+
                //
                '<tr><th colspan="3" class="partition">'+lan('Study Option')+'</th></tr>'+
            '</table>';
        jQuery('#'+domid).html(code);
        // 工具栏
        new mwt.ToolBar({
            render : 'tbar-'+domid,
            style : 'background:none',
            items  : [
                {label:lan('save'),cls:'mwt-btn-primary',handler:save},
            ]
        }).create();
        // Form
        createForm();
        form.set(topicInfo.options);
    };


    function save() {
        var data = form.getData();
        var params = {
            id: topicInfo.topicId,
            options: data,
        };
        ajax.post('topic&action=saveOptions',params,function (res) {
            if (res.errno!=0) mwt.alert(res.errmsg);
            else {
                mwt.notify(lan('saved'),1500,'success');
                topicInfo.options = params.options;
            }
        });
    }


    return o;
});
