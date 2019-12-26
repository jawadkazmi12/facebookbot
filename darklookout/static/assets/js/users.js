var Users = (function(){

	var user = {};

	user.users = [];

	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	user.login = function()
	{

		var email = $("#email").val();
		var password = $("#password").val();

		if(email.trim() == "" && password.trim() == "")
		{
			return;
		}

		var data = {
			email:email,
			password:password
		}

		document.cookie = "userEmail="+email;

		Cloud.sendSuccessHandler(Config.VERIFY_USER_URI, JSON.stringify(data), function(success){
			console.log(success);
			var users = JSON.parse(success.users);
			if(users.length != 0)
			{
				window.location = "../";
				document.cookie = "user="+success.users;
			}
			else
			{
				document.cookie = "userEmail=";
				alert("Wrong credentials");
			}
		});

	}

	user.sendNotification = function(admin)
	{
		
		if(typeof admin != "undefined" && admin == true){
			var userData = JSON.parse(Utils.getCookie("user"));
			var userName = userData[0].fields.name;

			var data = {
				title:"Attention! Bot Started",
				message:"Bot started by: "+userName
			}

			Cloud.sendSuccessHandler(Config.SEND_ADMIN_NOTIFICATION_URI, JSON.stringify(data), function(success){
				console.log(success);
			});

		}
		else
		{
			var data = {
				title:"Attention! Bot Updated",
				message:"Click on Start Bot Button to start Bot."
			}

			Cloud.sendSuccessHandler(Config.SEND_NOTIFICATION_URI, JSON.stringify(data), function(success){
				console.log(success);
			});
		}
		
	}

	user.getNotifications = function()
	{
		var userData = JSON.parse(Utils.getCookie("user"));
		var userType = userData[0].fields.userType;
		if(userType != "ADMIN"){
			var data = {};
			Cloud.sendSuccessHandler(Config.GET_NOTIFICATION_URI, JSON.stringify(data), function(success){
					console.log(success);
					var notifications = JSON.parse(success.response);

					if(notifications.length == 0)
					{
						var html = "<h8 class='dropdown-header weight500'>No new notification</h8>";
						$("#notificationsDiv").append(html);
					}
					for(var i=0;i < notifications.length;i++){
						var notification = notifications[i].fields;
						var html = "<a class='dropdown-item border-bottom' href='#'> <span class='text-primary'> <span class='weight500'> <i class='vl_bell weight600 pr-2'></i> "+notification.title+" </span> </span> <span class='small float-right text-muted'>"+notification.status+"</span> <div class='dropdown-message f12'> "+notification.message+" </div> </a>";
						$("#notificationsDiv").append(html);
					}

			});
		}
		else
		{
			var data = {};
			Cloud.sendSuccessHandler(Config.GET_ADMIN_NOTIFICATION_URI, JSON.stringify(data), function(success){
					console.log(success);
					var notifications = JSON.parse(success.response);

					if(notifications.length == 0)
					{
						var html = "<h8 class='dropdown-header weight500'>No new notification</h8>";
						$("#notificationsDiv").append(html);
					}
					for(var i=0;i < notifications.length;i++){
						var notification = notifications[i].fields;
						var html = "<a class='dropdown-item border-bottom' href='#'> <span class='text-primary'> <span class='weight500'> <i class='vl_bell weight600 pr-2'></i> "+notification.title+" </span> </span> <span class='small float-right text-muted'>"+notification.status+"</span> <div class='dropdown-message f12'> "+notification.message+" </div> </a>";
						$("#notificationsDiv").append(html);
					}

			});
		}
	}

	user.updateNotification = function()
	{
		var userData = JSON.parse(Utils.getCookie("user"));
		var userType = userData[0].fields.userType;
		if(userType != "ADMIN")
		{
			var data = {};
			Cloud.sendSuccessHandlerNo(Config.UPDATE_NOTIFICATION_URI, JSON.stringify(data), function(success){
					console.log(success);
			});
		}
		else
		{
			var data = {};
			Cloud.sendSuccessHandlerNo(Config.UPDATE_ADMIN_NOTIFICATION_URI, JSON.stringify(data), function(success){
					console.log(success);
			});
		}
	}

  user.showNotifications = function()
	{
		var userData = JSON.parse(Utils.getCookie("user"));
		var userType = userData[0].fields.userType;
		Users.getNotifications();
	}

	user.createUser = function()
	{
		var json = Utils.getFields("Create-user","formfields");

		var data = {};

		if(!json.validate)
			return;

		data = json.json;
		data.userType = "user";
		Users.create(data);
	}
	
	
	

	user.create = function(data)
	{
		Cloud.sendSuccessHandler(Config.CREATE_USER_URI, JSON.stringify(data), function(success){

				$(".modal").modal("hide");
				Users.getAllUsers();


		});
	}

  user.update = function()
	{
		var json = Utils.getFields("Edit-user","formfields");

		var data = {};

		if(!json.validate)
			return;

		data = json.json;

		var selected = $(".tableTrChecks:checked")[0];
		data.id = $(selected).attr("data-id");

		Cloud.sendSuccessHandler(Config.UPDATE_USER_URI, data, function(success){
			if(success.applicationStatusCode == 0)
			{
				console.log(success.statusResponse_en);
				Users.getAll();
			}
		});

		$("#selectAllCheck").prop("checked",false);
		$(".hiddenButtons").css("display","none");
	}

	user.delete = function()
	{
		var selected = $(".tableTrChecks:checked");

		for(var i=0; i < selected.length; i++)
		{
			var id = $(selected[i]).attr("data-id");

			var data = {
				id:id
			}

			Cloud.sendSuccessHandler(Config.DELETE_USER_URI, data, function(success){
				if(success.applicationStatusCode == 0)
				{
					console.log(success.statusResponse_en);

					if(i == selected.length)
					{
						Users.getAll();
					}
				}
			});
		}

		$("#selectAllCheck").prop("checked",false);
		$(".hiddenButtons").css("display","none");
		Users.getAll();
	}

	user.getAllUsers = function(handler)
	{
		var data = {};

		Cloud.sendSuccessHandler(Config.GETALL_USER_URI, data, function(success){
			console.log(JSON.parse(success.response));

			var dataList = JSON.parse(success.response);

			user.users = dataList;

			var dataSet = [];

			for(var i = 0;i < dataList.length; i++)
			{
				var d = dataList[i];
				var fields = d.fields;
				//var btnStatus = (source.status == "ACTIVE")?("btn-success"):((source.status == "EXPIRED")?("btn-warning"):("btn-danger"));
				//var clickHandler = "";
				//clickHandler = "PortalSources.setSelectedId(\""+source.id+"\");Messages.showConfirmationMessage(\"Confirm\",\"Are you sure ?\",\"PortalSources.changeSourceStatus()\");";
				dataSet[i] = [fields.name, fields.phone, fields.email,fields.company];
			}

			$('#usersDataTable').DataTable( {
					order: [[ 1, "asc" ]],
						data: dataSet,
						"bDestroy": true,
						columns: [
								{ title: "Name" },
								{ title: "Phone" },
								{ title: "Email" },
								{ title: "Company" }
								]
				});
		});
	}





	user.getAlls = function()
	{

		var data = {};

		Cloud.sendSuccessHandler(Config.GETALL_USER_URI, data, function(success){
			if(success.applicationStatusCode == 0)
			{
				console.log(success.statusResponse_en);

				var dataList = success.users;

				user.users = dataList;

				var dataSet = [];

				for(var i = 0;i < dataList.length; i++)
				{
					var d = dataList[i];

					//var btnStatus = (source.status == "ACTIVE")?("btn-success"):((source.status == "EXPIRED")?("btn-warning"):("btn-danger"));
					//var clickHandler = "";
					//clickHandler = "PortalSources.setSelectedId(\""+source.id+"\");Messages.showConfirmationMessage(\"Confirm\",\"Are you sure ?\",\"PortalSources.changeSourceStatus()\");";
					dataSet[i] = ['<div class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input tableChecks tableTrChecks" data-i="'+i+'" data-id="'+d.id+'" id="user_'+d.id+'"> <label class="custom-control-label" for="user_'+d.id+'"></label> </div>',d.name, d.phone, d.email];
				}

				$('#usersDataTable').DataTable( {
			        columnDefs: [
		   				 { "orderable": false, "targets": 0 }
		  			],
		   			order: [[ 1, "asc" ]],
			        data: dataSet,
			        "bDestroy": true,
			        columns: [
			            { title: '<div class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input tableChecks" id="selectAllCheck"> <label class="custom-control-label" for="selectAllCheck"></label> </div>',width:"20px" },
			            { title: "Name" },
			            { title: "Phone" },
			            { title: "Email" }
			            ]
			    });

			    $(".tableChecks").click(function(){
					checkSelected();
				});

				$("#selectAllCheck").click(function(){
					var checked = this.checked;

					if(checked){
						$(".tableTrChecks").prop("checked",true);


					}
					else
						$(".tableTrChecks").prop("checked",false);

					checkSelected();
				});
			}
		});
	}

	user.getAll = function()
	{
			var data = {};

			Cloud.sendSuccessHandler(Config.GETALL_USER_URI, data, function(success){
					console.log(success);
			});
	}

	user.getById = function()
	{

	}

	user.edit = function()
	{
		var selected = $(".tableTrChecks:checked")[0];
		var index = $(selected).attr("data-i");

		var json = user.users[index];

		Utils.setFields("Edit-user",json);
	}

	user.createBulk = function(data)
	{
		Cloud.sendSuccessHandler(Config.CREATE_BULK_USER_URI, data, function(success){
			if(success.applicationStatusCode == 0)
			{
				console.log(success.statusResponse_en);
				Users.getAll();
			}
		});
	}

	user.import = function()
	{
		Utils.getDataFromExcel(function(jsonArr){

			var dataArr = [];

			for(var i=0;i < jsonArr.length;i++)
			{
				var data = {};
				var json = jsonArr[i];

				data.name = json["Name"];
				data.phone = json["Phone"];
				data.email = json["Email"];

				dataArr.push(data);
			}

			Users.createBulk({createUserPayload:dataArr});

		});
	}

	user.dashboard = function()
	{

			var value = $("#dashboardDateFilter").val();

			var data = {
				dateFilter : value
			}

			Cloud.sendSuccessHandler(Config.STATS_USER_URI, data, function(success){
				if(success.applicationStatusCode == 0)
				{
					console.log(success);
					var stats = success.stats;

					var itemsToReorder = success.itemsToReorder;

					$("#reorderText").html(itemsToReorder);

					var topCustomers = success.topCustomers;
					var topSales = success.topSales;

					Users.topCustomers(topCustomers);
					Users.topSales(topSales);

					$("#totalSalesText").html("$"+stats[0].totalSales.sales);

					var month = stats[0].details.month;
					var monthName = months[parseInt(month) - 1];

					$("#dataFromText").html("Data from "+monthName);

					var purchaseOrders = stats[0].purchaseOrders;
					checkIfValsExist("purchaseOrder",purchaseOrders);

					var salesOrders = stats[0].salesOrders;
					checkIfValsExist("salesOrder",salesOrders);


					$("#openPurchaseOrdersText").html(purchaseOrders.open);
					$("#openSalesOrdersText").html(parseInt(salesOrders.quote) + parseInt(salesOrders.accepted));

					$("#purchaseOpenText").html(purchaseOrders.open);
					$("#purchasePartialText").html(purchaseOrders.partial);
					$("#purchaseFulfilledText").html(purchaseOrders.fulfilled);

					$("#salesQuoteText").html(salesOrders.quote);
					$("#salesAcceptedText").html(salesOrders.accepted);
					$("#salesPartialText").html(salesOrders.partial);
					$("#salesFulfilledText").html(salesOrders.fulfilled);

					var ctx = document.getElementById("salesOrdersChart");
				    var data = {
				        labels: [
				            "Quote", "Accepted", "Partial", "Fulfilled"
				        ],
				        datasets: [{
				            data: [parseInt(salesOrders.quote), parseInt(salesOrders.accepted), parseInt(salesOrders.partial), parseInt(salesOrders.fulfilled)],
				            backgroundColor: [
				                "#cae59b",
				                "#fcdd82",
				                "#f79490",
				                "#acf5fe"
				            ],
				            borderWidth: [
				                "0px",
				                "0px",
				                "0px",
				                "0px"
				            ],
				            borderColor: [
				                "#cae59b",
				                "#fcdd82",
				                "#f79490",
				                "#acf5fe"
				            ]
				        }]
				    };

				    var myDoughnutChart = new Chart(ctx, {
				        type: 'doughnut',
				        data: data,
				        options: {
				            legend: {
				                display: false
				            }
				        }
				    });

				    var ctx = document.getElementById("purchaseOrdersChart");
				    var data = {
				        labels: [
				            "Open", "Partial", "Fulfilled"
				        ],
				        datasets: [{
				            data: [parseInt(purchaseOrders.open), parseInt(purchaseOrders.partial), parseInt(purchaseOrders.fulfilled)],
				            backgroundColor: [
				                "#fcdd82",
				                "#f79490",
				                "#acf5fe"
				            ],
				            borderWidth: [

				                "0px",
				                "0px",
				                "0px"
				            ],
				            borderColor: [

				                "#fcdd82",
				                "#f79490",
				                "#acf5fe"
				            ]
				        }]
				    };

				    var myDoughnutChart = new Chart(ctx, {
				        type: 'doughnut',
				        data: data,
				        options: {
				            legend: {
				                display: false
				            }
				        }
				    });
				}
			});


	}

	user.topCustomers = function(array)
	{

		$("#customersNames").html("");

		$("#customersSales").html("");

		for(var k = 0; k < array.length; k++)
		{
			var data = array[k];
			$("#customersNames").append("<div><strong>"+data.name+"</strong></div>");
			$("#customersSales").append("<div>$"+data.sales+"</div>");
		}

	}

	user.topSales = function(array)
	{

		$("#itemsNames").html("");

		$("#itemsSales").html("");

		for(var k = 0; k < array.length; k++)
		{
			var data = array[k];
			$("#itemsNames").append("<div><strong>"+data.name+"</strong></div>");
			$("#itemsSales").append("<div>$"+data.sales+"</div>");
		}

	}

	function checkIfValsExist(orderType, order)
	{
		switch(orderType){
			case "purchaseOrder":
			{
				if(typeof order.open == "undefined")
					order.open = "0";
				if(typeof order.partial == "undefined")
					order.partial = "0";
				if(typeof order.fulfilled == "undefined")
					order.fulfilled = "0";

			}
			break;
			case "salesOrder":
			{
				if(typeof order.quote == "undefined")
					order.quote = "0";
				if(typeof order.accepted == "undefined")
					order.accepted = "0";
				if(typeof order.partial == "undefined")
					order.partial = "0";
				if(typeof order.fulfilled == "undefined")
					order.fulfilled = "0";

			}
		}
	}


	function checkSelected()
		{
			var selected = $(".tableTrChecks:checked");

			if(selected.length == 0)
			{
				$(".hiddenButtons").css("display","none");
			}
			else if(selected.length == 1)
			{
				$(".hiddenButtons").css("display","inline-block");
			}
			else if(selected.length > 1)
			{
				$(".hiddenButtons").css("display","inline-block");
				$("#edit_button").css("display","none");
			}

		}

	user.getUser = function()
	{
		if(Utils.getCookie("userEmail").trim() == "")
			window.location="login.html";

		return Utils.getCookie("userEmail");
	}

	user.signOut = function(){
		document.cookie = "user=";
		window.location = "/login";
	}

	return user;

}());
