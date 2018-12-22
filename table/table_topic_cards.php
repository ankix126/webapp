<?php
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
/**
 * generated by mengma
 * @create: 2018-12-15 10:27
 * @usage: C::t('#ankix#topic_cards')->fun();
 **/
class table_topic_cards
{
    private $table = "topic_cards";
    private $pdo;


    public function __construct() {
        $this->pdo = ankix_env::getpdo('db_ankix_base');
    }

    // 获取Topic的全部卡片
    public function getAll($tid)
    {/*{{{*/
        $sql = <<<EOF
SELECT *
FROM {$this->table} as a
WHERE tid='$tid' AND isdel=0
EOF;
        return $this->pdo->queryAll($sql);
    }/*}}}*/


    // 查询接口
    public function query()
    {/*{{{*/
        global  $_G;
        $uid = $_G['uid'];
        $return = array(
            "totalProperty" => 0,
            "root" => array(),
        );
        $key   = ankix_validate::getNCParameter('key','key','string');
        $tid   = ankix_validate::getNCParameter('tid','tid','integer');
        $sort  = ankix_validate::getOPParameter('sort','sort','string',1024,'id');
        $dir   = ankix_validate::getOPParameter('dir','dir','string',1024,'ASC');
        $start = ankix_validate::getOPParameter('start','start','integer',1024,0);
        $limit = ankix_validate::getOPParameter('limit','limit','integer',1024,20);
        $where = "a.tid='$tid' AND a.isdel=0";
        if ($key!="") $where.=" AND (a.name like '%$key%')";
        $table = DB::table($this->_table);
        $sql = <<<EOF
SELECT SQL_CALC_FOUND_ROWS 
a.*
FROM {$this->table} as a
WHERE $where
ORDER BY a.$sort $dir
LIMIT $start,$limit
EOF;
        $return["root"] = $this->pdo->queryAll($sql);
        $row = $this->pdo->queryFirst("SELECT FOUND_ROWS() AS total");
        $return["totalProperty"] = $row["total"];
        return $return;
    }/*}}}*/

    // 保存记录
    public function save()
    {/*{{{*/
        global $_G;
        $uid = $_G['uid'];
        $id = ankix_validate::getNCParameter('id','id','integer');
        $record = array (
            'cname' => ankix_validate::getNCParameter('cname','cname','string',50),
            'front_code' => ankix_validate::getNCParameter('front_code','front_code','string',65536),
            'format_code' => ankix_validate::getNCParameter('format_code','format_code','string',65536),
            'back_code' => ankix_validate::getNCParameter('back_code','back_code','string',65536),
        ); 
        if ($id==0) {
            $record['tid'] = ankix_validate::getNCParameter('tid','tid','integer');
            $record['uid'] = $uid;
            $record['create_time'] = date('Y-m-d H:i:s');
            return $this->pdo->insert($this->table,$record);
        } else {
            return $this->pdo->update($this->table,$record,array("id='$id'"));
        }
    }/*}}}*/

    // 删除记录
    public function remove()
    {/*{{{*/
        $id = ankix_validate::getNCParameter('id','id','integer');
        $record = array(
            'isdel' => 1,
        );
        return $this->pdo->update($this->table,$record,array("id='$id'"));
    }/*}}}*/

    // 设置保存
    public function setEnable()
    {/*{{{*/
        $id = ankix_validate::getNCParameter('id','id','integer');
        $enable = ankix_validate::getNCParameter('enabled','enabled','integer');
        return $this->update($id,array('enabled'=>$enable));
    }/*}}}*/


}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
