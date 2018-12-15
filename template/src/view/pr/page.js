define(function(require){
    /* PR单管理 */
    var BasePage = require('core/BasePage');
    var o = new BasePage({
        // 准入角色
        passRoles: 'ROLE_HQ_ADMIN,ROLE_HQ_PMRD,ROLE_HQ_PM',
        name : 'PR单管理',
        id   : 'pr',
    });

    // 页面入口
	o.execute = function(domid,query) {
        var rw = o.getRW('ROLE_HQ_ADMIN,ROLE_HQ_PM');  //!< 读写权限(1:读,2:读写)
        require('./grid').init(domid,rw);
	};

    return o;
});
