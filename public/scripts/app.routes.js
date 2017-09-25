var router = angular.module('materialApp.routes', ['ui.router']);
router.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    // UI Router States
    // Inserting Page title as State Param
    $stateProvider
        .state('default', {
           url: '/',
            templateUrl: 'partials/home.html',
            params: {
               title: "Welcome to"
            }
            
        })
     
       .state('about', {
          url: '/about',
          templateUrl: 'partials/about.html',
          params: {
             title: "About AFES"
          }
       })
       .state('organization', {
          url: '/organization',
          templateUrl: 'partials/organization.html',
          params: {
             title: "Organization Commitee"
          }
       })
       .state('agenda', {
          url: '/agenda',
          templateUrl: 'partials/agenda.html',
          params: {
             title: "Agenda"
          }
       })
       .state('sponsor', {
          url: '/sponsor',
          templateUrl: 'partials/sponsor.html',
          params: {
             title: "Sponsor"
          }
       })
       .state('accomodation', {
          url: '/accomodation',
          templateUrl: 'partials/accomodation.html',
          params: {
             title: "Accomodation"
          }
       })
    //$locationProvider.html5Mode({ enabled: true, requireBase: false });

});
angular.module('tabsDemoDynamicHeight', ['ngMaterial']);