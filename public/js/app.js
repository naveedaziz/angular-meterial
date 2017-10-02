var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
   $routeProvider
      .when("/", {
         templateUrl: "partials/home.html"
      })
      .when("/organization_commitee", {
         templateUrl: "partials/organization_commitee.html"
      })
});