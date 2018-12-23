define(function(require){
    /* generated by mengma @2018-04-01 00:57 */
    var store,grid,gridid,unitInfo,topicInfo;
    var dialog = require('./dialog');
    var o={};
    
    o.init = function(domid,barid,_topicInfo){
        topicInfo = _topicInfo;
        gridid = domid;
        store = new mwt.Store({
            proxy: new mwt.HttpProxy({
                //beforeLoad : store_before_load,
                //afterLoad  : store_after_load,
                url : ajax.getAjaxUrl("topic&action=queryUnitItem")
            })
        });

        // 创建工具栏
        new mwt.ToolBar({
            render : barid,
            style : 'background:none',
            items  : [
                '<label id="title-'+gridid+'" class="head-title"></label>',
                {type:'search',id:'so-key-'+gridid,width:300,handler:o.query,placeholder:''},
                '->',
                {label:iconlabel.plus(''),cls:'mwt-btn-primary tbtn',handler:function(){
                    dialog.open({id:0,unit_id:unitInfo.id,topic_id:topicInfo.topicId},topicInfo.fields,o.query);
                }},
                {label:iconlabel.move(''),cls:'mwt-btn-success tbtn',handler:function(){
                    var records = grid.getSelectedRecords();
                    if (!records.length) {
                        mwt.notify(lan('no_record_selected'),1500,'danger');
                        return;
                    }
                    require('./move_dialog').open(records,topicInfo.topicId,o.query);
                }},
                {label:iconlabel.remove(''),cls:'mwt-btn-danger tbtn',handler:function(){
                    var records = grid.getSelectedRecords();
                    if (!records.length) {
                        mwt.notify(lan('no_record_selected'),1500,'danger');
                        return;
                    }
                    mwt.confirm(lan('are you sure to delete',true),function (res) {
                        if (res) {
                            var ids = [];
                            for (var i=0;i<records.length;++i) {
                                ids.push(records[i].id);
                            }
                            ajax.post('topic&action=removeUnitItems',{ids:ids},function(res){
                                if (res.errno!=0) mwt.alert(res.errmsg);
                                else {
                                    o.query();
                                }
                            });
                        }
                    });
                }},
            ]
        }).create();

        grid = new MWT.Grid({
            render      : gridid,
            store       : store,
            cls         : 'rowclkgrid',
            pagebar     : true,     //!< 分页
            pageSize    : 20,       //!< 每页大小
            multiSelect : true,    //!< 多行选择
            bordered    : false,    //!< 单元格边框
            striped     : true,     //!< 斑马纹
            noheader    : false,    //!< 隐藏列头
            notoolbox   : true,    //!< 隐藏工具箱(刷新,斑马纹,导出Excel)
            position    : 'fixed',  //!< 位置(relative:相对位置,其他:固定头部和尾部)
            bodyStyle   : '', 
            tbarStyle   : 'margin-bottom:-1px;',
            emptyMsg    : textblock.empty(),
            cm: new MWT.Grid.ColumnModel([
                {head:lan('unit'),dataIndex:'unit_id',width:100,align:'left',sort:false,render:function(v,item){
                    return '<i class="fa fa-folder"></i> '+item.unit_name;
                }},
                {head:'Data',dataIndex:'fields',align:'left',sort:false,render:function(v,item){
                    return v.join("\t");
                }},
                {head:'',dataIndex:'id',width:120,align:'right',sort:false,render:function(v,item){
                    var cls = 'mwt-btn mwt-btn-default mwt-btn-xs';
                    var code = '<div class="mwt-btn-group-radius">'+
                        '<button class="'+cls+'" name="editbtn-'+gridid+'" data-id="'+v+'">'+
                        '<i class="icon icon-setting"></i></button>'+
                        '<button class="'+cls+'" name="delbtn-'+gridid+'" data-id="'+v+'">'+
                        '<i class="icon icon-trash"></i></button>'+
                        '</div>';
                    return code;
                }}
            ]),
            rowclick: function (item) {
                showIdx = item.store_index;
                showItem();
            }
        });
        store.on('load',function(){
            mwt.popinit();
            // 编辑按钮
            jQuery('[name=editbtn-'+gridid+']').unbind('click').click(editbtnClick);
            // 删除按钮
            jQuery('[name=delbtn-'+gridid+']').unbind('click').click(delbtnClick);
            // 启用开关
            jQuery('[name=adenable]').unbind('change').change(function(){
                var id = jQuery(this).data('dtname');
                var enable = jQuery(this).is(':checked') ? 1 : 0;
                ajax.post('t_fields&action=setEnable',{id:id,enabled:enable},function(res){
                    if (res.retcode!=0) mwt.notify(res.retmsg,1500,'danger');
                    mwt.notify('已保存',1500,'success');
                });
            });
            showItem();
        });
        grid.create();
        //o.query();
    };

    // 查询
    o.query = function() {
        store.baseParams = {
            tid: unitInfo.tid,
            uid: unitInfo.id,
            key: mwt.get_value("so-key-"+gridid)
        };
        grid.load();
    };

    // 编辑按钮点击事件
    function editbtnClick(e)
    {/*{{{*/
        e.stopPropagation();
        var id = jQuery(this).data('id');
        var item = grid.getRecord('id',id);
        dialog.open(item,topicInfo.fields,o.query);
    }/*}}}*/

    // 删除按钮点击事件
    function delbtnClick(e)
    {/*{{{*/
        e.stopPropagation();
        var id = jQuery(this).data('id');
        mwt.confirm(lan('are you sure to delete',true),function(res){
            if (!res) return;
            ajax.post('topic&action=removeUnitItem',{id:id},function(res){
                if (res.errno!=0) mwt.alert(res.errmsg);
                else {
                    o.query();
                }
            });
        });
    }/*}}}*/


    // 设置Unit
    o.setUnit=function(unit) {
        unitInfo = unit;
        jQuery('#title-'+gridid).html(unitInfo.name);
        o.query();
    };

    // 显示第i条记录
    var showIdx = 0;
    function showItem() {
        var n = store.size();
        if (showIdx>=n) { showIdx=0; }
        var item = store.get(showIdx);
        if (item) require('./card_preview').show(item);
    };

    return o;
});
