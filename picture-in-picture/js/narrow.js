


(function(){
	var urls = [
	    {
	      id: "bitmap01",
	      src: "img/1.jpg"
	    },{
	      id: "bitmap02",
	      src: "img/2.jpg"
	    },{
	      id: "bitmap03",
	      src: "img/3.jpg"
	    },{
			id: "bitmap04",
			src: "img/4.jpg"
		},{
			id: "bitmap05",
			src: "img/5.jpg"
		},{
			id: "bitmap06",
			src: "img/6.jpg"
		},{
			id: "bitmap06_5",
			src: "img/6_5.jpg"
		},{
			id: "bitmap07",
			src: "img/7.jpg"
		},{
			id: "bitmap07_5",
			src: "img/7_5.jpg"
		},{
			id: "bitmap08",
			src: "img/8.jpg"
		},{
			id: "bitmap08_5",
			src: "img/8_5.jpg"
		},{
			id: "bitmap09",
			src: "img/9.jpg"
		},{
			id: "bitmap09_5",
			src: "img/9_5.jpg"
		},{
			id: "bitmap10",
			src: "img/10.jpg"
		},{
			id: "bitmap10_5",
			src: "img/10_5.jpg"
		},{
			id: "bitmap11",
			src: "img/11.jpg"
		},{
			id: "bitmap11_5",
			src: "img/11_5.jpg"
		},{
			id: "bitmap12",
			src: "img/12.jpg"
		},{
			id: "bitmap12_5",
			src: "img/12_5.jpg"
		},{
			id: "bitmap13",
			src: "img/13.jpg"
		},{
			id: "bitmap13_5",
			src: "img/13_5.jpg"
		},{
			id: "bitmap14",
			src: "img/14.jpg"
		},{
			id: "bitmap15",
			src: "img/15.jpg"
		}
    ];
	var queueIndex = new createjs.LoadQueue(false);
    queueIndex.on("complete", handleFileComplete);
	queueIndex.on("progress", handleFileProgress);
	queueIndex.loadManifest(urls);
	
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
	var start=document.getElementById("start");
	var w = canvas.width;
	var h = canvas.height;
	var timer = null;
	var totalTime = 1500;//毫秒
	var step = 40;
	var newStep;
	var stepPerTime = totalTime / step;//更新帧的频率
	
	//areaL:画中画区域 距左边的距离。
	//areaW:画中画区域 的宽度。
	var imgList = [
		{
			id: "bitmap01",
			areaW: 750,
			areaH: 1206,
			areaL: 0,
			areaT: 0,
		},
		{
			id: "bitmap02",
			areaW: 375,
			areaH: 603,
			areaL: 1379,
			areaT: 103,
		},
		{
			id: "bitmap03",
			areaW: 152,
			areaH: 244,
			areaL: 791,
			areaT: 1193,
		},
		{
			id: "bitmap04",
			areaW: 282,
			areaH: 454,
			areaL: 857,
			areaT: 413
		},
		{
			id: "bitmap05",
			areaW: 232,
			areaH: 372,
			areaL: 388,
			areaT: 844
		},
		{
			id: "bitmap06",
			areaW: 187,
			areaH: 300,
			areaL: 359,
			areaT: 1226
		},
		{
			id: "bitmap06_5",
			areaW: 778,
			areaH: 1251,
			areaL: 133,
			areaT: 856
		},
		{
			id: "bitmap07",
			areaW: 278,
			areaH: 446,
			areaL: 794,
			areaT: 783
		},
		{
			id: "bitmap07_5",
			areaW: 938,
			areaH: 1507,
			areaL: 428,
			areaT: 454
		},
		{
			id: "bitmap08",
			areaW: 290,
			areaH: 466,
			areaL: 1276,
			areaT: 665
		},
		{
			id: "bitmap08_5",
			areaW: 782,
			areaH: 1258,
			areaL: 977,
			areaT: 557
		},
		{
			id: "bitmap09",
			areaW: 238,
			areaH: 382,
			areaL: 1206,
			areaT: 2310
		},
		{
			id: "bitmap09_5",
			areaW: 669,
			areaH: 1076,
			areaL: 894,
			areaT: 1608
		},
		{
			id: "bitmap10",
			areaW: 247,
			areaH: 396,
			areaL: 285,
			areaT: 45
		},
		{
			id: "bitmap10_5",
			areaW: 938,
			areaH: 1507,
			areaL: 264,
			areaT: 21
		},
		{
			id: "bitmap11",
			areaW: 434,
			areaH: 698,
			areaL: 1059,
			areaT: 192
		},
		{
			id: "bitmap11_5",
			areaW: 780,
			areaH: 1256,
			areaL: 1038,
			areaT: 679
		},
		{
			id: "bitmap12",
			areaW: 415,
			areaH: 668,
			areaL: 226,
			areaT: 2210
		},
		{
			id: "bitmap12_5",
			areaW: 782,
			areaH: 1258,
			areaL: 356,
			areaT: 1652
		},
		{
			id: "bitmap13",
			areaW: 288,
			areaH: 462,
			areaL: 1494,
			areaT: 528
		},
		{
			id: "bitmap13_5",
			areaW: 782,
			areaH: 1257,
			areaL: 1017,
			areaT: 482
		},
		{
			id: "bitmap14",
			areaW: 99,
			areaH: 160,
			areaL: 1158,
			areaT: 2312
		},
		{
			id: "bitmap15",
			areaW: 469,
			areaH: 753,
			areaL: 1001,
			areaT: 2034
		}
	];
	var img,
		current_img,
		img_num=0;
	var img2,
		next_img;
	
    function handleFileComplete() {
		scaleToFit();
	    setCurrentImg();
	    // 加载完后，隐藏load + 画第一张图
	    context.drawImage(img,
		    0, 0, 750, 1206,
		    0, 0, w, h);
	    document.getElementById("load").style.display="none";
	
	    start.addEventListener("touchstart",function(){
		    timer = setInterval(function () {
			    context.clearRect(0, 0, w, h);
			    var rate = newStep / step;
			    if (rate<0) rate=0;
			    // 核心代码 start
			    context.drawImage(img2,
				    (next_img.areaL) + (0 - next_img.areaL) * (1 - rate),
				    (next_img.areaT) + (0 - next_img.areaT) * (1 - rate),
				    (next_img.areaW) + ( img2.width - next_img.areaW ) * (1 - rate),
				    (next_img.areaH) + ( img2.height - next_img.areaH ) * (1 - rate),
				    0, 0, w, h);
			    // 最后一张图，且快结束时，不画小图
			    if (img_num != imgList.length - 2 || rate > 0.3) {
				    // 750/裁切图片的宽度=缩放的比例
				    // 750/( (next_img.areaW) + ( img2.width - next_img.areaW ) * (1 - rate) )
				    context.drawImage(img,
					    ( next_img.areaL * (1 - rate) )*( 750 /( (next_img.areaW) + ( img2.width  - next_img.areaW ) * (1 - rate) ) ),
					    ( next_img.areaT * (1 - rate) )*( 1206/( (next_img.areaH) + ( img2.height - next_img.areaH ) * (1 - rate) ) ),
					    ( next_img.areaW )*( 750 /( (next_img.areaW) + ( img2.width  - next_img.areaW ) * (1 - rate) ) ),
					    ( next_img.areaH )*( 1206/( (next_img.areaH) + ( img2.height - next_img.areaH ) * (1 - rate) ) )
				    );
			    }
			    // 核心代码 end
			    // if (newStep < step*0.2) {
				 //    newStep=newStep-0.9;
			    // } else {
				 //    newStep--;
			    // }
			
			    newStep--;
			    if (newStep < 0) {
				    img_num++;
				    // 如果是最后一张图就结束
			    	if (img_num >= imgList.length - 1) {
					    console.log('delete');
					    clearInterval(timer);
					    delete(timer);
				    } else {
					    setCurrentImg();
				    }
			    }
		    }, stepPerTime);
	    });
	}

	function handleFileProgress(e) {
    	var progress=Math.floor(e.progress*100);
		// console.log(progress);
		document.getElementById("load").innerHTML=progress+"%";
    }
  	function scaleToFit(){
		var stageWidth =  document.documentElement.clientWidth;
		var stageHeight = document.documentElement.clientHeight;
		if(stageWidth/stageHeight > 0.665)
		{
			// 高度小，以高度缩放
		    var stageScale = stageHeight/(1206/2);
		}
		else
		{
		    var stageScale = stageWidth/(750/2);
		}
		canvas.style.width = 750/2*stageScale + 'px';
		canvas.style.height = 1206/2*stageScale + 'px';
	    document.querySelector(".content").style.width = 750/2*stageScale + 'px';
	    document.querySelector(".content").style.height = 1206/2*stageScale + 'px';
    }

	$(function() {
		start.addEventListener("touchend",function(){
			console.log('delete')
			clearInterval(timer);
			delete(timer);
		});
	});
  	
  	// 设置当前的img
  	function setCurrentImg() {
	    newStep = step;
	    
	    current_img=imgList[img_num];
	    img=queueIndex.getResult(current_img.id);
	    
	    if (img_num < imgList.length - 1) {//这个判断应该用不到，在 if (newStep < 0) 里就先判断了
		    next_img=imgList[img_num+1];
		    img2=queueIndex.getResult(next_img.id);
		    console.log(img2);
	    }
    }
	

}())




