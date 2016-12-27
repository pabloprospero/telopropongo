var map;
var mapCanvas;
var markers = [];
var infowindows = [];
var geocoder;

function initialize() {
  mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: {lat: -34.60810089, lng:-58.37261200},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    disableDefaultUI:true
  }
  map = new google.maps.Map(mapCanvas, mapOptions);

}

function procesarMoteles(moteles){

  for(var i in moteles) {
    var icon = "images/marks/client.svg";
    var cambiar_opacidad = false;
    var features = moteles[i].features;
    var latitud = moteles[i].ubicacion_latitud;
    var longitud = moteles[i].ubicacion_longitud;

    var position = { lat : parseFloat(latitud), lng : parseFloat(longitud) };
    var motel_id = moteles[i].id;
    var nombre = moteles[i].nombre;
    var direccion = moteles[i].direccion;
    var opacity = 1;

    var initrow = null;
    var endrow = null;
    var dataname = null;
    var dataddress = null;
    var state = moteles[i].state;

    initrow = "<tr>";

    dataname = "<td class='bold-font'><a onclick='goToMotel("+latitud+","+longitud+");'>"+nombre+"</a></td>";

    if(undefined !== features && "null" !== features && "" !== features && null !== features){
      icon = "images/marks/client-promo.svg";
      dataname = "<td class='bold-font'><a onclick='goToMotel("+latitud+","+longitud+");'>"+nombre+"<i></i></a></td>";
    }

    if(undefined !== state){
      if(state == "nocliente"){
        icon = {
          url: "images/marks/no-client.svg",
          scaledSize: new google.maps.Size(42,50), // scaled size
        };
        cambiar_opacidad = true;
      }else{
        if(moteles[i].habitaciones_count == 0){
          icon = "images/marks/mark2.svg";
          initrow = "<tr class='unavailable'>";
        }
      }
    }

    dataddress = "<td class='small-font'>"+direccion+"</td>";
    endrow = "</tr>";

    var row = initrow+dataname+dataddress+endrow;

    $("#tablabusqueda").append(row);

    if(cambiar_opacidad){
      opacity = 0.7;
    }

    var marker = {
      position : position,
      map : map,
      icon : icon,
      title : nombre,
      motel_id : motel_id,
      animation : google.maps.Animation.none,
      opacity:opacity
    };

    markers[i] = new google.maps.Marker(marker);
    var btn = "<a class='info-hotel' onclick='getMotel("+motel_id+")' >+ver habitaciones</a>";
    var name = nombre;
    var address = direccion;

    var infowindow = {
      content: '<div><b>'+name + '</b><br /><hr />' + address + '<br />' + btn+'</div>'
    }

    attachInfoWindow(marker,infowindow,i);
  }

  locateUser();

  initSearch();
}

function initSearch(){
  $('#tableSearch').dataTable( {
      "language": {
          "url": "./js/dataTable-Spanish.lang",
          "lengthMenu" : ['all']
      },
      "initComplete": function(settings, json) {
        $('#tableSearch_length').remove();
        $('#tableSearch_info, #tableSearch_paginate').remove();
        $('input[type="search"]').attr('placeholder', 'Nombre o dirección del telo');
      }
  });
}

function goToMotel(lat,lng){
  var pos = { lat : parseFloat(lat), lng : parseFloat(lng) };
  map.setZoom(13);
  map.setCenter(pos);
  $(".appearsearch").css('background-image', 'url("./images/search-white.svg")');
  $('#search').removeClass('appear-section-search');
  searchClose = true;
}

function attachInfoWindow(marker,infowindow,i){
  infowindows[i] = new google.maps.InfoWindow(infowindow);

  markers[i].addListener('click', function() {
    var currentMarker = this;
    infowindows[i].open(map, currentMarker);
    $('.gm-style-iw').prev().children().next().addClass('infowindow');
    $('.gm-style-iw').prev().children().next().next().children().children().addClass('punta');
    $('.gm-style-iw').next().css('opacity', '0.2').css('border-radius', '15px');
    map.setZoom(18);
    map.setCenter(this.position);
  });

  google.maps.event.addListener(infowindows[i],'closeclick',function(){
    map.setZoom(13);
    map.setCenter(this.position);
  });
}

function locateUser(){
  //geocoder = new google.maps.Geocoder;
  //if (navigator.geolocation) {
    /*navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };*/

      var pos = {
        lat : -34.60810089,
        lng : -58.37261200
      } 

      var clientIcon = "images/marks/mark-man.png";

      if(sexo == "masculino"){
        clientIcon = "images/marks/mark-man.png";
      }else{
        clientIcon = "images/marks/mark-woman.png";
      }

      var clientMarker = new google.maps.Marker({
        position: {
          lat : -34.60810089,
          lng : -58.37261200
        },
        map : map,
        icon : clientIcon,
        animation : google.maps.Animation.none
      });

      var infowindow = {
        content: 'Te encuentras aqui.'
      }

      var infoWindowClient = new google.maps.InfoWindow(infowindow);
      infoWindowClient.setPosition(pos);
      map.setCenter(pos);
  //  }, function() {
  //    handleLocationError(true, infoWindowClient, map.getCenter());
  //  });
//  } else {
    // Browser doesn't support Geolocation
//    handleLocationError(false, infoWindowClient, map.getCenter());
//  }
}
