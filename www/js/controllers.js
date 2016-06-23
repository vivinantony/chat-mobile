angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function($scope, $rootScope, $state, $firebaseArray) {

    var api = new Firebase("https://tlt-apps.firebaseio.com/chat/userdata");
    $scope.userdata = $firebaseArray(api);

    $scope.saveUserData = function(data) {
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

    var api = new Firebase("https://tlt-apps.firebaseio.com/chat/userdata");
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
        $state.go('app.chathead', { id: data.mobile + $scope.imobile, name: data.name, name: data.name, mobile: data.mobile })
    }

})

.controller('ChatHeadCtrl', function($scope, $rootScope, $firebaseArray, $stateParams) {
    $scope.name = $stateParams.name;
    $scope.mobile = $stateParams.mobile;
    $scope.id = $stateParams.id;
    var str = $stateParams.id;
    var resf = str.slice(0, 10);
    var ress = str.slice(10, 20);

    console.log(resf);
    console.log(ress);

    if (resf == $scope.mobile && ress == $scope.imobile) {
        $scope.setu = f5
    }



    var api = new Firebase("https://tlt-apps.firebaseio.com/chat/chats/" + $scope.setu);
    $scope.chats = $firebaseArray(api);

    $scope.sendChat = function(chat) {
        $scope.chats.$add({
            id1: $scope.mobile + $scope.imobile,
            id2: $scope.imobile + $scope.mobile,
            name: $scope.name,
            message: chat.message
        });
        chat.message = "";
    };
})

.controller('AppCtrl', function($scope, $rootScope, $state) {
    $scope.startChat = function(name) {
        $rootScope.username = name;
        $state.go('app.chat');
    };
})
