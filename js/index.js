$(function(){
	var canvas=$("#canvas").get(0);
	var ctx=canvas.getContext("2d");
	var audio=$("#audio1").get(0);
	var audio1=$("#audio2").get(0);
    audio1.play();
    var sep=40;
    var sR=4;
    var bR=18;
    var qizi={};
    var flag=true;
    var AI=false;
    var kongbai={};
    var gameStatus="pause";
    
    var hei=$(".hei").get(0);
    var bai=$(".bai").get(0);
    var ctxhei=hei.getContext('2d');
	var ctxbai=bai.getContext('2d');
    console.log(hei,bai)
    
    $("#shouye").on("click",function(){
//  	$(".kuang").css({"display":"none"});
    	$("#shouye").css({"display":"none"});
    	$(".contain").css({"display":"block"});
    	$("#bg").css({"display":"block"});
    })
   
    
    var s=0;
    var tb;
	var tw;
	
	function zhenHei(){
		ctxhei.clearRect(0,0,150,150);	
		ctxhei.save();	
		pan(ctxhei);
	    miaozhen(ctxhei);
	    ctxhei.restore();
	    s++;
	    if(s>=60){
	    	clearInterval(tb);
	    }
	}
	
	function zhenBai(){
	    ctxbai.clearRect(0,0,150,150);	
		ctxbai.save();	
		pan(ctxbai);
	    miaozhen(ctxbai);
	    ctxbai.restore();
	    s++;
	    if(s>=60){
	    	clearInterval(tw);
	    }
	}
	
	
    //画表

	function miaozhen(ctxs){
 		ctxs.save();
 		ctxs.translate(75,75);
   		ctxs.rotate(Math.PI/180*6*s);
		ctxs.beginPath();
		ctxs.arc(0,0,9,0,Math.PI*2);	
		ctxs.moveTo(0,10);
		ctxs.lineTo(0,26);
		ctxs.moveTo(0,-10);
		ctxs.lineTo(0,-40);
		ctxs.lineWidth=3;
		ctxs.closePath();
		ctxs.stroke();
		ctxs.restore();
 	}
     
    function pan(ctxs){
		ctxs.save();
		ctxs.translate(75,75);
		ctxs.beginPath();
		for (var i = 0; i < 60; i++) {
			if (i%5===0) {
				ctxs.moveTo(0,-50);
			}
			else{
				ctxs.moveTo(0,-55);
			}
			ctxs.lineTo(0,-60);
			ctxs.rotate(Math.PI/180*6);
		}			
		ctxs.closePath();
		ctxs.stroke();
		ctxs.restore();
	}
    
    
    function bob(){
		clearInterval(tw)
		tb=setInterval(zhenHei,1000);
	}
	
	function bow(){
		clearInterval(tb)
		tw=setInterval(zhenBai,1000);
	}

   
   
   
    function l(x){
    	return (x+0.5)*sep+0.5;
    }
    
    function circle(x,y){
    	ctx.save();
    	ctx.beginPath();
    	ctx.translate(l(x),l(y));
    	ctx.arc(0,0,sR,0,Math.PI*2);
    	ctx.fill();
    	ctx.closePath();
    	ctx.restore();
    }
    
/*****************************画棋盘*********************************/


    function drawQipan(){
    	ctx.clearRect(0,0,canvas.width,canvas.height);
    	ctx.save();
    	//(1)画棋盘中的方格
    	ctx.beginPath();
    	for(var i=0;i<15;i++)
    	{
    		ctx.moveTo(l(0),l(i));
    	    ctx.lineTo(l(14),l(i));
    	    ctx.moveTo(l(i),l(0));
    	    ctx.lineTo(l(i),l(14));
    	}
    	ctx.strokeStyle="#90727c";
    	ctx.stroke();
    	ctx.closePath();
    	ctx.restore();
    	//(2)、画棋盘中的圆点
    	circle(3,3);
    	circle(3,11);
    	circle(11,3);
    	circle(11,11);
    	circle(7,7);
    	for(var i=0;i<15;i++)
    	{
    		for(var j=0;j<15;j++)
    		{
    			kongbai[M(i,j)]=true;
    		}
    	}
    	console.log(kongbai);
    }
    drawQipan();
    
/*******************************落子函数*******************************/  
   
    function luozi(x,y,color){
    	ctx.save();
    	ctx.beginPath();
    	ctx.translate(l(x),l(y));
    	var g=ctx.createRadialGradient(-4,-4,0,0,0,bR);
    	if(color=="black")
    	{
    		g.addColorStop(0.1,"#ddd");
    		g.addColorStop(0.2,"#ccc");
    		g.addColorStop(1,"#000");
    	}
    	else{
    		g.addColorStop(0.1,"#fff");
    		g.addColorStop(0.2,"#fff");
    		g.addColorStop(1,"#ccc");
    	}
    	ctx.fillStyle=g;
    	ctx.arc(0,0,bR,0,Math.PI*2);
    	ctx.fill();
    	ctx.closePath();
    	ctx.restore();
    	qizi[M(x,y)]=color;
    	console.log(qizi[x+'_'+y]);
    	gameStatus="play";
    	delete kongbai[M(x,y)];
    	
    }
    
/*****************************画棋谱************************************/
    drawQipu=function(){
	   	 ctx.save();
	   	 ctx.font="20px/1 微软雅黑";
	   	 ctx.textAlign="center";
	   	 ctx.textBaseline="middle";
	   	 var i=1;
	   	 for(var k in qizi)
	   	 {
	   	 	
	   	 	var arr=k.split("_");
	   	 	console.log(arr);
	   	 	if(qizi[k]=="black")
	   	 	{
	   	 		ctx.fillStyle="white";
	   	 	}
	   	 	else{
	   	 		ctx.fillStyle="black";
	   	 	}
	   	 	
	   	    ctx.fillText(i,l(parseInt(arr[0])),l(parseInt(arr[1])));
	   	    i++;
	   	 }
	   	
	   	 
	   	 ctx.restore();
	   	 $(".box").css({"display":"block"})
	   	 $('<img>').attr("src",canvas.toDataURL()).appendTo(".box");
	   	 $('<a>').attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo(".box");
     }
     
     
/***************************人机对战**************************************/     
      function intel(){
	   	  var max=-Infinity;
	   	  var pos={};
	   	  for(var k in kongbai)
	   	  {
	   	  	  var x=parseInt(k.split("_")[0]);
	   	  	  var y=parseInt(k.split("_")[1]);
	   	  	  var m=panduan(x,y,"black");
	   	  	  if(m>max)
	   	  	  {
	   	  		  max=m;
	   	  		  pos={x:x,y:y};
	   	  	  }
	   	  }
	   	  
	   	  var max2=-Infinity;
	   	  var pos2={};
	   	  for(var k in kongbai)
	   	  {
	   	  	  var x=parseInt(k.split("_")[0]);
	   	  	  var y=parseInt(k.split("_")[1]);
	   	  	  var m=panduan(x,y,"white");
	   	  	  if(m>max2)
	   	  	  {
	   	  		  max2=m;
	   	  		  pos2={x:x,y:y};
	   	  	  }
	   	  }
   	      if(max>max2)
   	      {
   	      	return pos;
   	      }
   	      else 
   	      {
   	      	return pos2;
   	      }
      }
   
   
    pan(ctxhei);
	pan(ctxbai);
	miaozhen(ctxhei);
	miaozhen(ctxbai);

/*****************************点击时调用落子函数***************************************/
   function handleClick(e){
       var x=Math.floor(e.offsetX/sep);
   	   var y=Math.floor(e.offsetY/sep);
   	   if(qizi[x+'_'+y])
   	   {
   	  	 return;
   	   }
   	   if(AI)
   	   {
	   	   luozi(x,y,"black");
	   	   s=0
		   bow();
	   	   if(panduan(x,y,"black")>=5)
	   	   {
	   	  		$(canvas).off("click");
	   	  		$("#tanH").css({"display":"block"});
	   	  		$(".text").html("黑棋赢");
	   	  		$(".victory").css({"display":"block"});
	   	    }
	   	   var p=intel();
	   	   luozi(p.x,p.y,"white");
	   	   s=0
		   bob();
	   	   console.log(p.x,p.y);
	   	   if(panduan(p.x,p.y,"white")>=5)
	   	   {
	   	  		$(canvas).off("click");
	   	  		$("#tanH").css({"display":"block"});
	   	  		$(".text").html("白棋赢");
	   	  		$(".victory").css({"display":"block"});
	   	    }
	   	   return false;
   	   }
   	   if(flag)
   	   {
	   	  	luozi(x,y,"black");
	   	  	s=0
			bow();
	   	  	if(panduan(x,y,"black")>=5)
	   	  	{
	   	  		$(canvas).off("click");
	   	  		$("#tanH").css({"display":"block"});
	   	  		$(".text").html("黑棋赢");
	   	  		$(".victory").css({"display":"block"});
	   	  	}
   	   }
   	   else
   	   {
	   	  	luozi(x,y,"white");
	   	  	s=0
			bob();
	   	  	if(panduan(x,y,"white")>=5)
	   	  	{
	   	  		$(canvas).off("click");
	   	  		$("#tanH").css({"display":"block"});
	   	  		$(".text").html("白棋赢");
	   	  		$(".victory").css({"display":"block"});
	   	  	}
   	   }
   	   audio.play();
   	   flag=!flag;  
   	   return false;
   }
   
/**************************刷新画布*******************************************/
   function restar(){
   	   gameStatus="pause";
   	   $("#tanH").css({"display":"none"});
   	   drawQipan();
   	   qizi={};
   	   flag=true;
   	   $(canvas).on("click",handleClick);
   }


   function M(a,b){
   	 return a+"_"+b;
   }
   
/***************************输赢判断*******************************************/
   function panduan(x,y,color){
   	  var row=1; var i;
   	  i=1; while(qizi[M(x+i,y)]==color){ row++; i++;}
   	  i=1; while(qizi[M(x-i,y)]==color){ row++; i++;}
   	  
   	  var lie=1;
   	  i=1; while(qizi[M(x,y+i)]==color){ lie++; i++;}
   	  i=1; while(qizi[M(x,y-i)]==color){ lie++; i++;}
   	  
   	  var zX=1;
   	  i=1; while(qizi[M(x+i,y+i)]==color){ zX++; i++;}
   	  i=1; while(qizi[M(x-i,y-i)]==color){ zX++; i++;}
   	  
   	  var yX=1;
   	  i=1; while(qizi[M(x-i,y+i)]==color){ yX++; i++;}
   	  i=1; while(qizi[M(x+i,y-i)]==color){ yX++; i++;}
   	  return Math.max(row,lie,zX,yX);
   }

/**********************************************************************/
   $(canvas).on("click",handleClick);
   $(".again").on("click",restar);
   $(".check").on("click",function(){
   	   drawQipu();
   	   clearInterval(tb);
   	   clearInterval(tw);
   	
   });
   $(".close").on("click",function(){
   	  $(".box").css({"display":"none"});
   	  drawQipan();
   	  for(var k in qizi)
   	  {
   	  	var arr=k.split("_");
   	  	luozi(parseInt(arr[0]),parseInt(arr[1]),qizi[k]);
   	  	$(".box img").remove();
   	  }
// 	  if(qizi[qizi.length][])
// 	  tb=setInterval(zhenHei,1000);
// 	  tw=setInterval(zhenBai,1000);
   })
   
   $(".computer").on("click",function(){
   	   if(gameStatus=="play")
   	   {
   	   	  return;
   	   }
   	   AI=false;
   	   
   	   $(".people").removeClass("first");
   	   $(this).addClass("first");
   })
   $(".people").on("click",function(){
   	   if(gameStatus=="play")
   	   {
   	   	  return;
   	   }
   	   AI=true;
   	   $(".computer").removeClass("first");
   	   $(this).addClass("first");
   }) 
   
   $(".start").on("click",function(){
// 	   drawQipan();
   	   bob();
   	   
   })
   $(".tuichu").eq(0).on("click",function(){
   	  window.location.reload();
   	  
   })
    $(".tuichu").eq(1).on("click",function(){
   	  $(".box").css({"display":"none"});
   	  
   	  restar();
   })
    
    $(".guize").on("click",function(){
    	$(".tanH").css({"display":"block"});
    })
    $(".close1").on("click",function(){
    	$(".tanH").css({"display":"none"});
    })
   
})

