angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function($scope, $rootScope, $state, $firebaseArray, $firebaseObject) {

    var api = new Firebase("https://tlt-apps.firebaseio.com/chat-app/userdata");
    $scope.userdata = $firebaseArray(api);

    $scope.saveUserData = function(data) {
        // if (data.mobile != obj[0].mobile) {
        //     console.log("Created");
        // } else {
        //     console.log("Exists");
        // }

        $scope.userdata.$add({
            name: data.name,
            mobile: data.mobile
        });
        $state.go("app.chats");
        $rootScope.iam = data.name;
        $rootScope.imobile = data.mobile;
    }

})

.controller('ChatsCtrl', function($scope, $state, $firebaseObject, $ionicLoading) {
    $ionicLoading.show();

    var api = new Firebase("https://tlt-apps.firebaseio.com/chat-app/userdata");
    var obj = $firebaseObject(api);
    obj.$loaded().then(function() {
        $scope.userdata = obj;
    }).catch(function(err) {
        console.log("Error ChatsCtrl: " + err);
    }).finally(function() {
        $ionicLoading.hide();
    });

    $scope.openChatHead = function(data) {
        console.log(data);
        $state.go('app.chathead', { id: $scope.imobile + data.mobile, name: data.name, name: data.name, mobile: data.mobile })
    }

})

.controller('ChatHeadCtrl', function($scope, $rootScope, $firebaseArray, $stateParams, $ionicScrollDelegate) {
    $scope.name = $stateParams.name;
    $scope.mobile = $stateParams.mobile;
    $scope.id = $stateParams.id;
    var str = $stateParams.id;
    var resf = str.slice(0, 10);
    var ress = str.slice(10, 20);

    var sum = parseFloat($scope.imobile) + parseFloat($scope.mobile);

    if (resf == $scope.imobile && ress == $scope.mobile) {
        $scope.chatRoomId = sum;
    }

    var api = new Firebase("https://tlt-apps.firebaseio.com/chat-app/chats/" + $scope.chatRoomId);
    $scope.chats = $firebaseArray(api);

    $scope.sendChat = function(chat) {
        $scope.chats.$add({
            id1: $scope.mobile + $scope.imobile,
            id2: $scope.imobile + $scope.mobile,
            name: $scope.name,
            message: chat.message
        });
        chat.message = "";
        $ionicScrollDelegate.scrollBottom(true);
    };
})

.controller('AppCtrl', function($scope, $rootScope, $state) {
    $scope.startChat = function(name) {
        $rootScope.username = name;
        $state.go('app.chat');
    };
})
