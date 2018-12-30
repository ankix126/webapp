define(function(require){
    /* topic.js, (c) 2018 mawentao */
    var cache={};
    var o={};

    // 异步获取
    o.asyncLoad=function(id,callfun) {
        var msgid = mwt.notify('加载数据...',0,'loading');
        ajax.post('topic&action=getMyTopic',{tid:id},function(res){
            mwt.notify_destroy(msgid);
            if (res.errno!=0) mwt.alert(res.errmsg);
            else {
                cache[id] = res.data;
                if (callfun) callfun(cache[id]);
            }
        });
    };

    // 同步获取
    o.syncLoad=function(id) {
        ajax.post('topic&action=getAllCards',{tid:id},function(res){
            if (res.errno!=0) mwt.alert(res.errmsg);
            else cache[id] = res.data;
        },true);
        return cache[id];
    };

    // 从缓存获取
    o.getAll=function(topicId) {
        if (!cache[topicId]) {
            return o.syncLoad(topicId);
        }
        return cache[topicId];
    };

    // 获取主题的全部卡片选项列表
    o.getOptions=function(id) {
        var list = o.getAll(id);
        var res = [];
        for (var i=0;i<list.length;++i) {
            var im = list[i];
            var opt = {
                text: im.cname,
                value: im.id
            };
            res.push(opt);
        }
        return res;
    };

    // 获取某个卡片详情
    o.getCard = function(topicId, cardId) {
        var list = o.getAll(topicId);
        for (var i=0;i<list.length;++i) {
            var im = list[i];
            if (im.id==cardId) return im;
        }
        return null;
    };


    return o;
});
