var Links = (function(){

	var links2 = {};

	links2.link = [];

	links2.createLink = function()
	{
		var json = Utils.getFields("Create-link","formfields");

		var data = {};

		if(!json.validate)
			return;

		data = json.json;
		
		Links.create(data);
	}


	links2.create = function(data)
	{
		Cloud.sendSuccessHandler(Config.CREATE_LINK_URI, JSON.stringify(data), function(success){

				$(".modal").modal("hide");
				Links.getAllUsers();


		});
	}



}());
