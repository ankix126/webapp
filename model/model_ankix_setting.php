<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 插件设置 
 * C::m('#ankix#ankix_setting')->get()
 **/
class model_ankix_setting
{
	// 获取默认配置
    public function getDefault()
    {
		$setting = array (
			// 屏蔽所有discuz页面
			'disable_discuz' => 0,
			// 系统名称
			'page_title' => 'Anki X',
			// 版权信息
			'page_copyright' => 'ankix.com 2018',
            // 折叠导航菜单
            'fold_navmenu' => 0,
            // 启用缓存
            'cache_enable' => 1,
			// DB
			'db_ankix_base' => array (
				'host' => '127.0.0.1',
				'port' => '9988',
				'user' => 'root',
				'pass' => 'root',
				'db'   => 'ankix_base',
			),
		);
		return $setting;
    }

    // 获取配置
	public function get()
	{
		$setting = $this->getDefault();
		global $_G;
		if (isset($_G['setting']['ankix_config'])){
			$config = unserialize($_G['setting']['ankix_config']);
			foreach ($setting as $key => &$item) {
				if (isset($config[$key])) $item = $config[$key];
			}
		}
		return $setting;
	}
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
