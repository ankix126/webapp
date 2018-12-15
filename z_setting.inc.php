<?php
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
    exit('Access Denied');
}
require_once dirname(__FILE__).'/class/env.class.php';

// 插件设置
$params = C::m('#ankix#ankix_setting')->get();

// 保存设置
if (isset($_POST["reset"])) {
	if ($_POST["reset"]==1) {
		$params = array();
	} else {
		foreach ($params as $k => &$v) {
			if (isset($_POST[$k])) $v=$_POST[$k];
		}
        // 第三方DB: ankix_base
        $params['db_ankix_base'] = array (
            'host' => $_POST['ankix_base_host'],
            'port' => $_POST['ankix_base_port'],
            'user' => $_POST['ankix_base_user'],
            'pass' => $_POST['ankix_base_pass'],
            'db'   => $_POST['ankix_base_db'],
        );
	}
    C::t('common_setting')->update("ankix_config",$params);
    updatecache('setting');
    $landurl = 'action=plugins&operation=config&do='.$pluginid.'&identifier=ankix&pmod=z_setting';
	cpmsg('plugins_edit_succeed', $landurl, 'succeed');
}

$params['ajaxapi'] = ankix_env::get_plugin_path()."/index.php?version=4&module=";
$tplVars = array(
    'siteurl' => ankix_env::get_siteurl(),
    'plugin_path' => ankix_env::get_plugin_path(),
    'plugin_name' => 'ankix',
);
ankix_utils::loadtpl(dirname(__FILE__).'/template/views/z_setting.tpl', $params, $tplVars);
ankix_env::getlog()->trace("show admin page [z_setting] success");
