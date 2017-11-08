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
                        url: '/schedule/:tab',
                        templateUrl: 'partials/schedule.html',
                        params: {
                           title: "Scientific Program"
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
                           title: "Scientific Program Detail"
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
               .state('notification', {
                  url: '/notification',
                  templateUrl: 'partials/notification.html',
                  params: {
                     title: "Notification"
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
                     title: "Floor Plan"
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
         if (name)
         return name.replace('/','');
      }
      $scope.returnDescription = function(named,key,idx){
         var namePass = '';
         if ($scope.facultys){
            if ($scope.presentors[key][idx].description){
               if ($scope.presentors[key][idx].showDescp){
                  $scope.presentors[key][idx].showDescp = false;
               }else{
                  $scope.presentors[key][idx].showDescp = true;
               }
            }else{
               for (var ind in $scope.facultys) {
                  var name = $scope.facultys[ind].name;
                  var nm_split = name.split(' ');
                 // console.log(nm_split)
                  var num_split = named.split(' ');
                  var found = 0;
                  for (var is in nm_split) {
                     for (var isd in num_split) {
                        if (num_split[isd] == nm_split[is]) {
                           found++;
                        }
                     }
                  }
                  if (found == nm_split.length) {
                     namePass = $scope.facultys[ind].description;
                  }
               }
               $scope.presentors[key][idx].description = namePass;
               $scope.presentors[key][idx].showDescp = true;
            }
         }
      }
      $scope.currentSchedule = function (key,key_first){
        // console.log(key, key_first);
         var timers = key_first.split('-');
         st_time = timers[0].split(':');
         end_time = timers[1].split(':');
         var rt = false;
         if (key.indexOf('9th') >= 0 && parseInt(moment().add(5, 'hour').format('D')) == 9){
            if (parseInt(moment().add(5, 'hour').format('H')) >= parseInt(st_time[0])  && parseInt(moment().add(5, 'hour').format('H')) <= parseInt(end_time[0])){
               rt = true;
               console.log(parseInt(moment().add(5, 'hour').format('H')),st_time,end_time)
            }
         }
         if (key.indexOf('10th') >= 0 && parseInt(moment().add(5, 'hour').format('D')) == 10) {
            if (parseInt(moment().add(5, 'hour').format('H')) >= parseInt(st_time[0]) && parseInt(moment().add(5, 'hour').format('H')) <= parseInt(end_time[0])) {
               rt = true;
               console.log(2)
            }
         }
         if (key.indexOf('11th') >= 0 && parseInt(moment().add(5, 'hour').format('D')) == 11) {
            if (parseInt(moment().add(5, 'hour').format('H')) >= parseInt(st_time[0]) && parseInt(moment().add(5, 'hour').format('H')) <= parseInt(end_time[0])) {
               rt = true;
               console.log(3)
            }
         }
         if (key.indexOf('12th') >= 0 && parseInt(moment().add(5, 'hour').format('D')) == 12) {
            if (parseInt(moment().add(5, 'hour').format('H')) >= parseInt(st_time[0]) && parseInt(moment().add(5, 'hour').format('H')) <= parseInt(end_time[0])) {
               rt = true;
               console.log(4)
            }
         }
         return rt;
      }
      $scope.organizerCommitee = '';
      $scope.returnSureName =  function(name){
         if(name.indexOf('.') >= 0){
            var bds = name.split('.');
            var nm = bds[1].split(' ');
            if (nm.length == 2) {
               return bds[0]+'. '+nm[1] +' ' + nm[0];
            }
            if (nm.length == 3) {
               return bds[0] +'. '+ nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            if (nm.length == 4) {
               return bds[0] + '. ' +nm[3] + ' ' + nm[2] + ' ' + nm[0] + ' ' + nm[1];
            }
            if (nm.length == 4) {
               return bds[0] + '. ' + nm[3] + ' ' + nm[2] + ' ' + nm[0] + ' ' + nm[1];
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
                  if (table == 'speaker'){
                     var link =  'https://fishry-app-services.azurewebsites.net/api/table_read?table=' + table;
                  }else{
                     var link = 'https://fishry-app-services.azurewebsites.net/api/table_read?table=' + table
                  }
                  $http({
                     method: 'GET',
                     url: link 
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
               "Faculty Abstract - Plenary": {
                  data: [
                           { name: "Prof William Young", file: "PL1 Prof William Young" },
                           { name: "Susumu Seino", file: "PL2  Susumu Seino" },
                           { name: "A Prof Charlotte Hoybye", file: "PL4 A Prof Charlotte Hoybye" },
                           { name: "Dr Dolores Shoback", file: "PL5 Dr Dolores Shoback" },
                           { name: "Dr Lynette Nieman", file: "PL6 Dr Lynette Nieman" },
                           { name: "Prof Ken Ho", file: "PL8 Prof Ken Ho" },
                        ],
                  key:'Plenary'
                  },
               "Faculty Abstract - Symposium": {
                  data:  [
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
                  { name: "Prof Kok Onn Lee", file: "S6.2 Prof K O Lee" },
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
                  key: 'Symposium'
               },
               "Faculty Abstract - Meet the Expert": {
                  data:   [
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

               ],
               key:'meet'
               },
            };
            $scope.presentors = {
               "Faculty": [
                  { name: "Prof. Aung Moe Wint", image: "Prof. Moe Wint Aung" },
                  { name: "Dr. Aye Than Than", image: "Prof. Than Than Aye" },
                  { name: "Prof. Aye Mo", image: "Dr. Mo Aye" },
                  { name: "Prof. Borghi Claudio" },
                  { name: "Prof. Chan Siew Pheng", image: "Prof. Siew Pheng Chan" },
                  { name: "Dr. Chan Wing Bun", image: "Dr. Wing Bun Chan" },
                  { name: "Dr. F. H. Pfeiffer Andreas", image: "Dr. Andreas F. H. Pfeiffer" },
                  { name: "Prof. Gharib Hossein", image: "Prof. Hossein Gharib" },
                  { name: "Prof. Gilbert Richard E", image: "Prof. Richard E Gilbert" },
                  { name: "Dr. Hario Seno Heri-Nugroho", image: "Dr. Heri-Nugroho Hario Seno" },
                  { name: "Dr. Hlaing Thinn Thinn", image: "Dr. Thinn Thinn Hlaing" },
                  { name: "Prof. Ho Ken", image: "Prof. Ken Ho" },
                  { name: "A/Prof. Hoeybye Charlotte", image: "AProf. Charlotte Hoeybye" },
                  { name: "Dr. Hussein Zanariah", image: "Dr. Zanariah Hussein" },
                  { name: "Prof. Jap Tjin-Shing", image: "Prof. Tjin-Shing Jap" },
                  { name: "Dr. Jeon Min Ji", image: "Dr. Min Ji Jeon" },
                  { name: "Prof. Jimeno Cecile A.", image: "Prof. Cecile A. Jimeno" },
                  { name: "Prof. Jones Thomas Hugh", image: "Prof. Thomas Hugh Jones" },
                  { name: "Dr. Joshi Shashank", image: "Dr. Shashank Joshi" },
                  { name: "Dr. Khaing Maung Maung" },
                  { name: "Prof. Khovidhunkit Weerapan", image: "Prof. Weerapan Khovidhunkit" },
                  { name: "Prof. Kim Won Bae", image: "Prof. Won Bae Kim" },
                  { name: "Prof. Ko Ko" },
                  { name: "Prof. Lacroix Andre", image: "Prof. Andre Lacroix" },
                  { name: "Prof. Latt Tint Swe", image: "Prof. Tint Swe Latt" },
                  { name: "Prof. Lee Kok Onn", image: "Prof. K O Lee" },
                  { name: "A/Prof. Leow Melvin", image: "A Prof Melvin Leow" },
                  { name: "Dr. Lim Vivien", image: "Dr Vivien Lim" },
                  { name: "A/Prof. Loke Kah Yin", image: "AProf. Kah Yin Loke" },
                  { name: "A/Prof. McMahon Graham", image: "AProf. Graham McMahon" },
                  { name: "Prof. Mercado-Asis Leilani", image: "Prof. Leilani Mercado-Asis" },
                  { name: "Prof. Mohamed Mafauzy", image: "Prof. Mafauzy Mohamed" },
                  { name: "Prof. Mourad Jean-Jacques" },
                  { name: "Dr. Myint Khin Swe", image: "Prof. Dr. Khin Swe Myint" },
                  { name: "A/Prof. Myint Thein" },
                  { name: "A/Prof. Naing Soe", image: "AProf. Soe Naing" },
                  { name: "Dr. Nam Tran Quang", image: "Dr. Tran Quang Nam" },
                  { name: "Dr. Nieman Lynnette" },
                  { name: "Prof. Oo Thein Hlaing", image: "Prof Thein Hlaing Oo" },
                  { name: "Dr. Pemayun Tjokorda G D", image: "Dr. Tjokorda Gde Dalem Pemayun" },
                  { name: "Prof. Sahay Rakesh", image: "Prof. Rakesh Sahay" },
                  { name: "Dr. Sampangi Sudhakar", image: "Dr. Sudhakar Sampangi" },
                  { name: "Prof. Seino Susumu", image: "Prof Susumu Seino" },
                  { name: "Dr. Shoback Dolores", image: "Dr. Dolores Shoback" },
                  { name: "Dr. Soe Kyaw Kyaw", image: "Dr. Kyaw Kyaw Soe" },
                  { name: "Prof. Soegondo Sidartawan", image: "Prof. Sidartawan Soegondo" },
                  { name: "Dr. Soh Abel", image: "Dr. Abel Soh" },
                  { name: "Dr. Tan Gerry", image: "Dr. Gerry Tan" },
                  { name: "Dr. Tan  Go Ruby", image: "Dr. Ruby Tan Go" },
                  { name: "Prof. Van Gaal Luc", image: "Prof Luc Van Gaal" },
                  { name: "A/Prof. Vethakkan Shireene Ratna", image: "AProf. Shireene Ratna Vethakkan" },
                  { name: "A/Prof. Vu Thi Thanh Huyen", image: "AProf. Thi Thanh Huyen Vu" },
                  { name: "Dr. Win Aung Ko", image: "Dr. Aung Ko Win" },
                  { name: "Prof. Young William", image: "Prof. William Young" },
                  { name: "Dr.. Yuen Kevin", image: "Dr. Kevin Yuen" },
               ],
               "Presenter": [
                  { name: "Adam John" },
                  { name: "Dr. Agoncillo Karen Elouie", image: "Dr. Karen Elouie Agoncillo" },
                  { name: "Ms. Anusornvongchai Thitinun" },
                  { name: "Dr. Aung Aye Thida" },
                  { name: "Dr. Aung Win Yu", image: "Dr. Win Yu Aung" },
                  { name: "Prof. Aung Moe Wint", image: "Prof. Moe Wint Aung" },
                  { name: "Dr. Aye Htar Ni", image: "Dr. Htar Ni Aye" },
                  { name: "Dr. Balansa Endrile", image: "Dr. Endrile Balansa" },
                  { name: "Dr. Bautista Francesca Paula", image: "Dr. Francesca Paula Bautista" },
                  { name: "Dr. Cabrera Carmen Carina", image: "Dr. Carmen Carina Cabrera" },
                  { name: "Dr. Cheung Kitty" },
                  { name: "Dr. Chiang Brenda", image: "Dr. Brenda Chiang" },
                  { name: "Mr. Chotwanvirat Phawinpon", image: "Mr. Phawinpon Chotwanvirat" },
                  { name: "Prof. Chung Yoon-Sok", image: "Prof. Yoon-Sok Chung" },
                  { name: "Dr. Corpuz Hannah", image: "Dr. Hannah Corpuz" },
                  { name: "Ms. Dau Ly Na", image: "Ms. Ly Na Dau" },
                  { name: "Dr. Diane Carla Bernardo", image: "Dr. Bernardo Diane Carla" },
                  { name: "Mr. Donadi Eduardo", image: "Mr. Eduardo Donadi" },
                  { name: "Dr. Eliana Fatimah", image: "Dr. Fatimah Eliana" },
                  { name: "Dr. Felipe Roy Raoul" },
                  { name: "Dr. Francisco Danica", image: "Dr. Danica Francisco" },
                  { name: "Dr. Gabat Julie Anne", image: "Dr. Julie Anne Gabat" },
                  { name: "Dr. Gadekar Arvind", image: "Dr. Arvind Gadekar" },
                  { name: "Mr. Ghosh Chiranjit", image: "Mr. Chiranjit Ghosh" },
                  { name: "Dr. Gutch Manish", image: "Dr. Manish Gutch" },
                  { name: "Dr. Han Ji Min" },
                  { name: "Dr. Haydar Ali Tajuddin Amalina", image: "Dr. Amalina Haydar Ali Tajuddin" },
                  { name: "Mrs. Herrera Lenor", image: "Mrs. Lenor Herrera" },
                  { name: "Dr. Hla Shwe Thu Zar", image: "Dr. Thu Zar Hla Shwe" },
                  { name: "Dr. Hlaing Zarchi-Theint-Theint", image: "Dr. Zarchi-Theint-Theint Hlaing" },
                  { name: "A/Prof. Hoang Thanh", image: "AProf. Thanh Hoang" },
                  { name: "Dr. Htike Hein", image: "Dr. Hein Htike" },
                  { name: "Dr. Huan Nai Chien", image: "Dr. Nai Chien Huan" },
                  { name: "Dr. Huynh Ngoc Diem", image: "Dr. Ngoc Diem Huynh" },
                  { name: "Dr. Ilagan Ma. Karen Celine", image: "Dr. Ma. Karen Celine Ilagan" },
                  { name: "Dr. Jao - Sanchez Suzanne", image: "Dr. Suzanne Jao - Sanchez" },
                  { name: "Dr. Jeni Diana", image: "Dr. Diana Jeni" },
                  { name: "Ms. Jo Carolina Margaret", image: "Ms. Carolina Margaret Jo" },
                  { name: "Prof. Kang Sun Chul" },
                  { name: "Dr. Kao Mei-teng", image: "Dr. Mei-teng Kao" },
                  { name: "Dr. Kim Tae Yong", image: "Dr. Tae Yong Kim" },
                  { name: "Dr. Kuwata Hitoshi", image: "Dr. Hitoshi Kuwata" },
                  { name: "A/Prof. Kyaw Theingi", image: "AProf. Theingi Kyaw" },
                  { name: "Dr. Kyaw Phyo" },
                  { name: "Dr. Kyaw Swar Myint Aung", image: "Dr. Aung Kyaw Swar Myint" },
                  { name: "Dr. Lazaro Karen" },
                  { name: "Mrs. Le Trang", image: "Mrs. Trang Le" },
                  { name: "Dr. Le Anh Tu", image: "Dr. Tu Le Anh" },
                  { name: "Mrs. Le Than Phuong", image: "Mrs. Phuong Le Than" },
                  { name: "Prof. Lebl Jan" },
                  { name: "Mr. Lee Jeongkun", image: "Mr. Jeongkun Lee" },
                  { name: "Prof. Lee Jihyun" },
                  { name: "Prof. Lee Sihoon", image: "Prof. Sihoon Lee" },
                  { name: "Dr. Libre Michelle Angeli", image: "Dr. Michelle Angeli Libre" },
                  { name: "Dr. Lim Kim Piow", image: "Dr. Kim Piow Lim" },
                  { name: "Dr. Lin Jui-hsiang", image: "Dr. Jui-hsiang Lin" },
                  { name: "Dr. Lin Yi-chun", image: "Dr. Yi-chun Lin" },
                  { name: "Dr. Li-yu Tsai", image: "Dr. Tsai Li-yu" },
                  { name: "Dr. Llanes Mark Ramon Victor" },
                  { name: "Dr. Low Kiat Mun Serena" },
                  { name: "Dr. Lu Johanna", image: "Dr. Johanna Lu" },
                  { name: "Dr. Luy Sybil Claudine" },
                  { name: "Mrs. Marfianti Erlina", image: "Mrs. Erlina Marfianti" },
                  { name: "Dr. Mercado Jonathan" },
                  { name: "Dr. Moe Aung Soe", image: "Dr. Aung Soe Moe" },
                  { name: "Dr. Myint Kyar Nyo Soe", image: "Dr. Kyar Nyo Soe Myint" },
                  { name: "Dr. Nguyen Ngoc Tam", image: "Dr. Ngoc Tam Nguyen" },
                  { name: "Dr. Nguyen Thi Thu Huong", image: "Dr. Huong Nguyen Thi Thu" },
                  { name: "Mrs. Nguyen Xuan Thanh", image: "Mrs. Thanh Nguyen Xuan" },
                  { name: "Dr. Oo Su Myo Myat", image: "Dr. Su Myo Myat Oo" },
                  { name: "Dr. Ooi Xi Yan", image: "Dr. Xi Yan Ooi" },
                  { name: "Prof. Orbak Zerrin", image: "Prof. Zerrin Orbak" },
                  { name: "Dr. Paningbatan James" },
                  { name: "Dr. Panuda Jose Paolo", image: "Dr. Jose Paolo Panuda" },
                  { name: "Dr. Park Jung Hwan", image: "Dr. Jung Hwan Park" },
                  { name: "Dr. Payumo Edelissa", image: "Dr. Edelissa Payumo" },
                  { name: "Dr. Peng Ng", image: "Dr. Ng Peng" },
                  { name: "Ms. Plianpan Panitta" },
                  { name: "Dr. Pramono Laurentius Aswin" },
                  { name: "Dr. Pyone Zar Chi", image: "Dr. Zar Chi Pyone" },
                  { name: "Dr. Rangkuti Deske Muhadi", image: "Dr. Deske Muhadi Rangkuti" },
                  { name: "Prof. Rhee Eun-jung" },
                  { name: "Dr. San Bo Bo", image: "Dr. Bo Bo San" },
                  { name: "Dr. Sanda Khin", image: "Dr. Khin Sanda" },
                  { name: "Dr. Sarmiento Annie Jane", image: "Dr. Annie Jane Sarmiento" },
                  { name: "Dr. Sebastian Siao Ria Mari", image: "Dr. Ria Mari Sebastian Siao" },
                  { name: "Dr. See Chee Keong", image: "Dr. Chee Keong See" },
                  { name: "A/Prof. Seo Mihye", image: "AProf. Mihye Seo" },
                  { name: "Prof. Shakir Mohamed" },
                  { name: "Prof. Shong Young Kee", image: "Prof. Young Kee Shong" },
                  { name: "Ms. Sifuentes Vanessa", image: "Ms. Vanessa Sifuentes" },
                  { name: "Prof. Snajderova Marta", image: "Prof. Marta Snajderova" },
                  { name: "Prof. Song Kee Ho", image: "Prof. Kee Ho Song" },
                  { name: "Dr. Sorongon-Legaspi Mishell Kris", image: "Dr. Mishell Kris Sorongon-Legaspi" },
                  { name: "Dr. Sree Dharan Shalini" },
                  { name: "Dr. Tappan Sweet Garllie Albert", image: "Dr. Sweet Garllie Albert Tappan" },
                  { name: "Dr. Than Vutha", image: "Dr. Vutha Than" },
                  { name: "Dr. Thandar Khine", image: "Dr. Khine Thandar" },
                  { name: "A/Prof. Thant Zarli", image: "AProf. Zarli Thant" },
                  { name: "Dr. Thewjitcharoen Yotsapon" },
                  { name: "Dr. Tin Thiri", image: "Dr. Thiri Tin" },
                  { name: "Dr. Togonon Johann Christine", image: "Dr. Johann Christine Togonon" },
                  { name: "Dr. Totesora Darwin", image: "Dr. Darwin Totesora" },
                  { name: "Mr. Trinh Ngoc Anh", image: "Mr. Ngoc Anh Trinh" },
                  { name: "Dr. Uy Melissa Claire", image: "Dr. Melissa Claire Uy" },
                  { name: "Dr. Valera Grethel Fatima", image: "Dr. Grethel Fatima Valera" },
                  { name: "Dr. Villamiel Katrina Marie", image: "Dr. Katrina Marie Villamiel" },
                  { name: "Dr. Vo Tuan Khoa", image: "Dr. Tuan Khoa Vo" },
                  { name: "Dr. Wai Linn Thiri", image: "Dr. Thiri Wai Linn" },
                  { name: "Dr. Wardhana Wardhana" },
                  { name: "A/Prof. Wee Shiou-Liang", image: "AProf. Shiou-Liang Wee" },
                  { name: "Dr. Wong Hui Chin", image: "Dr. Hui Chin Wong" },
                  { name: "Dr. Ynn Kyaw", image: "Dr. Kyaw Ynn" },
                  { name: "Dr. Yong Lit Sin", image: "Dr. Lit Sin Yong" },
                  { name: "Dr. Yu Marc Gregory", image: "Dr. Marc Gregory Yu" },
                  { name: "A/Prof. Yun Jong Won", image: "AProf. Jong Won Yun" },
                  { name: "Dr. Zaw Thurein", image: "Dr. Thurein Zaw" },
                  { name: "Dr. Zhang Xiao", image: "Dr. Xiao Zhang" },
                  { name: "Mr. Zumaraga Mark Pretzel", image: "Mr. Mark Pretzel Zumaraga" },

               ],
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
            $scope.beutifyDate = function(dt){
               var date  = dt.replace('(','').replace(')','').split(' ');
               return date[1]+' '+date[2];
            }
            $scope.namedNew = {
               'Faculty': [
                  { name: 'Dr. Low Kiat Mun Serena' },
                  { name: 'Mr. Zumaraga Mark Pretzel' },
                  { name: 'Ms. Dau Ly Na' },
                  { name: 'Dr. Villamiel Katrina Marie' },
                  { name: 'Mr. Trinh Ngoc Anh' },
                  { name: 'Dr. Aye Htar Ni' },
                  { name: 'Ms. Jo Carolina Margaret' },
                  { name: 'Dr. Macalalad-Josue Anna Angelica' },
                  { name: 'Dr. Huynh Ngoc Diem' },
                  { name: 'Dr. Gutch Manish' },
                  { name: 'Dr. Pramono Laurentius Aswin' },
                  { name: 'Dr. Yong Lit Sin' },
                  { name: 'Dr. Panuda Jose Paolo' },
                  { name: 'Prof. Shong Young Kee' },
                  { name: 'Dr. Sree Dharan Shalini' },
                  { name: 'Dr. Ilagan Ma. Karen Celine' },
                  { name: 'Mrs. Le Than Phuong' },
                  { name: 'Dr. Vo Tuan Khoa' },
                  { name: 'Dr. Hla Shwe Thu Zar' },
                  { name: 'Dr. Sebastian Siao Ria Mari' },
                  { name: 'Dr. Uy Melissa Claire' },
                  { name: 'Dr. Lim Kim Piow' },
                  { name: 'Dr. Pyone Zar Chi' },
                  { name: 'Dr. Bautista Francesca Paula' },
                  { name: 'Dr. Valera Grethel Fatima' },
                  { name: 'Dr. Diane Carla Bernardo ' },
                  { name: 'Dr. Gabat Julie Anne' },
                  { name: 'Dr. Huan Nai Chien' },
                  { name: 'Dr. Ilagan Ma. Karen Celine' },
                  { name: 'Dr. Kim Tae Yong' },
                  { name: 'A/Prof. Yun Jong Won' },
                  { name: 'Dr. Sorongon-Legaspi Mishell Kris' },
                  { name: 'Dr. Villamiel Katrina Marie' },
                  { name: 'Dr. Wardhana Wardhana' },
                  { name: 'Dr. Aung Aye Thida' },
                  { name: 'Dr. Chaniago Lita Septina' },
                  { name: 'Dr. Han Ji Min' },
                  { name: 'Dr. Kyaw Swar Myint Aung' },
                  { name: 'Dr. Le Anh Tu' },
                  { name: 'Dr. Luy Sybil Claudine' },
                  { name: 'Dr. Aung Win Yu' },
                  { name: 'Dr. Myint Kyar Nyo Soe' },
                  { name: 'Dr.Cabrera Carmen Carina' },
                  { name: 'Dr. Felipe Roy Raoul' },
                  { name: 'Dr. Low Kiat Mun Serena' },
                  { name: 'Mr. Trinh Ngoc Anh' },
                  { name: 'Dr. Kao Mei-teng' },
                  { name: 'Dr. Lim Kim Piow' },
                  { name: 'Dr. Togonon Johann Christine' },
                  { name: 'A/Prof. Wee Shiou-Liang' },
                  { name: 'Dr. Jao - Sanchez Suzanne' },
                  { name: 'Dr. Macalalad-Josue Anna Angelica' },
                  { name: 'Dr. See Chee Keong' },
                  { name: 'Dr. Oo Su Myo Myat' },
                  { name: 'Dr. Yu Marc Gregory' },
                  { name: 'Dr. Bautista Francesca Paula' },
                  { name: 'Dr. Gabat Julie Anne' },
                  { name: 'Dr. Haydar Ali Tajuddin Amalina' },
                  { name: 'Dr. Lin Yi-chun' },
                  { name: 'Dr. Li-yu Tsai' },
                  { name: 'Dr. Sarmiento Annie Jane' },
                  { name: 'Dr. Wong Hui Chin' },
                  { name: 'Prof. Aung Moe Wint' },
                  { name: 'Prof. Kang Sun Chul' },
                  { name: 'Dr. Macalalad-Josue Anna Angelica' },
                  { name: 'Dr. Moe Aung Soe' },
                  { name: 'Dr. Nguyen Ngoc Tam' },
                  { name: 'Dr. Nguyen Thi Thu Huong' },
                  { name: 'Mrs. Nguyen Xuan Thanh' },
                  { name: 'Dr. Ooi Xi Yan' },
                  { name: 'Prof. Orbak Zerrin' },
                  { name: 'Dr. Panuda Jose Paolo' },
                  { name: 'Dr. Park Jung Hwan' },
                  { name: 'Dr. Rangkuti Deske Muhadi' },
                  { name: 'Prof. Rhee Eun-jung' },
                  { name: 'Dr. San Bo Bo' },
                  { name: 'Prof. Song Kee Ho' },
                  { name: 'Dr. Tappan Sweet Garllie Albert' },
                  { name: 'Dr. Uy Angelique Bea' },
                  { name: 'Dr. Wai Linn Thiri' },
                  { name: 'Dr. Agoncillo Karen Elouie' },
                  { name: 'Dr. Libre Michelle Angeli' },
                  { name: 'Dr. Tappan Sweet Garllie Albert' },
                  { name: 'Dr. Hlaing Zarchi-Theint-Theint' },
                  { name: 'Dr. Llanes Mark Ramon Victor' },
                  { name: 'Prof. Orbak Zerrin' },
                  { name: 'Prof. Orbak Zerrin' },
                  { name: 'A/Prof. Yun Jong Won' },
                  { name: 'Dr. Libre Michelle Angeli' },
                  { name: 'Dr. Macalalad-Josue Anna Angelica' },
                  { name: 'Prof. Chan Siew Pheng' },
                  { name: 'Dr. Hario Seno Heri-Nugroho' },
                  { name: 'Dr. Hlaing Thinn Thinn' },
                  { name: 'A/Prof. Hoeybye Charlotte' },
                  { name: 'Prof. Jap Tjin-Shing' },
                  { name: 'Dr. Jeon Min Ji' },
                  { name: 'Prof. Jones Thomas Hugh' },
                  { name: 'Dr. Khaing Maung Maung' },
                  { name: 'Prof. Kim Won Bae' },
                  { name: 'Prof. Latt Tint Swe' },
                  { name: 'Prof. Lee Kok Onn' },
                  { name: 'A/Prof. Loke Kah Yin' },
                  { name: 'Dr. Myint Khin Swe' },
                  { name: 'Dr. Nam Tran Quang' },
                  { name: 'Prof. Oo Thein Hlaing' },
                  { name: 'Dr. Pemayun Tjokorda G D' },
                  { name: 'Dr. Soe Kyaw Kyaw' },
                  { name: 'Dr. Tan  Go Ruby' },
                  { name: 'Prof. Van Gaal Luc' },
                  { name: 'A/Prof. Vethakkan Shireene Ratna' },
                  { name: 'A/Prof. Vu Thi Thanh Huyen' },
                  { name: 'Dr. Win Aung Ko' }
               ]
            };
            $scope.organizerCommitee =  {
               "Advisory Board": [
                  { Name: "Professor Tint Swe Latt", Designation: "Advisor" },
                  { Name: "Professor Khin Ye Myint ", Designation: "Advisor" },
                  { Name: "Professor Ye Thwe", Designation: "Advisor" },
               ],
               "Chairperson": [
                  { Name: "Professor Than Than Aye", Designation: "Chairperson" },
               ],
               "Secretaries": [
                  { Name: "Professor Ko Ko", Designation: "Secretary General" },
                  { Name: "Professor Aye Myint Khaing", Designation: "Joint Secretary (1)" },
                  { Name: "Associate Professor Thein Myint", Designation: "Joint Secretary (2)" },
                  { Name: "Dr Soe Wai Phyo", Designation: "Joint Secretary (3)" },
               ],
               "Treasurer": [
                  { Name: "Professor Moe Wint Aung", Designation: "Treasurer (1)" },
                  { Name: "Professor Theingi Kyaw", Designation: "Treasurer (2)" },
                  { Name: "Associate Professor San San Win", Designation: "Treasurer (3)" },
               ],
               "Abstract & Publications": [
                  { Name: "Professor Kyu Kyu Maung", Designation: "Chairperson" },
                  { Name: "Professor Khin Than Aye", Designation: "Vice-Chairperson (1)" },
                  { Name: "Professor Aye Thida", Designation: "Vice-Chairperson (2)" },
                  { Name: "Associate Professor Khin Thin Yu", Designation: "Secretary" },

               ],
               "Social & Media Sub-committee": [
                  { Name: "Professor Nu Nu Maw", Designation: "Chairperson" },
                  { Name: "Professor Aye Aye Chit", Designation: "Vice-Chairperson" },
                  { Name: "Associate Professor  Htet Htet Khin", Designation: "Secretary (1)" },
                  { Name: "Dr Mg Mg Thant", Designation: "Secretary (2)" },
                  { Name: "Major Kyaw Myint Oo", Designation: "Joint Secretary" },
               ],
               "Trade & Exhibition": [
                  { Name: "Associate Professor Ye Myint", Designation: "Chairperson" },
                  { Name: "Associate Professor Tet Tun Chit", Designation: "Vice-Chairperson " },
                  { Name: "Dr Tin Win Aung", Designation: "Secretary " },
                  { Name: "Dr Yar Pyae", Designation: "Joint Secretary " },
               ],
               "Scientific Sub-Committee": [
                  { Name: "Professor Aye Aye Aung", Designation: "Chairperson" },
                  { Name: "Professor Khin Saw Than", Designation: "Vice-Chairperson" },
                  { Name: "Dr Khin Sandar", Designation: "Secretary" },
               ],
               "Members of Academic Sub-Committee": [
                  { Name: "Professor Myo Win" },
                  { Name: "Professor Myat Thandar" },
                  { Name: "Professor Zaw Lynn Aung" },
                  { Name: "Professor Aung Cho Myint" },
                  { Name: "Professor Win Win Myint" },
                  { Name: "Professor Nyo Nyo Wah" },
                  { Name: "Professor Cho Mar Hlaing" },
                  { Name: "Professor Lt Col Thet Naing" },
                  { Name: "Professor Lt. Col. Mo Mo Than" },
                  { Name: "Professor Wah Wah Wan Maung" },
                  { Name: "Professor Mya Thandar Sein" },
                  { Name: "Professor Cho Cho Khin" },
                  { Name: "Col. Khin Soe Win" },
                  { Name: "Dr. Thin Thin Hlaing" },
                  { Name: "Dr. Kyaw Swar Lin" },
                  { Name: "Dr. Ni Ni Hlaing" },
                  { Name: "Dr. Kyar Nyo Soe Myint" },
                  { Name: "Dr. Thet Mon Zaw" },
                  { Name: "Dr. Yin Yin Win" },
                  { Name: "Major Khaing Lwin" },
                  { Name: "Major Kaung Myat" },
                  { Name: "Major Aung Myo Saw" },
                  { Name: "Dr. Mya Sandar Thein " },
                  { Name: "Dr. Ei Sandar Oo" },
               ]
            }
            $scope.initSchedule = function(){
               $scope.currentUrl = $state.params.tab;
            }
            $scope.findName = function(name){
               var named = name;
               for(var id in $scope.namedNew){
                  var nd = $scope.namedNew[id].name;
                  var nam = nd.split(' ');
                  var found = 0;
                  for (var ind in nam){
                     if (name.indexOf(nam[ind]) >= 0){
                        found++;
                     }
                  }
                  if(found == nam.length){
                     named = nd;
                  }
                  
               }
               console.log(named)
               return named;
            }
            $scope.loadSchedule = function () {
                  $scope.loadingData = true;
                  var filter = {};
                  $scope.loadingData = true;
                  $http({
                        method: 'GET',
                        url: 'https://fishry-app-services.azurewebsites.net/api/table_read?table=schedule&orderBy=start_hours,start_minutes&orderSeq=asc'
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
                        var schArrange = {};
                        for (var inds in $scope.schedule){
                           if (inds == 'Thu (9th Nov)'){
                              schArrange[inds] = $scope.schedule[inds];
                           }
                        }
                        for (var inds in $scope.schedule) {
                           if (inds == 'Fri (10th Nov)') {
                              schArrange[inds] = $scope.schedule[inds];
                           }
                        }
                        for (var inds in $scope.schedule) {
                           if (inds == 'Sat (11th Nov)') {
                              schArrange[inds] = $scope.schedule[inds];
                           }
                        }
                        for (var inds in $scope.schedule) {
                           if (inds == 'Sun (12th Nov)') {
                              schArrange[inds] = $scope.schedule[inds];
                           }
                        }
                        $scope.schedule = schArrange;
                        console.log($scope.schedule)
                       // console.log(JSON.stringify($scope.schedule));
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
                  console.log(id);
                  $('#' + id).toggleClass('show');
                  $('.' + id).toggleClass('hide');

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