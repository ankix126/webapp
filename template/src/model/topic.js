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
        ajax.post('topic&action=getMyTopic',{tid:id},function(res){
            if (res.errno!=0) mwt.alert(res.errmsg);
            else cache[id] = res.data;
        },true);
        return cache[id];
    };


    // 从缓存获取
    o.get=function(id) {
        if (!cache[id]) {
            return o.syncLoad(id);
        }
        return cache[id];
    };


    return o;
});
