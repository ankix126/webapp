define(function(require){
    var o={};
    o.init = function(_domid,topicInfo) {
        require('./grid').init(_domid,topicInfo);
    };
    return o;
});
