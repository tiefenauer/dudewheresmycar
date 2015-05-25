var gas = function(){
  navigator.geolocation.getCurrentPosition(
    // success
    highlightGas
    // error
    ,function(position){
      console.log('Error occurred. Error code: ' + error.code);
    }
  );  

	var request = {
		location: map.getCenter()
	 ,rankBy: google.maps.places.RankBy.DISTANCE
	 ,types: ['gas_station']
	}
	placesService.nearbySearch(request, onGasStationsFound);
};

var highlightGas = function(currentPosition){	
	highlight(currentPosition, ['gas_station']);
};