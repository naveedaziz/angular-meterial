var app = angular.module("myApp", ['ui.router', 'chat']);
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
                        url: '/chat/:from',
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
                  .state('home2', {
                     url: '/home2',
                     templateUrl: 'partials/home2.html',
                     params: {
                        title: "Welcome to AFES"
                     }
                  })
                  .state('about', {
                        url: '/about',
                        templateUrl: 'partials/about.html',
                        params: {
                              title: "About AFES"
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
                  .state('agenda_detail', {
                        url: '/agenda_detail/:id',
                        templateUrl: 'partials/agenda_detail.html',
                        params: {
                              title: "Agenda Detail"
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
               .state('galleryadd', {
                  url: '/gallery-add',
                  templateUrl: 'partials/gallery-add.html',
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
               .state('agenda', {
                  url: '/agenda',
                  templateUrl: 'partials/agenda.html',
                  params: {
                     title: "My Agenda"
                  }
               })
            //$locationProvider.html5Mode({ enabled: true, requireBase: false });

      })
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      // Chat App Controller
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      .controller('ChatController', ['$scope', 'Messages', '$state', function ($scope, Messages, $state) {
            console.log($state);
            // Sent Indicator
            $scope.status = "";

            // Keep an Array of Messages
            $scope.userInfo = {
                  name: 'nido',
                  id: 1
            };
            $scope.messages = [];
            if (localStorage.getItem('user_info')) {
                  $scope.userInfo = JSON.parse(localStorage.getItem('user_info'));
            }
            $scope.me = {
                  name: $scope.userInfo.name,
                  id: $scope.userInfo.id
            };
            // Set User Data
            Messages.user($scope.me);

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // Get Received Messages and Add it to Messages Array.
            // This will automatically update the view.
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            var chatmessages = document.querySelector(".chat-messages");

            Messages.receive(function (msg) {
                  console.log(msg);
                  $scope.messages.push(msg);

                  setTimeout(function () {
                        chatmessages.scrollTop = chatmessages.scrollHeight;
                  }, 10);

            });

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // Send Messages
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            $scope.send = function () {
               console.log($scope.textbox)
               if (typeof ($scope.textbox) == 'undefined' || $scope.textbox == '')
               return false;
                  $scope.messages.push({
                        data: $scope.textbox,
                        user: $scope.me
                  });
                  Messages.send({
                        data: $scope.textbox,
                        to: $state.params.from
                  });

                  $scope.status = "sending";
                  $scope.textbox = "";

                  setTimeout(function () {
                        $scope.status = ""
                  }, 1200);

            };

}])
   .controller('AppController', function ($scope, $state, $stateParams, $rootScope, $location, $http, Messages) {
     
      $scope.hideMenu = function(){
         if ($('#userMenu').parent().hasClass('show'))
         $('#userMenu').parent().toggleClass('show'); $('#userdrop').toggleClass('show')
      }
      //$scope.fileName = false;
      $scope.upload = function(){
         var form = document.forms.namedItem("fileinfo");
            oData = new FormData(form);
         var oReq = new XMLHttpRequest();
         oReq.open("POST", "upload", true);
         oReq.onload = function (oEvent) {
            if (oReq.status == 200) {
               console.log('uploaded');
            } else {
               console.log('Error');
            }
         };
         oReq.send(oData);
      }
      $scope.my_agenda = [];
      $scope.userAgendaCheck = function(id){
         var found = false;
         for(var sch in $scope.my_agenda){
            if ($scope.my_agenda[sch].agenda_id == id){
                found = true;
            }
         }
         return found;
      }
      $scope.userAgenda = function () {
         if ($scope.user_info){
            $scope.loadingData = true;
            var table = clientRef.getTable('agenda');
            table.where({
               user_id: $scope.user_info.id
            }).read().then(function (data) {
               $scope.my_agenda = data;
               $scope.loadingData = false;
               $scope.$apply();
            }, $scope.failure);
         }
      }
      $scope.userAgenda();
      $scope.addToAgenda = function(id,date,time,name){
         if ($scope.user_info) {
            var data = { user_id: $scope.user_info.id,agenda_id:id,date:date,time:time,name:name};
            var table = clientRef.getTable('agenda');
            table.insert(data)
               .done(function (insertedItem) {
                  console.log(insertedItem)
                  $scope.userAgenda();
                  $scope.$apply()
               }, $scope.failure);
         }
      }
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


            // Edit data start
            $scope.getEdit = function (table, scope) {
                  if ($stateParams.id) {
                     $scope.loadingData = true;
                        var table = clientRef.getTable(table);
                        table.where({
                              id: $stateParams.id
                        }).read().then(function (data) {
                              $scope[scope] = data[0];
                              console.log($scope[scope]);
                              $scope.loadingData = false;
                              // if($scope[scope].faculty) {
                              //       $scope[scope].faculty = JSON.parse($scope[scope].faculty);
                              // }
                              $scope.faculty_detail = JSON.parse($scope[scope].faculty);
                              console.log($scope.faculty_detail);
                              $scope.$apply();
                        }, $scope.failure);
                  }
            }
            // Edit data end 


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
            $rootScope.loggedIn = {};
            if (localStorage.getItem('user_name')) {
                  $rootScope.loggedIn = localStorage.getItem('user_name');
            }
            // $scope.table = [];
            $scope.user_info = false;
            if (localStorage.getItem('user_info')) {
                  $scope.user_info = JSON.parse(localStorage.getItem('user_info'));
            }
            $scope.login = function () {
                  $scope.signinError = false;
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
                              $rootScope.loggedIn = data[0].name;
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
            $scope.registerUser = function () {
                  $scope.registerError = false;
                  var table = clientRef.getTable('appuser');
                  table.where({
                        email: $scope.register.email
                  }).read().then(function (data) {
                        if (data.length) {
                              $scope.registerError = true;
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
                              table.insert($scope.register)
                                    .done(function (insertedItem) {
                                       $scope.user_info = insertedItem;
                                       localStorage.setItem('user_info', JSON.stringify($scope.user_info));
                                          var id = insertedItem.id;
                                          //console.log(id);
                                          //console.log(redirect)
                                          $location.path('/')
                                          $scope.$apply()
                                    }, $scope.failure);
                              $scope.$apply();
                        }
                  })
            }
            // Register End

            // Logout Start
            $scope.logout = function () {
                  $scope.user_info = '';
                  localStorage.removeItem('user_info');
                  localStorage.removeItem('user_id');
                  localStorage.removeItem('user_email');
                  localStorage.removeItem('user_name');
                  $rootScope.loggedIn = '';
                  $location.path('/');
                  $scope.$apply()

            }
            // Logout End 

            $scope.returnDated = function(date){
               if (date){
                  var dated_pre = date.split('T');
                  var date = dated_pre[0].replace('"', '');
                  return moment(date).format('ddd (Do MMM)');
               }
            }
            $scope.loadSchedule = function () {
                  $scope.loadingData = true;
                  var filter = {};
                  $scope.loadingData = true;
                  $http({
                        method: 'GET',
                        url: 'https://fishry-app-services.azurewebsites.net/api/table_read?table=schedule'
                  }).then(function successCallback(response) {
                        var data = response.data;
                        // console.log(data);
                        $scope.schedule = {};
                        for (var index in data) {
                              console.log($scope.schedule.id);
                              if (data[index].dated) {
                                    var dated_pre = data[index].dated.split('T');
                                    var date = dated_pre[0].replace('"', '');
                                    var dated = moment(date + ' ' + data[index].start_hours + ':' + data[index].start_minutes).format('ddd (Do MMM)');
                                    if (!$scope.schedule[dated]) {
                                          $scope.schedule[dated] = {};
                                    }
                                    var timeCap = data[index].start_hours + ':' + data[index].start_minutes + '-' + data[index].end_hours + ':' + data[index].end_minutes;
                                    if (!$scope.schedule[dated][timeCap]) {
                                          $scope.schedule[dated][timeCap] = {};
                                    }
                                    if (data[index].hall && data[index].hall != '') {
                                          var halls = JSON.parse(data[index].hall);
                                          for (hall in halls) {
                                                if (!$scope.schedule[dated][timeCap][halls[hall]]) {
                                                      $scope.schedule[dated][timeCap][halls[hall]] = [];
                                                }
                                                $scope.schedule[dated][timeCap][halls[hall]].push({
                                                      name: data[index].name,
                                                      faculty: JSON.parse(data[index].faculty),
                                                      room: JSON.parse(data[index].room),
                                                      id: data[index].id,
                                                      dated: dated,
                                                      time: timeCap,
                                                      room: JSON.parse(data[index].room)
                                                });
                                          }
                                    } else {
                                          if (!$scope.schedule[dated][timeCap]['open']) {
                                                $scope.schedule[dated][timeCap]['open'] = [];
                                          }
                                          $scope.schedule[dated][timeCap]['open'].push({
                                                name: data[index].name,
                                                faculty: JSON.parse(data[index].faculty),
                                                room: JSON.parse(data[index].room),
                                                id: data[index].id,
                                                dated: dated,
                                                time: timeCap,
                                                room: JSON.parse(data[index].room)

                                          })
                                    }
                                    $scope.loadingData = false;
                              }
                        }
                        console.log($scope.schedule);
                  }, $scope.failure);
            }
            $scope.activeTab = function (id) {
                  $('.nav-tabs .nav-item').children().removeClass('active');
                  $('#tab-' + id).addClass('active');
                  $('.tab-content').children().removeClass('in');
                  $('.tab-content').children().removeClass('active');
                  $('#tab-content-' + id).addClass('in');
                  $('#tab-content-' + id).addClass('active');
            }
            $scope.toggleClassHidden = function (id) {
               $(id).toggleClass('hidden')
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