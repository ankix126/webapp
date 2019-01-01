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

    //2. 获取学习集信息
    $study = $_GET['study'];
    if ($study=='') {
        throw new Exception("unknow study");
    }
    $studyId = ankix_utils::decodeId($study);
    $studyInfo = C::m('#ankix#ankix_study')->getMyStudy($studyId);
    

    //3. 获取单元信息
    $unitId = $studyInfo['unitId'];
    $unitInfo = C::m('#ankix#ankix_topic_unit')->getFlashCardsByUnitId($unitId);

    //4. 加载模板
    $filename = basename(__FILE__);
    list($controller) = explode('.',$filename);
    include template("ankix:".strtolower($controller));
    ankix_env::getlog()->trace("pv[".$_G['username']."|uid:".$_G['uid']."]");
    C::t('#ankix#ankix_log')->write("visit ankix:$controller");
} catch (Exception $e) {
    $msg = $e->getMessage();
    include template("ankix:error");
}
