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
                           title: "Login to Cardio"
                        }
                  })
                  .state('register', {
                        url: '/register',
                        templateUrl: 'partials/register.html',
                        params: {
                           title: "Register to Cardio"
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
                           title: "Welcome to Cardio"
                        }
                  })
                  .state('home2', {
                        url: '/home2',
                        templateUrl: 'partials/home2.html',
                        params: {
                           title: "Welcome to Cardio"
                        }
                  })
                  .state('about', {
                        url: '/about',
                        templateUrl: 'partials/about.html',
                        params: {
                           title: "About Cardio"
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
                           title: "Exhibitors"
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
         $scope.misc = misc;
         $scope.faculty = faculty;
         $scope.exhibitor = exhibitor;
         $scope.organization_comitee = organization_committee;
         var preOrg = {}
         for(var id in $scope.organization_comitee){
            if(!preOrg[$scope.organization_comitee[id].Headings]){
               preOrg[$scope.organization_comitee[id].Headings] = [];
            }
            preOrg[$scope.organization_comitee[id].Headings].push($scope.organization_comitee[id]);
         }
         $scope.orComittee = preOrg;
         //$scope.orgConted = schedule;
         $scope.schedule = schedule;
         var preOrgSchedule = {};
         for(var id in $scope.schedule){
            if ($scope.schedule[id].start_time && $scope.schedule[id].date){
             if (!preOrgSchedule[$scope.schedule[id].date]){
               preOrgSchedule[$scope.schedule[id].date] = {}
            }
            if (!preOrgSchedule[$scope.schedule[id].date][$scope.schedule[id].start_time]){
               preOrgSchedule[$scope.schedule[id].date][$scope.schedule[id].start_time] = { date: $scope.schedule[id].date, start_time: $scope.schedule[id].start_time, end: $scope.schedule[id].end_time, activity:[] };
            }
            preOrgSchedule[$scope.schedule[id].date][$scope.schedule[id].start_time].activity.push($scope.schedule[id]);

           }
        }
         $scope.orgConted = preOrgSchedule
         console.log(preOrgSchedule)
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
      $scope.agendaDetails = function(){
         var str = $stateParams.id;
            str = str.split('-');
            $scope.pID = str[0];
            $scope.sID = str[1];
            $scope.ssID = str[2];

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
                     var table = clientRef.getTable('appuser_cardio');
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
               var table = clientRef.getTable('appuser_cardio');
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
           
           
           
     
// var grpSch = {};
// for (var indsd in $scope.ortho.organization_commitee){
//    if (!grpSch[$scope.ortho.organization_commitee[indsd].Group]){
//       grpSch[$scope.ortho.organization_commitee[indsd].Group] = [];
//      }
//    grpSch[$scope.ortho.organization_commitee[indsd].Group].push($scope.ortho.organization_commitee[indsd]);
//  }
// $scope.orgCont = grpSch;
// var grpSched = {};
//          for (var indsd in $scope.ortho.ScientificProgram) {
//             if (!grpSched[$scope.ortho.ScientificProgram[indsd].Date]) {
//                grpSched[$scope.ortho.ScientificProgram[indsd].Date] = [];
//    }
//             grpSched[$scope.ortho.ScientificProgram[indsd].Date].push($scope.ortho.ScientificProgram[indsd]);
// }
         // $scope.orgConted = { "17th Nov 2017": [{ "Date": "17th Nov 2017", "Start": "08:30 AM", "End": "10:00 AM", "Activity": [{ "Name": "Trauma - I", "Hall": "A", "Image": "17th" }, { "Name": "Arthroscopy - I", "Hall": "B", "Image": "17830" }, { "Name": "Spine - I", "Hall": "C", "image": "17th 6" }] }, { "Date": "17th Nov 2017", "Start": "10:00 AM", "End": "11:30 AM", "Activity": [{ "Name": "Trauma-II", "Hall": "A", "Image": "17th 1" }, { "Name": "Arthroscopy-II", "Hall": "B" }, { "Name": "Spine-II", "Hall": "C" }, { "Image": "17th 7" }] }, { "Date": "17th Nov 2017", "Start": "11:30 AM", "End": "12:15 PM", "Activity": [{ "Name": "Plenary Lecture - I", "Hall": "A,B,C", "Image": "17th 2" }] }, { "Date": "17th Nov 2017", "Start": "12:15 AM", "End": "13:00 PM", "Activity": [{ "Name": "Plenary Lecture-II", "Hall": "A,B,C" }] }, { "Date": "17th Nov 2017", "Start": "13:00 PM", "End": "14:30 PM", "Activity": [{ "Name": "Lunch & Prayer Break", "Hall": "A,B,C" }] }, { "Date": "17th Nov 2017", "Start": "14:30 PM", "End": "16:30 PM", "Activity": [{ "Name": "Trauma-III", "Hall": "A", "Image": "17th 3" }, { "Name": "Arthroscopy-I", "Hall": "B", "Image": "17th 9" }, { "Name": "Spine-III", "Hall": "C", "Image": "17th 8" }] }, { "Date": "17th Nov 2017", "Start": "16:30 PM", "End": "18:30 PM", "Activity": [{ "Name": "Trauma-IV", "Hall": "A", "Image": "17th 5" }, { "Name": "Anthroplasty II", "Hall": "B", "Image": "17th 10" }, { "Name": "Illizarove", "Hall": "C", "Image": "17illazorvec1430" }] }], "18th Nov 2017": [{ "Date": "18th Nov 2017", "Start": "08:30 AM", "End": "10:00 AM", "Activity": [{ "Name": "Anthroplasty-III", "Hall": "A", "Image": "183830" }, { "Name": "Paediatrics-I", "Hall": "B", "Image": "18b830" }, { "Name": "Hand & Upper Limb-I", "Hall": "C", "Image": "18c830" }] }, { "Date": "18th Nov 2017", "Start": "10:00 AM", "End": "11:30 AM", "Activity": [{ "Name": "Anthroplasty-III", "Hall": "A", "Image": "18th" }, { "Name": "Paediatrics-II", "Hall": "B", "Image": "18b1030ll" }, { "Name": "Hand & Upper Limb-II", "Hall": "C", "Image": "181011" }] }, { "Date": "18th Nov 2017", "Start": "11:30 AM", "End": "12:15 PM", "Activity": [{ "Name": "Plenary Lecture - III", "Hall": "A,B,C", "Image": "pl31130" }] }, { "Date": "18th Nov 2017", "Start": "12:15 PM", "End": "13:00 PM", "Activity": [{ "Name": "Plenary Lecture - IV", "Hall": "A,B,C", "Image": "pl4181215" }] }, { "Date": "18th Nov 2017", "Start": "13:00 PM", "End": "14:30 PM", "Activity": [{ "Name": "Lunch & Prayer Break", "Hall": "A,B,C" }] }, { "Date": "18th Nov 2017", "Start": "14:30 PM", "End": "16:00 PM", "Activity": [{ "Name": "Anthroplasty-IV", "Hall": "A", "Image": "18iv1430" }, { "Name": "Paediatrics-III", "Hall": "B", "Image": "18b1430" }, { "Name": "Future of Orthopedic Training", "Hall": "C" }] }, { "Date": "18th Nov 2017", "Start": "16:00 PM", "End": "17:30 PM", "Activity": [{ "Name": "Anthroplasty-IV", "Hall": "A" }, { "Name": "MSK Oncology - I", "Hall": "B" }, { "Name": "Sterilization", "Hall": "C" }] }], "19th Nov 2017": [{ "Date": "19th Nov 2017", "Start": "08:30 AM", "End": "10:30 AM", "Activity": [{ "Name": "Free Papers", "Hall": "A" }, { "Name": "MSK Oncology-II", "Hall": "B" }, { "Name": "Foot & Ankle-I", "Hall": "C", "Image": "19830fa" }] }, { "Date": "19th Nov 2017", "Start": "10:30 AM", "End": "12:30 PM", "Activity": [{ "Name": "MSK infection", "Hall": "A", "Image": "19a1030" }, { "Name": "MSK Oncology-III", "Hall": "B" }, { "Name": "Foot & Ankle-II", "Hall": "C", "Image": "191030cfa" }] }, { "Date": "19th Nov 2017", "Start": "12:30 AM", "End": "13:30 PM", "Activity": [{ "Name": "Closing Ceremony/ Prize Distribution", "Hall": "A,B,C" }] }] };
         // //console.log(JSON.stringify(grpSched));
         //    $scope.getCountryOrganizer = function(name){
         //       var country = '';
         //       for (var ind in $scope.organizerList){
         //          if ($scope.organizerList[ind].name == name){
         //             country = $scope.organizerList[ind].country
         //          }
         //       }
         //       return country;
         //    }
         //    $scope.get_data('organizer', 'organizerList')
         //    // Edit data end 
         //    $scope.deleteRow = function(table,id){
         //       $scope.loadingData = true;
         //       var table = clientRef.getTable(table);
         //       table.del({ id: id })
         //          .done(function (insertedItem) {
         //             $scope.loadingData = false;
         //             $scope.userAgenda();
         //             $scope.$apply()
         //          }, $scope.failure);
         //    }

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
                  var table = clientRef.getTable('appuser_cardio');
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
                  var table = clientRef.getTable('appuser_cardio');
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
                              // $scope.insert_data('appuser_cardio', $scope.register, '/signin');

                              for (var dat in $scope.register) {
                                    if (typeof (data[dat]) == 'object') {
                                          data[dat] = JSON.stringify(data[dat]);
                                    }
                              }
                              var table = clientRef.getTable('appuser_cardio');
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