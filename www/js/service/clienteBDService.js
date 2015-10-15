

app.factory('clienteBDService', ['$firebaseArray', 'FIREBASE_URI', function ($firebaseArray, FIREBASE_URI) {
  var ref = new Firebase(FIREBASE_URI);
  var items = $firebaseArray(ref);

  var lista = function () {
    return items;
  };

  var adiciona = function (item) {
    item.id = Math.floor(Math.random() * (999999 - 0 + 1)) + 0;
    items.$add(item);
  };

  var carrega = function (id) {
    var item;
    angular.forEach(items, function(value, key){
      if(value.id == id) {
        item = value;
      }
    })
    return item;
  };

  var alterar = function (id) {
    items.$save(id);
  };

  var deletar = function (id) {
    angular.forEach(items, function(value, key){
      if(value.id == id) {
        items.$remove(value);
      }
    })
  };

  return {
    lista: lista,
    carrega: carrega,
    adiciona: adiciona,
    alterar: alterar,
    deletar: deletar
  }
}]);
