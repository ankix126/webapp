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

    'queryUnit' => array(),    //!< 获取主题单元列表
    'saveUnit' => array(),     //!< 保存单元

    'queryItem' => array(),    //!< 查询记录

    'saveFields' => array(),   //!< 保存字段
    'getAllFields' => array(), //!< 获取主题的全部字段

    'saveCard' => array(),     //!< 保存卡片
    'getAllCards' => array(),  //!< 获取主题的全部卡片
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

function queryUnit() { return C::t('#ankix#topic_unit')->query(); }
function saveUnit() { return C::t('#ankix#topic_unit')->save(); }

function queryItem() { return C::t('#ankix#topic_unit_item')->query(); }

function saveFields() { return C::t('#ankix#topic_fields')->save(); }
function getAllFields() {
    $tid = ankix_validate::getNCParameter('tid','tid','integer');
    return C::t('#ankix#topic_fields')->getAll($tid);
}

function saveCard() { return C::t('#ankix#topic_cards')->save(); }
function getAllCards() {
    $tid = ankix_validate::getNCParameter('tid','tid','integer');
    return C::t('#ankix#topic_cards')->getAll($tid); 
}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
