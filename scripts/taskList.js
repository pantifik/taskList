$(document).ready(function(){

taskManager();

 function taskManager(){

	////////////////   #TODO  /////////////////////////////
	// 1 Добавлять не только li, а полность весь менеджер//
	// 2 Добавить сисек чтоб было красиво(bootstrap)     // 
	///////////////////////////////////////////////////////

 	/*	taskArray	[0: {value: "aaaa",
					attribute: "new"
					}
			  	1: {value: "aaaa",
					attribute: "new"
					}
				]*/

var taskArray;

	if (localStorage.taskArray != "undefined") {

		taskArray = JSON.parse(localStorage.taskArray);

		for (var i = 0; taskArray.length > i; i++) {
			showTask(taskArray[i].value, taskArray[i].attribute);
		  
		}

	}else{

		taskArray = [];

	}

		$("article").on("click", "button", function(){
		
	if ( $(this).hasClass("add") ) {
	  return saveTask( clickAddButton() );
	}

	if ( $(this).hasClass("completed") ) {
	  return saveTask( clickCompletedButton(this) );
	}

	if ( $(this).hasClass("del") ) {
	  return saveTask( clickDelButton(this) );
	}

	console.log("fail")
	})


	function supportsStorage() {

		try {
		  return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
		  return false;
		}
		
	}

	function saveTask(arr) {

		if ( !supportsStorage() ) {
		return false;
		}

		localStorage.taskArray = JSON.stringify(arr);

	}
 	
 
 	function showTask(value, attr){
 
 		var a;
    if (attr) {
      a = "<li class=\"" + attr + "\">" + value + "<br><div class=\"btn-group\"><button class=\"completed btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-ok\"></span> Выполнено</button><button class=\"del btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-remove\"></span> Удалить</button></div></li>";
    }else{
    	a = "<li>" + value + "<br><div class=\"btn-group\"><button class=\"completed btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-ok\"></span> Выполнено</button><button class=\"del btn btn-default btn-xs\"><span class=\"glyphicon glyphicon-remove\"></span> Удалить</button></div></li>";
    }
 		return $(".js-task-list").append(a);
 
 	}
  
 
 	function clickCompletedButton(param){
 
 		$(param).parents("li").addClass("completed-task");
 		var taskNumber = $(param).parents("li").index();
 
 		taskArray[taskNumber].attribute = "completed-task";
    return taskArray;
 
 	}
  
 
 	function clickDelButton(param){
 		console.log($(param).parents("li"))
 		taskArray.splice($(param).parents("li").index(), 1);
 		$(param).parents("li").remove();
    return taskArray;
 
 	}
 
 
 	function clickAddButton(){
 
 		var task = $(".js-new-task").val();
 		if ( !task ){
 			return;
 		}
 
 		var valueArr = {
 						value: task,
 					    attribute: "new"
 					};
 		$(".js-new-task").val(null);
 		taskArray.push(valueArr);
 		showTask(valueArr.value);
    return taskArray;
 
 	}
  
 }
 
})