<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    public function login(){
        $this->display();
    }

    public function login_c(){
        $email=trim(I('post.email'));
        $pwd=trim(I('post.pwd'));
        $rem=trim(I('post.pwd'));
        foreach(I('post.') as $k=>$v){
            if(!trim($v)){
                echo "<script>alert('邮箱或密码不得为空！');history.go(-1)</script>";exit;
            }
            $arr[$k]=trim($v);
        }
        echo '<pre>';
        print_r($arr);
        if($arr['email'] == 'tpcwre@163.com' && $arr['pwd'] =='abcdefg123'){
            if($arr['rem']){
                cookie('userinfo',json_encode($arr),36000);
            }else{
                cookie('userinfo',json_encode($arr));
            }
            $this->redirect('index');
        }else{
            echo "<script>alert('邮箱或密码不正确！');history.go(-1)</script>";exit;
        }

    }


    //退出 
    public function logout(){
        cookie('userinfo',null);
        $this->redirect('index');
    }



    public function index(){
    	$m = M();
    	$tables = $m->db()->getTables();
    	session('tn',I('get.tn')?:tables[0]);
    	$this->assign('tables',$tables);
    	$this->display();
    }


    //项目添加
    public function obj_add(){
    	$name = I('post.name');
    	//echo $name ;exit;
    	//$name='bbb';
    	$m = M();
    	$sql = "create table ".$name."(id int primary key auto_increment,ch varchar(9999) not null,en varchar(9999) not null);";
    	//echo $sql;exit;
    	$m->execute($sql);
    	if(M($name)->getDbFields()){
    		echo 1;
    	}

    }


    //项目删除
    public function obj_del(){
    	$name = I('post.name');
    	$sql = "drop table ".$name;
    	$m = M();
    	$st = $m->execute($sql);
    	echo 1;
    }



    //随机浏览
    public function sjll(){
        
        $tname = I('post.tname');
        if($tname != 'all'){
            if(cookie('info')){
                //echo cookie('info');
                $info = json_decode(cookie('info'),1);
                if(!$info[$tname]){
                    $ids = M($tname)->field('id')->select();
                    if($ids){
                        foreach($ids as $vv){
                            $ids2[] = $vv['id'];
                        }
                        $info[$tname] = $ids2;
                    }
                    
                    $dataj = json_encode($info);
                    cookie('info',$dataj,3600000); 
                    echo 'reset';exit;
                }
                $rand = array_rand($info[$tname]);
                $id = $info[$tname][$rand];
                unset($info[$tname][$rand]);
                foreach($info[$tname] as $v){
                    $temp[] = $v;
                }
                $info[$tname]=$temp;
                $dataj = json_encode($info);
                cookie('info',$dataj,3600000);        
            }else{
                $tables = M()->db()->getTables();
                foreach($tables as $k=>$v){
                    if($v == 'stat'){
                        continue;
                    }
                    $ids = M($v)->field('id')->select();
                    if($ids){
                        foreach($ids as $vv){
                            $ids2[] = $vv['id'];
                        }
                        $info[$v] = $ids2;
                        unset($ids2);
                    }
                }
                cookie('info',json_encode($info),3600000);
            }
        }else{
            if(cookie('all')){
              //  echo cookie('all');
                $info = json_decode(cookie('all'),1);
                //print_r($info);
                $tname = array_keys($info)[array_rand(array_keys($info))];
              
                $rand = array_rand($info[$tname]);
                $id = $info[$tname][$rand];
                unset($info[$tname][$rand]);
              // echo $tname.'--';
                if($info[$tname]){
                    foreach($info[$tname] as $v){
                        $temp[] = $v;
                    }
                    $info[$tname]=$temp;
                }else{
                    $info[$tname]=1;
                    unset($info[$tname]);
                }
                if(!$info){
                    cookie('all',null);
                    echo 'reset';
                    exit;
                }

                $dataj = json_encode($info);
                cookie('all',$dataj,3600000);  
              //  echo $dataj;exit;      
            }else{
                $tables = M()->db()->getTables();
                foreach($tables as $k=>$v){
                    if($v == 'stat'){
                        continue;
                    }
                    $ids = M($v)->field('id')->select();
                    if($ids){
                        foreach($ids as $vv){
                            $ids2[] = $vv['id'];
                        }
                        $info[$v] = $ids2;
                        unset($ids2);
                    }
                }
                cookie('all',json_encode($info),3600000);
            }
        }
      //  echo $tname.'--';
       // echo $id;
        $qdata = M($tname)->find($id);
        if($qdata){
            echo json_encode($qdata);
        }
    }




    //查询
    public function cx(){
        $tname = I('post.tname');
        $left = urldecode(trim(I('post.left')));
        $data = M($tname)->where(array('ch'=>$left))->find();
        if($data){
            echo $data['en'];
        }else{
            echo 'e1';
        }
    }





    //模糊查询
    public function mhcx(){
        $left = urldecode(trim(I('post.left')));
       // echo $left;exit;
        $tname = trim(I('post.tname'));
        $m = M($tname);
        $where['ch|en']=array('like',array("%{$left}%"));
        $data = $m->where($where)->select();
        if($data){
            foreach($data as $k=>$v){
                echo "//===== {$v['ch']}";
                echo $v['en'];
                echo "\n\n\n\n\n";
            }
        }else{
            echo 'e1';
        }
    }




    //添加(资料)
    public function tj(){
        $tname = I('post.tname');
        $data = urldecode(trim(I('post.datas')));
      
        if(!$data){
            exit;
        }
        $arr = explode('---',$data);
        if(!$arr[0] || !$arr[1]){
            echo 'e3';exit;
        }
        //print_r($arr);
        $m = M($tname);
        $res1 = $m->where(array('ch'=>$arr[0]))->find();
        if($res1){
            echo "e1";exit;
        }
        $sdata['ch'] = $arr[0];
        $sdata['en'] = $arr[1];
        if($m->create($sdata)){
            $st = $m->add($sdata);
        }
        if($st){
            echo 1;
        }else{
            echo 'e2';
        }
    }


    //删除 
    public function sc(){
        $tname = I('post.tname');
        $left = urldecode(trim(I('post.left')));
        $st = M($tname)->where(array('ch'=>$left))->delete();
        print_r($st);

    }





    //总览
    public function zl(){
        $tname = I('post.tname');
        $data = M($tname)->select();
        $count = count($data);
        echo  "共有 {$count} 条数据!\r\n\r\n";
        if($data){
            foreach($data as $v){
                echo $v['ch'];
              //  echo $v['en'];
                echo "\n\n\n";
            }
       
        }else{
            echo 'e1';
        }
    }

}