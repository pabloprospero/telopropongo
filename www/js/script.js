$(document).ready(function(){
  loadingPage();
  setTimeout(function(){
    $('#generoBox').fadeIn();
  }, 3000)
})

onLoad();

function onLoad(){
  $(window).on('load', function(){
    $('#loading').css('opacity', '0');
    setTimeout(function(){
      $('#loading').hide();
      animationHeader();
      roomEffect();
    }, 500);
    setTimeout(function(){
      if($("#myModal").hasClass('firstModal')){
        $("#myModal").modal({show: true});
        $('#myModal').find('.icon-modal').addClass('icon-modal-download');
        $("#myModal").removeClass('firstModal');
      }
      //animate share buttoms
      $('.bar-social').css('bottom', '0px')
    },1000);
  });
}

function animationHeader(){
  $('header').css('min-height', '50px').css('overflow', 'inherit');
  $('header').find('.container-fluid').css('min-height', '50px');
  $('header').find('h1').css('opacity', '1');
  setTimeout(function(){
    $('.have-promo i').css('opacity', '1');
  }, 500);
}

function loadingPage(){
  var n = 0;
  setInterval(function(){
    switch(n){
      case 0:
        $('.cont-loading').html('<p class="small-font">Cargando</p>');
      break;
      case 1:
        $('.cont-loading').html('<p class="small-font">Cargando.</p>');
      break;
      case 2:
        $('.cont-loading').html('<p class="small-font">Cargando..</p>');
      break;
      case 3:
        $('.cont-loading').html('<p class="small-font">Cargando...</p>');
        n = 0;
      break;
    }
    n++;

  }, 1000);
}

function roomEffect(){
  setTimeout(function(){
    $('#infoHotel #bannerHotel .ifroom div').css('width', '228px').css('opacity', '1');
  },800)
}

function activeLoading(activo){
  if(activo){
    $('#loading').css('display', 'block');
    setTimeout(function(){
      $('#loading').css('opacity', '1');
    }, 100)
  }else {
    $('#loading').css('opacity', '0');
    setTimeout(function(){
      $('#loading').hide();
    }, 500)
  }
}

function seguroReserva(idTarifa){
  currentTarifa = idTarifa;
  removeClassIconsModal('icon-modal-question');
  $('#myModal').find('.modal-body').html('<p class="middle-font">¿Estás seguro que deseas reservar esta habitación?</p>');
  $('#myModal').find('.modal-footer').html('<a href="#" class="btn btn-cancel pull-left" data-dismiss="modal">No, cancelar</a> <a href="#" class="btn btn-confirm pull-right" onclick="makeReserva();">Sí, reservar</a>')
}

function confirmaReserva(codigo){
  removeClassIconsModal('icon-modal-confirm');
  $('#myModal').find('.modal-body').html('<p class="middle-font">¡A disfrutar!</p>');
  $('#myModal').find('.modal-body').append('<p>Tu código de reserva es:<br /><span class="big-font"><b>'+codigo+'</b></span></p>');
  //En caso de querer agregar alguna info más, deben de hacerlo aquí
  $('#myModal').find('.modal-footer').html('<a href="#" class="btn btn-confirm" data-dismiss="modal" onclick="contadorActive();">¡Gracias!</a>');
}

function contadorActive(){
  $('body').append('<div class="contador" onclick="reviewReserva();" data-toggle="modal" data-target="#myModal"></div>');
  $('.contador').html('<i class="material-icons"></i><span>10:00s</span><b>'+codigo+'</b>');
  contador('.contador');
  return false;
}

function contador(target){
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1; //hoy es 0!
  var yyyy = hoy.getFullYear();
  var hora = hoy.getHours();
  var minute = hoy.getMinutes()+20;

  var objetivo = yyyy+"/"+mm+"/"+dd+" - "+hora+":"+minute;

  $(target).find('span').countdown(objetivo, function(event) {
      $(this).text(
        event.strftime('%M:%S')
      );
    });

}

function reviewReserva(){
	removeClassIconsModal('icon-modal-confirm');
	$('#myModal').find('.modal-body').html('<p class="middle-font">Te recordamos tu código de reserva</p>');
	$('#myModal').find('.modal-body').append('<p><br /><span class="big-font"><b>'+codigo+'</b></span></p>');
	$('#myModal').find('.modal-footer').html('<a href="#" class="btn btn-confirm pull-right" data-dismiss="modal">Gracias</a>');
}

function getPromo(){
  //Aquí se imprimirá el contenido de la promo
  removeClassIconsModal('icon-modal-promo');
  $('#myModal').find('.modal-body').html('<p class="middle-font">'+tituloPromo+'<br /><span class="small-font">'+descripcionPromo+'</span></p>');
  $('#myModal').find('.modal-footer').html('<a href="#" class="btn btn-confirm pull-right" data-dismiss="modal">Gracias!</a>');

  return false;
}

var searchClose = true;

$(document).on('click', '.appearsearch', function(e){
  e.preventDefault();
  if(searchClose == true){
    $(this).css('background-image', 'url("./images/close.png")');
    $('#search').addClass('appear-section-search');
    searchClose = false;
  }else {
    $(this).css('background-image', 'url("./images/search-white.svg")');
    $('#search').removeClass('appear-section-search');
    searchClose = true;
  }
})

function removeClassIconsModal(add){
  $('#myModal').find('.icon-modal').removeClass('icon-modal-question').removeClass('icon-modal-confirm').removeClass('icon-modal-promo').removeClass('icon-modal-download');
  $('#myModal').find('.icon-modal').addClass(add);
}

function selectGenero(target){
  if(target == 'icon-man'){
    sexo = "masculino";
  }else{
    sexo = "femenino";
  }

  $('.icon-genero').css('opacity', '0.2');
  $('.'+target).css('opacity', '1');
  return false;
}

/*$(document).on('click', '#selectedGenero', function(e){
  e.preventDefault();
  animateGenero('sale');
})*/

function animateGenero(accion){
  if(accion == 'entra'){
    $('#generoBox').fadeIn(500);
    setTimeout(function(){
      $('.contentGenero').css('width', '100%');
    },500)
  }else {
    $('.contentGenero').css('width', '0%');
    setTimeout(function(){
      $('#generoBox').fadeOut(500);
    },500)
  }
}

function viewServices(){
  var services = current_services;
  var path = $('#servicesAvailables').attr('data-path');
  removeClassIconsModal('icon-modal-services');
	$('#myModal').find('.modal-body').html('<p class="small-font">Estos son los servicios del hotel:</p><table></table>');
  for (var i in services) {
    var icono = services[i].icon;
    var nombre = services[i].nombre;
    $('#myModal').find('table').append('<tr><td style="background: #111;padding: 5px;"><img style="margin-bottom: 3px" src='+icono+' /></td><td style="padding-left: 10px"><b>'+nombre+'</b></td></tr><tr><td style="height: 5px"></td><td></td></tr>');
  }

	$('#myModal').find('.modal-footer').html('<a href="#" class="btn btn-confirm pull-right" data-dismiss="modal">Gracias</a>');
}

function contactForm(){
  $('#myModal').find('.modal-body').html('<p class="middle-font">¿Dudas o sugerencía?</p><p>Contactáte con nosotros, <br />te daremos una respuesta pronto.</p>'+
  '<div class="alert alert-success hide" style="padding: 15px; background: #7c9e3a; color: #445a19; text-align: center; margin-bottom: 10px">Envíado con éxito</div>'+
  '<div class="alert alert-danger hide" style="padding: 15px; background: #a24242; color: #541c1c; text-align: center;  margin-bottom: 10px">Error</div>'+
  '<div style="margin-bottom: 10px" class="form-group"><label style="color: #555; display: block; text-align: left;">Tu nombre</label><input style="border: solid 1px #ccc; height: 30px; line-height: 30px; color: #555; width: 100%" type="text" name="nombre" class="form-control" /></div>'+
  '<div style="margin-bottom: 10px" class="form-group"><label style="color: #555; display: block; text-align: left;">E-Mail</label><input style="border: solid 1px #ccc; height: 30px; line-height: 30px; color: #555; width: 100%" type="text" name="email" class="form-control" /></div>'+
  '<div style="margin-bottom: 10px" class="form-group"><label style="color: #555; display: block; text-align: left;">Teléfono</label><input style="border: solid 1px #ccc; height: 30px; line-height: 30px; color: #555; width: 100%" type="text" name="telefono" class="form-control" /></div>'+
  '<div style="margin-bottom: 10px" class="form-group"><label style="color: #555; display: block; text-align: left;">Mensaje</label><textarea style="resize:none;border: solid 1px #ccc; height: 70px; line-height: 30px; color: #555; width: 100%" name="mensaje" class="form-control" /></textarea>'+
  '<div style="text-align: right" class="form-group"><input type="submit" name="enviar" class="btn btn-confirm" value="Enviar" /></div>'+  '');
}
