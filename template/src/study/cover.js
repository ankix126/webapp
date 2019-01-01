define(function(require){
    /* 封面 */
    var domid,o={};

    // 统计区域
    function getStatCode()
    {/*{{{*/
        //1. 统计数据
        var list = [
            ['primary',lan('stat_new'),studyInfo.statNew],
            ['danger',lan('stat_learning'),studyInfo.statLearning],
            ['success',lan('stat_review'),studyInfo.statReview],
        ];
        var stats = [];
        for (var i=0;i<list.length;++i) {
            var im = list[i];
            var rt = '';
            if (i==list.length-1) rt = 'style="margin-right:0;"';
            var code = '<div class="mwt-col-4"><div class="stat-card stat-card-'+im[0]+'" '+rt+'>'+
                '<div class="head">'+im[1]+'</div>'+
                '<div class="body">'+im[2]+'</div>'+
            '</div></div>';
            stats.push(code);
        }
        var code = '<div class="mwt-row">'+stats.join('')+'</div>';
        return code;
    }/*}}}*/

    // 初始化选线列表
    function initEngineOptions(domid) 
    {/*{{{*/
        var styleSels = [];
        for (var i=0;i<cardInfo.cardStyles.length;++i) {
            var im = cardInfo.cardStyles[i];
            var active = i==activeStyleIndex ? ' active' : '';
            var code = '<button name="styleSelBtn" data-idx="'+i+'" '+
                'class="mwt-btn mwt-btn-default '+active+'">'+im.cname+'</button>';
            styleSels.push(code);
        }

        var code = '<div class="weui_cells weui_cells_form">'+
            '<div class="weui_cell">'+
            '<div class="weui_cell_hd"><label class="weui_label" style="width:100px">卡片样式</label></div>'+
            '<div class="weui_cell_bd weui_cell_primary"></div>'+
                styleSels.join('')+
            '</div>'+
        '</div>';
        jQuery('#'+domid).html(code);

        jQuery('[name=styleSelBtn]').unbind('click').click(function(){
            jQuery('[name=styleSelBtn]').removeClass("active");
            jQuery(this).addClass('active');
            activeStyleIndex = jQuery(this).data('idx');
        });
    }/*}}}*/ 

    // 初始化
	o.init = function(_domid) {
        domid = _domid;
        //1. 标题
        var code = '<h1 style="text-align:center;margin-bottom:15px;font-weight:">'+studyInfo.unitName+'</h1>';
        //2. 统计区域
        var stat = parseInt(studyInfo.statNew) + 
                   parseInt(studyInfo.statLearning) + 
                   parseInt(studyInfo.statReview);
        if (stat==0) {
            code += '<div style="text-align:center;font-size:13px;background:#dff0d8;color:#3c763d;'+
                'border:solid 1px #d6e9c6;padding:10px;margin-bottom:10px;">'+
                '恭喜！你目前已经完成了这个记忆库'+
            '</div>';
        }
//        } else {
            code += getStatCode();
//        }
        //3. 选项
        code += '<div id="options-div"></div>'+
                '<button id="startbtn-'+domid+'" class="mwt-btn mwt-btn-block mwt-btn-primary">Study Now</button>';
        
        jQuery('#'+domid).html(code);
        initEngineOptions('options-div');

        //4. 按钮
        jQuery('#startbtn-'+domid).unbind('click').click(function(){
            jQuery('#'+domid).hide();
            require('./engine').start();
        });
	};

    return o;
});
