//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button click
	$('#getLocationButton').on("click", function(){
        getPosition();
    });   
    
    $('#stopLocationButton').on("click", function(){
        stopPosition();
    });  
});

var watchID;
//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
    $('#longtext').val("Getting data...");
    $('#lattext').val("Getting data...");
    $('#accuracy').val("Getting data...");
    $('#compas').val("Getting data...");
    $('#alttext').val("Getting data...");
    $('#speedtext').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	watchID = navigator.geolocation.watchPosition(
				successPosition, failPosition, locationOptions);

}


//called when the position is successfully determined
function successPosition(position) {
	console.log("successPosition");
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.as
    

    
    var unixtime = new Date(position.timestamp);
    var date = unixtime.toUTCString();
    
    var speed = position.coords.speed * 3.6;
    var altitude = position.coords.altitude;
    var wot = position.coords.heading;
	var accNum = position.coords.accuracy;
	var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + date);
	$('#lattext').val("Latitude     " + latitude);
    $('#longtext').val("Longitude " + longitude);
    $('#accuracy').val("Accuracy is " + accNum + " Meters");
    $('#compas').val("Way of travel is " + wot);
    $('#alttext').val("Altitude is " + altitude);
    $('#speedtext').val("Speed is " + speed);
	
}

	var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
    };

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

function stopPosition(){
    navigator.geolocation.clearWatch(watchID);
    	$('#time').val("");
    $('#longtext').val("");
    $('#lattext').val("");
    $('#accuracy').val("");
    $('#compas').val("");
    $('#alttext').val("");
    $('#speedtext').val("");
}