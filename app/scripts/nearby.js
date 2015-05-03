var gasStations = function(){
	var request = {
		location: map.getCenter()
	 ,rankBy: google.maps.places.RankBy.DISTANCE
	 ,types: [
	 	 'car_dealer'
	 	,'car_rental'
	 	,'car_repair'
	 	,'car_wash'
	 	,'gas_station'
	 ]
	}
	service.nearbySearch(request, onGasStationsFound);
}

var onGasStationsFound = function(results, status){
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
};

var getDetails = function(result){
	service.getDetails({reference: result.reference});
}