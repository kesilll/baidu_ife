/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
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
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city,aqi) {
	aqiData[city] = aqi;
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,'');
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var i,max,list;
	list = document.getElementById("aqi-table");
	//删除列表
	var list_row = list.children;
	max = list_row.length;
	for(i=1;i<max;i++){
		list.removeChild(list.lastChild);
	}
	for(var prop in aqiData){
		var tab = document.getElementById("aqi-table");
		var  row = document.createElement("tr");
		//三个单元格要显示的内容
		var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(prop));
		var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(aqiData[prop]));
		var cell3 = document.createElement("td");
		var b = document.createElement("button");
		b.appendChild(document.createTextNode("删除"));
		EventUtil.addHandler(b,"click",delBtnHandle);
		cell3.appendChild(b);
		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		tab.appendChild(row);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  var pattern1 = /^[\u4e00-\u9fa5a-zA-Z\/\(\)]+$/;
  var pattern2 = /^[1-9][0-9]*$/
  var user_input_city = document.getElementById("aqi-city-input");
  var user_input_aqi = document.getElementById("aqi-value-input");
  var city = user_input_city.value+"";
  var aqi = user_input_aqi.value+"";
  city = city.trim();
  aqi = aqi.trim();
  var deleteElem = document.getElementsByClassName("alert");
  if(!(pattern1.test(city)) || !(pattern2.test(aqi))){
  	if(pattern1.test(city)){
  		alert("输入由中英文组成的城市名");
  	}else{
  		alert("请输入整数");
  	}
	return;
  }
  addAqiData(city,aqi);
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
var del = this.parentNode.parentNode.firstChild.innerHTML;
delete aqiData[del];
  renderAqiList();
}

function init() {
    var addBtn = document.getElementById("add-btn");
    EventUtil.addHandler(addBtn,"click",addBtnHandle);
	var deleteBtn = document.querySelectorAll("aqi_table>button");
}

init();