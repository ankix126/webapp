<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 学习集模块
 * C::m('#ankix#ankix_study')->func()
 **/
class model_ankix_study
{
    // 获取我的学习集
    public function getMyStudy($studyId)
    {/*{{{*/
        global $_G;
        $uid = $_G['uid'];
        //1. 获取徐学习集主信息
        $studyInfo = C::t('#ankix#study')->getById($studyId);
        if (empty($studyInfo)) {
            throw new Exception("该学习集不存在或已删除");
        }
        if ($studyInfo['uid']!=$uid) {
            throw new Exception("无权访问该学习集");
        }

        //2. 获取学习集全部记录
        $studyInfo['itemList'] = C::t('#ankix#study_item')->getAll($studyId);

        //3. 获取单元信息
        //$unitId = $studyInfo['unitId'];
        //$unitInfo = C::m('#ankix#ankix_topic_unit')->getFlashCardsByUnitId($unitId);

//        $this->stat($studyId);

        return $studyInfo;
    }/*}}}*/

    // 统计学习集的蓝红绿数据
    public function stat($studyId)
    {/*{{{*/
        //1. 统计学习中和待复习数据
        $pdo = ankix_env::getpdo('db_ankix_base');
        $sql = <<<EOF
SELECT 
a.study_id as studyId,
b.unit_id as unitId,
sum(if(a.last_study_result=1,1,0)) as statLearning,
sum(if(a.last_study_result!=1 AND date(next_study_time)<=date(now()),1,0)) as statReview
FROM study_item as a
LEFT JOIN study as b ON b.id=a.study_id
WHERE a.study_id='$studyId' AND a.isdel=0
EOF;
        $statInfo = $pdo->queryFirst($sql);
        if (empty($statInfo)) return $statInfo;

        //2. 统计新加数据
        $unitId = $statInfo['unitId'];
        $sql = <<<EOF
SELECT
sum(if(b.id is null,0,1)) as statNew
FROM topic_unit_item as a
LEFT JOIN study_item as b ON b.study_id='$studyId' AND b.item_id=a.id AND b.isdel=0
WHERE a.unit_id='$unitId' AND a.isdel=0
EOF;
        $res = $pdo->queryFirst($sql);
        $statInfo['statNew'] = !empty($res) ? intval($res['statNew']) : 0;

        //3. 更新study表
        $sql = <<<EOF
UPDATE study SET stat_new={$statInfo['statNew']}, stat_learning={$statInfo['statLearning']},
stat_review={$statInfo['statReview']}
WHERE id='$studyId'
EOF;
        $pdo->exec($sql);

        return $statInfo;
    }/*}}}*/

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
