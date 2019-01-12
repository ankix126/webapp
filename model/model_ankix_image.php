<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 图片处理模块
 * C::m('#ankix#ankix_image')->func()
 **/

class model_ankix_image
{
    private $_logger;

    public function __construct() {
        $this->_logger = ankix_env::getlog();
    }

    // 获取图片信息
    public function getimginfo($imgfile) 
    {/*{{{*/
        $imginfo = @getimagesize($imgfile);
        if ($imginfo===false) {
            return false;
        }
        $imgtype = 'unknown';
        switch ($imginfo[2]){
            case 1: $imgtype = "gif"; break;
            case 2: $imgtype = "jpg"; break;
            case 3: $imgtype = "png"; break;
        }
        $res = array (
            'width'    => $imginfo[0],
            'height'   => $imginfo[1],
            'imgtype'  => $imgtype,
            'mime'     => $imginfo['mime'],
            'filesize' => @filesize($imgfile),
        );
        return $res;
    }/*}}}*/

    // 存储
    public function saveImage($fullPathFile)
    {/*{{{*/
        // 存储到minio服务器
        $post_data = array (
            'bucket' => 'ankix',
            'fileElementId' => 'imgfile',
            'imgfile' => "@".$fullPathFile,
        );
        //$api = "http://127.0.0.1:8020/upload/image";
        $api = "http://106.15.9.113:8020/upload/image";
        $res = ankix_http::post($api,$post_data);
        if ($res['errno']!=0) {
            $this->_logger->warning('upload_image_fail: '.$res['errmsg']);
            throw new Exception($res['errmsg']);
        }
        $return = array (
            'imgkey'  => $res['data']['key'],
            'imgurl'  => $res['data']['url'],
        );
        return $return['imgurl'];
    }/*}}}*/

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
