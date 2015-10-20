// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'ui.utils.masks', 'ngCordova'])

.run(function($ionicPlatform, $cordovaPush) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


    var androidConfig = {
      "senderID": "1059902605332",
    };

    document.addEventListener("deviceready", function(){
      $cordovaPush.register(androidConfig).then(function(result) {
        console.log("Sucesso");
      }, function(err) {
        console.log(err);
      })

      $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        switch(notification.event) {
          case 'registered':
            if (notification.regid.length > 0 ) {
              alert('registration ID = ' + notification.regid);
            }
            break;

          case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
            break;

          case 'error':
            alert('GCM error = ' + notification.msg);
            break;

          default:
            alert('An unknown GCM event has occurred');
            break;
        }
      });


      // WARNING: dangerous to unregister (results in loss of tokenID)
/*      $cordovaPush.unregister(options).then(function(result) {
        // Success!
      }, function(err) {
        // Error
      })*/

    }, false);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.listadeclientes', {
      url: '/listadeclientes',
      views: {
        'menuContent': {
          templateUrl: 'templates/listadeclientes.html',
          controller: 'clienteCtrl'
        }
      }
    })

    .state('app.cadastrodecliente', {
      url: '/cadastrodecliente',
      views: {
        'menuContent': {
          templateUrl: '/templates/cadastrocliente.html',
          controller: 'clienteCtrl'
        }
      }
    })
    .state('app.updatecliente', {
      url: '/updatecliente/:clienteId/:visualizar',
      views: {
        'menuContent': {
          templateUrl: '/templates/cadastrocliente.html',
          controller: 'clienteCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/listadeclientes');
});

app.constant('FIREBASE_URI', 'https://controledevendas.firebaseio.com/');
