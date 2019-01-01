define(function(require){
    /* 卡片引擎 */
    var domid,engine;
    var studyId;
    var o={};

    // 初始化
	o.init = function(_domid) {
        domid = _domid;
        engine = new CardEngine({
            elid: domid,
            cardFields: cardInfo.cardFields,
            cardStyle: cardInfo.cardStyles[activeStyleIndex],
            cardData: cardInfo.cardData,
            callback: endEngine,
            playMode: 2, //!< 1.浏览,2.学习(记忆)
            feedback: feedback
        }); 
        studyId = studyInfo.studyId;
	};

    // 开始引擎
    o.start = function() {
        jQuery('#'+domid).show();
        engine.init();
    };

    // 结束
    function endEngine() {
        jQuery('#'+domid).hide();
        jQuery('#cover-div').show();
    }

    // 反馈
    function feedback(unitItemId, result) {
        //alert(unitItemId+" : "+result);
        var params = {
            study_id: studyId,
            item_id: unitItemId,
            result: result
        };
        ajax.post('study&action=saveFeedback',params,function(res){
            if (res.errno!=0) mwt.notify(res.errmsg,1500,'danger');
            else {
                //do nothing
            }
        });
    };

    return o;
});
