<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 主题单元模块
 * C::m('#ankix#ankix_topic_unit')->func()
 **/
class model_ankix_topic_unit
{
    // 获取单元闪卡数据
    public function getFlashCardsByUnitId($unitId)
    {
        //1. 获取单元信息
        $unitInfo = C::t('#ankix#topic_unit')->getUnitInfo($unitId);
        if (empty($unitInfo)) {
            throw new Exception("unkown unit");
        }

        //2. 获取单元的卡片数据
        $unitInfo['cardData'] = C::t('#ankix#topic_unit_item')->getAllByUnitId($unitId);

        if (empty($unitInfo['cardData'])) {
            throw new Exception("empty unit");
        }

        return $unitInfo;
    }

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
