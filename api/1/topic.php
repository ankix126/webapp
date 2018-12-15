<?php
if (!defined('IN_ANKIX_API')) {
    exit('Access Denied');
}
/**
 * 主题(学习集、记忆库)
 **/
////////////////////////////////////
// action的用户组列表（空表示全部用户组）
$actionlist = array(
    'queryMyTopic' => array(),     //!< 获取我的学习集列表
    'saveMyTopic' => array(),      //!< 保存我的学习集
    'getMyTopic' => array(),       //!< 获取我的学习集
);
////////////////////////////////////
$uid = $_G['uid'];
$username = $_G['username'];
$groupid = $_G["groupid"];
$action = isset($_GET['action']) ? $_GET['action'] : "get";

try {
    if (!isset($actionlist[$action])) {
        throw new Exception('unknow action');
    }
    $groups = $actionlist[$action];
    if (!empty($groups) && !in_array($groupid, $groups)) {
        throw new Exception('illegal request');
    }
    $fun = $action;
    $res = $fun();
    ankix_env::result(array("data"=>$res));
} catch (Exception $e) {
    ankix_env::result(array('errno'=>100010,'errmsg'=>$e->getMessage()));
}

function queryMyTopic() { return C::t('#ankix#topic')->query();}
function saveMyTopic() { return C::t('#ankix#topic')->save(); }
function getMyTopic()
{
    $tid = ankix_validate::getNCParameter('tid','tid','integer');
    return C::m('#ankix#ankix_topic')->getMyTopic($tid);
}


// vim600: sw=4 ts=4 fdm=marker syn=php
?>
