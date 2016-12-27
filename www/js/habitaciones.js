var room = null;
var current_room = null;
var rooms = null;

function viewServicesRoom(id){
  viewServices();
}

function processRoom(id){
  getRoom(current_motel.id, id);
}

function loadRoomDetails(){
  channgeStep('.step3');
  addToStack('room');

  var tarifas = current_categoria.tarifas;
  var servicios;
  if(current_room.servicios.length > 0){
    servicios = current_room.servicios;
    current_services = servicios;
  }

  clearServices();

  try{
    if(undefined !== current_categoria.total_habitaciones && current_categoria.total_habitaciones > 0){
     state = '<div class="room-good"><img src="www/images/hotel/room-good.svg" /> Habitaciones disponibles!</div>';
    }else{
     state = '<div class="room-bad"><img src="www/images/hotel/room-bad.svg" /> No quedan habitaciones.</div>';
    }
  }catch(e){
    console.log("Error al obtener disponibilidad del motel: "+e);
  }finally{}

  $('#infoHotel').find('.ifroom').html(state);

  for(i in servicios){
    var image_service = servicios[i].icon;
    $('#servicesAvailables').children('ul').append('<li><a data-toggle="modal" data-target="#myModal" onclick="viewServices();" href="#" title="'+servicios[i].nombre+'"><img src="'+image_service+'" /></a></li>');
  }

  var images = current_room.images;
  //imprimo nombre de habitación
  $('.cont-categorias .step3').html('<h3>'+current_room.nombre+'</h3><div class="content-room"></div>');
  for (var i in images) {
    $('.step3 .content-room').append('<div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 image-room" style="background-image: url('+images[i].path+')"><div class="overlay overlay-black"><a href="'+images[i].path+'" data-lightbox="image-1"><i class="center-center"></i></a></div></div></div>')
  }
  //creo contenedor donde irán los datos de la habitación seleccionada
  $('.step3 .content-room').append('<div style="clear: both"><div class="container-fluid"><div class="row details"></div></div></div>');

  $('.details').append('<p>Precios</p>'+'<table id="precios"></table>');
  for (var i in tarifas) {

    var initrow = '<tr>';
    var iconrow = '<td><i class="material-icons">&#xE425;</i>'+'<td colspan="1">&nbsp<td>';
    var nombrerow = '<td>'+tarifas[i].nombre+'</td>';
    var preciorow = '<td class="right">'+tarifas[i].precio+'</td>'+'<td colspan="2">&nbsp<td>';
    var reservarow = null;

    if(current_categoria.total_habitaciones > 0){
      reservarow = '<td class="right">'+'<a href="#" class="btn btn-reserva" data-toggle="modal" data-target="#myModal" onclick="seguroReserva('+tarifas[i].id+');">Reservar</a>'+'</td>';
    }else{
      reservarow = '<td class="right">Sin Reserva</td>';
    }

    var endrow = '</tr>';

    var tarifa = initrow+iconrow+nombrerow+preciorow+reservarow+endrow;

    $('#precios').append(tarifa);
  }



}

function loadRooms(){
  channgeStep('.step2');
  addToStack('rooms');
  $('.cont-categorias').find('.step2').html('<h3>Habitaciones '+current_categoria.nombre+'</h3><div class="content-room"></div>');

  for (var i in rooms) {
    var images_parsed = JSON.parse(rooms[i].images);
    var image = images_parsed[0].path;

    $('#infoHotel').find('.step2').children('.content-room').append('<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 bg-cat" onclick="processRoom('+rooms[i].id+')" style="background-image: url('+image+')">'+
      '<div class="overlay overlay-black" data-room="roma">'+
        "<h3 class='center-center middle-font'>"+rooms[i].nombre+"</h3>"+
      '</div>'+
    '</div>');
  }
}
function clearRooms(){
  $(".step3").find('.image-room').remove();
  rooms = null;
  current_room = null;
  current_categoria_id = null;
}
