<?php
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
/**
 * generated by mengma
 * @create: 2018-12-15 10:27
 * @usage: C::t('#ankix#topic')->fun();
 **/
class table_topic
{
    private $table = "topic";
    private $pdo;


    public function __construct() {
        $this->pdo = ankix_env::getpdo('db_ankix_base');
    }

    // 获取Topic
    public function getByTopicId($tid)
    {/*{{{*/
        $sql = <<<EOF
SELECT 
a.id as topicId,a.tname as topicName,a.description,
a.cateid as cateId,
b.cname as cateName,
a.fields as fields,
a.options as options,
a.status,a.uid,
a.create_time as createTime
FROM {$this->table} as a
LEFT JOIN topic_category as b ON b.cid=a.cateid
WHERE a.id='$tid' AND a.isdel=0;
EOF;
        $res = $this->pdo->queryFirst($sql);
        if (!empty($res)) {
            $res['fields'] = ankix_utils::decodeJson($res['fields']);
            $res['options'] = ankix_utils::decodeJson($res['options']);
        }
        return $res;
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
        $sort  = ankix_validate::getOPParameter('sort','sort','string',1024,'id');
        $dir   = ankix_validate::getOPParameter('dir','dir','string',1024,'DESC');
        $start = ankix_validate::getOPParameter('start','start','integer',1024,0);
        $limit = ankix_validate::getOPParameter('limit','limit','integer',1024,20);
        $where = "a.uid='$uid' AND a.isdel=0";
        if ($key!="") $where.=" AND (a.tname like '%$key%')";
        $table = DB::table($this->_table);
        $sql = <<<EOF
SELECT SQL_CALC_FOUND_ROWS 
a.id as topicId,a.tname as topicName,a.description,
a.cateid as cateId,
b.cname as cateName,
a.status,
a.create_time as createTime
FROM {$this->table} as a
LEFT JOIN topic_category as b ON b.cid=a.cateid
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
            'cateid' => ankix_validate::getNCParameter('cateid','cateid','integer',1024),
            'tname' => ankix_validate::getNCParameter('tname','tname','string',1024),
            'description' => ankix_validate::getNCParameter('description','description','string',1024),
        ); 
        if ($id==0) {
            $record['uid'] = $uid;
            $record['create_time'] = date('Y-m-d H:i:s');
            $record['fields'] = "[{\"k\":\"Front\",\"type\":1},{\"k\":\"Back\",\"type\":1}]";
            return $this->pdo->insert($this->table,$record);
        } else {
            return $this->pdo->update($this->table,$record,array("id='$id'"));
        }
    }/*}}}*/

    // 删除记录
    public function remove()
    {/*{{{*/
        $id = ankix_validate::getNCParameter('id','id','integer');
        return $this->update($id,array('isdel'=>1));
    }/*}}}*/

    // 设置保存
    public function setEnable()
    {/*{{{*/
        $id = ankix_validate::getNCParameter('id','id','integer');
        $enable = ankix_validate::getNCParameter('enabled','enabled','integer');
        return $this->update($id,array('enabled'=>$enable));
    }/*}}}*/

    // 保存字段JSON
    public function saveFields()
    {/*{{{*/
        $id = ankix_validate::getNCParameter('id','id','integer');
        if (empty($_POST['fields'])) {
            throw new Exception("fields is empty");
        }
        $record = array (
            'fields' => json_encode($_POST['fields']),
        );
        return $this->pdo->update($this->table,$record,array("id='$id'"));
    }/*}}}*/

    // 保存options json
    public function saveOptions()
    {/*{{{*/
        $id = ankix_validate::getNCParameter('id','id','integer');
        if (empty($_POST['options'])) {
            throw new Exception("options is empty");
        }
        $record = array (
            'options' => json_encode($_POST['options']),
        );
        return $this->pdo->update($this->table,$record,array("id='$id'"));
    }/*}}}*/

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
