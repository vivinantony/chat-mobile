angular.module('chatApp')

.controller('LoginCtrl', function($scope, $rootScope, $state, $cordovaToast, DataApi) {
    DataApi.getUserData();

    $scope.login = function(data) {
        var successful;
        angular.forEach($scope.savedData, function(res) {
            if ((data.mobile == res.mobile) && (data.password == res.password)) {
                successful = true;
            } else {
                // successful = false;
            }
        });

        if (successful) {
            $state.go("app.chats");
            $cordovaToast.showLongBottom('Successfully logged in!');
        } else {
            $cordovaToast.showLongBottom('Mobile and password do not match.');
        }
    };
})

.controller('RegisterCtrl', function($scope, $rootScope, $state, $cordovaToast, DataApi) {
    DataApi.getUserData();

    $scope.saveUserData = function(data) {
        var successful;
        angular.forEach($scope.savedData, function(res) {
            if (data.mobile == res.mobile) {
                successful = true;
            } else {
                // successful = false;
            }
        });

        if (successful) {
            $cordovaToast.showLongBottom('Mobile number already registerd.');
        } else {
            $scope.userdata.$add({
                name: data.name,
                mobile: data.mobile,
                password: data.password
            });
            $cordovaToast.showLongBottom('Welcome to Chat App!');
            $state.go("app.chats");
            $rootScope.iam = data.name;
            $rootScope.imobile = data.mobile;
        }
    };
})

.controller('ChatsCtrl', function($scope, $state, $firebaseObject, $ionicLoading) {
    $ionicLoading.show();

    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
    var obj = $firebaseObject(api);
    obj.$loaded().then(function() {
        $scope.userdata = obj;
    }).catch(function(err) {
        console.log("Error ChatsCtrl: " + err);
    }).finally(function() {
        $ionicLoading.hide();
    });

    $scope.openChatHead = function(data) {
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

    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/chats/" + $scope.chatRoomId);
    $scope.chats = $firebaseArray(api);

    $scope.sendChat = function(chat) {
        $scope.chats.$add({
            name: $scope.iam,
            message: chat.message
        });
        chat.message = "";
        $ionicScrollDelegate.scrollBottom(true);
    };
})

.controller('AppCtrl', function($scope) {

})
