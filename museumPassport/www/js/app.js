// Ionic museumPassport App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'museumPassport' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('museumPassport', [
  'ionic',
  'museumPassport.questions',
  'museumPassport.photoServices',
  'museumPassport.imageStoreServices',
  'museumPassport.answerSaveServices',
  'museumPassport.answers',
  'museumPassport.editAnswers',
  'museumPassport.services',
  'museumPassport.factories',
  'museumPassport.game',
  'museumPassport.login',
  'museumPassport.home',
  'museumPassport.exhibits',
  'ngResource',
  'ngCordova'
  ])

.run(function($ionicPlatform, $rootScope, $state) {

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.defaults.withCredentials = true;

  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginController'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  })

  .state('tab.exhibits', {
    url: '/exhibits',
    cache: false,
    templateUrl: 'templates/exhibits.html',
    views: {
      'tab-exhibits': {
        templateUrl: 'templates/exhibits.html',
        controller: 'ExhibitsController'
      }
    }
  })

  .state('tab.game', {
    url: '/game',
    views: {
      'tab-game': {
        templateUrl: 'templates/game.html',
        controller: 'GameController'
      }
    }
  })

  .state('tab.questions', {
    url: '/questions',
    cache: false,
    views: {
      'tab-questions': {
        templateUrl: 'templates/questions.html',
        controller: 'QuestionController'
      }
    }
  });

  $urlRouterProvider.otherwise('login');
});
