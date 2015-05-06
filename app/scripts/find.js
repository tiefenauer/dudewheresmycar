var find = function(){
  var position = getLatestPosition();

  var start = map.getCenter();
  var end = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
  var keys = _.keys(positions);
  var max = 0;
   _.forEach(keys, function(key){
    if (parseInt(key) > max)
      max = parseInt(key);
   })
   if (max > 0)
    return positions[max];
  return null;
}

