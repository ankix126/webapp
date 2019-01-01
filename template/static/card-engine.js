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

    // 播放音频
    this.play = function() {
        var audio = document.getElementById(audioId);
        if (audio) { audio.play(); }
    };

    return this;
};

// 卡片
function Card(opts)
{
    var elid;
    var frontCode="";
    var backCode="";
    var formatCode="";
    var fields=[];
    var data={};
    var playMode = 1;
    var feedback = null;
    if (opts) {
        if(opts.elid) elid=opts.elid;
        if(opts.frontCode) frontCode=opts.frontCode;
        if(opts.backCode) backCode=opts.backCode;
        if(opts.formatCode) formatCode=opts.formatCode;
        if(opts.fields) fields=opts.fields;
        if(opts.data) data=opts.data;
        if(opts.playMode) playMode=opts.playMode;
        if(opts.feedback) feedback=opts.feedback;
    }

    function getDataMap() {
        var map = {};
        for (var i=0; i<fields.length; ++i) {
            var field = fields[i];
            var k = field.k;
            map[k] = {
                type: field.type,
                value: '',
            }
            if (isset(data.dataFields[i])) {
                map[k].value = data.dataFields[i];
            }
        }
        return map;
    }

    var audios = [];

    this.init=function() {
        //1. 处理front和back代码
        var front = frontCode;
        var back = backCode;
        var dataMap = getDataMap();
        for (var k in dataMap) {
            var item = dataMap[k];
            var v = item.value;
            switch (parseInt(item.type)) {
                case 3: v = '<img src="'+v+'"></img>'; break;
                case 4: v = '<div id="card-audio-'+elid+'" data-src="'+v+'"></div>'; break;
            }
            var kvariable = "{{"+k+"}}";
            front = front.replaceAll(kvariable,v);
            back = back.replaceAll(kvariable,v);
        }
        //2. 根据是否有back和播放模式来做不同控制
        var backStyle = '';
        var controlBar = '';
        // 记忆模式
        if (playMode==2) {
            backStyle = 'style="display:none;"';  //!< 隐藏答案
            // 如果有答案先显示按钮
            var showAnswerCode = '';
            if (backCode!='') {
                showAnswerCode = '<div class="mwt-btn-group-radius" id="showanswer-'+elid+'">'+
                    '<button id="showAnswerBtn-'+elid+'" class="mwt-btn mwt-btn-primary radius">'+
                        lan('show answer')+'</button>'+
                '</div>';
            }
            // 根据是否有答案决定是否直接显示反馈按钮
            var feedbackStyle = showAnswerCode=='' ? '' : ' style="display: none;"';
            // 控制工具栏
            controlBar = '<div class="control-bar">'+
                showAnswerCode+
                '<div class="mwt-btn-group-radius" id="feedback-'+elid+'"'+feedbackStyle+'>'+
                    '<button name="feedbtn-'+elid+'" data-v="1" class="mwt-btn mwt-btn-default">'+lan('again')+'</button>'+
                    '<button name="feedbtn-'+elid+'" data-v="2" class="mwt-btn mwt-btn-default">'+lan('hard')+'</button>'+
                    '<button name="feedbtn-'+elid+'" data-v="3" class="mwt-btn mwt-btn-primary">'+lan('good')+'</button>'+
                    '<button name="feedbtn-'+elid+'" data-v="4" class="mwt-btn mwt-btn-default">'+lan('easy')+'</button>'+
                '</div>'+
            '</div>';
        }

        var code = '<div class="card-canvas" style="text-align:center;padding:15px 0;">'+
            '<style>'+formatCode+'</style>'+
            '<div class="card">'+
                '<div class="front-code">'+front+'</div>'+
                (backCode==''?'':'<div id="answer-'+elid+'" class="back-code" '+backStyle+'>'+back+'</div>')+
            '</div>'+
            controlBar+
        '</div>';

        jQuery('#'+elid).html(code);

        // 显示答案
        jQuery('#showAnswerBtn-'+elid).unbind('click').click(function(){
            jQuery('#answer-'+elid).show();
            jQuery('#feedback-'+elid).show();
            jQuery('#showanswer-'+elid).hide();
        });

        // 反馈
        jQuery('[name=feedbtn-'+elid+']').unbind('click').click(function () {
            var v = jQuery(this).data('v');
            if (feedback) feedback(v);
        });

        var audio = jQuery("#card-audio-"+elid).audio();
        audios.push(audio);
    };

    this.autoPlay=function() {
        for (var i=0;i<audios.length;++i) {
            audios[i].play();
        }
    };

};


// 卡片播放引擎
function CardEngine(opts)
{
    var elid;
    var cardFields;
    var cardStyle;
    var cardData;
    var cardSlides=[];
    var playMode = 1;
    var callback;
    var feedback;
    var mySwiper;
    if (opts) {
        if (opts.elid) elid = opts.elid;
        if (opts.cardFields) cardFields = opts.cardFields;
        if (opts.cardStyle) cardStyle = opts.cardStyle;
        if (opts.cardData) cardData = opts.cardData;
        if (opts.callback) callback = opts.callback;
        if (opts.playMode) playMode = opts.playMode;
        if (opts.feedback) feedback = opts.feedback;
    }
    this.control = {
        activeIndex: 0
    }

    // 初始化
    this.init=function () {
        var slides = [];
        for (var i=0;i<cardData.length; ++i) {
            var code = '<div id="slide-'+i+'" class="swiper-slide">'+
                    '<div style="padding-top: 50px;">'+
                        '<i class="icon icon-loading fa fa-spin fa-2x" style="color:#999"></i>'+
                    '</div>'+
                '</div>';
            slides.push(code);
        }
        var code = '<div id="container-'+elid+'" class="swiper-container" style="width:100%;height:100%;">'+
            '<div class="swiper-wrapper">'+
                slides.join('')+
                '<div id="slide-end" class="swiper-slide">'+
                  '<div style="padding-top: 50px;">'+
                    '<h2>The End</h2>'+
                    '<button id="endbtn" class="mwt-btn mwt-btn-default">返回(Back)</button>'+
                  '</div>'+
                '</div>'+
            '</div>'+
            '<div class="swiper-button-next" style="top:initial;bottom:15px;right:15px;"></div>'+
            '<div class="swiper-button-prev" style="top:initial;bottom:15px;left:initial;right:80px;"></div>'+
            '<div class="swiper-pagination" style="bottom:0;top:initial"></div>'+
            '<div class="global-control">'+
                '<i id="ctrl-end-btn" class="sicon-arrow-left" style="font-size:20px;"></i>'+
            '</div>'+
        '</div>';
        jQuery('#'+elid).html(code);

        jQuery('#endbtn').unbind('click').click(function(){
            if (callback) callback();
        });
        jQuery('#ctrl-end-btn').unbind('click').click(function(){
            if (!callback) return;
            if (window.confirm("Are you sure?")) {
                callback();
            }
            /*
            mwt.confirm("Are you sure?",function(res){
                if (res) callback();
            });*/
        });


        mySwiper = new Swiper('#container-'+elid, {
            // autoplay: 5000,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            paginationType: 'progress',
            loop: false,
            preloadImages: false,
            lazyLoading: true,
        });
        var thiso = this;
        mySwiper.on('slideChangeEnd', function(swiper){
            thiso.control.activeIndex = swiper.activeIndex;
            thiso.showSlide();
        });

        cardSlides=[];

        this.showSlide();
    };

    // 显示slide
    this.showSlide = function() {
        //1. 获取当前slide的卡片数据
        var activeIndex = this.control.activeIndex;
        //alert(activeIndex);
        var cardItem = cardData[activeIndex];
        if (!cardItem) return;
        //console.log(cardItem);

        //2. 当前slide第一次显示
        if (!isset(cardSlides[activeIndex])) {
            cardSlides[activeIndex] = new Card({
                elid: 'slide-'+activeIndex,
                frontCode: cardStyle.front_code,
                backCode: cardStyle.back_code,
                formatCode: cardStyle.format_code,
                fields: cardFields,
                data: cardItem,
                playMode: playMode,
                feedback: function(v) {
                    //alert(activeIndex+":"+v);
                    if (feedback) {
                        var cardItem = cardData[activeIndex];
                        feedback(cardItem.itemId,v);
                    }
                    mySwiper.slideNext();
                }
            });
            cardSlides[activeIndex].init();
        }

        //3. 卡片自动播放音频
        cardSlides[activeIndex].autoPlay();
    };

};




