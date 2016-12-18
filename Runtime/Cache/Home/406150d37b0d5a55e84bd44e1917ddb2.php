<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootstrap 101 Template</title>
  <!-- Bootstrap 
  <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css"-->
  <link href="/exercise/Public/bootstrap.min.css" rel="stylesheet">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body>
<div class='container'>
<!----------------------------------------------------------------------->

  <h1 class='text-center' style='font-weight:bold;color:red'>资料查询与练习</h1>

  <center>
    <div class='row'>
      <div class='form-inline' id='btns1'>
        <div class='form-group'>
          <select class="form-control" id='sel'>
            <option value='all'>全部</option>
            <?php if(is_array($tables)): $i = 0; $__LIST__ = $tables;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($_SESSION['tn']== $vo): ?><option selected value=<?php echo ($vo); ?>><?php echo ($vo); ?></option>
              <?php else: ?>
                <option value=<?php echo ($vo); ?>><?php echo ($vo); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
          </select>
        </div>

        <div class='btn btn-info' style='margin-bottom:3px' id='scxm'>删除项目</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='tjxm'>添加项目</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='sjll'>随机浏览</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='cx'>查询</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='mhcx'>模糊查询</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='tj'>添加</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='sc'>删除</div>
        <div class='btn btn-info' style='margin-bottom:3px' id='zl'>总览</div>
    </div><br>
    
    <div class='row' id='btns2' style='display:none'>
      <form class='form-inline'>
        <div class='form-group'>
          <lable>项目名：</label>
          <input type='text' class='form-control' id='obj_add_text'/>
          <lable class='btn btn-danger' id='obj_add'>添加</lable>
          <lable class='btn btn-danger' id='obj_add_back'>返回</lable>
        </div>
      </form>
    </div><br>

    <div class='row'>
      <div class='col-sm-6'>
        <div class='row'>
          <div class='col-sm-10 col-sm-offset-1'>
            <textarea id='text1' style='width:100%;height:200px;resize:none'></textarea>
          </div>
        </div>
      </div>

      <div class='col-sm-6'>
        <div class='row'>
          <div class='col-sm-10 col-sm-offset-1'>
            <textarea id='text2' style='width:100%;height:200px;resize:none'></textarea>
          </div>
        </div>
      </div>
    </div>
  </center>







































<!----------------------------------------------------------------------->
</div>
<!--script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script-->
<script src="/exercise/Public/jquery.min.js"></script>
<script src="/exercise/Public/my.js"></script>
<script src="/exercise/Public/bootstrap.min.js"></script>
</body>
</html>