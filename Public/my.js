 



  //== 项目选择
  var sel = document.getElementById('sel');
  sel.onchange=function(){
  // location="__ACTION__?tn="+this.value;
    location='http://localhost/exercise/index.php/Home/Index/index?tn='+this.value;
  }


  //== 添加项目1
  $('#tjxm').click(function(){
    $('#btns1').hide();
    $('#btns2').show();
  });

  $('#obj_add_back').click(function(){
    $('#btns2').hide();
    $('#btns1').show();
  });

  $('#obj_add').click(function(){
    var val = $('#obj_add_text').val();
    $.ajax({
      //url:'__URL__/obj_add',
      url:'http://localhost/exercise/index.php/Home/Index/obj_add',
      type:'post',
      data:{
        name:val
      },
      success:function(res){
        //alert("{:I('session.tn')}");
        if(res == 1){
          alert('创建成功！');
        //  location="__ACTION__?tn={:I('session.tn')}";
          location="http://localhost/exercise/index.php/Home/Index/index";
        }
      }
    });

  });
  


  //== 删除项目
  $('#scxm').click(function(){
    if(!confirm('确认删除该项目？')){
      exit;
    }
    $.ajax({
      /*url:'__URL__/obj_del',*/
      url:'http://localhost/exercise/index.php/Home/Index/obj_del',
      type:'post',
      data:{
        name:$('#sel').val(),
      },
      success:function(res){
        if(res){
         // location="__ACTION__";
          location="http://localhost/exercise/index.php/Home/Index/index";
        }
      }
    });
  });



  //== 随机浏览
  $('#sjll').click(function(){
    $('#text1').val('');
    $('#text2').val('');
    var tname = $('#sel').val();   
    $.ajax({
      url:'http://localhost/exercise/index.php/Home/Index/sjll',
      type:'post',
      data:{
        tname:tname,
      },
      success:function(res){
        sessionStorage.ch = JSON.parse(res).ch;
        sessionStorage.en = JSON.parse(res).en;
        $('#text1').val(sessionStorage.ch);
      }
    });
   
  });


  //== 查询
  $('#cx').click(function(){
    $('#text2').val('');
    a = encodeURI($('#text1').val());
    
    if($('#text1').val() == sessionStorage.ch){
      $('#text2').val(sessionStorage.en);
    }else{
      $.ajax({
        url:'http://localhost/exercise/index.php/Home/Index/cx',
        type:'post',
        data:{
          tname:$('#sel').val(),
          left:a,
        },
        success:function(res){
          if(res == 'e1'){
            $('#text2').val('查无此数据！');
          }else{
            $('#text2').val(res);
          }
        }
      });
    }

  });


  //== 模糊查询
  $('#mhcx').click(function(){
    if($('#sel').val()=='all'){
      alert('不能使用全部类型进行模糊查询！');exit;
    }
    if($('#text1').val() != ''){
      $.ajax({
        url:'http://localhost/exercise/index.php/Home/Index/mhcx',
        type:'post',
        data:{
          left:$('#text1').val(),
          tname:$('#sel').val(),
        },
        success:function(res){
            if(res == 'e1'){
              $('#text2').val('查无此数据！');
            }else{
              $('#text2').val(res);
            }
        }
      });


    }
  });
 





  //== 添加(资料)
  $('#tj').click(function(){

    var t1 = $('#text1').val();
    var p = /^.*-{3}.*$/;   
    if(!p.test(t1)){
      alert('添加格式不正确！如：a---aaa');exit;
    }
    if($('#sel').val() == 'all'){
      alert('请选要添加的项目！');exit;
    }
    $.ajax({
      url:'http://localhost/exercise/index.php/Home/Index/tj',
      type:'post',
      data:{
        tname:$('#sel').val(),
        datas:encodeURI($('#text1').val()),
      },
      success:function(res){
        if(res == 'e1'){
          alert('不能添加重复的内容！');
        }else if(res == 1){
          alert('添加成功!');
        }else{
          alert('添加失败!');
        }
      }
    });
  });


  //删除
  $('#sc').click(function(){
    if(!$('#text1').val()){
      alert('查询数据不得为空！');exit;
    }
   
    $.ajax({
      url:'http://localhost/exercise/index.php/Home/Index/sc',
      type:'post',
      data:{
        tname:$('#sel').val(),
        left:encodeURIComponent($('#text1').val()),
      },
      success:function(res){
        alert(res);
      }
    });
  });



  //总览
  $('#zl').click(function(){

    $.ajax({
      url:'http://localhost/exercise/index.php/Home/Index/zl',
      success:function(res){
alert(decodeURIComponent(res));
      }
    });
    /*
    var tname = $('#sel').val();
    if(tname == 'all'){
      alert('请先选择指定项目！');exit;
    }
    $.ajax({
      url:'http://localhost/exercise/index.php/Home/Index/zl',
      type:'post',
      data:{
        tname:tname,
      },
      success:function(res){
        if(res == 'e1'){
          alert('该项目中暂无数据！');
        }else{
          $('#text2').val(res);
        }
      }
    });

    */
  });