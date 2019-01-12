<?php
if (!defined('IN_ANKIX_API')) {
    exit('Access Denied');
}
/**
 * 上传文件
 **/
////////////////////////////////////
// action的用户组列表（空表示全部用户组）
$actionlist = array(
	'image' => array(),   //!< 上传图片接口
);
////////////////////////////////////
$uid = $_G['uid'];
$username = $_G['username'];
$groupid = $_G["groupid"];
$action = isset($_GET['action']) ? $_GET['action'] : "imgfile";
try {
    if (!isset($actionlist[$action])) {
        throw new Exception('unknow action');
    }
    $groups = $actionlist[$action];
    if (!empty($groups) && !in_array($groupid, $groups)) {
        throw new Exception('illegal request');
    }
    $fun = $action."Action";
    $res = $fun();
    ankix_env::result(array("data"=>$res));
} catch (Exception $e) {
    ankix_env::result(array('retcode'=>100010,'retmsg'=>$e->getMessage()));
}

// 上传图片接口
function imageAction()
{
    $res = ankix_validate::getNCParameter('imgfile','imgfile','file',0);
    $mImage = C::m('#ankix#ankix_image');
    //1. 上传的图片文件
    $tmpFile = $res['tmp_name'];
    $imgInfo = $mImage->getimginfo($tmpFile);
    if (empty($imgInfo)) throw new Exception("请上传图片文件");
    //2. 保存图片
    $res['imgurl'] = $mImage->saveImage($tmpFile);
    unset($res['tmp_name']);
    unset($res['error']);
    return $res;
}

?>
