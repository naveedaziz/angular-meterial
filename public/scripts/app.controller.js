'use strict';

var app = angular.module('appCtrl', ['jkAngularCarousel'])
   .run(['$rootScope', '$location','$window', function ($rootScope, $location, $window) {
      document.addEventListener("deviceready", function () {
         document.addEventListener("backbutton", function(){}, false);
      });
      $rootScope.$on('$stateChangeStart', function (event, next, current) {
         console.log('Started');
      });
      $rootScope.$on('$stateChangeSuccess', function () {
         console.log('Success');
         $window.scrollTo(0, 0)

      });
      $rootScope.$on('$stateChangeError', function () {
         console.log('Error');
      });
   }
   ])
  .controller('DialogController', function ($mdSidenav, $stateParams, $rootScope, $mdDialog,$scope,$http) {
   this.hide = function () {
      $mdDialog.hide();
   };

   this.cancel = function () {
      $mdDialog.cancel();
   };
   this.close = function () {
      $mdDialog.cancel();
   };

   this.answer = function (answer) {
      $mdDialog.hide(answer);
   };
   this.showAdvanced = function (ev) {
      console.log(ev);
      $mdDialog.show({
         controller: 'DialogController',
         templateUrl: 'login.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose: true
      })
         .then(function (answer) {
            // this.status = 'You said the information was "' + answer + '".';
         }, function () {
            // this.status = 'You cancelled the dialog.';
         });
   };
   this.showAdvancedForget = function (ev) {
      console.log(ev);
      $mdDialog.show({
         controller: 'DialogController',
         templateUrl: 'forget.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose: true
      })
         .then(function (answer) {
            // this.status = 'You said the information was "' + answer + '".';
         }, function () {
            // this.status = 'You cancelled the dialog.';
         });
   };
  
   $scope.user = {};
   $scope.loginSuccess = false;
   $scope.login = function () {
      if ($scope.loginSuccess !== true) {
         $scope.loginSuccess = true;
         console.log($scope.user);
         $http.get('https://api-global.azurewebsites.net/api/fccu_login?email=' + $scope.user.username + $scope.user.emailAddress + '&password=' + $scope.user.password)
            .then(function (respose) {
               if (respose.data && respose.data != 'error') {
                  $scope.loginSuccess = 1;
                  localStorage.setItem('userID', respose.data);
                  $rootScope.userID = localStorage.getItem('userID');
                  $rootScope.$apply()
               } else {
                  $scope.loginSuccess = -1;
               }
            }, function () {
               $scope.loginSuccess = false;
            })
      }
   }
   
   $scope.registerSuccess = false;
   $scope.register = function () {
      if ($scope.registerSuccess !== true){
         $scope.registerSuccess = true;
         console.log($scope.user);
         $http.get('https://api-global.azurewebsites.net/api/fccu_signup?email=' + $scope.user.username + $scope.user.emailAddress + '&password=' + $scope.user.password)
            .then(function (respose) {
               if (respose.data && respose.data != 'Already') {
                  $scope.registerSuccess = 1;
               } else {
                  $scope.registerSuccess = -1;
               }
            }, function () {
               $scope.registerSuccess = false;
            })
      }
   }
   $scope.forgetSuccess = false;
   $scope.forgetlogin = function () {
      if ($scope.forgetSuccess !== true) {
         $scope.forgetSuccess = true;
         $http.get('https://api-global.azurewebsites.net/api/fccu_forget?email=' + $scope.user.username + $scope.user.emailAddress)
            .then(function (respose) {
               if (respose.data && respose.data != 'error') {
                  $scope.forgetSuccess = 1;
               } else {
                  $scope.forgetSuccess = -1;
               }
            }, function () {
               $scope.forgetSuccess = false;
            })
      }
   }
  })
   .controller('appCtrl', function ($mdSidenav, $stateParams, $rootScope, $mdDialog, $state, $location, $http, $controller, $scope, $interval) {
      $scope.dataArray = [
         {
            src: 'http://www.sternbergclarke.co.uk/images/4667.png'
         },
         {
            src: 'http://www.sternbergclarke.co.uk/images/4667.png'
         },
         {
            src: 'http://www.sternbergclarke.co.uk/images/4667.png'
         },
         
      ];
      $rootScope.userID = false;
      if (localStorage.getItem('userID')) {
         $rootScope.userID = localStorage.getItem('userID');
         console.log($scope.userID)
      }
      $scope.logout = function () {
         localStorage.removeItem('userID');
         $rootScope.userID = false;
         $rootScope.$apply()
      }
     
      $scope.pageTitle = '';
      $scope.posts = {};
      $scope.posts_detail = {};


    
      
     $scope.currentpages = $location.$$path;;
    
      $scope.news = {};
     
      $scope.newsPage = 0;
      $scope.loadMoreCall = true;
     
      $scope.events = [];
      $scope.events.academy = {};
      $scope.events.international = {};
      $scope.EventAcademyPage = 0;
      $scope.monthArray = [0,'Jan','Feb','Mrh','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     
      $scope.EventPage = 0;
      $scope.prePage = false;

      this.tiles = buildGridModel({
         icon: "avatar:svg-",
         title: "Svg-",
         background: ""
      });

      function buildGridModel(tileTmpl) {
         var it, results = [];

         for (var j = 0; j < 11; j++) {

            it = angular.extend({}, tileTmpl);
            it.icon = it.icon + (j + 1);
            it.title = it.title + (j + 1);
            it.span = { row: 1, col: 1 };

            switch (j + 1) {
               case 1:
                  it.background = "red";
                  it.span.row = it.span.col = 2;
                  break;

               case 2: it.background = "green"; break;
               case 3: it.background = "darkBlue"; break;
               case 4:
                  it.background = "blue";
                  it.span.col = 2;
                  break;

               case 5:
                  it.background = "yellow";
                  it.span.row = it.span.col = 2;
                  break;

               case 6: it.background = "pink"; break;
               case 7: it.background = "darkBlue"; break;
               case 8: it.background = "purple"; break;
               case 9: it.background = "deepBlue"; break;
               case 10: it.background = "lightPurple"; break;
               case 11: it.background = "yellow"; break;
            }

            results.push(it);
         }
         return results;
      }

      this.openLink = function (link, params) {
         if (link && link.indexOf('http') >= 0 && (link.indexOf('fccollege.edu.pk') >= 0 || link.indexOf('fccsocieties.org') >= 0)) {
            cordova.InAppBrowser.open(link, '_blank', 'location=yes');
         } else if (link && (link.indexOf('http') >= 0 || link.indexOf('mailto') >= 0)) {
            console.log(1)
            window.open(link, '_blank');
         } else if (link) {
            console.log(link, params)
            if (params)
               $state.go(link, params);
            else
               $state.go(link);
            //$location.path(link)
         }
      }
      this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];

      this.isOpen = false;

      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-fling';

      this.availableDirections = ['up', 'down', 'left', 'right'];
      this.selectedDirection = 'down';
      this.dis = false;
      
      this.grids = [
         {
            img: 'Admissions', name: 'About AFES 2017', link: 'about',
            list:[
               { name: 'President Message', description:'It is a great honor and distinct privilege for us to announce that Myanmar Society of Endocrinology and Metabolism is hosting the 19th ASEAN Federation of Endocrine Societies Congress 2017 (AFES2017). '},
               { name: 'Organizing Committee', 
                  list:[
                     {
                        name: 'Main Organising Committee', list: [
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },

                        ] },
                     {
                        name: 'Scientific Committee', list: [
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                           { name: 'Prof Than Than Aye', designation: 'Chairperson' },

                        ]
                     }
                  ]
                           
                }

            ]

         },
                     {
                        img: 'Boss', name: 'Networking',link:'organization',
                        list:[
                           {
                              name: 'Networking',
                              list: [
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                                       { name: 'Prof Than Than Aye', designation: 'Chairperson' },
                              ]

                           }
                        ] 
                        
                     },
                     {
                        img: 'Alerts', name: 'Agenda/Scientific Program', link: 'agenda',
                     },
                     {
                        img: 'Events', name: 'Schedule', link: 'agenda',
                     },
                     {
                        img: 'support', name: 'Sponsors', link: 'sponsor',
                     }, 
                     {
                        img: 'motel', name: 'Accommodation', link: 'accomodation',
                     }, 
                     {
                        img: 'lecture', name: 'Faculty', link: 'organization',
                        list: [
                           { name: 'Apply Now', img: 'Apply Now', menu: [], link:'http://www.fccollege.edu.pk/apply-now/' },
                           { name: 'Financial Aid', img: 'Financial Aid', menu: [], link: 'http://www.fccollege.edu.pk/financial-aid/' },
                           { name: 'Tuition Fee', img: 'Residential Life', menu: [], link:'http://www.fccollege.edu.pk/tuition-fee/' },
                           { name: 'Residential Life', img: 'Tuition fee', menu: [], link:'http://www.fccollege.edu.pk/residential-life/' },
                        ] },
                     {
                        img: 'forms', name: 'Registration', link: '',
                        list: [
                           { name: 'Events Calendar', img: 'eventss', menu: [], link: 'events', params: { page: 'basic' } },
                           { name: 'Academic Calendar', img: 'acadamic', menu: [], link: 'events', params: { page: 'Academic' } },
                           { name: 'Today’s Events', img: 'today', menu: [], link: 'events', params: { page: 'today' }},
                        ]  },
                  ]
    
     
     
     
    this.selectedTab = 0;
     this.stateLoader = function(pageType){
        if (pageType == 'page'){
           console.log($state)
           this.pageName = this.urlParser($state.$current.url.prefix);
        }else{
           this.pageName = $state.params.page;
        }
        
     }
     this.showAdvanced = function (ev) {
        console.log(ev);
         $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
         })
            .then(function (answer) {
               //this.status = 'You said the information was "' + answer + '".';
            }, function () {
              // this.status = 'You cancelled the dialog.';
            });
      };
     this.showAdvancedSignup = function (ev) {
        console.log(ev);
        $mdDialog.show({
           controller: 'DialogController',
           templateUrl: 'signup.html',
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose: true
        })
           .then(function (answer) {
             // this.status = 'You said the information was "' + answer + '".';
           }, function () {
             // this.status = 'You cancelled the dialog.';
           });
     };
     this.showAdvancedHelp = function (ev) {
        console.log(ev);
        $mdDialog.show({
           controller: 'DialogController',
           templateUrl: 'help.html',
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose: true
        })
           .then(function (answer) {
              // this.status = 'You said the information was "' + answer + '".';
           }, function () {
              // this.status = 'You cancelled the dialog.';
           });
     };
     this.showAdvancedForget = function (ev) {
        console.log(ev);
        $mdDialog.close()
        $mdDialog.show({
           controller: 'DialogController',
           templateUrl: 'forget.html',
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose: true
        })
           .then(function (answer) {
              // this.status = 'You said the information was "' + answer + '".';
           }, function () {
              // this.status = 'You cancelled the dialog.';
           });
     };
     
   var originatorEv;
   this.todos = [];
   var imagePath = 'img/60.jpeg';
   for (var i = 0; i < 15; i++) {
      this.todos.push({
         face: imagePath,
         what: "News Heading",
         who: "Min Li Chan",
         notes: "I'll be in your neighborhood doing errands."
      });
   }
   this.openMenu = function ($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
   };

   this.notificationsEnabled = true;
   this.toggleNotifications = function () {
      this.notificationsEnabled = !this.notificationsEnabled;
   };

   this.redial = function () {
      $mdDialog.show(
         $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('Suddenly, a redial')
            .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
            .ok('That was easy')
      );

      originatorEv = null;
   };

   this.checkVoicemail = function () {
      // This never happens.
   };
    self = this;

    // Update title using rootscope
    self.updateTitle = function() {
        $rootScope.title = $stateParams.title;
    }

    // Run updateTitle on each state change
    $rootScope.$on('$stateChangeSuccess', self.updateTitle);

	self.toggleLeft = function() {
    	$mdSidenav('left').toggle();
    }

    self.toggleRight = function() {
    	$mdSidenav('right').toggle();
    }

});

