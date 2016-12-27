$(document).on('click', '.info-hotel', function(e){
  e.preventDefault();

  channgeStep('.step1');
  //Tomo id de hotel (acá quien integre el frontend con el backend debe tomar la ID y llamar a los datos, guardarlos en variables)
  var idHotel = $(this).attr('href');

  //modifico url
  history.pushState(null, "", idHotel);
  //muestro botón back
  $('#goBack').removeClass('hidenback');
  $('.appearsearch').addClass('hidensearch');


  //datos truchos
  var name = 'El Edén';
  var logo = './images/hotel/logo-eden.jpg';
  var firstImage = 'https://www.eleden.com.uy/images/banner/1.jpg';
  //datos de categorías
  var imagesCat = [
    [
      "https://www.eleden.com.uy/images/habitaciones/suites/bamboo1.jpg",
      "Suites"
    ],
    [
      "https://www.eleden.com.uy/images/habitaciones/especiales/bdsm1.jpg",
      "Especiales"
    ],
    [
      "https://www.eleden.com.uy/images/habitaciones/lujo/casa4.jpg",
      "Lujo"
    ],
    [
      "https://www.eleden.com.uy/images/habitaciones/imperiales/dubai1.jpg",
      "Imperiales"
    ]
  ]
  var address = 'Dr Juan B. Morelli 4002';
  var room = true;
  var promo = true;
  if(promo == true){
    promo = '<div class="have-promo"><a href="#" class="center-center" data-toggle="modal" data-target="#myModal" onclick="getPromo();"></a><i></i></div>';
  }else {
    promo = '';
  }
  if(room == true){
    room = '<div class="room-good"><img src="images/hotel/room-good.svg" /> Habitaciones disponibles!</div>';
  }else {
    room = '<div class="room-bad"><img src="./images/hotel/room-bad.svg" /> No quedan habitaciones.</div>';
  }

  $('#infoHotel').addClass('info-hotel-active');
  setTimeout(function(){
    //Cargo todos los datos acá
    $('#infoHotel').find('.logo').css('background-image', 'url("'+logo+'")');
    $('#infoHotel').find('h2').html(name);
    $('#infoHotel').find('.address').html(address);
    $('#infoHotel').find('.ifroom').html(room);
    $('#infoHotel').find('#bannerHotel').css('background-image', 'url("'+firstImage+'")');
    $('header').append(promo);

    //Imprimo servicios
    $.each(services, function(k, v){
      $('#servicesAvailables').children('ul').append('<li><a data-toggle="modal" data-target="#myModal" onclick="viewServices();" href="#" title="'+services[k].title+'"><img src="./images/hotel/'+services[k].icon+'" /></a></li>');
    });

    //$('#infoHotel').find('.cont-categorias').html(room);
    $.each(imagesCat, function(v, k){
      $('#infoHotel').find('.cont-categorias').children('.step1').append('<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 bg-cat" style="background-image: url('+k[0]+')">'+
        '<div class="overlay overlay-black" data-cat="'+k[1]+'">'+
          '<h3 class="center-center middle-font"><a href="#">'+k[1]+'</a></h3>'+
        '</div>'+
      '</div>');
    });
  }, 700);


  //Al finalizar ejecuto efectos:
  roomEffect();
});

//suponiendo que "habitaciones" es el objeto de habitaciones disponibles
var habitaciones =  [
    {
      "img" : "https://www.eleden.com.uy/images/habitaciones/suites/bamboo1.jpg",
      "name" : "BAMBOO",
      "id" : "1",
      "price" : {
        "Media hora" : "$450",
        "Hora" : "$810",
        "Matutino" : "$1215",
        "Nocturno" : "$1620"
      },
      "images" : [
          "https://media-cdn.tripadvisor.com/media/photo-s/02/23/5f/42/suite-prado-hotel.jpg",
          "https://www.barcelo.com/barcelohotels/es_es/images/suite-hotel-barcelo-hamburg37-70136.jpg",
          "http://realmexico.me/wp-content/uploads/2015/05/suite_presidencial_1.jpg",
          "http://www.hotelartsbarcelona.com/sites/www.hotelartsbarcelona.com/files/media-images/accommodation/hotel-arts-barcelona-accommodation-suites-1-1173.jpg"
      ]
    },
    {
      "img" : "https://www.eleden.com.uy/images/habitaciones/suites/daysi1.jpg",
      "name" : "LO DE DAYSI",
      "id" : "2",
      "price" : {
        "Media hora" : "$450",
        "Hora" : "$810",
        "Matutino" : "$1215",
        "Nocturno" : "$1620"
      },
      "images" : [
          "http://www.luxuriousmexico.com/wwwluxuriousmexico/Luxurious%20Mexico/PicsChiapas/Chiapas,%20Tuxtla%20Gutierrez,%20Hotel%20Camino%20Real,%20Suite%20Presidential,%20Bedroom%20-%20Photo%20by%20Camino%20Real.jpg",
          "https://images.trvl-media.com/hotels/1000000/10000/7800/7745/7745_65_z.jpg",
          "http://s2.glbimg.com/7ATUYai_Kgh__oB16fEb_nHyN6OTC6EZ8M68hFgF8EBIoz-HdGixxa_8qOZvMp3w/s.glbimg.com/jo/g1/f/original/2013/01/22/emiliano2.jpg",
          "http://cdn.home-designing.com/wp-content/uploads/2011/08/Bali-Viceroy-Garden-Villa-Bedroom.jpg"
      ]
    }
  ];

// cuando hacen click en una categoría, cargo datos de la categoría seleccionada
$(document).on('click', 'div[data-cat]', function(e){
  e.preventDefault();

  channgeStep('.step2');
  //modifico url agregando id de la categoría
  var id = $(this).attr('data-cat');
  var str = window.location.pathname;
  var newPath = str.split("/").pop();
  history.pushState(null, "", newPath + '/' + id);

  //activo loading
  activeLoading(true);
  //cargo datos de la categoría en si
  printRooms();
  //desactivo loading
  activeLoading(false);
})

function printRooms(){
  //imprimo el nombre de la categoría seeccionada anteriormente
  $('.cont-categorias').find('.step2').html('<h3>Habitaciones Nombre de categoría</h3><div class="content-room"></div>');

  $.each(habitaciones, function(k, v){
    $('#infoHotel').find('.step2').children('.content-room').append('<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 bg-cat" style="background-image: url('+habitaciones[k].img+')">'+
      '<div class="overlay overlay-black" data-room="'+habitaciones[k].id+'">'+
        '<h3 class="center-center middle-font"><a href="#">'+habitaciones[k].name+'</a></h3>'+
      '</div>'+
    '</div>');
  });
}

//Cuando hacen click en una habitación
$(document).on('click','div[data-room]',function(e){
  e.preventDefault();
  channgeStep('.step3');
  //guardo aquí la ID de la habitación par aluego hacer la consulta llamando a esa habiatción
  var idRoom = $(this).attr('data-room');
  var str = window.location.pathname;
  var newPath = str.split('/').pop();
  history.pushState(null, "", newPath + '/' + idRoom);

  //activo loading
  activeLoading(true);
  //imprimo detalles de la habitación
  loadRoomDetails(idRoom);
  //oculto loading
  activeLoading(false);
})

function loadRoomDetails(id){
  //Ya tenemos la id, hago un for del objeto "habitaciones", llamandola por la ID
  $.each(habitaciones, function(key, v){
    if(habitaciones[key].id == id){
      //imprimo nombre de habitación
      $('.cont-categorias .step3').html('<h3>'+habitaciones[key].name+'</h3><div class="content-room"></div>');
      $.each(habitaciones[key].images, function(k, v){
        $('.step3 .content-room').append('<div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 image-room" style="background-image: url('+habitaciones[key].images[k]+')"><div class="overlay overlay-black"><a href="'+habitaciones[key].images[k]+'" data-lightbox="image-1"><i class="center-center"></i></a></div></div></div>')
      })
    }
  })

  //creo contenedor donde irán los datos de la habitación seleccionada
  $('.step3 .content-room').append('<div style="clear: both"><div class="container-fluid"><div class="row details"></div></div></div>');

  //imprimo tabla con datos
  $('.details').append('<p>Precios</p>'+'<table>');
  for (var i in tarifas) {
    var tarifa = '<tr>'+
      '<td><i class="material-icons">&#xE425;</i>'+
      '<td>'+tarifa.nombre+'</td>'+
      '<td class="right">'+tarifa.precio+'</td>'+
      '</tr>'+'<a href="#" class="btn btn-reserva" data-toggle="modal" data-target="#myModal" onclick="seguroReserva();">Reservar</a>';
    $('.details').append(tarifa);
  }
  $('.details').append('</table>');
}
