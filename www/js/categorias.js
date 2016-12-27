var categorias = null;
var categoria = null;
var current_categoria = null;
var current_tipo_reserva = null;
var current_categoria_id = null;

function loadCategory(id, tipo_reserva){
  getCategoria(current_motel.id,id);

  if(tipo_reserva == "habitacion"){
    getRoomsByCategory(id);
    setTimeout(loadRooms,1200);
  }else{
    setTimeout(loadtypeCategory,1200);
  }
}

function clearServices(){
  $('#servicesAvailables').children('ul').html('');
}


function loadtypeCategory(){
  channgeStep('.step3');
  addToStack('categoria');
  var state = null;
  var servicios;
  if(current_categoria.servicios.length > 0){
    servicios = current_categoria.servicios;
    current_services = servicios;
  }

  $('#infoHotel').find('.ifroom').html("");

  var images;

  try{
    if(undefined !== current_categoria.total_habitaciones && current_categoria.total_habitaciones > 0){
     state = '<div class="room-good"><img src="images/hotel/room-good.svg" /> Habitaciones disponibles!</div>';
    }else{
     state = '<div class="room-bad"><img src="images/hotel/room-bad.svg" /> No quedan habitaciones.</div>';
    }
  }catch(e){
    console.log("Error al obtener disponibilidad del motel: "+e);
  }finally{}

  if(current_categoria.images.length > 0){
    images = JSON.parse(current_categoria.images);
  }
  $('.cont-categorias .step3').html('<h3>'+current_categoria.nombre+'</h3><div class="content-room"></div>');

  for(i in servicios){
    var image_service = servicios[i].icon;
    $('#servicesAvailables').children('ul').append('<li><a data-toggle="modal" data-target="#myModal" onclick="viewServices();" href="#" title="'+servicios[i].nombre+'"><img src="'+image_service+'" /></a></li>');
  }

  for(i in images){
    $('.step3 .content-room').append('<div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 image-room" style="background-image: url(\''+images[i].path+'\')"><div class="overlay overlay-black"><a href="'+images[i].path+'" data-lightbox="image-1"><i class="center-center"></i></a></div></div></div>')
  }

  var tarifas = current_categoria.tarifas;

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

  $('#infoHotel').find('.ifroom').html(state);
}

function loadCategories(categories){
  addToStack('categorias');
  var contenedor = $('.cont-categorias .step1');

  for(var i in categories) {
    var image = categories[i].images[0].path;
    var name = categories[i].nombre;
    var tipo_reserva = categories[i].tipo_reserva;
    var id = categories[i].id;

    var containerCat    = "<div class='col-xs-12 col-sm-12 col-md-6 col-lg-6 bg-cat' onclick='loadCategory(" + id +',&quot;'+ tipo_reserva +"&quot;)' style='background-image: url(\""+image+"\")'>";
    var overlayCat      = "<div class='overlay overlay-black' data-cat='"+name+"'>";
    var titleCat        = "<h3 class='center-center middle-font'>"+name+"</h3>";
    var closeOverlay    = "</div>";
    var closeContainer  = "</div>";
    var agregar         = containerCat+titleCat+closeOverlay+closeContainer;

    contenedor.append(agregar);
  }
}

function clearCategories(){
  $(".step1").find('.bg-cat').remove();
  //categorias = null;
  //clearCategoria();
}

function clearCategoria(){
  current_categoria = null;
}
