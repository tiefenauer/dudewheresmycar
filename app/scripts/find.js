var find = function(){
  navigator.geolocation.getCurrentPosition(
    // success
    route
    // error
    ,function(position){
      console.log('Error occurred. Error code: ' + error.code);
    }
  );  

}

var route = function(currentPosition){  
  var position = JSON.parse(localStorage.getItem('position'));

  var start = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
  start = map.getCenter();
  var end = new google.maps.LatLng(position.latitude, position.longitude);

  directionsService.route({
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  }, onDirectionsResponse)
}

var onDirectionsResponse = function(response, status){
  directionsDisplay.setDirections(response);
}

var getLatestPosition = function(){
  var positions = loadPositions();
  var max = _.max(positions, 'timestamp');
  /*
   _.forEach(positions, function(positions){
    if (parseInt(key) > max)
      max = parseInt(key);
   })
   if (max > 0)
    return positions[max];    
  return null;
  */
  return max;
}

