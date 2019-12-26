var Cloud = (function(){

	var cloud = {};
	cloud.client = null;
	cloud.datastoreManager = null;
	cloud.datastore = null;
	cloud.ip = null;

	cloud.init = function(){
	};

	cloud.errorHandler = function (jqXHR, exception) {
	    if (jqXHR.status === 0) {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Not connected.\n Verify Network.");
	    } else if (jqXHR.status == 404) {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Requested page not found. [404]");
	    } else if (jqXHR.status == 500) {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Internal Server Error [500].");
	    } else if (exception === 'parsererror') {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Requested JSON parse failed.");
	    } else if (exception === 'timeout') {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Time out error.");
	    } else if (exception === 'abort') {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Ajax request aborted.");
	    } else {
	    	Utils.hidOverlay();
			Messages.showActionMessage("Error","Uncaught Error.\n" + jqXHR.responseText);
	    }
	};

	function requestHandler(successHandler)
	{
		Utils.showOverlay();
	}

	function responseHandler(res)
	{
		Utils.hidOverlay();
		//cloud.successHandler(res);
	}

	cloud.sendSuccessHandler = function(url, data, successHandler){

		requestHandler(successHandler);

		$.ajax({
			type: "POST",
			crossDomain:true,
			url: Config.SERVICE_URL + url,
			data: data,
			success: function(res){
				responseHandler();
				successHandler(res);
			},
			error: Cloud.errorHandler,
			contentType: "application/json",
			dataType: "json",
			async:   true
		});
	};

	cloud.sendSuccessHandlerNo = function(url, data, successHandler){

		//requestHandler(successHandler);

		$.ajax({
			type: "POST",
			crossDomain:true,
			url: Config.SERVICE_URL + url,
			data: data,
			success: function(res){
				//responseHandler();
				successHandler(res);
			},
			error: Cloud.errorHandler,
			contentType: "application/json",
			dataType: "json",
			async:   true
		});
	};


	return cloud;
}());
