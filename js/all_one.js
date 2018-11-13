//歌曲列表
var Zzx = function(o){
	this.setting     = (typeof o === 'object') ? o : {};
	this.target 	 = this.setting.target || 'newSong';
	this.type        = typeof this.setting.type === 'number' ? this.setting.type : parseInt(this.setting.type);
	this.firstCount  = typeof this.setting.firstCount === 'number' ? this.setting.firstCount : parseInt(this.setting.firstCount);
	this.Count  	 = typeof this.setting.Count === 'number' ? this.setting.Count : parseInt(this.setting.Count);
	this.content     = $("#content");					
	//初始化
	this.init();		
}

Zzx.prototype ={
	init:function(){
		//列表初始化
		this.content.html("");
		//堆栈指针初始化
		this.stack = 0;
		//图片路径
		this.imgPath = 'data/';		
		//定时器
		this.timer = null;			
		//测试JSON数据（可以替换为AJAX请求返回值）
		this.testJson = {
						list:[
							
								{src:"cover.jpg",title:"01.张大春,第一课,看懂甲骨文",song:"001"},
								{src:"cover.jpg",title:"02.张大春,第二课,如何阅读李白",song:"002"},
								{src:"cover.jpg",title:"03.张大春,第三课,疑是？",song:"003"},
								{src:"cover.jpg",title:"04.张大春,第四课,大明湖畔",song:"004"},
								{src:"cover.jpg",title:"05.张大春,第五课,甲骨文里的“合群”",song:"005"},
								{src:"cover.jpg",title:"06.张大春,第六课,驴友李白",song:"006"},
								{src:"cover.jpg",title:"07.张大春,课后回顾1",song:"007"},
								{src:"cover.jpg",title:"08.张大春,课后回顾2",song:"008"},
								{src:"cover.jpg",title:"09.江南,第一课,认识江南,认识兴国",song:"009"},
								{src:"cover.jpg",title:"10.江南,第二课,荆轲刺秦王,1",song:"010"},
								{src:"cover.jpg",title:"11.江南,第三课,荆轲刺秦王,2",song:"011"},
								{src:"cover.jpg",title:"12.江南,第四课,荆轲刺秦王,3",song:"012"},
								{src:"cover.jpg",title:"13.江南,第四课,荆轲刺秦王,4",song:"013"},
								{src:"cover.jpg",title:"14.江南,第四课,荆轲刺秦王,5",song:"014"},
								{src:"cover.jpg",title:"15.江南,第四课,荆轲刺秦王,6",song:"015"},
								{src:"cover.jpg",title:"16.江南,第四课,荆轲刺秦王,7",song:"016"},
								{src:"cover.jpg",title:"17.江南,第四课,荆轲刺秦王,8",song:"017"},
								{src:"cover.jpg",title:"18.江南,第十课,让我们奋勇向前",song:"018"},
								{src:"cover.jpg",title:"19.江南,兴国县非物质文化遗产,木偶戏",song:"019"},
								{src:"cover.jpg",title:"20.江南,兴国县非物质文化遗产,端戏",song:"020"},
								{src:"cover.jpg",title:"21.泰武小学Rap,创作,中国新说唱",song:"021"},
								{src:"cover.jpg",title:"22.孟非,台湾泰武小学,百年古谣",song:"022"},
								{src:"cover.jpg",title:"23.孟非,台湾泰武小学,第一课,李白的朋友圈",song:"023"},
								{src:"cover.jpg",title:"24.孟非,台湾泰武小学,第二课,驴友李白游历图",song:"024"},
								{src:"cover.jpg",title:"25.冯仑,鼻头小学,第一课,胡适的教育观",song:"025"},
								{src:"cover.jpg",title:"26.冯仑,鼻头小学,第二课,该打就打",song:"026"},
								{src:"cover.jpg",title:"27.冯仑,鼻头小学,第三课,我的成功来自写作",song:"027"},
								{src:"cover.jpg",title:"28.母亲的教诲-胡适,王凡朗诵",song:"028"},
								{src:"cover.jpg",title:"29.冯仑,财富的背面",song:"029"},
								{src:"cover.jpg",title:"30.冯仑思考,两岸文化的异同",song:"030"},
								{src:"cover.jpg",title:"31.于丹 课一 汉字解读",song:"031"},
								{src:"cover.jpg",title:"32.于丹 课二 田园诗人",song:"032"},
								{src:"cover.jpg",title:"33.于丹 课三 糟糕的精粮",song:"033"},
								{src:"cover.jpg",title:"34.于丹 课四 行家写作123",song:"034"},
								{src:"cover.jpg",title:"35.于丹 课五 家中的米香",song:"035"},
								{src:"cover.jpg",title:"36.于丹 健全人格从付出与爱开始",song:"036"},
								{src:"cover.jpg",title:"37.于丹 时间长廊里的台湾-主食的消失",song:"037"},
								{src:"cover.jpg",title:"38.于丹 该有的样子",song:"038"},
								{src:"cover.jpg",title:"39.意外惊喜 鲁语版 鹿鸣 ",song:"039"},
								{src:"cover.jpg",title:"40.张悦然 中考必考词牌名",song:"040"},
								{src:"cover.jpg",title:"41.张悦然 遗忘的皇帝 流传的佳句",song:"041"},
								{src:"cover.jpg",title:"42.悦然 虞美人",song:"042"},
								{src:"cover.jpg",title:"43.张悦然 荒漠意象",song:"043"},
								{src:"cover.jpg",title:"44.张悦然 最后一片落叶 人性里的真、善、美",song:"044"},
								{src:"cover.jpg",title:"45.麦家 黄公望里的百草园",song:"045"},
								{src:"cover.jpg",title:"46.麦家 二十二个烦恼",song:"046"},
								{src:"cover.jpg",title:"47.麦家 祠堂 接天接地",song:"047"},
								{src:"cover.jpg",title:"48.麦家 到三味书屋",song:"048"},
								{src:"cover.jpg",title:"49.麦家 从百草园讲起",song:"049"},
								{src:"cover.jpg",title:"50.麦家 从福尔斯密码开始",song:"050"},
								{src:"cover.jpg",title:"51.麦家 我的故乡",song:"051"},
								{src:"cover.jpg",title:"52.王洛勇 《狼》",song:"052"},
								{src:"cover.jpg",title:"53.王洛勇 百老汇的动物",song:"053"},
								{src:"cover.jpg",title:"54.蒋雯丽 镖局飘出夕会歌",song:"054"},
								{src:"cover.jpg",title:"55.蒋雯丽 中国最古老的文庙",song:"055"},
								{src:"cover.jpg",title:"56.蒋雯丽 《祖父的园子》解读",song:"056"},
								{src:"cover.jpg",title:"57.蒋雯丽 《祖父的园子》",song:"057"},
								{src:"cover.jpg",title:"58.蒋雯丽 我们的祖先",song:"058"},
								{src:"cover.jpg",title:"59.刘谦 成为魔术师",song:"059"},
								{src:"cover.jpg",title:"60.刘谦 疑邻盗斧",song:"060"},
								{src:"cover.jpg",title:"61.刘谦 长城内外",song:"061"},
								{src:"cover.jpg",title:"62.刘谦 不应该知道的秘密",song:"062"}
							]
						}
		this.createList(true);
		this.addHandle();
	},
	
	//创建内容列表
	createList:function(boolen){		
		//boolen:true/false确定是否初次载入，
		this.ulNode = document.createElement("ul");
		this.ulNode.id = this.target+"list";
		this.content.append(this.ulNode);
		this.ulTarget = $("#"+this.ulNode.id);
		this.createMore();
		this.loadList(boolen);
	},
	
	//创建更多按钮
	createMore:function(){	
		this.moreNode = document.createElement("div");
		this.moreNode.className = 'm';
		this.moreNode.innerHTML = '更多';
		this.moreNode.id = this.target+'more';
		this.moreTarget = $("#"+this.moreNode.id);
	},
	
	//加载列表	
	loadList:function(boolen){		
		var oList = this.testJson.list;
		var oLength;		
		if(boolen){  //计算加载歌曲数
			oLength = oList.length > this.firstCount ? this.firstCount: oList.length;			
		}else{
			oLength = (oList.length-this.stack) > this.Count ? this.Count: (oList.length-this.stack);				
		}	
		if(oLength<=0){
			this.moreTarget.text("这是最后一页了！");
		};
		
		if(!this.moreTarget[0]){
			this.content.append(this.moreNode);				
		};
		
		for(var i = 0 ; i < oLength ; i++){				
			this.loadDate(oList);
		}
		
	},
	
	//加载列表数据	
	loadDate:function(oList){			
		switch(this.type){  
			//根据不同的模块 定制不同的数据展示形式
			/*case 1:this.ulTarget.append('<li onclick="myControl.selectList(this,'+this.stack+')">'
									  + '<div class="frmPlay"><i></i></div>'
									  + '<span style="display:none;" class="musicData" pic='+oList[this.stack].src+' title='+oList[this.stack].title+' value='+oList[this.stack].song+'></span>'
									  + '<div class="l"><img class="picStyle" src="'+this.imgPath+oList[this.stack].src+'"/></div>'
									  + '<div class="textBox">'+oList[this.stack].title+'<p>金沙-他不爱我</p></div>'
									  + '</li>');*/
			case 1:this.ulTarget.append('<li onclick="myControl.selectList(this,'+this.stack+')">'
									  + '<div class="frmPlay"><i></i></div>'
									  + '<span style="display:none;" class="musicData" pic='+oList[this.stack].src+' title='+oList[this.stack].title+' value='+oList[this.stack].song+'></span>'
										
									  + '<div class="textBox">'+oList[this.stack].title+'</div>'
									  + '</li>');
										break;
			case 2:this.content[0].innerHTML  = '此模块建设中...';
										break;
			default :alert("该模块出错！");
		}
		this.stack+=1;
	},
	
	//绑定事件
	addHandle:function(){
		var that = this;
		$("#"+this.moreNode.id).bind('click',function(){
			//加载更多列表
			that.createList(false);
		});
	}
	
}
//播放器控制面板	
var Control = function(o){
	this.setting         = (typeof o === 'object')? o : {};		
	this.audio           = this.setting.audio;
	this.progressWrap    = this.setting.progressWrap;
	this.playModeNode    = this.setting.playModeNode;
	this.playBtn         = this.setting.playBtn;
	this.playTitle       = this.setting.playTitle;
	this.singerHead      = this.setting.singerHead;
	this.progress        = this.setting.progress;
	this.oWinObj         = this.setting.oWinObj;
	this.allTimeNode     = this.setting.allTimeNode;	  
	this.currentTimeNode = this.setting.currentTimeNode;  
	this.path            = 'http://phen2jfhx.bkt.clouddn.com/';  //歌曲路径（相对于html）
	this.imgPath         = 'data/';   //图片路径（相对于html）
	this.init();
}

Control.prototype = {	
	//初始化
	init:function(){
		//播放控制	
		this.start = true;
		//定时器
		this.timer = null;				
		this.audio.src = null;			
		//可选播放模式
		this.ModeData = [
			{mode:'default',text:'顺序播放模式'},
			{mode:'random',text:'随机播放模式'},
			{mode:'single',text:'单曲循环模式'}
		];
		//默认播放模式
		this.ModeIndex = 0;
		this.playMode = this.ModeData[this.ModeIndex].mode;	
	},
	
	//选择歌曲列表
	selectList:function(_this,stack){	
		var allow = true;
		var index = null;
		this.oLi = _this;
		this.oUl = _this.parentNode;	
		if(index == stack && !this.start ){
			allow = false;
		}
		index = stack;
		this.loadMusic();
		if(allow){
			this.goPlay();
		}else{
			this.goPause();
		}											
	},
	
	//上一首
	prev:function(){
		if(this.oLi.previousSibling!=null){	
			this.oLi = this.oLi.previousSibling;
			this.loadMusic();
		}else{
			this.oWindow("已经是第一首了哦！");
		}
		this.goPlay();
	},
	
	//主控
	mainControl:function(){
		if(this.start){
			this.goPlay();
		}else{
			this.goPause();
		}	
	},
	
	//下一首
	next:function(){
		if(this.oLi.nextSibling!=null){
			this.oLi = this.oLi.nextSibling;
			this.loadMusic();
		}else{
			this.oWindow("已经是最后一首了哦！")
		}
		this.goPlay();
	},
	
	//播放模式选择
	selectMode:function(){
		this.ModeIndex = (this.ModeIndex<(this.ModeData.length-1))?(this.ModeIndex+1):0;
		this.playMode = this.ModeData[this.ModeIndex].mode;
		this.oWindow(this.ModeData[this.ModeIndex].text);
		this.playModeNode.attr("class","mode-"+this.playMode);
	},
	
	//播放进度选择
	selectTime:function(event){
		var moveTo = event.pageX - this.progressWrap.offset().left;
		this.audio.currentTime = moveTo/parseInt(this.progressWrap.css("width"))*this.audio.duration;
		this.progress.css("width",moveTo+"px");
	},
	
	//自动播放
	autoPlay:function(){
		//监听歌曲结束
		var that = this;
		this.audio.addEventListener('ended', function () {
			if(typeof that.playMode==='string')
			{	//播放模式判断	
				switch(that.playMode){
					case 'default': that.oLi = (that.oLi.nextSibling!=null)?that.oLi.nextSibling:that.oUl.childNodes[0];
									break;
					 case 'random': that.oLi = that.oUl.childNodes[Math.round(Math.random()*(that.oUl.childNodes.length-1))];
									break;
					 case 'single': ;
						   default: ;
				}
				that.loadMusic();
				that.goPlay();
			}else{
				that.oWindow("循环类型不符!");		
			}
		},false);
	},
	
	//加载要播放的歌曲
	loadMusic:function(){
			$obj = $(this.oLi)
			var song = $obj.find(".musicData").attr("value");	
			var pic = $obj.find(".musicData").attr("pic");
			var title = $obj.find(".musicData").attr("title");
			this.singerHead.attr("src",this.imgPath + pic)
			this.audio.src = this.path + song +'.m4a';
			this.playTitle.html(title);
	},
	
	//判断当前是否歌曲列表
	songReady:function(){
		if(!this.audio.src){
			this.oWindow("请先选择歌曲！")
			return false;
		}else{
			return true;
		}
	},
	
	//转换为时间格式
	timeDispose:function (number) {
		var minute = parseInt(number / 60);
		var second = parseInt(number % 60);
		minute = minute >= 10 ? minute : "0" + minute;
		second = second >= 10 ? second : "0" + second;
		return minute + ":" + second;
	},	
	
	//自定义提示框
	oWindow:function(oText){
		this.oWinObj.show();
		this.oWinObj.html(oText);
		var doc = document.documentElement;
		var oWinX = (doc.clientWidth - this.oWinObj[0].offsetWidth)/2;
		var oWinY = (doc.clientHeight - this.oWinObj[0].offsetHeight-50)/2;
		this.oWinObj.css('left',oWinX+'px');
		this.oWinObj.css('top',oWinY+'px');
		var _this = this;
		setTimeout(function(){_this.oWinObj.hide();},1000)
	},
	
	//播放时间
	oTime:function(){
		if(this.audio.readyState >=4){
			var currentProgress = Math.round(this.audio.currentTime/this.audio.duration*parseInt(this.progressWrap.css("width")));
			this.progress.css("width",currentProgress+"px");
			this.allTimeNode.html(this.timeDispose(this.audio.duration));
			this.currentTimeNode.html(this.timeDispose(this.audio.currentTime));
		}
	},
	
	//播放
	goPlay:function(){
		if(this.songReady()){		
			this.audio.play();
			var _this = this;
			this.goPlayStyle();
			this.timer = setInterval(function(){_this.oTime()},1000)
			this.start = false;
			this.autoPlay();
		}
	},
	
	//暂停
	goPause:function(){
		this.audio.pause();
		this.goPauseStyle();
		clearInterval(this.timer);
		this.start = true;
	},
	
	//播放样式
	goPlayStyle:function(){
		var $oLiIndex = $(this.oLi);
		$(".frmPause").removeClass("frmPause");
		$oLiIndex.find(".frmPlay").addClass("frmPause");				
		this.playBtn.addClass("pause");
		this.playBtn.removeClass("play");
	},
	
	//暂停样式
	goPauseStyle:function(){
		var $oLiIndex = $(this.oLi);
		$(".frmPause").removeClass("frmPause");
		this.playBtn.addClass("play");
		this.playBtn.removeClass("pause");	
	}			
}

function ZzxMusic(){

	var aa={};
	//模块设置
	var setting = {
		newSong:{'target':'newSong','type':'1','firstCount':10,'Count':10},
		songCharts:{'target':'newSong','type':'1','firstCount':2,'Count':4},
		singer:{'target':'newSong','type':'1','firstCount':8,'Count':7},
		radioStation:{'target':'newSong','type':'1','firstCount':9,'Count':2}
	};
	
	//默认加载模块
	aa.newSong = new Zzx(setting.newSong);	
	
	//模块初始化
	$(".menu_tagList").children("li").bind('click',function(){
		for(var i in setting){
			if($(this).attr("id")==i){
				if(typeof aa[i]==='undefined'){
					aa[i] = new Zzx(setting[i]);
				}else{
					aa[i].init();
				}				
			}
		}
		$(".menu_hover").removeClass("menu_hover");
		$(this).addClass("menu_hover");
	})		
}

//实例化控制台
var myControl = new Control({
			 audio : document.getElementById("myMusic"), //播放器
	  playModeNode : $("#modeButton"),	 //模式选择按钮
		   playBtn : $("#playButton"),   //主控按钮
		 playTitle : $("#musicTitle"),   //歌曲TITLE容器
		singerHead : $("#singerHead"),   //歌曲插图容器
	  progressWrap : $("#progressWrap"), //歌曲进度条容器
		  progress : $("#progress"),     //歌曲进度条
		   oWinObj : $("#oWindow"),		 //警告窗容器
	   allTimeNode : $("#totleTime"),    //当前时间容器
   currentTimeNode : $("#currentTime")   //当前时间容器
});	

ZzxMusic();	
