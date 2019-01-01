<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 用户登录,注册,注销模块
 * C::m('#ankix#ankix_uc')->func()
 **/
class model_ankix_url
{
    // 获取单元浏览的链接
	public function getUnitViewUrl($unitId)
	{
	    $eid = ankix_utils::encodeId($unitId);
	    $url = ankix_env::get_siteurl()."/plugin.php?id=ankix:flashcard&unit=".$eid;
        return $url;
	}

    // 获取学习链接
    public function getStudyUrl($studyId) 
    {
        $str = ankix_utils::encodeId($studyId);
        $url = ankix_env::get_siteurl()."/plugin.php?id=ankix:study&study=".$str;
        return $url;
    }

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
