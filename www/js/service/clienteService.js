app.factory('clienteService', function(){

  function adiciona(cliente){
    var clientes = JSON.parse(sessionStorage.getItem('clientes'));
    cliente.id = Math.floor(Math.random() * (999999 - 0 + 1)) + 0;
    if(clientes == undefined || clientes == ""){
      clientes = [];
    }
    clientes.push(cliente);
    sessionStorage.setItem('clientes', JSON.stringify(clientes));
  };

  function lista(){
    return JSON.parse(sessionStorage.getItem('clientes'));
  }

  function altera(cliente){
    var clientes = JSON.parse(sessionStorage.getItem('clientes'));
    var t = [];
    angular.forEach(clientes, function(value, key) {
      if(value.id == cliente.id){
        t.push(cliente);
      } else {
        t.push(value);
      }
    });
    sessionStorage.setItem('clientes', JSON.stringify(t));
  }

  function carrega(id){
    var clientes = JSON.parse(sessionStorage.getItem('clientes'));
    var retorno;
    angular.forEach(clientes, function(value, key) {
      if(value.id == id){
        retorno = value;
      }
    });
    return retorno;
  }

  function exclue(id){
    var clientes = JSON.parse(sessionStorage.getItem('clientes'));
    var t = [];
    angular.forEach(clientes, function(value, key) {
      if(value.id != id){
        t.push(value);
      }
    });
    sessionStorage.setItem('clientes', JSON.stringify(t));
  }

  return {
    adiciona: adiciona,
    lista: lista,
    carrega: carrega,
    altera: altera,
    exclue: exclue
  }
});
