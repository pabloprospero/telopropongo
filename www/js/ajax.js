var api_base_url = "http://api.telopropongo.com/api/";
var base_url = "http://dev.telopropongo.com/";

var hora_inicio = null;
var hora_fin    = null;
var reservas_anteriores = null;

function getCategoria(motel_id,categoria_id){
  $.ajax({
      url: api_base_url+"motel/"+motel_id+"/categoria/"+categoria_id,
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      event.stopImmediatePropagation();
      categoria = data.content.categoria;
    })
    .fail(function(data) {
      categoria = null;
  }).always(function(data){
    if(categoria == null){
      categoriesError();
    }else{
      current_categoria = categoria[0];
    }
  });
}

function getRoomsByCategory(category_id){
  $.ajax({
      url: api_base_url+"motel/roomsbycategory/"+category_id,
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      event.stopImmediatePropagation();
      rooms = data.content.habitaciones;
    })
    .fail(function(data) {
      rooms = null;
      roomError();
  }).always(function(data){
    if(data.content != null){
      if(rooms == null){
        roomError();
      }
    }

  });
}

function getCategories(motel_id){
  $.ajax({
      url: api_base_url+"motel/"+motel_id+"/categorias",
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      event.stopImmediatePropagation();
      categorias = data.content.categorias;
    })
    .fail(function(data) {
      categorias = null;
      categoriesError();
  }).always(function(){
    if(categorias != null){
      loadCategories(categorias);
    }else{
      categoriesError();
    }
  });

}

function getRoom(motel_id,room_id){
  $.ajax({
      url: api_base_url+"motel/"+motel_id+"/room/"+room_id,
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      event.stopImmediatePropagation();
      room = data.content.habitacion;
      current_room = room[0];
      setTimeout(loadRoomDetails,1500);
    })
    .fail(function(data) {
      room = null
  });
}

function getMoteles(){
  $.ajax({
      url: api_base_url+'motel/info',
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      event.stopImmediatePropagation();
      moteles = data.content.moteles;
    })
    .fail(function(data) {
      moteles = null;
  }).always(function(){
    if(moteles != null){
      setTimeout(procesarMoteles(moteles),1000);
    }
  });
}

function getMotel(id){
  $.ajax({
      url: api_base_url+"motel/"+id+"/info",
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      event.stopImmediatePropagation();
      motel = data.content.motel;
      if(motel != null){
        current_motel = motel[0];
        cargarInfoMotel(motel);
        getCategories(motel[0].id);
      }
    })
    .fail(function(data) {
      motel = null;
  });
}

function generateUser(sexo,edad){
  userData = {
    "edad":edad,
    "sexo":sexo
  };

  $.post(api_base_url+"generateuser",
  userData,"json").
  done(function( data ) {
    event.stopImmediatePropagation();
    user = data.content.credentials.user;
    setDataSession();
  });
}

$.ajaxSetup({
  headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') }
});

function setDataSession(){

  var data = {
    "user":user,
    "sexo":sexo
  };

  $.post(base_url+"setuserdata",data,"json").done(function(data){
    event.stopImmediatePropagation();
  });
}

function getDataSession(){
  $.get(base_url+"getuserdata").done(function(data){
    user = data.user;
    sexo = data.sexo;
    //setTimeout(checkReservas(),900);
  });
}


function makeReserva(){
  var temp_room_id = null;
  if(current_room != null){
    temp_room_id = current_room.id
  }

  var reserva = {
    "reserva": {
      "credentials" : user,
      "motel_id" : current_motel.id,
      "categoria_id" : current_categoria.id,
      "tarifa_id" : currentTarifa,
      "habitacion_id" : temp_room_id
    }
  };

  $.post(api_base_url+"reserva",reserva,"json")
    .done(function(data) {
      codigo = data.content.codigo_reserva;
      setTimeout(confirmaReserva(codigo),900);
    });
}

function checkReservas(){
  $.ajax({
      url: api_base_url+"getreserva/"+user,
      method:"GET",
      dataType: "json"
    })
    .done(function(data) {
      //reservas_anteriores = data.content.reserva;
      if(reservas_anteriores != null){
        //codigo = data.content.reserva.codigo;
        //hora_inicio = data.content.reserva.hora_inicio;
        //hora_fin = data.content.reserva.hora_fin;
        console.log(data);
      }
    })
    .fail(function(data) {
      reservas = null;
  });
}
