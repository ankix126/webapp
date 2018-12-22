define(function(require){
    /* topic.js, (c) 2018 mawentao */
    var cache={};
    var o={};

    // 异步获取
    o.asyncLoad=function(id,callfun) {
        var msgid = mwt.notify('加载数据...',0,'loading');
        ajax.post('topic&action=queryUnit',{tid:id,key:''},function(res){
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
        ajax.post('topic&action=queryUnit',{tid:id,key:''},function(res){
            if (res.errno!=0) mwt.alert(res.errmsg);
            else cache[id] = res.data.root;
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

    // 获取某主题的全部单元选项列表
    o.getOptions=function(topicId) {
        var arr = o.getAll(topicId);
        var res = [];
        for (var i=0;i<arr.length;++i) {
            var im = arr[i];
            res.push({
                text: im.name,
                value: im.id,
            });
        }
        return res;
    };


    return o;
});
