angular.module('chatApp')

.controller('LoginCtrl', function($scope, $rootScope, $state, $cordovaToast, DataApi) {
    DataApi.getUserData();

    $scope.login = function(data) {
        var successful;
        angular.forEach($scope.userdata, function(res) {
            if ((data.mobile == res.mobile) && (data.password == res.password)) {
                successful = true;
                $rootScope.myname = res.name;
                $rootScope.mymobile = res.mobile;
            } else {
                // successful = false;
            }
        });

        if (successful) {
            // $cordovaToast.showLongBottom('Successfully logged in!');
            $state.go("app.chats");
        } else {
            // $cordovaToast.showLongBottom('Mobile and password do not match.');
        }
    };
})

.controller('RegisterCtrl', function($scope, $rootScope, $state, $cordovaToast, DataApi) {

    DataApi.getUserData();

    $scope.saveUserData = function(data) {
        var successful;
        angular.forEach($scope.userdata, function(res) {
            if (data.mobile == res.mobile) {
                successful = true;
            } else {
                // successful = false;
            }
        });

        if (successful) {
            // $cordovaToast.showLongBottom('Mobile number already registerd.');
        } else {
            $scope.userdata.$add({
                name: data.name,
                mobile: data.mobile,
                password: data.password
            });
            // $cordovaToast.showLongBottom('Welcome to Chat App!');
            $state.go("app.chats");
            $rootScope.myname = data.name;
            $rootScope.mymobile = data.mobile;
        }
    };
})

.controller('ChatsCtrl', function($scope, $state, DataApi) {

    DataApi.getUserData();

    $scope.openChatHead = function(data) {
        $state.go('app.chathead', { id: $scope.mymobile + data.mobile, name: data.name, mobile: data.mobile });
    };

})

.controller('ChatHeadCtrl', function($scope, $rootScope, $firebaseArray, $stateParams, $ionicScrollDelegate) {
    $scope.urname = $stateParams.name;
    var id = $stateParams.id;
    var urname = $stateParams.name;
    var urmobile = $stateParams.mobile;
    var myname = $scope.myname;
    var mymobile = $scope.mymobile;

    var sum = parseFloat(mymobile) + parseFloat(urmobile);
    $scope.chatRoomId = sum;

    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/chats/" + $scope.chatRoomId);
    $scope.chats = $firebaseArray(api);

    $scope.sendChat = function(message) {
        $scope.chats.$add({
            name: myname,
            message: message
        });
        $scope.message = "";
        $ionicScrollDelegate.scrollBottom(true);
    };

    $scope.whatClassIsIt = function(val) {
        if (val == $scope.myname)
            return "mychats"
        else
            return "urchats";
    }

})

.controller('ProfileCtrl', function($scope, DataApi, $firebaseObject, $firebaseArray) {
    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
    var obj = $firebaseObject(api);
    obj.$loaded().then(function() {
        $scope.userdata = obj;
    });
    angular.forEach($scope.userdata, function(res) {
        if ($scope.mymobile == res.mobile) {
            console.log('............:    ' + res.$id);
            $scope.user = res;
            $scope.uid = res.$id;
        }
    });



    console.log('qqqqqqqqqqqqqqqqqqqqq:    ' + $scope.uid);

    var api1 = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
    // $scope.olddata = $firebaseArray(api1);
    var olddata = $firebaseArray(api1);


    $scope.editUser = function(user) {
        // $scope.olddata.$save();

        // $scope.olddata.$edit({
        //     name: user.name,
        //     mobile: user.mobile,
        //     password: user.password
        // });

        var item = olddata.$getRecord(user.$id);
        // item.user = "alanisawesome";
        olddata.$save(item);

        $scope.datas = olddata;
    }

})

.controller('AppCtrl', function($scope, $ionicScrollDelegate) {

    $scope.scrollToBottom = function() {
        $ionicScrollDelegate.scrollBottom(true);
    }

})
