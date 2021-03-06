define(function(require){
    /* generated by mengma @2018-04-01 00:57 */
    var store,grid,gridid,topicId;
//    var dialog = require('./dialog');
    var o={};

    function showList() {
        var n = store.size();
        if (n==0) {
            textblock.empty(lan('no data'),gridid);
            return;
        }

        var ls = [];
        for (var i=0;i<n;++i) {
            var im = store.get(i);
            if (i==0) {
                // 默认选中第一个
                if (topicId==0) topicId=im.topicId;
            }
            var cls = topicId==im.topicId ? 'active' : '';
            var code = '<li class="'+cls+'">'+
                    '<a href="#/topic~tid='+im.topicId+'">'+
                        '<i class="icon icon-reply"></i>'+
                        im.topicName+'</a>'+
                    '<div class="rt">'+
                        '<a name="editbtn-'+gridid+'" href="javascript:;" data-idx="'+i+'">'+
                            '<i class="icon icon-setting"></i></a>'+
                    '</div>'+
                '</li>';
            ls.push(code);
        }

        var code = '<ul class="tabul">'+ls.join("")+"</ul>";
        jQuery('#'+gridid).html(code);

        jQuery('[name="editbtn-'+gridid+'"]').unbind('click').click(function(){
            var idx = jQuery(this).data('idx');
            var im = store.get(idx);
            if (!im) return;
            var params = {
                id: im.topicId,
                tname: im.topicName,
                cate_id: im.cateId,
                description: im.description
            };
            require('./dialog').open(params,o.query);
        });
        require("../detail_panel/page").showTopicDetail(topicId);
    }

    o.init = function(domid,_topicId){
        gridid = domid;
        topicId = _topicId;
        store = new mwt.Store({
            proxy: new mwt.HttpProxy({
                //beforeLoad : store_before_load,
                //afterLoad  : store_after_load,
                url : ajax.getAjaxUrl("topic&action=queryMyTopic")
            })
        });
        store.on("load",showList);
        o.query();
    };

    // 查询
    o.query = function() {
        store.baseParams = {
            // regionId: mwt.get_select_value('region-sel-'+gridid),
            // cityId: mwt.get_select_value('city-sel-'+gridid),
            // state: mwt.get_select_value('state-sel-'+gridid),
            key: '', //mwt.get_value("so-key-"+gridid)
        };
        store.load();
    };

    // 编辑按钮点击事件
    function editbtnClick() 
    {/*{{{*/
        var id = jQuery(this).data('id');
        var item = grid.getRecord('id',id);
        dialog.open(item,o.query);
    }/*}}}*/

    // 删除按钮点击事件
    function delbtnClick() 
    {/*{{{*/
        var id = jQuery(this).data('id');
        mwt.confirm('确定要删除吗?',function(res){
            if (!res) return;
            ajax.post('budget&action=remove',{id:id},function(res){
                if (res.retcode!=0) mwt.alert(res.retmsg);
                else {
                    o.query();
                }
            });
        });
    }/*}}}*/

    return o;
});
