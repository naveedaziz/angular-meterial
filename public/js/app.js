var app = angular.module("myApp", ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

   $urlRouterProvider.otherwise('/');

   // UI Router States
   // Inserting Page title as State Param
   $stateProvider
      .state('home', {
         url: '/',
         templateUrl: 'partials/home.html',
         params: {
            title: "Welcome to AFES"
         }

      })
      .state('organization', {
         url: '/organization',
         templateUrl: 'partials/organization_comitee.html',
         params: {
            title: "Organization Co.. "
         }
      })
      .state('message', {
         url: '/message',
         templateUrl: 'partials/message.html',
         params: {
            title: "President Message"
         }
      })
      .state('schedule', {
         url: '/schedule',
         templateUrl: 'partials/schedule.html',
         params: {
            title: "Scientific Programe"
         }
      })
      .state('network', {
         url: '/network',
         templateUrl: 'partials/network.html',
         params: {
            title: "Network"
         }
      })
      .state('faculty', {
         url: '/faculty',
         templateUrl: 'partials/faculty.html',
         params: {
            title: "Faculty"
         }
      })
      .state('gallery', {
         url: '/gallery',
         templateUrl: 'partials/gallery.html',
         params: {
            title: "Gallery"
         }
      })
      .state('sponsors', {
         url: '/sponsors',
         templateUrl: 'partials/sponsors.html',
         params: {
            title: "Gallery"
         }
      })
      .state('video', {
         url: '/video',
         templateUrl: 'partials/video.html',
         params: {
            title: "Video"
         }
      })
   //$locationProvider.html5Mode({ enabled: true, requireBase: false });

})
   .controller('AppController', function ($scope, $state, $stateParams, $rootScope){
      $scope.updateTitle = function(state,pre){
         $scope.title = pre.params.title;
      }
      $rootScope.$on('$stateChangeSuccess', $scope.updateTitle);
      
})