var Utils = (function() {

	var utils = {};

	utils.generateClientTransactionId = function() {

		var clientTransactionId = "";
		var guid = "";
		for(var z=0;z<10;z++)
		{
			var r = parseInt(Math.random() * 25) + 97;
			var c = String.fromCharCode(r);
			guid += c;
		}

		/*if (Settings.USER_EMAIL != "" && Settings.USER_PASSWORD != "")*/
			clientTransactionId = clientTransactionId + "["
					+ guid + "]";
		/*else
			clientTransactionId = clientTransactionId + "["
					+ Constants.GUEST_USER + "]";*/

		var currentDate = new Date();
		var email = "";
		if(typeof PortalUsers.User == "undefined")
		{
			email  = $("#loginFormEmail").val();
		}
		else
		{
			email = PortalUsers.User.email;
		}
		clientTransactionId = email + "-" + clientTransactionId+currentDate.getDate() + "-"
				+ currentDate.getMonth() + "-" + currentDate.getYear() + "-"
				+ currentDate.getHours() + ":" + currentDate.getMinutes() + ":"
				+ currentDate.getSeconds();
		return clientTransactionId;
	};

	utils.roundOff = function(value){
		return (Math.round((value + 0.000001) * 1000) / 1000);
	}

	utils.removeContainElements = function(){
		$(".currentlyShowing").remove();
	}


	utils.refreshDatePicker = function(field)
	{
			field.value="asdasdasd";
			$(field).attr("type","date");
			$(field).removeClass("mydateps");
			$(field).removeClass("hasDatepicker");
	}

	utils.errorDataTableResponse = function()
	{
		return {recordsTotal:0,recordsFiltered:0,data:[]};
	}

	utils.addDatePicker = function()
	{
		var dateFields = $("body").find("input[type='date']");

		for(var k=0;k<dateFields.length;k++)
		{
			var df = dateFields[k];
			$(df).attr("type","text");
			$(df).addClass("mydateps");
			$(df).attr("autocomplete","off");
		}

	    $( ".mydateps" ).datepicker({
	      numberOfMonths: 2,
	      changeMonth:true,
	      changeYear:true,
	      showButtonPanel: false,
	      dateFormat: "dd-mm-yy",
	      yearRange: '1940:2030'
	    });


	}



	utils.addDatePickerYearRange = function(minDate)
	{
		var dateFields = $("body").find("input[type='date']");

		for(var k=0;k<dateFields.length;k++)
		{
			var df = dateFields[k];
			$(df).attr("type","text");
			$(df).addClass("mydateps");
			$(df).attr("autocomplete","off");
		}

	    $( ".mydateps" ).datepicker({
	      numberOfMonths: 2,
	      changeMonth:true,
	      changeYear:true,
	      showButtonPanel: false,
	      dateFormat: "dd-mm-yy",
	      minDate: minDate,
	      maxDate : new Date(),
	      yearRange: '1940:2030'
	    });


	}

	utils.addMaxDatePicker = function(dateId,maxDate)
	{
		var dateFields = $("body").find("input[type='date']");

		for(var k=0;k<dateFields.length;k++)
		{
			var df = dateFields[k];
			$(df).attr("type","text");
			$(df).addClass("mydateps");
			$(df).attr("autocomplete","off");
		}

		if(typeof dateId != "undefined")
			dateId = "#"+dateId;
		else
			dateId = ".mydateps";


		if(typeof maxDate == "undefined")
		{
			maxDate = new Date();
		}


	    $(dateId).datepicker({
	      numberOfMonths: 2,
	      changeMonth:true,
	      changeYear:true,
	      showButtonPanel: false,
	      dateFormat: "dd-mm-yy",
	      yearRange: '1900:2050',
	      maxDate : maxDate
	    });

	}

	utils.addTodayDatePicker = function()
	{
		var dateFields = $("body").find("input[type='date']");

		for(var k=0;k<dateFields.length;k++)
		{
			var df = dateFields[k];
			$(df).attr("type","text");
			$(df).addClass("mydateps");
			$(df).attr("autocomplete","off");
		}

	    $( ".mydateps" ).datepicker({
	      numberOfMonths: 2,
	      changeMonth:true,
	      changeYear:true,
	      showButtonPanel: false,
	      dateFormat: "dd-mm-yy",
	      yearRange: '1900:2050',
	      minDate : new Date()
	    });

	}

	utils.addDatePickerToClass = function(c,field)
	{
		$(".mydateps").attr("type","text");
		$( ".mydateps" ).datepicker({
			 numberOfMonths: 2,
		     showButtonPanel: true
		});
	}


	utils.getFieldsTimeStamp = function(id, classname,selectText)
	{
		var fields = $("#"+id+" ."+classname);

		var validate = true;

		var json = {};

		for(var i=0; i < fields.length; i++)
		{
			var field = fields[i];
			if($(field).hasClass("multi-options-select"))
			{
				var options = $(field).val();
				if(options.length == 0){
					validate = false;
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
						$(field.parentElement).append(validationError());
					}
				}else
				{
					json[field.id] = options;
				}


			}
			else if($(field).hasClass("options-select")){
				if(typeof selectText == "undefined" || !selectText)
				{
					var value = field.options[field.selectedIndex].value;
					if(value == "Select")
					{
						if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
							$(field.parentElement).append(validationError());
						}
						validate = false;
					}
					else{
						if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
							field.parentElement.getElementsByClassName("validationerror")[0].remove();
						}

						json[field.id] = value;
					}

				}
				else
				{
					var text = field.options[field.selectedIndex].text;
					json[field.id] = text;
				}

			}
			else if($(field).attr("type") == "checkbox"){
				json[field.id] = field.checked;
			}
			else if($(field).hasClass("mydateps")){

				if(field.value == "" && field.required)
				{
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
						var parent = $(field).parent();
						$(parent).append(validationError());
					}
					validate = false;
				}
				else{
					json[field.id] = new Date(Utils.getValidDateFormat(field.value));
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
						field.parentElement.getElementsByClassName("validationerror")[0].remove();
					}
				}
			}
			else if(field.value == "" && field.required)
			{
				if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
					$(field.parentElement).append(validationError());

				}
				validate = false;
			}

			else if($(field).attr("type") == "time"){

				var d = new Date();
				var time = field.value.split(":");
				d.setHours(time[0]);
				d.setMinutes(time[1]);
				json[field.id] = d;
			}
			else
			{
				if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
					field.parentElement.getElementsByClassName("validationerror")[0].remove();
				}
				json[field.id] = field.value;
			}
		}

		return {validate:validate,json:json};
	}

	utils.getKeys = function(id, classname)
	{
		var fields = $("#"+id+" ."+classname);
		var json = {};
		for(var i=0; i < fields.length; i++)
		{
			var field = fields[i];
			json[field.id] = field.id;
		}

		return json;
	}


	utils.getFields = function(id, classname,selectText)
	{
		var fields = $("#"+id+" ."+classname);

		var validate = true;

		var json = {};

		for(var i=0; i < fields.length; i++)
		{
			var field = fields[i];
			if($(field).hasClass("multi-options-select"))
			{
				var options = $(field).val();
				if(options.length == 0){
					validate = false;
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
						$(field.parentElement).append(validationError());
					}
				}else
				{
					json[field.id] = options;
				}


			}
			else if($(field).hasClass("options-select")){
				if(typeof selectText == "undefined" || !selectText)
				{
					var value = field.options[field.selectedIndex].value;
					if(value == "Select")
					{
						if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
							$(field.parentElement).append(validationError());
						}
						validate = false;
					}
					else{
						if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
							field.parentElement.getElementsByClassName("validationerror")[0].remove();
						}

						json[field.id] = value;
					}

				}
				else
				{
					var text = field.options[field.selectedIndex].text;
					json[field.id] = text;
				}

			}
			else if($(field).attr("type") == "checkbox"){
				json[field.id] = field.checked;
			}
			else if($(field).hasClass("mydateps")){

				if(field.value == "" && field.required)
				{
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
						var parent = $(field).parent();
						$(parent).append(validationError());
					}
					validate = false;
				}
				else{
					json[field.id] = new Date(Utils.getValidDateFormat(field.value));
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
						field.parentElement.getElementsByClassName("validationerror")[0].remove();
					}
				}
			}
			else if(field.value == "" && field.required)
			{
				if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
					$(field.parentElement).append(validationError());
				}
				validate = false;
			}
			else
			{
				if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
					field.parentElement.getElementsByClassName("validationerror")[0].remove();
				}

				json[field.id] = field.value;
			}
		}

		return {validate:validate,json:json};
	}

	utils.getFieldsByElement = function(id, classname,selectText)
	{
		//var fields = $("#"+id+" ."+classname);

		var fields = $(id).find("."+classname);

		var validate = true;

		var json = {};

		for(var i=0; i < fields.length; i++)
		{
			var field = fields[i];
			if($(field).hasClass("multi-options-select"))
			{
				var options = $(field).val();
				if(options.length == 0){
					validate = false;
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
						$(field.parentElement).append(validationError());
					}
				}else
				{
					json[field.id] = options;
				}


			}
			else if($(field).hasClass("options-select")){
				if(typeof selectText == "undefined" || !selectText)
				{
					var value = field.options[field.selectedIndex].value;
					if(value == "Select")
					{
						if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
							$(field.parentElement).append(validationError());
						}
						validate = false;
					}
					else{
						if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
							field.parentElement.getElementsByClassName("validationerror")[0].remove();
						}

						json[field.id] = value;
					}

				}
				else
				{
					var text = field.options[field.selectedIndex].text;
					json[field.id] = text;
				}

			}
			else if($(field).attr("type") == "checkbox"){
				json[field.id] = field.checked;
			}
			else if($(field).hasClass("mydateps")){

				if(field.value == "" && field.required)
				{
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
						var parent = $(field).parent();
						$(parent).append(validationError());
					}
					validate = false;
				}
				else{
					json[field.id] = new Date(Utils.getValidDateFormat(field.value));
					if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
						field.parentElement.getElementsByClassName("validationerror")[0].remove();
					}
				}
			}
			else if(field.value == "" && field.required)
			{
				if(typeof field.parentElement.getElementsByClassName("validationerror")[0] == "undefined"){
					$(field.parentElement).append(validationError());
				}
				validate = false;
			}
			else
			{
				if(typeof field.parentElement.getElementsByClassName("validationerror")[0] != "undefined"){
					field.parentElement.getElementsByClassName("validationerror")[0].remove();
				}

				json[field.id] = field.value;
			}
		}

		return {validate:validate,json:json};
	}



	utils.getValidDateFormat = function(date)
	{
		date = date.split("-");

		return (date[2] +"-"+ date[1] +"-"+ date[0]);
	}

	utils.print = function(contents) {
		console.log(contents);

		var mywindow = window.open('', 'Print', 'height=600,width=800');

        mywindow.document.write('<!DOCTYPE html><html><head><title>Print</title><style>table{width:100%;} .table{border-collapse:collapse;} .table td{border:1px solid #777;}</style>');
        mywindow.document.write('</head><body style="width:1100px;font-family:Arial;">');
        mywindow.document.write(contents);
        mywindow.document.write('</body></html>');

        mywindow.document.close();
        mywindow.focus()
        mywindow.print();
        mywindow.close();


	/*	var originalContents = document.body.innerHTML;
		document.body.innerHTML = contents;
		window.print();
		document.body.innerHTML = originalContents;
		*/

        return true;
    }



	utils.exportToExcel = function(worksheetName, contents)
    {
    	var uri = 'data:application/vnd.ms-excel;base64,'
    		, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:Name>{workbook}</x:Name><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{contents}</body></html>'
    		, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    		, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };

    		var table = document.getElementById("dataTable");
    		var ctx = {workbook: "Invoice", worksheet: worksheetName || 'Worksheet', contents: contents};

    		window.location.href = uri + base64(format(template, ctx));
    }

	utils.clearAllFields = function(){
		$('.modal').find("input").val("");
		$(".validationerror").remove();
	}

	utils.getUserMidOfficeId = function(){
		if(typeof PortalUsers.getUser() == "undefined")
			return "guest";
		else
			return PortalUsers.getUser().userAgencyId;
	}

	function validationError(){
		return "<div class='validationerror' style='color:red;'>*Required Field</div>";
	}

	utils.validationError = function(){
		return "<div class='validationerror' style='color:red;'>*Required Field</div>";
	}

	utils.validationErrorText = function(text){
		return "<div class='validationerror' style='color:red;'>"+text+"</div>";
	}

	utils.getStartingTimestamp = function(date)
	{

		date = new Date(Utils.getValidDateFormat(date));
		date.setHours("0","0","0");
		return date;
	}

	utils.getEndingTimestamp = function(date)
	{
		date = new Date(Utils.getValidDateFormat(date));
		date.setHours("23","59","59");

		return date;
	}

	utils.getValidDate = function(date)
	{
		if(date != null){
			date = new Date(date);

			if(date == "Invalid Date")
			{
				return date;
			}

			var month = date.getMonth() + 1;
			if(month < 10)
				month = "0" + month;

			var day = date.getDate();
			if(day < 10)
				day = "0" + day;
			return (day + "-" + month + "-" + date.getFullYear());
		}
		return "";
	}

	utils.getTimeFromDate = function(date,format)
	{
		var d = new Date(date);

		if(d == "Invalid Date")
		{
			return d;
		}

		return moment(date).format(format);
	}

	utils.getFlightTimings = function(arrivalDate, departureDate)
	{
		return (Utils.getTimeFromDate(departureDate,"hh:mm A")+ " - " + Utils.getTimeFromDate(arrivalDate,"hh:mm A"));
	}

	utils.getCompleteDate = function(date)
	{
		var days = ["Mon","Tue","Wed","Thurs","Fri","Sat","Sun"];
		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var momentDate = moment(date);
		var day = days[momentDate.weekday() + 1];
		var date = momentDate.date();
		var monthName = months[momentDate.month()];
		var year = momentDate.year();

		return (" "+ day+ ", " + date + " " + monthName + " " + year);
	}



	utils.setFields = function(id, json)
	{
		var formfields = $("#"+id+" .formfields");

		for(var i = 0;i < formfields.length; i++)
		{
			var field = formfields[i];
			if($(field).hasClass("options-select"))
			{
				var options = field.options;

				var html = "";

				for(var k=0; k < options.length;k++)
				{
					var option = options[k];

					var attributes = option.getAttributeNames();

					var attributesString = "";
					for(var z=0; z < attributes.length; z++)
					{
						if(attributes[z] != "selected")
							attributesString += attributes[z] + "=" + $(option).attr(attributes[z]) + " ";
					}

					if((typeof json[field.id].trim() != "undefined") && (option.text.toUpperCase() == json[field.id].trim().toUpperCase()) || (option.value == json[field.id]))
					{
						html += ("<option selected='selected' "+attributesString+">"+option.text+"</option>");
					}
					else
					{
						html += ("<option "+attributesString+">"+option.text+"</option>");
					}
				}

				$(field).html(html);
			}
			else
				field.value = json[field.id];
		}

	}

	utils.getTotalFlightTime = function(arrivalDate, departureDate)
	{
		var arrDate = new Date(arrivalDate);
		var depDate = new Date(departureDate);

		var totalHours = 0;
		var totalMinutes = Math.abs(arrDate.getTime() - depDate.getTime()) / (1000 * 60);

		while((parseInt(totalMinutes/60)) > 0){
			totalHours ++;
			totalMinutes = totalMinutes - 60;
		}

		return (totalHours+"h " + totalMinutes+"m");
	}

	utils.showOverlay = function()
	{
		$(".overlay").css("display","block");
	}

	utils.hidOverlay = function()
	{
		$(".overlay").css("display","none");
	}

	utils.getDataFromExcel = function(successHandler)
	{
		var file = document.getElementById("file");
		Utils.ExcelToJson(file.files[0],successHandler);
	}

	utils.displayData = function(json)
	{
		var data = "";
		for(var i = 0;i < json.length; i++)
		{
			var d = json[i];
			data += "<option value='"+d.CountryName.trim()+"' >" +d.CountryName.trim()+ "</option>";
		}

		console.log(data);
	}

	utils.validateEmail = function(email)
	{
		 var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		 if(email.match(emailRegex))
			 return true;
		 else
			 return false;


	}

	utils.ExcelToJson = function(file, successHandler)
	{

		    var reader = new FileReader();

		    reader.onload = function(e) {
		      var data = reader.result;
		      var workbook = XLSX.read(data, {
		        type: 'binary'
		      });

		      workbook.SheetNames.forEach(function(sheetName) {
		        // Here is your object
		        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		        var json_object = XL_row_object;
		       // Utils.displayData(json_object);
		       successHandler(json_object);
		       $(".modal").modal("hide");

		      })

		    };

		    reader.onerror = function(ex) {
		      console.log(ex);
		    };

		    reader.readAsBinaryString(file);

	}
	utils.getDateAMFormat = function (date){
	      var date = new Date(date);
	      return date.toString("hh:mm");
		}
	utils.getDateAMFormat = function (date){
      var date = new Date(date);
      return date.toString("hh:mm");
	}
	//300000
	//300,000
	utils.numberFormat = function(number){
		if(number != null)
		{
			var number = parseFloat(number).toFixed(2);
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	utils.setTimer = function(handler, milliseconds)
	{
		window.timer = window.setTimeout(handler, milliseconds);
	}

	utils.removeTimer = function()
	{
		window.clearTimeout(window.timer);
	}

	utils.fillSelection = function(data,selectId,attributes,text)
	{
		var selectElement = $("#"+selectId)[0];
		$(selectElement).html("<option value='Select'>Select</option>");
		for(var i=0;i<data.length;i++)
		{
			var d = data[i];

			var attributesString = "";

			for(var attr in attributes)
				attributesString += attr + "=" + d[attributes[attr]];

			$(selectElement).append("<option data-i='"+i+"' "+attributesString+">"+d[text]+"</option>");
		}
	}

	utils.printHeading = function()
	{
		var agency = PortalMidoffices.getAllAgenciesSync("NCT");

		agency = agency[0];

		var companyName = agency.agencyName;

    	if(typeof companyName == "undefined" || companyName == "")
    		companyName = "Company Name";
    	var printDate = Utils.getValidDate(new Date());
    	var address = agency.address, email = agency.agencyEmail, phone = agency.phoneNumber;
    	var header = "<table><tr><td colspan='3'><a style='font-weight:bold;font-size:20px;'>"+companyName+"</a></td><td colspan='2'></td><td><a style='font-weight:bold;'>Print Date: </a></td><td>"+printDate+"</td></tr>" +
		 "<tr><td colspan='3'>"+address+"</td></tr>" +
	 		"<tr><td colspan='3'><a style='font-weight:bold;'>Ph: </a>"+phone+", <a style='font-weight:bold;'>Email: </a> "+email+"</td>" +
	 				"</tr><tr><td align='center' colspan='8'><a style='font-weight:bold;font-size:20px;'>#REPORTNAME#</a></td></tr>" +
	 				"</table>";

    	return header;
	}

	 utils.exportTo = function(type,reportName)
	    {
	    	$("#dataTable").inlineStyler( );

	    	var header = Utils.printHeading();

	    	header = header.replace("#REPORTNAME#",reportName);

	    	switch(type)
	    	{
	    		case Constants.EXPORT_TYPE_EXCEL:{
	    			var name = "Voucher Listing";
	    			var contents = header + document.getElementsByClassName("table")[0].outerHTML;
	    			Utils.exportToExcel(name,contents);
	    		}
	    		break;
	    		case Constants.EXPORT_TYPE_PDF:
	    			//Utils.exportToPdf();
	    		break;
	    		case Constants.EXPORT_TYPE_PRINT:
	    		{
	    			var contents = header + document.getElementsByClassName("table")[0].outerHTML;
	    			Utils.print(contents);
	    		}
	    		break;
	    	}

	    }

	    utils.getCookie = function(cname){
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' '){
		        	c = c.substring(1);
		        }
		        if (c.indexOf(name) == 0){
		        	return c.substring(name.length,c.length);
		        }
			}

    		return "";
		}

		utils.generateNumber = function(modal)
		{
			$($("#"+modal).find("#number")[0]).val(parseInt(Math.random() * 100000));
		}

		utils.generateNumberText = function()
		{
			return parseInt(Math.random() * 100000);
		}

		utils.getUser = function()
		{
			var type = Utils.getCookie("user");

			if(type.trim() == "")
				window.location="login";
		}

		utils.getUserType = function()
		{
			var type = Utils.getCookie("userType");

			if(type.trim() == "")
				window.location="login.html";

	        if(type != "admin")
	        {
	          $("#usersNav").remove();
	        }
	        else{
	        	$("#usersNav").css("display","block");
	        }
		}

	return utils;
}());
