/*数据格式演示
var aqiSourceData = {
	"北京":{
		"2016-01-01":10, 
		"2016-01-02":10,
		"2016-01-03":10,
		"2016-01-04":10
	}
}
*/
var EventUtil = {
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler;
		}
	},
	removeHandler : function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.dettachEvent){
			element.dettachEvent("on"+type,handler);
		}else{
			element["on"+type] = null;
		}
	}
};
//以下两个函数用于生成随机测试数据
function getDataStr(dat){
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;  //日期+1
	m = m<10? '0'+m:m;
	var d = dat.getDay();
	d = d<10? '0'+d:d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed){
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	for(var i = 1;i<92;i++){  //生成92天的数据
		datStr = getDataStr(dat);
		returnData[datStr] = Math.ceil(Math.random()*seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京":randomBuildData(500),
	"上海":randomBuildData(300),
	"广州":randomBuildData(200),
	"深圳":randomBuildData(100),
	"成都":randomBuildData(300),
	"西安":randomBuildData(500),
	"福州":randomBuildData(100),
	"厦门":randomBuildData(100),
	"沈阳":randomBuildData(500)
};
//用于渲染图标的数据
var chartData = {};
//记录当前页面的表单选项
var pageState = {
	nowSelectCity:0,
	nowGraTime:"day"
}

/*渲染图表*/
function randomColor(i){
	switch(i){
		case 0:return "red";
		break;
		case 1:return "blue";
		break;
		case 2:return "yellow";
		break;
		case 3:return "gray";
		break;
	}
}
function renderChart(){
	var gratime = pageState["nowGraTime"];
	var chart = document.getElementById("aqi-chart-wrap");
	var max = chart.children.length;
	var i;
	for(i=0;i<max;i++){
		chart.removeChild(chart.firstChild);
	}
	switch(gratime){
		case "day":
			var sum = 0;
			for(var i=1;;i++){
				if(chartData[i+"day"] == undefined) break;
				else{
					sum += chartData[i+"day"];
				}
			}
			for(var i=1;;i++){
				if(chartData[i+"day"] == undefined) break;
				else{
					var ratio = parseFloat(chartData[i+"day"].toString())/sum;
					var height = ratio*4000;
					var mydiv = document.createElement("div");
					mydiv.style.background = randomColor(Math.ceil(Math.random()*3));
					mydiv.setAttribute("class","day");
					mydiv.style.height = height;
					chart.appendChild(mydiv);
				}
			}
		break;
		case "week":
			var sum = 0;
			for(var i=1;;i++){
				if(chartData[i+"week"] == undefined) break;
				else{
					sum += chartData[i+"week"];
				}
			}
			for(var i=1;;i++){
				if(chartData[i+"week"] == undefined){
					 break;
				}else{
					var ratio = parseFloat(chartData[i+"week"].toString())/sum;
					var height = ratio*1000;
					var mydiv = document.createElement("div");
					mydiv.style.background = randomColor(Math.ceil(Math.random()*3));
					mydiv.setAttribute("class","week");
					mydiv.style.height = height;
					chart.appendChild(mydiv);
				}
			}
		break;
		case "month":
			var sum = 0;
			for(var i=1;;i++){
				if(chartData[i+"month"] == undefined) break;
				else{
					sum += chartData[i+"month"];
				}
			}
			for(var i=1;;i++){
				if(chartData[i+"month"] == undefined) break;
				else{
					var ratio = parseFloat(chartData[i+"month"].toString())/sum;
					var height = ratio*2000;
					var mydiv = document.createElement("div");
					mydiv.style.background = randomColor(Math.ceil(Math.random()*3));
					mydiv.setAttribute("class","month");
					mydiv.style.height = height;
					chart.appendChild(mydiv);
				}
			}
		break;
	}
}

//日、月、周的radio事件点击时的处理函数
function graTimeChange(){
	//确定选项是否发生变化
	var city_select = document.getElementById("city-select");
	var inp = document.getElementsByTagName("input");
	var len = inp.length;
	var i;
	for(i=0;i<len;i++){
		if(inp[i].checked) break;
	}
	if(!(inp[i].value == pageState["nowGraTime"])){
		pageState["nowGraTime"] = inp[i].value;
	}
	//设置对应数据
	var city = city_select.children[pageState["nowSelectCity"]].value;
	switch(pageState["nowGraTime"]){
		case "day":
			var k = 0;
			for(var prop in aqiSourceData[city]){
				k++;
				chartData[k+"day"] = aqiSourceData[city][prop];
			}
			break;
		case "week":
			var k = 0;
			var num = 0;
			var sum = 0;
			for(var prop in aqiSourceData[city]){
				sum += aqiSourceData[city][prop];
				k++;
				if(k % 7 == 0){
					num ++;
					chartData[num+"week"] = sum;
					sum = 0;
				}
			}
			if(sum != 0){
				num++;
				chartData[num+"week"] = sum;
			}
			break;
		case "month":
			var k = 0;
			var num = 0;
			var sum = 0;
			for(var prop in aqiSourceData[city]){
				sum += aqiSourceData[city][prop];
				k++;
				if(k % 31 == 0){
					num ++;
					chartData[num+"month"] = sum;
					sum = 0;
				}
			}
			if(sum != 0){
				num++;
				chartData[num+"month"] = sum;
			}
			break;
	}
	//调用图表渲染函数
	renderChart();
}

//select 发生变化时的处理函数
function citySelectChange(){ 	
	//确定是否选项发生变化
	var city_select = document.getElementById("city-select");
	var len = city_select.length;
	var i;
	for(i=0;i<len;i++){
		if(city_select.children[i].selected) break;
	}
	if(!(i == pageState["nowSelectCity"])){
		pageState["nowSelectCity"] = i;
	}
	//设置对应数据
	var city = city_select.children[pageState["nowSelectCity"]].value;
	switch(pageState["nowGraTime"]){
		case "day":
			var k=0;
			for(var prop in aqiSourceData[city]){
				k++;
				chartData[k+"day"] = aqiSourceData[city][prop];
			}
			break;
		case "week":
			var k = 0;
			var num = 0;
			var sum = 0;
			for(var prop in aqiSourceData[city]){
				sum += aqiSourceData[city][prop];
				k++;
				if(k % 7 == 0){
					num ++;
					chartData[num+"week"] = sum;
					sum = 0;
				}
			}
			if(sum != 0){
				num++;
				chartData[num+"week"] = sum;
			}
			break;
		case "month":
			var k = 0;
			var num = 0;
			var sum = 0;
			for(var prop in aqiSourceData[city]){
				sum += aqiSourceData[city][prop];
				k++;
				if(k % 31 == 0){
					num ++;
					chartData[num+"month"] = sum;
					sum = 0;
				}
			}
			if(sum != 0){
				num++;
				chartData[num+"month"] = sum;
			}
			break;
	}
	//调用图表渲染函数
	renderChart();
}
//初始化日、月、周的radio事件,当被点击时，调用函数graTimeChange
function initGraTimeForm(){
	var inp = document.getElementsByTagName("input");
	var len = inp.length;
	var i;
	for(i=0;i<len;i++){
		inp[i].addEventListener("change",graTimeChange,false);
	}
}

//初始化城市Select下拉列表的选项
function initCitySelector(){
	//读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var city_select = document.getElementById('city-select');
	var opt;
	for(var prop in aqiSourceData){
		opt = document.createElement("option");
		opt.appendChild(document.createTextNode(prop));
		city_select.appendChild(opt);
	}
	//给select设置事件，当选项发生变化时调用函数citySelectChange
	city_select.addEventListener("change",citySelectChange,false);
}

//初始化图表所用到的数据格式
function initAqiChartData(){
	//将原始的源数据处理成图表所需要的数据格式
	//处理好的数据存到chartData中
}

function init(){
	initCitySelector();
	initGraTimeForm();
}
init();
