define(function(require){
    /* tts_dialog.js, (c) 2019 mawentao */
    var dialogid = 'dialog-tts';
    var domid = dialogid;
    var form,dialog,params,callback;
    var value = '';
    var aisource = 'youdao';

    function init_dialog()
    {/*{{{*/
        form = new MWT.Form();
        form.addField('text',new MWT.TextField({
            type        : 'textarea',
            style       : 'height:100px;',
            render      : 'text-'+domid,
            value       : '你好, Hello', 
            placeholder : '',
            empty       : false,
            errmsg      : "请输入关键字,不超过1024个字符",
            checkfun    : function(v){return v.length<=1024;}
        }));
        form.addField('spd',new MWT.SelectField({
            render: 'spd-'+domid,
            value: 4,
            options: [
                {text:'0',value:0},{text:'1',value:1},{text:'2',value:2},{text:'3',value:3},{text:'4',value:4},
                {text:'5',value:5},{text:'6',value:6},{text:'7',value:7},{text:'8',value:8},{text:'9',value:9},
            ]
        }));
        form.addField('vol',new MWT.SelectField({
            render: 'vol-'+domid,
            value: 15,
            options: [
                {text:'0',value:0},{text:'1',value:1},{text:'2',value:2},{text:'3',value:3},{text:'4',value:4},
                {text:'5',value:5},{text:'6',value:6},{text:'7',value:7},{text:'8',value:8},{text:'9',value:9},
                {text:'10',value:10},{text:'11',value:11},{text:'12',value:12},{text:'13',value:13},{text:'14',value:14},
                {text:'15',value:15},
            ]
        }));
        form.addField('per',new MWT.SelectField({
            render: 'per-'+domid,
            value: 0,
            options: [
                {text:'女声',value:0},{text:'男声',value:1},
                {text:'度逍遥',value:3},{text:'度丫丫',value:4},
            ]
        }));

        dialog = new MWT.Dialog({
            render    : dialogid,
            title     : '文字合成语音',
            form : form,
            fullscreen: true,
            style     : 'left:30%;right:30%;',
            bodyStyle : 'padding:5px 10px 10px;background:#fff;',
            body : '<div>'+
                '<ul class="mwt-nav mwt-nav-tabs">'+
                  '<li name="aili" id="aili-youdao">'+
                    '<a name="ailia" href="javascript:void(0);" data-v="youdao">有道语音合成</a></li>'+
                  '<li name="aili" id="aili-baidu">'+
                    '<a name="ailia" href="javascript:void(0);" data-v="baidu">百度语音合成</a></li>'+
                '</ul>'+
              '</div>'+
              '<table class="infotb">'+
                '<tr><td valign="top" width="70">文本：</td><td colspan="2" id="text-'+domid+'"></td></tr>'+

                '<tbody name="aiopts" id="aiopts-baidu">'+
                  '<tr><td>语速：</td><td width="150"><span id="spd-'+domid+'"></span></td>'+
                    '<td class="tip">取值0-9，默认为5中语速</td>'+
                  '<tr><td>音量：</td><td><span id="vol-'+domid+'"></span></td>'+
                    '<td class="tip">取值0-15，默认为5中音量</td>'+
                  '<tr><td>发音人：</td><td><span id="per-'+domid+'"></span></td>'+
                   '<td class="tip">发音人选择</td>'+
                  '</tr>'+
                '</tbody>'+

                '<tbody name="aiopts" id="aiopts-youdao">'+
                '</tbody>'+

                '<tr><td colspan="3">'+
                    '<button id="subbtn-'+domid+'" class="mwt-btn mwt-btn-block mwt-btn-primary radius">合成</button>'+
                '</td></tr>'+
            '</table>'+
            '<div id="resdiv-'+domid+'" style="margin-top:15px;text-align:center;"></div>',
            buttons : [
                {label:lan('submit'),cls:'mwt-btn-danger',handler:submitClick},
                {label:lan('cancel'),type:'close',cls:'mwt-btn-default'}
            ]
        });
        //3. dialog open event
        dialog.on('open',function(){
            value = '';
            // 选择ai
            jQuery('[name=ailia]').unbind('click').click(function(){
                aisource = jQuery(this).data('v');
                syncAiSource();
            });
            jQuery('#resdiv-'+domid).html('');
            jQuery('#subbtn-'+domid).unbind('click').click(tts);
            syncAiSource();
        });
    }/*}}}*/

    // 合成语音
    function tts() 
    {/*{{{*/
        var data = form.getData();
        var url = '';
        switch (aisource) {
            case 'youdao':
                url = 'https://dict.youdao.com/dictvoice?le=zh-CN&audio='+data.text;
                break;
            default:
                url = dz.aiurl+"?text="+data.text+
                     '&spd='+data.spd+
                     '&vol='+data.vol+
                     '&per='+data.per;
                break;
        }
        value = encodeURI(url);
        var code = '<a id="playbtn-'+domid+'" href="javascript:;" style="font-size:40px;color:#BD46D2">'+
            '<i class="fa fa-play-circle playbtn"></i>'+
            '<audio id="audio-'+domid+'" src="'+value+'" controls="controls" hidden="true"></audio>'+
        '</a>';
        jQuery("#resdiv-"+domid).html(code);
        jQuery('#playbtn-'+domid).unbind('click').click(play);
        play();
    }/*}}}*/

    function play() {
        var audio = document.getElementById("audio-"+dialogid);
        audio.play();
    }

    // 选择ai源
    function syncAiSource() 
    {/*{{{*/
        // nav
        jQuery('[name=aili]').removeClass('mwt-active');
        jQuery('#aili-'+aisource).addClass('mwt-active');
        // tbody
        jQuery('[name=aiopts]').hide();
        jQuery('#aiopts-'+aisource).show();
    }/*}}}*/

    function submitClick() {
        if (value=='') {
            mwt.notify('未合成语音',1500,'danger');
            return;
        }
        if (callback) callback(value);
        dialog.close();
    }

    var o={};
    o.open=function(_params,_callback){
        params = _params;
        callback = _callback;
        if (!dialog) init_dialog();
        dialog.open();
    };

    return o;
});
