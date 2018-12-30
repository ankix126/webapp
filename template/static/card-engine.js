/**
 * Created by mawentao on 18/12/29.
 */

/**
 * 音频播放器
 * 用法: jQuery('#domid').audio();
 **/
jQuery.fn.audio = function() {

    var src = this.data('src');
    var elid = this.attr('id');
    var audioId = 'audio-'+elid;

    var code = '<a id="playbtn-'+elid+'" data-target="'+audioId+'" href="javascript:;" style="text-decoration:none;">'+
        '<i class="fa fa-play-circle"></i></a>'+
        '<audio id="'+audioId+'" src="'+src+'" controls="controls" hidden="true"></audio>';

    this.html(code);

    jQuery('#playbtn-'+elid).unbind('click').click(function(){
        var target = jQuery(this).data('target');
        var audio = document.getElementById(target);
        if (audio) {
            audio.play();
        }
    });

    return this;
};


