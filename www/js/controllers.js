angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $state, $firebaseArray) {

    var api = new Firebase("https://tlt-apps.firebaseio.com/chat");
    $scope.chats = $firebaseArray(api);

    $scope.startChat = function(name) {
        $rootScope.username = name;
        $state.go('app.chat');
    };

    $scope.sendChat = function(chat) {
        $scope.chats.$add({
            name: $scope.username,
            message: chat.message
        });
        chat.message = "";
    };
})
