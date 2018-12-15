define(function(require){
    var activeIdx = 1;
    var domid,o={};

    var tabs = [
        ['数据',require('./data_area')],
        ['模板',require('./template_area')]
    ];

    function activeTab() {
        //1. tab
        jQuery('[name=tabnav-'+domid+']').removeClass('mwt-active');
        jQuery('#tabnav-'+domid+activeIdx).addClass('mwt-active');
        //2. area
        jQuery('[name=area-'+domid+']').hide();
        var areaId = 'area-'+domid+activeIdx;
        jQuery('#'+areaId).show();
        if (jQuery('#'+areaId).html()=='') {
            tabs[activeIdx][1].init(areaId);
        }
    }


    o.init = function(_domid) {
        domid = _domid;

        new mwt.BorderLayout({
            render : domid,
            items : [
                {id:'north-'+domid, region:'north', height:68,style:'background:#fff;',
                    html:textblock.empty("选择学习集浏览记录")},
                {id:'center-'+domid,region:'center',style:'background:#fff;'}
            ]
        }).init();
    };

	o.showTopicDetail = function(topicId) {
	    var topicInfo = require("model/topic").get(topicId);
	    //print_r(topicInfo);



        var navs = [];
        var areas = [];
        for (var i=0;i<tabs.length;++i) {
            var tab = tabs[i];
            var code = '<li id="tabnav-'+domid+i+'" name="tabnav-'+domid+'">'+
                '<a href="javascript:;" data-v="'+i+'" name="tabnavbtn-'+domid+'">'+tab[0]+'</a></li>';
            navs.push(code);
            var area = '<div name="area-'+domid+'" id="area-'+domid+i+'" class="mwt-layout-fill" style="display:none;"></div>';
            areas.push(area);
        }

        var code = '<div class="mwt-row info-panel" style="margin-bottom:1px;">'+
                '<div class="mwt-col-12">'+
                    '<i class="icon icon-reply" style="font-size:15px;vertical-align:text-bottom;"></i> '+
                    '<span style="font-size:13px;margin-right: 15px;">'+topicInfo.topicName+'</span>'+
                    '<span style="font-size:12px;color:gray;">（'+topicInfo.cateName+'）</span>'+
                '</div>'+
            '</div>'+
            '<ul class="mwt-nav mwt-nav-tabs"><li>&nbsp;</li>'+navs.join('')+'</ul>';
        jQuery('#north-'+domid).html(code);

        jQuery('#center-'+domid).html(areas.join(''));
        activeTab();

        jQuery('[name=tabnavbtn-'+domid+']').unbind('click').click(function(){
            activeIdx = jQuery(this).data('v');
            activeTab();
        });

	};

    return o;
});
