var motel = null;
var current_motel_id = null;
var moteles;
var tituloPromo;
var descripcionPromo;

function clearMotel(){
  motel = null;
  current_motel = null;

  $('#infoHotel').find('.logo').css('background-image', 'url("")');
  $('#infoHotel').find('h2').html('');
  $('#infoHotel').find('.address').html('');
  $('#infoHotel').find('.description').html('');
  $('#infoHotel').find('.ifroom').html('');
  $('#infoHotel').find('#bannerHotel').css('background-image', 'url("")');
  $('#containerPromo').html('');
}

function verMotel(){
  $('#infoHotel').removeClass('hide');
  $('#infoHotel').addClass('info-hotel-active');
}

function ocultarMotel(){
  $('#infoHotel').removeClass('info-hotel-active');
}

function reloadCheckRooms(){
  $('#infoHotel').find('.ifroom').html('');

  try{
    if(undefined !== current_motel.habitaciones_count && current_motel.habitaciones_count > 0){
     state = '<div class="room-good"><img src="../images/hotel/room-good.svg" /> Habitaciones disponibles!</div>';
    }else{
     state = '<div class="room-bad"><img src="../images/hotel/room-bad.svg" /> No quedan habitaciones.</div>';
    }
  }catch(e){
    console.log("Error al obtener disponibilidad del motel: "+e);
  }finally{}

  $('#infoHotel').find('.ifroom').html(state);
}

function cargarInfoMotel(motel){
  var image       = null;
  var logo        = null;
  var state       = null;
  var descripcion = null;
  var features    = null;
  var promo       = null;
  var direccion   = null;
  var name        = null;

  channgeStep('.step1');

  $('.appearsearch').addClass('hidensearch');
  $('#goBack').removeClass('hidenback');

  try{
    if(undefined !== current_motel.images[0]){
      logo = current_motel.images[0].path;
    }
  }catch(e){
    console.log("Error al obtener logo del motel: "+e);
  }finally{}

  try{
    if(undefined !== current_motel.images[1]){
      image = current_motel.images[1].path;
    }
  }catch(e){
    console.log("Error al obtener imagen del motel: "+e);
  }finally{}

  try{
    if(undefined !== current_motel.direccion){
      direccion = current_motel.direccion;
    }
  }catch(e){
    console.log("Error al obtener direccion del motel: "+e);
  }finally{}

  try{
    if(undefined !== current_motel.name){
      name = current_motel.name;
    }
  }catch(e){
    console.log("Error al obtener nombre del motel: "+e);
  }finally{}

  try{
    if(undefined !== current_motel.habitaciones_count && current_motel.habitaciones_count > 0){
     state = '<div class="room-good"><img src="../images/hotel/room-good.svg" /> Habitaciones disponibles!</div>';
    }else{
     state = '<div class="room-bad"><img src="../images/hotel/room-bad.svg" /> No quedan habitaciones.</div>';
    }
  }catch(e){
    console.log("Error al obtener disponibilidad del motel: "+e);
  }finally{}

  try{
    if(undefined !== current_motel.descripcion){
      descripcion = current_motel.descripcion;
    }else{
      descripcion = "Sin descripcion";
    }
  }catch(e){
    console.log("Error al obtener descripcion del motel:"+e);
  }finally{}

  try{
    if(undefined !== features && "null" != features && "" != features){
      features = current_motel.features;
      if(features != null){
        if(features.length>0){
          var promoparsed = JSON.parse(features);

          if(undefined !== promoparsed.promo[0] && null !== promoparsed.promo[0]){
            if(undefined !== promoparsed.promo[0].nombre){
              tituloPromo = promoparsed.promo[0].nombre;
            }

            if(undefined !== promoparsed.promo[0].descripcion){
              descripcionPromo = promoparsed.promo[0].descripcion;
            }
          }

          promo = "<div class='have-promo'><a href='#' class='center-center' data-toggle='modal' data-target='#myModal' onclick='getPromo();'></a></div>";
        }
      }
    }
  }catch(e){
    console.log("Error al obtener promociones del motel: "+e);
  }finally{}

  $('#infoHotel').find('.logo').css('background-image', 'url("'+logo+'")');
  $('#infoHotel').find('h2').html(name);
  $('#infoHotel').find('.address').html(direccion);
  $('#infoHotel').find('#bannerHotel').css('background-image', 'url("'+image+'")');
  $('#infoHotel').find('.description').html(descripcion);
  $('#infoHotel').find('.ifroom').html(state);

  if(promo != null){
    $('#containerPromo').html(promo);
  }

  verMotel();
}
