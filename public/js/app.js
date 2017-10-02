var app = angular.module("myApp", ['ui.router']);
// app.config(function ($routeProvider, $locationProvider) {
//    $routeProvider
//       .when("/", {
//          templateUrl: "partials/home.html"
//       })
//       .when("/organization_commitee", {
//          templateUrl: "partials/organization_commitee.html"
//       })
//       .when("/schedule", {
//          templateUrl: "partials/schedule.html"
//       })
//       .when("/organization_comitee", {
//          templateUrl: "partials/organization_comitee.html"
//       })
//       .when("/message", {
//          templateUrl: "partials/message.html"
//       })
//    //$locationProvider.html5Mode(true).hashPrefix('*');
// });

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

   $urlRouterProvider.otherwise('/');

   // UI Router States
   // Inserting Page title as State Param
   $stateProvider
      .state('home', {
         url: '/',
         templateUrl: 'partials/home.html',
         params: {
            title: "Welcome to"
         }

      })
      .state('organization', {
         url: '/organization',
         templateUrl: 'partials/organization_comitee.html',
         params: {
            title: "Organization Commitee"
         }
      })
      .state('message', {
         url: '/message',
         templateUrl: 'partials/message.html',
         params: {
            title: "Agenda"
         }
      })
      .state('schedule', {
         url: '/schedule',
         templateUrl: 'partials/schedule.html',
         params: {
            title: "Sponsor"
         }
      })
      .state('network', {
         url: '/network',
         templateUrl: 'partials/network.html',
         params: {
            title: "Accomodation"
         }
      })
   //$locationProvider.html5Mode({ enabled: true, requireBase: false });

});