function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  var errorMessage = 'Fallo el servicio de Geolocalizacion o esta desactivado.';
  var errorSupport = 'Tu navegador no soporta Geolocalizacion o esta desactivado';
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? errorMessage : errorSupport );
}

function errorMotel(){}

function roomError(){}

function categoriesError(){}

function categoriaError(){}

function motelesError(){}
