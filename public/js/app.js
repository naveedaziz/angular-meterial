var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
   $routeProvider
      .when("/", {
         templateUrl: "partials/home.html"
      })
      .when("/organization_commitee", {
         templateUrl: "partials/organization_commitee.html"
      })
      .when("/schedule", {
         templateUrl: "partials/schedule.html"
      })
      .when("/organization_comitee", {
         templateUrl: "partials/organization_comitee.html"
      })
      .when("/message", {
         templateUrl: "partials/message.html"
      })
   //$locationProvider.html5Mode(true).hashPrefix('*');
});