var app = angular.module("myApp", ['ui.router','chat']);
app.constant('config', {
   rltm: {
      service: "pubnub",
      config: {
         "publishKey": "pub-c-dbef8903-a5ed-4354-be8d-10f671659eec",
         "subscribeKey": "sub-c-1baa496c-b504-11e7-af03-56d0cae65fed"
      }
   }
});
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');

            // UI Router States
            // Inserting Page title as State Param
            $stateProvider
                  .state('signin', {
                        url: '/signin',
                        templateUrl: 'partials/signin.html',
                        params: {
                              title: "Login to AFES"
                        }
                  })
                  .state('register', {
                        url: '/register',
                        templateUrl: 'partials/register.html',
                        params: {
                              title: "Register to AFES"
                        }
                  })
                  .state('chat', {
                     url: '/chat',
                     templateUrl: 'partials/chat.html',
                        params: {
                              title: "Welcome to AFES"
                        }
                  })
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
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Controller
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   .controller('ChatController', ['$scope', 'Messages','$state', function ($scope, Messages,$state) {
      console.log($state);
   // Sent Indicator
   $scope.status = "";

   // Keep an Array of Messages
   $scope.messages = [];

   $scope.me = { name: 'user 1', id: 2 };

   // Set User Data
   Messages.user($scope.me);

   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   // Get Received Messages and Add it to Messages Array.
   // This will automatically update the view.
   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   var chatmessages = document.querySelector(".chat-messages");

   Messages.receive(function (msg) {

      $scope.messages.push(msg);

      setTimeout(function () {
         chatmessages.scrollTop = chatmessages.scrollHeight;
      }, 10);

   });

   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   // Send Messages
   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   $scope.send = function () {
      Messages.send({ data: $scope.textbox, to: 2 });

      $scope.status = "sending";
      $scope.textbox = "";

      setTimeout(function () {
         $scope.status = ""
      }, 1200);

   };

}])
   .controller('AppController', function ($scope, $state, $stateParams, $rootScope, $location, $http, Messages) {
      $scope.messages = [];
      // Receive Messages
      Messages.receive(function (message) {
         $scope.messages.push(message);
         console.log($scope.messages)
      });
      // Send Messages
      $scope.send = function () {
         console.log(Messages)
         Messages.send({
            data: $scope.textbox
         });
      };
            $scope.updateTitle = function (state, pre) {
                  $scope.title = pre.params.title;
            }
            $rootScope.$on('$stateChangeSuccess', $scope.updateTitle);
            $rootScope.currentPath = $location.path();

            // Read data from database Start -----
            $scope.get_data = function (table, scope) {
                  var filter = {};
                  $scope.loadingData = true;
                  var table = clientRef.getTable(table);
                  table.where(filter).read().then(function (data) {
                        $scope[scope] = data;
                        $scope.loadingData = false;
                        $scope.$apply();
                  }, $scope.failure);
            }
            // Read data from database End -----


            // Insert Data in database Start -----
            $scope.insert_data = function (table, data, redirect) {
                  if (table != 'users') {
                        //data.user_id = localStorage.getItem('user_id');
                  }
                  // return true;
                  for (var dat in data) {
                        if (typeof (data[dat]) == 'object') {
                              data[dat] = JSON.stringify(data[dat]);
                        }
                  }
                  if ($routeParams.id) {
                        var table = clientRef.getTable(table);
                        data.id = $routeParams.id;
                        for (var ind in data) {
                              if (data[ind] == null || data[ind] == 'null') {
                                    delete data[ind];
                              }
                        }
                        table.update(data)
                              .done(function (insertedItem) {
                                    var id = insertedItem.id;
                                    $location.path(redirect)
                                    $scope.$apply();
                              }, $scope.failure);
                  } else {
                        var table = clientRef.getTable(table);
                        table.insert(data)
                              .done(function (insertedItem) {
                                    var id = insertedItem.id;
                                    //console.log(id);
                                    //console.log(redirect)
                                    $location.path(redirect)
                                    $scope.$apply()
                              }, $scope.failure);
                  }

            }
            // Insert Data in database End -----

            // Login Start ----
            $scope.user = {};
            $scope.signinError = false;
            $scope.loggedIn = {};
            if (localStorage.getItem('user_name')) {
                  $scope.loggedIn = localStorage.getItem('user_name');
            }
            // $scope.table = [];
            if (localStorage.getItem('user_info')) {
                  $scope.user_info = JSON.parse(localStorage.getItem('user_info'));
            }
            $scope.user_info = {};
            $scope.login = function () {
                  $scope.loginError = false;
                  console.log($scope.user);
                  var table = clientRef.getTable('appuser');
                  table.where($scope.user).read().then(function (data) {
                        if (data.length) {
                              console.log("success")
                              $scope.user_info = data[0];
                              localStorage.setItem('user_info', JSON.stringify(data[0]));
                              localStorage.setItem('user_id', data[0].id);
                              localStorage.setItem('user_email', data[0].email);
                              localStorage.setItem('user_name', data[0].name);
                              $scope.loggedIn = data[0].name;
                              $location.path('/');
                              $scope.$apply()
                        } else {
                              console.log("errorrrr")
                              $scope.signinError = true;
                              $scope.$apply()
                        }
                  })
            }
            // Login End ---

            // Register start 
            $scope.register = {};
            $scope.registerError = false;
            $scope.registerUser = function() {
                  console.log($scope.register.email);
                  $scope.registerError = false;
                  var table = clientRef.getTable('appuser');
                  table.where({email:$scope.register.email}).read().then(function (data) {
                        if (data.length) {
                              $scope.registerError = true;
                              console.log("email found");
                              $scope.$apply();
                              $('#duplicateEmailError').delay(5000).fadeOut();
                        } else {
                              console.log("no email.. can register");
                              $scope.registerError = false;
                              // $scope.insert_data('appuser', $scope.register, '/signin');

                              for (var dat in $scope.register) {
                                    if (typeof (data[dat]) == 'object') {
                                          data[dat] = JSON.stringify(data[dat]);
                                    }
                              }
                              var table = clientRef.getTable('appuser');
                              table.insert(data)
                                    .done(function (insertedItem) {
                                          var id = insertedItem.id;
                                          //console.log(id);
                                          //console.log(redirect)
                                          $location.path('/signin')
                                          $scope.$apply()
                                    }, $scope.failure);

                              $scope.$apply();
                        }
                  })


            }
            // Register End


            $scope.loadSchedule = function(){
               $scope.loadingData = true;
                  var filter = {};
                  $scope.loadingData = true;
                  $http({
                     method: 'GET',
                     url: 'https://fishry-app-services.azurewebsites.net/api/table_read?table=schedule'
                  }).then(function successCallback(response) {
                     var data = response.data;
                     $scope.schedule = {};
                     for(var index in data){
                        if (data[index].dated){
                           var dated_pre = data[index].dated.split('T');
                           var date = dated_pre[0].replace('"','');
                           var dated = moment(date + ' ' + data[index].start_hours + ':' + data[index].start_minutes).format('ddd (Do MMM)');
                           if (!$scope.schedule[dated]) {
                              $scope.schedule[dated] = {};
                           }
                           var timeCap = data[index].start_hours + ':' + data[index].start_minutes + '-' + data[index].end_hours + ':' + data[index].end_minutes;
                           if (!$scope.schedule[dated][timeCap]){
                              $scope.schedule[dated][timeCap] = {};
                           }
                           if (data[index].hall && data[index].hall != ''){
                              var halls = JSON.parse(data[index].hall);
                                 for(hall in halls){
                                    if (!$scope.schedule[dated][timeCap][halls[hall]]){
                                       $scope.schedule[dated][timeCap][halls[hall]] = [];
                                    }
                                    $scope.schedule[dated][timeCap][halls[hall]].push({ name: data[index].name, faculty: JSON.parse(data[index].faculty), room : JSON.parse(data[index].room)});
                                 }
                                 
                           }else{
                              if (!$scope.schedule[dated][timeCap]['open']){
                                 $scope.schedule[dated][timeCap]['open'] = [];
                              }
                              $scope.schedule[dated][timeCap]['open'].push({ name: data[index].name, faculty: JSON.parse(data[index].faculty), room: JSON.parse(data[index].room) })
                           }
                           $scope.loadingData = false;
                        }
                     }
                     console.log($scope.schedule);
                  }, $scope.failure);
               }
               $scope.activeTab = function(id){
                  $('.nav-tabs .nav-item').children().removeClass('active');
                  $('#tab-' + id).addClass('active');
                  $('.tab-content').children().removeClass('in');
                  $('.tab-content').children().removeClass('active'); 
                  $('#tab-content-'+id).addClass('in'); 
                  $('#tab-content-'+id).addClass('active');
               }
            

            
      })
      .filter('unique', function () {
            return function (collection, primaryKey, secondaryKey) { //optional secondary key
                  var output = [],
                        keys = [];

                  angular.forEach(collection, function (item) {
                        var key;
                        secondaryKey === undefined ? key = item[primaryKey] : key = item[primaryKey][secondaryKey];

                        if (keys.indexOf(key) === -1) {
                              keys.push(key);
                              output.push(item);
                        }
                  });

                  return output;
            };
      });
