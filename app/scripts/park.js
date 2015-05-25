var park = function(event){
  navigator.geolocation.getCurrentPosition(
    // success
    save
    // error
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out    
    ,function(position){
      console.log('Error occurred. Error code: ' + error.code);
    });  
}

/**
* Save current position for later access
*/
var save = function(position){
  console.log("Latitude: " + position.coords.latitude);
  console.log("Latitude: " + position.coords.longitude);

  setMarker(position);
  localStorage.setItem('position', getStringRepresentation(position));
  /*
  positions = loadPositions();
  positions.push(getStringRepresentation(position));
  localStorage.setItem('positions', JSON.stringify(positions));  
  console.log("Positions saved");
  */
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

var setMarker = function(position){
  var opts = {
    map: map,
    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    title: "Parked at " + new Date(position.timestamp).toUTCString()
  }
  var marker = new google.maps.Marker(opts);
  google.maps.event.addListener(marker, 'click', function(){
    new google.maps.InfoWindow({
      content: '<h3>You parked your car here at ' + new Date(position.timestamp).toUTCString() + '</h3>'
    }).open(map, marker);
  })  
  markers.push(marker);  
}

/**
* Load positions from localStorage
*/
var loadPositions = function(){
  var positions = localStorage.getItem('positions') || '[]';
  return JSON.parse(positions);
}

var getStringRepresentation = function(position){
  return JSON.stringify({
    timestamp: position.timestamp,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
}