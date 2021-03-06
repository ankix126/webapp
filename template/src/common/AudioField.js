define(function(require){

var AudioField=function(opt)
{
    this.listeners={};
    var thiso=this;
    var tid;
    var type="text";      //!< 
    var placeholder="输入音频链接";   //!< 
    var errpop;           //!< 错误弹框
    var errmsg;           //!< 错误信息
    var empty=false;      //!< 是否允许为空
    var checkfun;         //!< 自定义校验函数
    var optdivid,popStyle='max-height:100px;';
    var storekey;         //!< localStorage存储的key
    if(opt)
    {
        this.construct(opt);
        if(opt.type) type=opt.type;
        if(opt.placeholder) placeholder=opt.placeholder;
        if(opt.errmsg) errmsg=opt.errmsg;
        if(opt.checkfun) checkfun=opt.checkfun;
        if(opt.empty) empty=opt.empty;
        tid=this.render+"txt";
        optdivid=this.render+"pop";
        if(opt.popStyle)popStyle=opt.popStyle;
        storekey=this.render+"skey";

/*
        var imguploader = new mwt.ImageUpload({
            ajaxapi: ajax.getAjaxUrl('upload&action=image'),
        });
*/
    }

    // create
    this.create=function(){
        var btnstyle = ' style="height:26px;"';
        var code = '<div class="mwt-row mwt-row-flex">'+
              '<div class="mwt-col-wd" style="width:40px;">'+
                '<button id="playbtn-'+tid+'" class="mwt-btn mwt-btn-default mwt-btn-xs" '+
                  'style="height:26px;color:#FF5722;padding-left:9px;border-color:#FF5722;font-size:12px;">'+
                  '<i class="sicon-control-play"></i></button>'+
                '<audio id="audio-'+tid+'" src="" controls="controls" hidden="true"></audio>'+
              '</div>'+
              '<div class="mwt-col-fill">'+
                '<div style="position:relative">'+
                  '<input type="'+type+'" id="'+tid+'" class="form-control '+this.cls+'" placeholder="'+placeholder+'"'+
                    ' style="'+this.style+';padding:0 20px 0 5px;">'+
                  '<i id="'+tid+'-clear" class="fa fa-times-circle" '+
                    'style="display:none;color:#999;font-size:14px;margin-left:-20px;vertical-align:middle;"></i>'+
                '</div>'+
              '</div>'+
              '<div class="mwt-col-wd" style="width:100px;padding-left:10px;">'+
                '<div>'+
//                  '<button id="refreshbtn-'+tid+'" class="mwt-btn mwt-btn-default mwt-btn-xs"'+btnstyle+'>刷新</button>'+
//                  '&nbsp;&nbsp;'+
                  '<button id="ttsbtn-'+tid+'" class="mwt-btn mwt-btn-primary mwt-btn-xs"'+btnstyle+'>文字合成语音</button>'+
//                  '&nbsp;&nbsp;'+
//                  '<button id="sobtn-'+tid+'" class="mwt-btn mwt-btn-warning mwt-btn-xs"'+btnstyle+'>搜索网络图片</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div id="'+optdivid+'" class="mwt-field-pop" style="'+popStyle+'"></div>';
        jQuery("#"+this.render).html(code);
        errpop = new MWT.Popover({anchor:tid,html:errmsg,cls:"mwt-popover-danger"});
        mwt.initImageView();

        this.setValue(this.value);
        // bundle event
        var $txt = jQuery("#"+tid);
        var $clr = jQuery("#"+tid+'-clear');
        var $pop = jQuery("#"+optdivid);
        $txt.change(change);
        $txt.focus(function(){
            $clr.show();
            show_pop();
            jQuery(document).unbind('click').on("click", function(){
                var act=document.activeElement.id;
                if (act!=tid) {
                    $pop.hide();
                    $clr.hide();
                }
            });
            event.stopPropagation();
        });
        //$txt.blur(function(){$clr.hide();});
        $pop.click(function(event){
            event.stopPropagation();
        });
        $clr.click(function(){
            $txt.val('').focus();
        });
        // 播放按钮
        jQuery('#playbtn-'+tid).unbind('click').on("click",thiso.play);
        // 文字合成语音
        jQuery('#ttsbtn-'+tid).unbind('click').on("click",function(){
            require('./tts_dialog').open({},function(res){
                thiso.setValue(res);
            });
        });
    };

    function change() {
        errpop.hide();
        thiso.value = mwt.get_value(tid);
        thiso.fire("change");
        if (thiso.value!='') jQuery("#"+tid+'-clear').show();
    };

    this.setValue=function(v){
        mwt.set_value(tid,v);
        this.value=v;
    };

    this.validate=function() {
        errpop.hide();
        var t = empty ? mwt.get_value(tid) : mwt.get_text_value(tid);
        if (checkfun && !checkfun(t)) {
            errpop.pop();
            jQuery("#"+tid).focus();
            setTimeout(errpop.hide,2000);
            return false;
        }
        return true;
    };

    this.readOnly = function(rd) {
        if (rd) jQuery('#'+tid).attr('readonly',true);
        else jQuery('#'+tid).removeAttr('readonly');
    };

    // 显示pop
    function show_pop() {
        var v = localStorage.getItem(storekey);
        if (!v) return;
        var words = v.split('||');
        if (words.length==0) return;
        var code = '<div class="mwt-pop-words"><a id="'+this.render+'-pop-clrbtn" href="javascript:;">清空</a>'+
             '<ul id="'+this.render+'-wdul">';
        for (var i=0;i<words.length;++i) {
            code += '<li name="'+thiso.render+'-wd">'+words[i]+'</li>';
        }
        code += '</ul></div>';
        jQuery('#'+optdivid).show().html(code);
        jQuery('[name='+thiso.render+'-wd]').click(function(){
            var word = jQuery(this).html();
            jQuery('#'+tid).val(word);
            change();
        });
        jQuery('#'+this.render+'-pop-clrbtn').click(function(){
            thiso.clearwords();
            jQuery('#'+this.render+'-wdul').html("");
        });
    };

    // 清空
    this.clearwords = function() {
        localStorage.removeItem(storekey);
    };

    // 播放音频
    this.play = function() {
        var v = mwt.get_value(tid);
        if (v=='') return;
//        jQuery('#audio-'+tid).attr('src',imgurl);
        var audio = document.getElementById("audio-"+tid);
        audio.src = v;
        audio.play();
    };
};
MWT.extends(AudioField, MWT.Field);

return AudioField;
});
