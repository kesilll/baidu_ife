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
function deleteItem(){
	var container = document.getElementById("container");
	container.removeChild(this);
}
function LeftInHnadler(){
	var container = document.getElementById("container");
	var val = Number(document.getElementById("text_input").value);
	var newP = document.createElement("p");
	var newContext = document.createElement("span");
	newContext.innerHTML = val;
	newP.append(newContext);
	newP.setAttribute("class","item");
	newP.addEventListener("click",deleteItem,false);
	container.insertBefore(newP,container.firstChild);
}
function RightInHandler(){
	var container = document.getElementById("container");
	var val = Number(document.getElementById("text_input").value);
	var newP = document.createElement("p");
	var newContext = document.createElement("span");
	newContext.innerHTML = val;
	newP.append(newContext);
	newP.setAttribute("class","item");
	newP.addEventListener("click",deleteItem,false);
	container.append(newP);
}

function LeftOutHandler(){
	var container = document.getElementById("container");
	container.removeChild(container.firstChild);
}

function RightOutHandler(){
	var container = document.getElementById("container");
	container.removeChild(container.lastChild);
}
function init(){
	//绑定按钮事件
	var left_inBtn = document.getElementById("left_input");
	var right_inBtn = document.getElementById("right_input");
	var left_outBtn = document.getElementById("left_output");
	var right_outBtn = document.getElementById("right_output");
	left_inBtn.addEventListener("click",LeftInHnadler,false);
	right_inBtn.addEventListener("click",RightInHandler,false);
	left_outBtn.addEventListener("click",LeftOutHandler,false);
	right_outBtn.addEventListener("click",RightOutHandler,false);
}

init();
