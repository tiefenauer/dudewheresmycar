var nearby = function(){
  navigator.geolocation.getCurrentPosition(
    // success
    highlight
    // error
    ,function(position){
      console.log('Error occurred. Error code: ' + error.code);
    }
  );  
}

var highlight = function(currentPosition, types){
	if (!types)
		types = ['car_dealer', 'car_rental', 'car_repair', 'car_wash', 'gas_station'];
	var request = {
		location: new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude)
	 ,rankBy: google.maps.places.RankBy.DISTANCE
	 ,types: types
	}
	placesService.nearbySearch(request, onNearbyFound);
}

var onNearbyFound = function(results, status){
	setAllMap(null);
	if (status == google.maps.places.PlacesServiceStatus.OK){
		for (var i=0; i<results.length; i++){
			var place = results[i];
			createMarker(results[i]);
		}			
	}
}

var createMarker = function(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function(){
  	new google.maps.InfoWindow({
  		content: place.name
  	}).open(map, marker);
  });
  markers.push(marker);
};

var getDetails = function(result){
	placesService.getDetails({reference: result.reference});
}