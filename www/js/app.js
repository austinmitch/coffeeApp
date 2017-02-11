// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var coffeeApp = angular.module('coffeeApp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope,$location) {

  $rootScope.home = function() {
    $location.path('list');
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

coffeeApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/list',
    {
      controller: 'ListController',
      templateUrl: 'partials/coffeeList.html'
    })
  .when('/recipe/:coffeeId',
    {
      controller:'RecipeController',
      templateUrl:'partials/recipe.html'
    })
  .otherwise({redirectTo:'/list'});
}]);

coffeeApp.controller('ListController', ['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){
  $scope.loadCoffee = function() {
    $ionicLoading.show();
    $http.get("http://192.168.0.20:8888/coffee/")
    .success(function(response){
      console.log(response);
      $scope.drinks = response;
      $ionicLoading.hide();
    });
  };
  $scope.loadCoffee();
}]);

coffeeApp.controller('RecipeController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams){
  $ionicLoading.show();
  $http.get("http://192.168.0.20:8888/coffee/"+$routeParams.coffeeId)
  .success(function(response){
    console.log(response);
    $scope.drink = response;
    $scope.ingredients = response.ingredients;
    $ionicLoading.hide();
  })
}]);
