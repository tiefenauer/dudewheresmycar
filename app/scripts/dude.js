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
$("#gas").click(gas);
$("#nearby").click(nearby);
$("#track").click(track);




/**
* Google Maps stuff
*/
function initialize() {
  var positions = localStorage.getItem('positions');
  if(!positions)
    localStorage.setItem('positions', []);
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

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}