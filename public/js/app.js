var app = angular.module("myApp", ['ui.router', 'chat', 'jtt_youtube','ngSanitize']);
app.constant('config', {
      rltm: {
            service: "pubnub",
            config: {
                  "publishKey": "pub-c-dbef8903-a5ed-4354-be8d-10f671659eec",
                  "subscribeKey": "sub-c-1baa496c-b504-11e7-af03-56d0cae65fed"
            }
      }
});
var checkImg = function (ig) {
   $(ig).attr('src', 'images/icons/user.svg');
}
app.directive('checkImage', function ($http) {
   return {
      restrict: 'A',
      link: function (scope, element, attrs) {
         attrs.$observe('ngSrc', function (ngSrc) {
            $http.get(ngSrc).success(function () {
               alert('image exist');
            }).error(function () {
               alert('image not exist');
               element.attr('src', '/images/icons/user.svg'); // set default image
            });
         });
      }
   };
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
               .state('registerupdate', {
                  url: '/register-edit',
                  templateUrl: 'partials/register-edit.html',
                  params: {
                     title: "Update Profile"
                  }
               })
                  .state('chat', {
                        url: '/chat/:from/:name',
                        templateUrl: 'partials/chat.html',
                        params: {
                              title: "Chat"
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
                           title: "Scientific Programme"
                        }
                  })
                  .state('ask', {
                     url: '/ask',
                     templateUrl: 'partials/ask.html',
                     params: {
                        title: "Ask a Moderator"
                     }
                  })
               .state('moderator', {
                  url: '/moderator',
                  templateUrl: 'partials/moderator.html',
                  params: {
                     title: "Moderator Schedule"
                  }
               })
                  .state('agenda_detail', {
                        url: '/agenda_detail/:id',
                        templateUrl: 'partials/agenda_detail.html',
                        params: {
                           title: "Scientific Programme Detail"
                        }
                  })
               .state('question', {
                  url: '/question/:id/:name',
                  templateUrl: 'partials/question.html',
                  params: {
                     title: "Question"
                  }
               })
               .state('questionlist', {
                  url: '/questionlist/:id/:name',
                  templateUrl: 'partials/questionlist.html',
                  params: {
                     title: "Questions"
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
                           title: "Presenter"
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
                              title: "Gallery Add"
                        }
                  })
               .state('exhibition', {
                  url: '/exhibition',
                  templateUrl: 'partials/exhibition.html',
                  params: {
                     title: "Exhibition Floor Plan"
                  }
               })
            
                  .state('sponsors', {
                        url: '/sponsors',
                        templateUrl: 'partials/sponsors.html',
                        params: {
                           title: "Sponsors"
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
                  .state('abstract', {
                        url: '/abstract',
                        templateUrl: 'partials/abstracts.html',
                        params: {
                              title: "Abstracts"
                        }
                  })
            //$locationProvider.html5Mode({ enabled: true, requireBase: false });

      })
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      // Chat App Controller
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      .controller('ChatController', ['$scope', 'Messages', '$state', function ($scope, Messages, $state) {
            //console.log($state);
            // Sent Indicator
            $scope.from = $state.params.from;
            $scope.name = $state.params.name;
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
                  //console.log(msg);
                  $scope.messages.push(msg);

                  setTimeout(function () {
                        chatmessages.scrollTop = chatmessages.scrollHeight;
                  }, 10);

            });

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // Send Messages
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            $scope.send = function () {
                  //console.log($scope.textbox)
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
      .controller('AppController', function ($scope, $state, $stateParams, $rootScope, $location, $http, Messages, youtubeFactory, $sce) {

      $scope.hideMenu = function(){
         if ($('#userMenu').parent().hasClass('show'))
         $('#userMenu').parent().toggleClass('show'); $('#userdrop').toggleClass('show')
      }
      $scope.replaceSlash = function(name){
         return name.replace('/','');
      }
      $scope.currentSchedule = function (schedule){
         //console.log(schedule);
         if (schedule == 'Fri (10th Nov)' || schedule == '10:20-12:0'){
            return true
         }
         return false;
      }
      $scope.returnSureName =  function(name){
         if(name.indexOf('.') >= 0){
            var bds = name.split('.');
            var nm = bds[1].split(' ');
            if (nm.length == 2) {
               return bds[0]+'.'+nm[1] +' ' + nm[0];
            }
            if (nm.length == 3) {
               return bds[0] +'.'+ nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            if (nm.length == 4) {
               return bds[0] + '.' +nm[3] + ' ' + nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            if (nm.length == 4) {
               return bds[0] + '.' + nm[3] + ' ' + nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            return name;
         }else{
            var nm = name.split(' ');
            console.log(nm.length);
            if (nm.length == 2) {
               return nm[1] + nm[0];
            }
            if (nm.length == 3) {
               return nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            if (nm.length == 4) {
               return nm[3] + ' '+nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            return name;
         }
        
         
      }
      $scope.questionInit = function(){
        $scope.questionName =  $state.params.name;
      }
      $scope.question_list = function(){
         //console.log(123)
         $scope.loadingData = true;
         var table = clientRef.getTable('moderator_question');
         table.where({schedule_id:$state.params.id}).read().then(function (data) {
            $scope.questionList = data;
            $scope.loadingData = false;
            $scope.$apply();
         }, $scope.failure);
      }
      $scope.strikeThrogh = function(id){
         var table = clientRef.getTable('moderator_question');
         var data = { id: id, status: true };
         table.update(data)
            .done(function (insertedItem) {
               $scope.$apply();
            }, $scope.failure);
      }
      $scope.doneSendModerator = false;
      $scope.askModerator = function(){
         $scope.loadingData = true;
         $scope.doneSendModerator = false;
         var table = clientRef.getTable('moderator_question');
         var data = { name: $scope.user_info.name, user_id: $scope.user_info.id, question: $('#question').val(), schedule_id: $state.params.id, schedule_title: $state.params.name,status:false}
         table.insert(data)
            .done(function (insertedItem) {
               //console.log(insertedItem);
               $scope.loadingData = false;
               $scope.doneSendModerator = true;
               $scope.$apply()
            }, $scope.failure);
      }
      $scope.parseJSON = function(count){
         if (typeof (count) != 'array' && count != '' && count != 0 && typeof (count) != 'object'){
            count = JSON.parse(count);
            return count.length;
         } else if (typeof (count) == 'array' || typeof (count) == 'object'){
            //console.log(2);
            return count.length;
         }else{
            //console.log(3);
            return 0;
         }
      }
      $scope.likeAddCheck = function (counts) {
         if (!counts || counts == 0){
            return false;
         }
         if (typeof (counts) != 'array' && typeof (counts) != 'object') {
            counts = JSON.parse(counts);
         }
         obj = counts.filter(function (v) {
            return v === $scope.user_info.id;
         }).length;
         if(obj){
            return true;
         }else{
            return false;
         }
      }
      $scope.likeAdd = function(id,counts){
         //console.log(counts)
         var table = clientRef.getTable('gallery');
         if (!counts || counts == 0){
            counts = [];
         }
         //console.log(typeof (counts),counts);
         if (typeof (counts) != 'array' && typeof (counts) != 'object') {
            counts = JSON.parse(counts);
         }
         obj = counts.filter(function (v) {
            return v === $scope.user_info.id; 
         }).length;
         if (obj){
            counts.splice(counts.indexOf($scope.user_info.id), 1);
         }else{
            counts.push($scope.user_info.id);
         }
         for (var ind in $scope.gallerys){
            if ($scope.gallerys[ind].id  == id){
               $scope.gallerys[ind].likes = counts;
            }
         }
         var data = {id: id, likes: JSON.stringify(counts)};
         table.update(data)
            .done(function (insertedItem) {
               $scope.$apply();
            }, $scope.failure);
      }
      //$scope.fileName = false;
      $scope.galleryLink = false;
      $scope.upload = function(){
         if ($scope.user_info){
            $scope.galleryLink = false;
            $scope.loadingData = true;
            var form = document.forms.namedItem("fileinfo");
            oData = new FormData(form);
            var oReq = new XMLHttpRequest();
            oReq.open("POST", "https://gallery-api.azurewebsites.net/upload", true);
            oReq.onload = function (oEvent) {
               //console.log(oReq);
               if (oReq.status == 200) {
                  //console.log(oEvent.currentTarget.responseText)
                  var table = clientRef.getTable('gallery');
                  var data = { name: $('#imageName').val(), image: oEvent.currentTarget.responseText,user_name:$scope.user_info.name,user_id:$scope.user_info.id,status:0,likes:0}
                  table.insert(data)
                     .done(function (insertedItem) {
                        //console.log(insertedItem);
                        $scope.loadingData = false;
                        $scope.galleryLink = true;
                        $scope.userAgenda();
                        $scope.$apply()
                     }, $scope.failure);
               } else {
                  //console.log('Error');
               }
            };
            oReq.send(oData);
         }

      }
      $scope.registerUserUpdate = function () {
         if ($scope.user_info) {
            $scope.galleryLink = false;
            $scope.loadingData = true;
            if ($('#imgUploader').val() != ''){
               var form = document.forms.namedItem("fileinfo");
               oData = new FormData(form);
               var oReq = new XMLHttpRequest();
               oReq.open("POST", "https://gallery-api.azurewebsites.net/upload", true);
               oReq.onload = function (oEvent) {
                  if (oReq.status == 200) {
                     //console.log(oEvent.currentTarget.responseText);
                     $scope.user_info.image = oEvent.currentTarget.responseText;
                     var table = clientRef.getTable('appuser');
                     var data = { id: $scope.user_info.id, designation: $scope.user_info.designation, phone: $scope.user_info.phone, image: $scope.user_info.image };
                        //console.log(data)
                     table.update(data)
                        .done(function (insertedItem) {
                           $scope.loadingData = false;
                           localStorage.setItem('user_info',JSON.stringify($scope.user_info));
                           $scope.$apply()
                        }, $scope.failure);
                  } else {
                     //console.log('Error');
                  }
               };
               oReq.send(oData);
            }else{
               var table = clientRef.getTable('appuser');
               var data = { id: $scope.user_info.id, designation: $scope.user_info.designation, phone: $scope.user_info.phone, image: $scope.user_info.image };
               table.update(data)
                  .done(function (insertedItem) {
                     $scope.loadingData = false;
                     localStorage.setItem('user_info', JSON.stringify($scope.user_info));
                     $scope.$apply()
                  }, $scope.failure);
            }
            
         }

      }
      $scope.returnTimeFormat = function(time){
         if (time){
            var timer = time.split('-');
            var firstTime = timer[0].split(':');
            var secondTime = timer[1].split(':');
            if (parseInt(firstTime[0]) < 10) {
               firstTime[0] = "0" + firstTime[0];
            }
            if (parseInt(firstTime[1]) < 10) {
               firstTime[1] = "0" + firstTime[1];
            }
            if (parseInt(secondTime[0]) < 10) {
               secondTime[0] = "0" + secondTime[0];
            }
            if (parseInt(secondTime[1]) < 10) {
               secondTime[1] = "0" + secondTime[1];
            }
            return firstTime[0] + ":" + firstTime[1] + "-" + secondTime[0] + ":" + secondTime[1];
         }
         
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
                  if ($scope.user_info) {
                        $scope.loadingData = true;
                        var table = clientRef.getTable('agenda');
                        table.where({
                              user_id: $scope.user_info.id
                        }).read().then(function (data) {
                           $scope.my_agenda = [];
                           for (var ind in data){
                              if(!data[ind].deleted){
                                 $scope.my_agenda.push(data[ind]);
                              }
                           }
                              $scope.loadingData = false;
                              $scope.$apply();
                        }, $scope.failure);
                  }
            }
            $scope.userAgenda();
            $scope.addToAgenda = function (id, date, time, name) {
                  if ($scope.user_info) {
                        var data = {
                              user_id: $scope.user_info.id,
                              agenda_id: id,
                              date: date,
                              time: time,
                              name: name
                        };
                        var table = clientRef.getTable('agenda');
                        table.insert(data)
                              .done(function (insertedItem) {
                                    //console.log(insertedItem)
                                    $scope.userAgenda();
                                    $scope.$apply()
                              }, $scope.failure);
                  }
            }
            $scope.deleteFromAgenda = function (id, date, time, name){
                  if ($scope.user_info) {
                     var delId = false;
                     for (var ind in $scope.my_agenda){
                        if ($scope.my_agenda[ind].agenda_id == id){
                           delId = $scope.my_agenda[ind].id;
                        }
                     }
                     var data = {
                        id: delId
                     };
                     var table = clientRef.getTable('agenda');
                     table.del(data)
                        .done(function (insertedItem) {
                           //console.log(insertedItem)
                           $scope.userAgenda();
                           $scope.$apply()
                        }, $scope.failure);
                  }

            }
            // $scope.messages = [];
            // // Receive Messages
            // Messages.receive(function (message) {
            //       $scope.messages.push(message);
            //       //console.log($scope.messages)
            // });
            // // Send Messages
            // $scope.send = function () {
            //       //console.log(Messages)
            //       Messages.send({
            //             data: $scope.textbox
            //       });
            // };

            $scope.updateTitle = function (state, pre) {
                  $scope.title = pre.params.title;
            }
            $rootScope.$on('$stateChangeSuccess', $scope.updateTitle);
            $rootScope.currentPath = $location.path();

            // Read data from database Start -----
            $scope.get_data = function (table, scope) {
                  var filter = {};
                  $scope.loadingData = true;
                  $http({
                     method: 'GET',
                     url: 'https://fishry-app-services.azurewebsites.net/api/table_read?table=' + table
                  }).then(function successCallback(response) {
                     $scope[scope] = response.data;
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
                              //console.log($scope[scope]);
                              $scope.loadingData = false;
                              // if($scope[scope].faculty) {
                              //       $scope[scope].faculty = JSON.parse($scope[scope].faculty);
                              // }
                              $scope.faculty_detail = JSON.parse($scope[scope].faculty);
                              $scope.organizers = JSON.parse($scope[scope].organizer);
                              //console.log($scope.faculty_detail);
                              $scope.$apply();
                        }, $scope.failure);
                  }
            }
            $scope.extraAbracts = {
               "Plenary": [
                  { name: "Prof William Young", file: "PL1 Prof William Young" },
                  { name: "Susumu Seino", file: "PL2  Susumu Seino" },
                  { name: "A Prof Charlotte Hoybye", file: "PL4 A Prof Charlotte Hoybye" },
                  { name: "Dr Dolores Shoback", file: "PL5 Dr Dolores Shoback" },
                  { name: "Dr Lynette Nieman", file: "PL6 Dr Lynette Nieman" },
                  { name: "Prof Ken Ho", file: "PL8 Prof Ken Ho" },
               ],
               "Symposium": [
                  { name: "Dr Kevin Yuen", file: "S1.1 Dr Kevin Yuen" },
                  { name: "Dr Tran Quang Nam", file: "S1.3 Dr Tran Quang Nam" },
                  { name: "Dr Abel Soh", file: "S2.1 Dr Abel Soh" },
                  { name: "Prof Weerapan Khovidhunkit", file: "S3.1 Prof Weerapan Khovidhunkit" },
                  { name: "Prof Mafauzy Mohamed", file: "S3.2 Prof Mafauzy Mohamed" },
                  { name: "Dr Ruby Tan Go", file: "S3.3 Dr Ruby Tan Go" },
                  { name: "Prof Hossein Gharib", file: "S4.1 Prof Hossein Gharib" },
                  { name: "Dr Tjokorda", file: "S4.2 Dr Tjokorda" },
                  { name: "Prof Won Bae Kim", file: "S4.3 Prof Won Bae Kim" },
                  { name: "Prof AndrÈ Lacroix", file: "S5.1 Prof AndrÈ Lacroix" },
                  { name: "Prof Ken Ho", file: "S5.2 Prof Ken Ho" },
                  { name: "Prof Than Than Aye", file: "S5.3 Prof Than Than Aye" },
                  { name: "Dr Kyaw Kyaw Soe", file: "S6.1 Dr Kyaw Kyaw Soe" },
                  { name: "Prof K O Lee", file: "S6.2 Prof K O Lee" },
                  { name: "Dr Vivien Lim", file: "S7.2 Dr Vivien Lim" },
                  { name: "Prof Siew Pheng Chan", file: "S7.3 Prof Siew Pheng Chan" },
                  { name: "A Prof Kah Yin Loke", file: "S8.2 A Prof Kah Yin Loke" },
                  { name: "A Prof Charlotte Hoeybye", file: "S8.3 A Prof Charlotte Hoeybye" },
                  { name: "Prof Cecilia A Jimeno", file: "S9.1 Prof Cecilia A Jimeno" },
                  { name: "A Prof Graham McMahon", file: "S9.2 A Prof Graham McMahon" },
                  { name: "Prof Tint Swe Latt", file: "S9.3 Prof Tint Swe Latt" },
                  { name: "Dr Aung Ko Win", file: "S10.1 Dr Aung Ko Win" },
                  { name: "Prof Tjin-Shing Jap", file: "S10.3 Prof Tjin-Shing Jap" },
                  { name: "A Prof Soe Naing", file: "S11.1 A Prof Soe Naing" },
                  { name: "Prof AndrÈ Lacroix", file: "S11.2 Prof AndrÈ Lacroix" },
                  { name: "Prof Leilani Mercado-Asis", file: "S11.3 Prof Leilani Mercado-Asis" },
                  { name: "Dr Gabriel Jasul", file: "S12.1 Dr Gabriel Jasul" },
                  { name: "Prof Thein Hlaing Oo", file: "S12.3 Prof Thein Hlaing Oo" },

               ],
               "Meet the Expert": [
                  { name: "Prof William Young", file: "ME1 Prof William Young" },
                  { name: "Prof Hossein Gharib", file: "ME2 Prof Hossein Gharib" },
                  { name: "Dr Kevin Yuen", file: "ME3 Dr Kevin Yuen" },
                  { name: "Dr Heri-Nugroho Hario Seno", file: "ME4 Dr Heri-Nugroho Hario Seno" },
                  { name: "Prof Thi Thanh Huyen Vu", file: "ME5 Prof Thi Thanh Huyen Vu" },
                  { name: "A Prof Melvin Leow", file: "ME6 A Prof Melvin Leow" },
                  { name: "Dr Lynette Nieman", file: "ME7 Dr Lynette Nieman" },
                  { name: "A Prof Graham McMahon", file: "ME8 A Prof Graham McMahon" },
                  { name: "Prof Ken Ho", file: "ME9 Prof Ken Ho" },
                  { name: "Dr Kyaw Kyaw Soe", file: "ME10 Dr Kyaw Kyaw Soe" },

               ]
            };
            $scope.getCountryOrganizer = function(name){
               var country = '';
               for (var ind in $scope.organizerList){
                  if ($scope.organizerList[ind].name == name){
                     country = $scope.organizerList[ind].country
                  }
               }
               return country;
            }
            $scope.get_data('organizer', 'organizerList')
            // Edit data end 
            $scope.deleteRow = function(table,id){
               $scope.loadingData = true;
               var table = clientRef.getTable(table);
               table.del({ id: id })
                  .done(function (insertedItem) {
                     $scope.loadingData = false;
                     $scope.userAgenda();
                     $scope.$apply()
                  }, $scope.failure);
            }

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
                                    ////console.log(id);
                                    ////console.log(redirect)
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
            if (!$scope.user_info){
               $location.path('/signin');
            }
            $scope.login = function () {
               //console.log('in');
               $scope.loadingData = true;
                  $scope.signinError = false;
                  //console.log($scope.user);
                  var table = clientRef.getTable('appuser');
                  table.where($scope.user).read().then(function (data) {
                     $scope.loadingData = false;
                        if (data.length) {
                              //console.log("success")
                              $scope.user_info = data[0];
                              localStorage.setItem('user_info', JSON.stringify(data[0]));
                              localStorage.setItem('user_id', data[0].id);
                              localStorage.setItem('user_email', data[0].email);
                              localStorage.setItem('user_name', data[0].name);
                              $rootScope.loggedIn = data[0].name;
                              $location.path('/');
                              $scope.$apply()
                        } else {
                              //console.log("errorrrr")
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
               $scope.loadingData = true;
                  $scope.registerError = false;
                  var table = clientRef.getTable('appuser');
                  table.where({
                        email: $scope.register.email
                  }).read().then(function (data) {
                     $scope.loadingData = false;
                        if (data.length) {
                              $scope.registerError = true;
                              $scope.$apply();
                              $('#duplicateEmailError').delay(5000).fadeOut();
                        } else {
                              //console.log("no email.. can register");
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
                                          ////console.log(id);
                                          ////console.log(redirect)
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
                  $scope.user_info = false;
                  localStorage.removeItem('user_info');
                  localStorage.removeItem('user_id');
                  localStorage.removeItem('user_email');
                  localStorage.removeItem('user_name');
                  $rootScope.loggedIn = false;
                  $location.path('/signin');
                  $scope.$apply()

            }
            // Logout End 

            $scope.returnDated = function (date) {
                  if (date) {
                        var dated_pre = date.split('T');
                        var date = dated_pre[0].replace('"', '');
                        return moment(date).add(1,'day').format('ddd (Do MMM)');
                  }
            }
            $scope.dateFormat = function(date){
               return moment(date).format('DD/MM/YYYY hh:mm');
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
                        // //console.log(data);
                        $scope.schedule = {};
                        for (var index in data) {
                              if (data[index].dated) {
                                    var dated_pre = data[index].dated.split('T');
                                    var date = dated_pre[0].replace('"', '');
                                    //console.log(date + ' ' + data[index].start_hours + ':' + data[index].start_minutes)
                                    //console.log(moment('2017-11-08').format())
                                    var dated = moment(date).add(1, 'day').format('ddd (Do MMM)');
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
                        //console.log($scope.schedule);
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
            $scope.range = function (min, max, step) {
                  step = step || 1;
                  var input = [];
                  for (var i = min; i <= max; i += step) {
                        input.push(i);
                  }
                  return input;
            };

            $scope.activeAccordian = function (id) {

                  $('#' + id).toggleClass('show');

            }

            $scope.getYoutubeChannelVideos = function () {
                  youtubeFactory.getVideosFromChannelById({
                     channelId: "UCsAi-7trEaEjeMhldQnH6Fg",
                        //channelId: "UCsAi7trEaEjeMhldQnH6Fg",
                        key: 'AIzaSyAJtgJaxJhLRjKYXXpoMX2dSW9edAm46Ss'
                  }).then(function (_data) {
                        //on success 
                        //console.log("success..")
                        //console.log(_data.data.items);
                        $scope.youtubeVideos = _data.data.items;
                  }).catch(function (_data) {
                        //on error 
                        //console.log("error..");
                        //console.log(_data);
                  });

            }

            $scope.getVideoSrc = function (src) {
                  return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + src + '?enablejsapi=1');

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