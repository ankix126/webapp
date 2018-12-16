define(function(require){
    /* generated by mengma @2018-04-01 00:57 */
    var store,grid,gridid,topicId;
    var dialog = require('./dialog');
    var o={};
    
    o.init = function(domid,_topicId){
        gridid = domid;
        topicId = _topicId;
        var fieldTypeMap = dict.get_map('fieldType');
        store = new mwt.Store({
            proxy: new mwt.MemoryProxy({
                data: []
            })
        });
        grid = new MWT.Grid({
            render      : gridid,
            store       : store,
            cls         : 'ulgrid',
            pagebar     : false,     //!< 分页
            pageSize    : 20,       //!< 每页大小
            multiSelect : false,    //!< 多行选择
            bordered    : false,    //!< 单元格边框
            striped     : false,     //!< 斑马纹
            noheader    : true,    //!< 隐藏列头
            notoolbox   : false,    //!< 隐藏工具箱(刷新,斑马纹,导出Excel)
            position    : 'fixed',  //!< 位置(relative:相对位置,其他:固定头部和尾部)
            emptyMsg    : textblock.empty(),
            bodyStyle   : '', 
            tbarStyle   : 'margin-bottom:-1px;',
            tbar: [
                '<label class="head-title">字段</label>',
                '->',
                {label:iconlabel.plus(''),cls:'mwt-btn-primary tbtn',handler:function(){
                    dialog.open({fid:0,tid:topicId},o.query);
                }}
            ],
            cm: new MWT.Grid.ColumnModel([
                {head:'',dataIndex:'store_index',width:40,align:'right',sort:false,render:function(v,item){
                    return (v+1)+'.';
                }},
                {head:'字段Key',dataIndex:'fname',align:'left',sort:false,render:function(v,item){
                    return v;
                }},
                {head:'字段类型',dataIndex:'ftype',align:'center',sort:false,render:function(v,item){
                    var txt = fieldTypeMap[v] ? fieldTypeMap[v] : '';
                    return '<span style="color:gray;font-size:12px;">['+txt+']</span>';
                }},
                // {head:'字段描述',dataIndex:'fdesc',width:120,align:'left',sort:false,render:function(v,item){
                //     return v;
                // }},
                // {head:'顺序',dataIndex:'display_order',width:120,align:'left',sort:false,render:function(v,item){
                //     return v;
                // }},
                {head:'操作',dataIndex:'fid',align:'right',width:50,sort:false,render:function(v,item){
                    var cls = 'grida';
                    var editbtn = '<a class="'+cls+'" name="editbtn-'+gridid+'" data-id="'+v+'" '+
                        ' style="color:#999;" href="javascript:;">'+
                        '<i class="icon icon-setting"></i>'+
                        '</a>';
                    var btns = [editbtn];
                    return btns.join("&nbsp;&nbsp;");
                }}
            ])
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
        });
        grid.create();
        o.query();
    };

    // 查询
    o.query = function() {
        var fields = require('model/topic_fields').syncLoad(topicId);
        store.proxy.data = fields;
        store.load();
    };

    // 编辑按钮点击事件
    function editbtnClick() 
    {/*{{{*/
        var id = jQuery(this).data('id');
        var item = grid.getRecord('fid',id);
        dialog.open(item,o.query);
    }/*}}}*/

    // 删除按钮点击事件
    function delbtnClick() 
    {/*{{{*/
        var id = jQuery(this).data('id');
        mwt.confirm('确定要删除吗?',function(res){
            if (!res) return;
            ajax.post('t_fields&action=remove',{id:id},function(res){
                if (res.retcode!=0) mwt.alert(res.retmsg);
                else {
                    o.query();
                }
            });
        });
    }/*}}}*/

    return o;
});
