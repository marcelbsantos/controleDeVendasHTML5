app.controller('clienteCtrl', function($scope, $state, $stateParams, $window, clienteBDService, $rootScope, $ionicUser, $ionicPush) {
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


  $scope.identifyUser = function() {
    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Metadata
    angular.extend(user, {
      name: 'Armando',
      bio: 'Author of Devdactic'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        return true;
      }
    });
  };


  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });
})
