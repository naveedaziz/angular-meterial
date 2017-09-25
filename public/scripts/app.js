var materialApp = angular
.module('materialApp', [
    'materialApp.routes',
    'ui.router',
    'ngMaterial',
    'appCtrl',
    'cardsCtrl',
    'cardsService',
    'listCtrl',
    'listService',
    'tabsCtrl',
    'tabsService',
   'material.components.eventCalendar'
   ]).config(function ($mdThemingProvider, $mdIconProvider) {
      $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
   $mdIconProvider.iconSet("avatar", 'img/avatar-icons.svg', 128);
   $mdIconProvider
      .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
      .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
   var podsharkOrange;

   var neonRedMap = $mdThemingProvider.extendPalette('red', {
      '500': '#2196F3',
      'contrastDefaultColor': 'light'
   });

   // Register the new color palette map with the name <code>neonRed</code>
   $mdThemingProvider.definePalette('neonRed', neonRedMap);

   // Use that theme for the primary intentions
   $mdThemingProvider.theme('default')
      .primaryPalette('neonRed');
});