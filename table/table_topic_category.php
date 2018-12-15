<?php
if (!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 主题分类表
 **/
class table_topic_category
{
    private $table = "topic_category";
    private $pdo;

    public function __construct() {
        $this->pdo = ankix_env::getpdo('db_ankix_base');
	}

    // 获取全部
    public function getOptions() {
        $sql = "SELECT cid as value,cname as text FROM {$this->table} WHERE isdel=0 ORDER BY display_order ASC";
        return $this->pdo->queryAll($sql);
    }

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
