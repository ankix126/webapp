define(function(require){
    /* 字段输入控件 */
    var WebImageField=require("./WebImageField");
    var AudioField=require("./AudioField");

    var o={};

	// 文本字段
	function getTextAreaField(elid,value) 
	{/*{{{*/
		return new MWT.TextField({
			render   : elid,
			type     : 'textarea',
			style    : 'height:100px;',
			value    : value,
			empty    : false,
			errmsg   : '不超过102400个字符',
			checkfun : function(v) {
				return v.length<=102400;
			}
		});
	}/*}}}*/

	// 数字字段
	function getTextNumberField(elid,value) 
	{/*{{{*/
		return new MWT.TextField({
			render   : elid,
			type     : 'number',
			value    : value,
			empty    : false
		});
	}/*}}}*/

	// 图片字段
	function getImageField(elid,value) 
	{/*{{{*/
		return new WebImageField({
			render   : elid,
            value    : value,
            empty    : false,
            errmsg   : '请输入图片URL',
//			imgupapi: ajax.getAjaxUrl('upload&action=image')
		});
	}/*}}}*/

    // 音频字段
    function getAudioField(elid,value)
	{/*{{{*/
		return new AudioField({
			render   : elid,
            value    : value,
            empty    : false,
            errmsg   : '请输入音频链接',
//			imgupapi: ajax.getAjaxUrl('upload&action=image')
		});
	}/*}}}*/

	// 根据字段类型返回输入控件
	o.get=function(type,elid,value) {
		switch (parseInt(type)) {
			case 2: return getTextNumberField(elid,value);
			case 3: return getImageField(elid,value);
            case 4: return getAudioField(elid,value);
			default: return getTextAreaField(elid,value);
		}
	};

    return o;
});
