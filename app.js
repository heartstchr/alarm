
(function() {
    'use strict';
    angular
        .module('alarmApp', ['ngRoute', 'ngSanitize','ngMaterial','angularMoment'])
        .config(config)
        .run(run)
        .controller('mainController', mainController);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainController',
                controllerAs: 'a',
                templateUrl: 'views/alarmList.html',
            })

    }

    run.$inject = ['$rootScope','$location'];
    function run($rootScope,$location) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            // $location.path('/');
        });
    }


    mainController.$inject=['$scope','$location','$mdDialog','ALARM_LIST'];
    function mainController ($scope,$location,$mdDialog,ALARM_LIST) {
        var a = $scope;
        a.archivedAlarmList= [];
        a.alarmList= [];
        a.app = {
            isLoading: true,
            spinner: document.querySelector('.loader'),
            container: document.querySelector('.main'),
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        };
        //list of alarms
        ALARM_LIST.default.forEach(function (ele) {
            if(ele.deleted){
                a.archivedAlarmList.push(ele);
            }else {
                a.alarmList.push(ele);
            }
        });
        a.color = 'amber';
        a.isOpen = false;
        a.selectedMode = 'md-scale';
        a.selectedDirection = 'up';
        a.text = 'Customize your alarm with ' +$location.path('/').$$absUrl ;
        a.deleteAlarm = function (ev,index) {
            a.alarmList[index].deleted= true;
            a.alarmList[index].status= false;
            a.archivedAlarmList.push(a.alarmList[index]);
            a.alarmList.splice(index,1);
        };
        a.deleteForeverAlarm =function (ev,index) {
            a.archivedAlarmList[index].deleteForever= true;
            a.archivedAlarmList[index].status= false;
            a.archivedAlarmList.splice(index,1);
        };
        a.showAlarm =function (ev,index,isDeleted) {
            var data;
            if(isDeleted){
                data=a.archivedAlarmList[index];
            }
            else {
                data=a.alarmList[index];
            }
            $mdDialog.show({
                locals:{dataToPass: data},
                controller: DialogController,
                templateUrl: '../views/header/add-alarm.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

            })
                .then(function(answer) {
                    console.log(answer);
                    if(answer!='close'){
                        ALARM_LIST.default[index]= answer;
                    }

                }, function() {
                    console.log('This dialog is closed');
                });
        };
        function DialogController($scope, dataToPass, $mdDialog) {
            console.log(dataToPass);
            $scope.mdDialogData = dataToPass;
            $scope.alarm = dataToPass;
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        function initcontroller() {
            if (a.app.isLoading) {
                a.app.spinner.setAttribute('hidden', true);
                a.app.container.removeAttribute('hidden');
                a.app.isLoading = false;
            }

        }
        initcontroller();
    }

})();
