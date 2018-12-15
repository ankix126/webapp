<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 主题模块
 * C::m('#ankix#ankix_topic')->func()
 **/
class model_ankix_topic
{

    // 获取我的主题
    public function getMyTopic($tid) 
    {/*{{{*/
        return C::t("#ankix#topic")->getByTopicId($tid);
    }/*}}}*/

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
