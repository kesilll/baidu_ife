var data = [];
function deleteItem(){
	var container = document.getElementById("container");
	var i;
	if((i = data.indexOf(this)) != -1){
		delete data[i];
	}
	render();
}

function removeAll(){
	var container = document.getElementById("container");
	var len = container.children.length;
	var i;
	for(i=0;i<len;i++){
		container.removeChild(container.firstChild);
	}
}

function render(){
	data.sort(function(x,y){
		var val1 = parseInt(x.firstChild.innerHTML,10);
		var val2 = parseInt(y.firstChild.innerHTML,10)
		return val1 - val2;
	});
	removeAll();
	//重新渲染排序后的数据
	var container = document.getElementById("container");
	var len = data.length;
	var i;
	for(i=0;i<len;i++){
		container.appendChild(data[i]);
	}
}

function LeftInHnadler(){
	var container = document.getElementById("container");
	var childNum = container.children.length;
	if(childNum >= 60){
		alert("已经超过60个");
	}else{
		var val = Number(document.getElementById("text_input").value);
		var newP = document.createElement("p");
		var newContext = document.createElement("span");
		newContext.innerHTML = val;
		newP.appendChild(newContext);
		newP.setAttribute("class","item");
		newP.style.height= val+"px";
		newP.style.lineHeight= val+"px";
		newP.addEventListener("click",deleteItem,false);
		data.push(newP);
		render();
	}
}
function Add(){
	var container = document.getElementById("container");
	var childNum = container.children.length;
	if(childNum >= 60){
		alert("已经超过60个");
	}else{
		var val = Number(document.getElementById("text_input").value);
		var newP = document.createElement("p");
		var newContext = document.createElement("span");
		newContext.innerHTML = val;
		newP.appendChild(newContext);
		newP.setAttribute("class","item");
		newP.style.height= val+"px";
		newP.style.lineHeight= val+"px";
		newP.addEventListener("click",deleteItem,false);
		data.push(newP);
		render();
	}
}

function LeftOutHandler(){
	var container = document.getElementById("container");
	var childNum = container.children.length;
	if(childNum <= 0){
		alert("没有内容可以删除");
	}else{
		delete data[0];
		render();
	}
}

function RightOutHandler(){
	var container = document.getElementById("container");
	var childNum = container.children.length;
	if(childNum <=0 ){
		alert("没有内容可以删除");
	}else{
		delete data[data.length-1];
		render();
	}
}

function init(){
	//绑定按钮事件
	var addBtn = document.getElementById("add");
	var left_outBtn = document.getElementById("left_output");
	var right_outBtn = document.getElementById("right_output");
	addBtn.addEventListener("click",Add,false);
	left_outBtn.addEventListener("click",LeftOutHandler,false);
	right_outBtn.addEventListener("click",RightOutHandler,false);
	//检测浏览器兼容性,IE9之前不支持indexOf方法
	if(!Array.indexOf){
		Array.prototype.indexOf = function(el){
			for(var i=0,n=this.length;i<n;i++){
				if(this[i] === el){
					return i;
				}
			}
			return -1;
		};
	}
}

init();
