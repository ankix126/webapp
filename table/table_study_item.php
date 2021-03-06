<?php
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
/**
 * generated by mengma
 * @create: 2018-12-15 10:27
 * @usage: C::t('#ankix#study')->fun();
 **/
class table_study_item
{
    private $table = "study_item";
    private $pdo;


    public function __construct() {
        $this->pdo = ankix_env::getpdo('db_ankix_base');
    }

    public function getAll($studyId)
    {
        $sql = <<<EOF
SELECT 
a.id as studyItemId,
a.study_id as studyId,
a.item_id as unitItemId,
a.last_study_result as lastStudyResult,
a.last_study_time as lastStudyTime,
a.next_study_time as nextStudyTime,
a.first_study_result as firstStudyResult,
a.first_study_time as firstStudyTime,
a.stat_num as statNum,
b.topic_id as topicId,
b.fields,
a.uid
FROM study_item as a
LEFT JOIN topic_unit_item as b ON b.id=a.item_id
WHERE a.study_id='$studyId' AND a.isdel=0
EOF;
        return $this->pdo->queryAll($sql);
    }


    /**
     * 保存记忆反馈
     */
    public function saveFeedback()
    {/*{{{*/
        global $_G;
        $uid = $_G['uid'];
        $study_id = ankix_validate::getNCParameter('study_id','study_id','integer');
        $item_id = ankix_validate::getNCParameter('item_id','item_id','integer');
        $result = ankix_validate::getNCParameter('result','result','integer');
        $time = date('Y-m-d H:i:s');

        ////////////////////////////////////////////////////
        // 根据本次反馈结果计算下次复习的时间（同anki的记忆曲线规则）
        $tm = time();
        $days = 0;
        switch ($result) {
            case 2: $days = 8;  break;  // Hard
            case 3: $days = 24; break;  // Good
            case 4: $days = 53; break;  // Easy
            default: $days = 0; break;  // Again
        }
        $next_study_time = date('Y-m-d H:i:s', $tm+86400*$days);
        ////////////////////////////////////////////////////

        $sql = <<<EOF
INSERT INTO study_item (study_id,item_id,last_study_result,last_study_time,
next_study_time,first_study_result,first_study_time,stat_num,uid,isdel) VALUES 
('$study_id','$item_id','$result','$time',
'$next_study_time','$result','$time',1,'$uid',0)
ON DUPLICATE KEY UPDATE
last_study_result=values(last_study_result),
last_study_time=values(last_study_time),
next_study_time=values(next_study_time),
stat_num=stat_num+1,
isdel=values(isdel)
EOF;
        $this->pdo->exec($sql);
    }/*}}}*/
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
