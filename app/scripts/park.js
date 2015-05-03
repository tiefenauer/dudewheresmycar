var geoSuccess = function(position){    
  save(position);
};

var geoError = function(position){
  console.log('Error occurred. Error code: ' + error.code);
  // error.code can be:
  //   0: unknown error
  //   1: permission denied
  //   2: position unavailable (error response from location provider)
  //   3: timed out
}

var park = function(event){
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);  
}

/**
* Save current position for later access
*/
var save = function(position){
  console.log("Latitude: " + position.coords.latitude);
  console.log("Latitude: " + position.coords.longitude);


  var now = new Date();
  setMarker(position, now);

  positions = loadPositions();
  positions["" + now.getTime()] = position;
  savePositions(positions);
}

/**
* Load position saved at timestamp. If no timestamp is set, current position will be returned
*/
var load = function(timestamp){
  positions = loadPositions();
  var position = positions[timestamp];
  if (position)
    return position;
  return null;
}

var setMarker = function(position, date){
  var opts = {
    map: map,
    position: map.getCenter(),
    title: "Parked at " + date.toString('dd.MM.yyyy hh:mm:ss')
  }
  markers.push(new google.maps.Marker(opts));
}

/**
* Load positions from localStorage
*/
var loadPositions = function(){
  var positions = localStorage.getItem('positions') || "{}";
  return JSON.parse(positions);
}

var savePositions = function(positions){
  localStorage.setItem('positions', JSON.stringify(positions));
  console.log("Positions saved");
}