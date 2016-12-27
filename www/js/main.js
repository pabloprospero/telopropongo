var stack = [];
var codigo = null;
var edad = null;
var sexo = null;
var user;
var currentTarifa = null;
var current_services = null;

var userData = {
  "edad":edad,
  "sexo":sexo
};

function addToStack(element){
  stack.push(element);
}

function lastElementOnStack(){
  var last = stack.length - 1;
  return stack[last];
}

function removeFromStack(value){
  stack = stack.filter(function(item) {
    return item !== value;
  });
}

function checkStack(){
  return stack.length;
}

function channgeStep(step){
    $('.cont-categorias').children('div').removeClass('active');
  switch(step){
    case '.step1':
      $('.cont-categorias .step2, .cont-categorias .step3').fadeOut();
      $('.cont-categorias .step1').fadeIn();
      $('.cont-categorias .step1').addClass('active');
      reloadCheckRooms();
    break;
    case '.step2':
      $('.cont-categorias .step1, .cont-categorias .step3').fadeOut();
      $('.cont-categorias .step2').fadeIn();
      $('.cont-categorias .step2').addClass('active');
    break;
    case '.step3':
      $('.cont-categorias .step1, .cont-categorias .step2').fadeOut();
      $('.cont-categorias .step3').fadeIn();
      $('.cont-categorias .step3').addClass('active');
    break;
  }
}

function backStack(){
  var total = checkStack();
  if(total > 1){
    var last = lastElementOnStack();
    removeFromStack(last);
    var newLast = lastElementOnStack();
    clearServices();
    switch (newLast) {
      case 'categorias' :
        channgeStep('.step1');
        break;
      case 'categoria' :
        channgeStep('.step1');
        break;
      case 'rooms' :
        channgeStep('.step1');
        break;
      case 'room' :
        channgeStep('.step2');
        break;
      default:
        break;
    }
  }else{
    $('#goBack').addClass('hidenback');
    $('.appearsearch').removeClass('hidensearch');
    ocultarMotel();
    clearMotel();
    clearCategories();
  }

}

function checkAndSend(){
  edad = $("#edad option:selected" ).text();

  var valid = false;

  if (sexo !=  null && edad != null) {
    valid = true;
  }

  if(valid){
    guardarDataUsuario();
    animateGenero('sale');
  }else{
    $("#errorGenero").html("");
    errorModalGenero();
    return false;
  }
}

function errorModalGenero(){
  $("#errorGenero").html("Debe seleccionar el genero.");
}

function guardarDataUsuario(){
  generateUser(sexo,edad);
}
