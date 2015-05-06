// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}

var map;
var placesService;
var directionsService, directionsDisplay;
var markers = [];

$("#park").click(park);
$("#find").click(find);
$("#gas").click(gasStations);
$("#nearby").click(gasStations);

$("#track").click(function(event){
  var watchId = navigator.geolocation.watchPosition(function(position){
    console.log("Current position (lat/lng): " + position.coords.latitude + "/" + position.coords.longitude);
  });
});




/**
* Google Maps stuff
*/
function initialize() {
  navigator.geolocation.getCurrentPosition(function(pos){
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;

    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(lat, lng)
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    placesService = new google.maps.places.PlacesService(map);
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);    
  });
};


google.maps.event.addDomListener(window, 'load', initialize);