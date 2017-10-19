var app = angular.module("myApp", ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
   .controller('AppController', function ($scope, $state, $stateParams, $rootScope, $http) {
            $scope.updateTitle = function (state, pre) {
                  $scope.title = pre.params.title;
            }
            $rootScope.$on('$stateChangeSuccess', $scope.updateTitle);


            $scope.get_data = function (table, scope) {
                  //   if (table != 'users'){
                  //      var filter = { user_id: localStorage.getItem('user_id') };
                  //   }else{
                  var filter = {}
                  //}
                  $scope.loadingData = true;
                  var table = clientRef.getTable(table);
                  table.where(filter).read().then(function (data) {
                        $scope[scope] = data;
                        $scope.loadingData = false;
                        $scope.$apply()

                  }, $scope.failure);
            }

            $scope.loadSchedule = function(){
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

      
