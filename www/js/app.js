(function(){
  var app = angular.module('starter', ['ionic', 'angular-md5']);

  app.factory('MarvelService', MarvelService);
  MarvelService.$inject = ['$http', '$q', 'md5'];

  app.controller('MarvelController', MarvelController);
  MarvelController.$inject = ['MarvelService'];

  function MarvelController(MarvelService){
    var vm = this;
    vm.char = {};
    vm.changeChar = changeChar;

    function changeChar(){
      MarvelService.getCharacters()
        .then(function(data){
          var arr = data.data.data.results;
          vm.char = arr[Math.floor(Math.random() * arr.length)];
          console.log(vm.char);
        });
    }

  }

  function MarvelService($http, $q, md5){
    var publicKey = '';
    var privateKey = '';
    var ts = Date.now();

    var hash = md5.createHash(ts+privateKey+publicKey);
    var baseUrl = 'http://gateway.marvel.com/v1/';

    return {
      getCharacters: getCharacters
    };

    function getCharacters() {
      var def = $q.defer();

      $http.get(baseUrl + 'public/characters', {
          params: {
            ts: ts,
            apikey: publicKey,
            hash: hash,
            limit: 50
          }
        })
        .then(def.resolve)
        .catch(def.reject);

      return def.promise;
    }
  }

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
})();
