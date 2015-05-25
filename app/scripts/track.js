var track = function(event){
  var watchId = navigator.geolocation.watchPosition(function(position){
    console.log("Current position (lat/lng): " + position.coords.latitude + "/" + position.coords.longitude);
  });
}