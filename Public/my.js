 



  //== 项目选择
  var sel = document.getElementById('sel');
  sel.onchange=function(){
  // location="__ACTION__?tn="+this.value;
    location='/Home/Index/index?tn='+this.value;
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
      //url:'http://localhost/exercise/index.php/Home/Index/obj_add',
      url:'/Home/Index/obj_add',
      type:'post',
      data:{
        name:val
      },
      success:function(res){
        //alert("{:I('session.tn')}");
        if(res == 1){
          alert('创建成功！');
        //  location="__ACTION__?tn={:I('session.tn')}";
          location="/Home/Index/index";
        }
      }
    });

  });
  


  //== 删除项目
  $('#scxm').click(function(){
    var tname = $('#sel').val();
    if(!confirm('确认删除项目 '+tname+'?')){
      exit;
    }
    $.ajax({
      /*url:'__URL__/obj_del',*/
      //url:'http://localhost/exercise/index.php/Home/Index/obj_del',
      url:'/Home/Index/obj_del',
      type:'post',
      data:{
        name:tname,
      },
      success:function(res){
        if(res){
         // location="__ACTION__";
          //location="http://localhost/exercise/index.php/Home/Index/index";
          location="/Home/Index/index";
        }
      }
    });
  });



  //== 随机浏览
  $('#sjll').click(function(){
    if(sessionStorage.num){
      var num = sessionStorage.num;
      num ++;
      sessionStorage.num = num;
    }else{
      sessionStorage.num = 1;
    }
    var str = "今天以经浏览了 "+sessionStorage.num+" 条信息!";
    $('#text1').val('');
    $('#text2').val(str);
    var tname = $('#sel').val();   
    $.ajax({
      //url:'http://localhost/exercise/index.php/Home/Index/sjll',
      url:'/Home/Index/sjll',
      type:'post',
      data:{
        tname:tname,
      },
      success:function(res){
        if(res == 'reset'){
          alert('该项目内容浏览完毕！');
          exit;
        }
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
       // url:'http://localhost/exercise/index.php/Home/Index/cx',
        url:'/Home/Index/cx',
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
      var left = encodeURIComponent($('#text1').val());
     // alert(left);exit;
      $.ajax({
       // url:'http://localhost/exercise/index.php/Home/Index/mhcx',
        url:'/Home/Index/mhcx',
        type:'post',
        data:{
          left:left,
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
    if($('#sel').val() == 'all'){
      alert('请选要添加的项目！');exit;
    }
    $.ajax({
      //url:'http://localhost/exercise/index.php/Home/Index/tj',
      url:'/Home/Index/tj',
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
        }else if(res == 'e3'){
          alert('数据格式不正确！如：a---aaa');
        }else{
          alert('添加失败!');
        }
      }
    });
  });


  //删除
  $('#sc').click(function(){
    if(!confirm('确认删除?')){
      exit;
    }
    if(!$('#text1').val()){
      alert('查询数据不得为空！');exit;
    }
   
    $.ajax({
      //url:'http://localhost/exercise/index.php/Home/Index/sc',
      url:'/Home/Index/sc',
      type:'post',
      data:{
        tname:$('#sel').val(),
        left:encodeURIComponent($('#text1').val()),
      },
      success:function(res){
        if(res == 1){
          alert('删除成功！');
        }
      }
    });
  });



  //总览
  $('#zl').click(function(){
    var tname = $('#sel').val();
    if(tname == 'all'){
      alert('请先选择指定项目！');exit;
    }
    $.ajax({
      //url:'http://localhost/exercise/index.php/Home/Index/zl',
      url:'/Home/Index/zl',
      type:'post',
      data:{
        tname:tname,
      },
      success:function(res){
        if(res == 'e1'){
          alert('该项目中暂无数据！');
        }else{
          $('#text1').val(res);
        }
      }
    });
  });



  $('#zlcx').click(function(){
    if(sessionStorage.hit){
      var hit = sessionStorage.hit;
      if(hit > 10){
        $('#login').show();
        sessionStorage.hit = 0;
        exit;
      }
      hit ++;
      sessionStorage.hit = hit;
    }else{
      sessionStorage.hit=1;
    }
  });