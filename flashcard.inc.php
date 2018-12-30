<?php
if (!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
require_once dirname(__FILE__)."/class/env.class.php";
$plugin_path = ankix_env::get_plugin_path();

try {
    //1. 登录检查
    if(!$_G['uid']){
        $login = ankix_env::get_siteurl()."/member.php?mod=logging&action=login";
        $login.= "&referto=".urlencode(ankix_env::get_request_url());
        header("Location: $login");
        exit();
    }

    //2. 获取单元的卡片数据
    $unit = $_GET['unit'];
    if ($unit=='') {
        throw new Exception("unknow unit");
    }
    $unitId = ankix_utils::decodeId($unit);
    $mUnit = C::m('#ankix#ankix_topic_unit');
    $unitInfo = $mUnit->getFlashCardsByUnitId($unitId);


    //2. 加载模板
    $filename = basename(__FILE__);
    list($controller) = explode('.',$filename);
    include template("ankix:".strtolower($controller));
    ankix_env::getlog()->trace("pv[".$_G['username']."|uid:".$_G['uid']."]");
    C::t('#ankix#ankix_log')->write("visit ankix:$controller");
} catch (Exception $e) {
    $msg = $e->getMessage();
    include template("ankix:error");
}
