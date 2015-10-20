app.controller('clienteCtrl', function($scope, $state, $stateParams, $window, clienteBDService, $rootScope) {
  $scope.clientes = clienteBDService.lista();

  $scope.cliente = {};

  var clienteId =  $stateParams.clienteId;
  if(clienteId != undefined){
    $scope.cliente = clienteBDService.carrega(clienteId);
  }
  $scope.isVisualizando =  $stateParams.visualizar;
  if($scope.isVisualizando == undefined){
    $scope.isVisualizando = false;
  }
  $scope.visualizar = function(id){
    $state.go("app.updatecliente", {"clienteId": id, "visualizar":true});
  };

  $scope.alterar = function(id){
    $state.go("app.updatecliente", {"clienteId": id});
  };

  $scope.excluir = function(id){
    clienteBDService.deletar(id);
    $window.location.reload(true);
  };

  $rootScope.$broadcast('$cordovaPush:notificationReceived', { any: {} });

  $scope.email = function(){
    window.open('test@example.com?subject=subject&body=body');
  };


  $scope.adicionar = function(){
    if ($scope.cliente.id != undefined) {
      clienteBDService.altera($scope.cliente);
    } else {
      clienteBDService.adiciona($scope.cliente);
    }

    $scope.cliente = {};

    $state.go("app.listadeclientes");
    $window.location.reload(true);
  }

})
