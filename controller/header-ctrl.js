
(function() {
    'use strict';
    angular
        .module('alarmApp')
        .controller('headerController', headerController);

    headerController.$inject=['$scope','$mdSidenav','$mdDialog','ALARM_LIST','MORE'];
    function headerController ($scope,$mdSidenav, $mdDialog, ALARM_LIST, MORE) {
        var a = $scope;

        //menu
        a.tagLine = 'I am a insomniac.';
        a.name = 'Jiwan Ghosal';
        a.theme = 'default';
        a.toggleLeft = buildToggler('left');
        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        //more
        $scope.items = MORE.items;
        var originatorEv;
        this.announceClick = function(index) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('You clicked!')
                    .textContent('You clicked the menu item at index ' + index)
                    .ok('Nice')
                    .targetEvent(originatorEv)
            );
            originatorEv = null;
        };
        this.notificationsEnabled = true;
        this.toggleNotifications = function() {
            this.notificationsEnabled = !this.notificationsEnabled;
        };
        $scope.customFullscreen = false;
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '../views/header/add-alarm.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(answer) {
                    console.log(answer);
                    // $scope.alarmList.push(answer);
                    ALARM_LIST.default.push(answer);
                }, function() {
                    console.log('This dialog is closed');
                });
        };
        function DialogController($scope, $mdDialog) {
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
    }

})();
