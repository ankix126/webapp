define(function(require){
    var topicInfo;
    var domid,o={};

    o.init = function(_domid,_topicInfo) {
        domid = _domid;
        topicInfo = _topicInfo;
        require("./grid").init(domid,topicInfo.topicId);
    };

    return o;
});
