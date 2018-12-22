<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 语言包 
 **/
class model_ankix_lang
{
    // 获取选择的语言
    public function getLanguage()
    {/*{{{*/
        global $_G;
        return isset($_G['cookie']['lang']) ? $_G['cookie']['lang'] : 'zh';
    }/*}}}*/

    // 获取语言包
	public function getAll()
	{/*{{{*/
        $language = $this->getLanguage();
        return C::t('#ankix#language')->loadAll($language);
	}/*}}}*/
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
