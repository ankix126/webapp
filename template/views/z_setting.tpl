<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="<%plugin_path%>/template/libs/mwt/4.0/mwt.min.css" type="text/css">
  <link rel="stylesheet" href="<%plugin_path%>/template/views/misadmin.css" type="text/css">
  <script src="<%plugin_path%>/template/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="<%plugin_path%>/template/libs/mwt/4.0/mwt.min.js"></script>
  <%js_script%>
  <script>
    var jq=jQuery.noConflict();
    jq(document).ready(function($) {
        jQuery("input[name=disable_discuz][value="+v.disable_discuz+"]").attr("checked",true);
        jQuery('#page_title').val(v.page_title);
        jQuery('#page_copyright').val(v.page_copyright);
        jQuery("input[name=fold_navmenu][value="+v.fold_navmenu+"]").attr("checked",true);
        jQuery("input[name=cache_enable][value="+v.cache_enable+"]").attr("checked",true);
        // 设置DB
        var dbs = ['ankix_base'];
        for(var i=0;i<dbs.length;++i) {
          var k = dbs[i];
          jQuery("#"+k+"_host").val(v['db_'+k].host);
          jQuery("#"+k+"_port").val(v['db_'+k].port);
          jQuery("#"+k+"_user").val(v['db_'+k].user);
          jQuery("#"+k+"_pass").val(v['db_'+k].pass);
          jQuery("#"+k+"_db").val(v['db_'+k].db);
        }
    });
  </script>
</head>
<body>
  <form method="post" action="admin.php?action=plugins&operation=config&identifier=<%plugin_name%>&pmod=z_setting">
  <!-- 使用提示 -->
  <table class="tb tb2">
    <tr><th colspan="15" class="partition">使用提示</th></tr>
    <tr><td class="tipsblock" s="1">
      <ul id="lis">
        <li>系统地址：<a href="<%siteurl%>/plugin.php?id=<%plugin_name%>" target="_blank"><%siteurl%>/plugin.php?id=<%plugin_name%></a></li>
      </ul>
    </td></tr>
  </table>
  <!-- 全局设置 -->
  <table class="tb tb2">
    <tr><th colspan="15" class="partition">全局设置</th></tr>
    <tr>
      <td width='110'>屏蔽discuz：</td>
      <td width='300'>
	    <label><input name="disable_discuz" type="radio" value="1"> 是</label>
        &nbsp;&nbsp;
	    <label><input name="disable_discuz" type="radio" value="0"> 否</label>
      </td>
      <td class='tips2'>选'是'所有discuz页面都将跳转到插件页面</td>
    </tr>
	<tr>
	  <td>页面标题：</td>
      <td><input type="text" id="page_title" name="page_title" class="txt" style="width:96%"></td>
	  <td class='tips2'>系统名称</td>
	</tr>
	<tr>
	  <td>版权信息：</td>
      <td><input type="text" id="page_copyright" name="page_copyright" class="txt" style="width:96%"></td>
	  <td class='tips2'>版权信息</td>
	</tr>
    <tr><th colspan="15" class="partition">外部DB设置</th></tr>
    <tr>
      <td>ankix_base库：</td>
      <td colspan="2">
        host: <input id="ankix_base_host" name="ankix_base_host" type="text" class="txt" style="width:120px;margin-right:10
px;">
        port: <input id="ankix_base_port" name="ankix_base_port" type="text" class="txt" style="width:60px;margin-right:10p
x;">
        user: <input id="ankix_base_user" name="ankix_base_user" type="text" class="txt" style="width:60px;margin-right:10p
x;">
        pass: <input id="ankix_base_pass" name="ankix_base_pass" type="text" class="txt" style="width:100px;margin-right:10
px;">
        db: <input id="ankix_base_db" name="ankix_base_db" type="text" class="txt" style="width:120px;margin-right:10px;">
      </td>
    </tr>
    <tr>
      <td colspan="3">
		<input type="hidden" id="reset" name="reset" value="0"/>
        <input type="submit" id='subbtn' class='btn' value="保存设置"/>
        &nbsp;&nbsp;
		<input type="submit" class='btn' onclick="jQuery('#reset').val(1);" value="恢复默认设置"/>
      </td>
    </tr>
  </table>
  </form>
</body>
</html>
