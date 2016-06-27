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
            console.info('Successfully logged in!');
            $state.go("app.chats");
        } else {
            // $cordovaToast.showLongBottom('Mobile and password do not match.');
            console.info('Mobile and password do not match.');
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
            console.info('Mobile number already registerd.');
        } else {
            if (data.mobile.length == 10) {
                $scope.userdata.$add({
                    name: data.name,
                    mobile: data.mobile,
                    password: data.password,
                    created: Firebase.ServerValue.TIMESTAMP
                });
                // $cordovaToast.showLongBottom('Welcome to Chat App!');
                console.info('Welcome to Chat App!');
                $state.go("app.chats");
                $rootScope.myname = data.name;
                $rootScope.mymobile = data.mobile;
            } else {
                // $cordovaToast.showLongBottom('Enter a valid mobile number.');
                console.info('Enter a valid mobile number.');
            }
        }
    };
})

.controller('ChatsCtrl', function($scope, $state, DataApi, $firebaseArray, $firebaseObject) {

    DataApi.getUserData();

    $scope.openChatHead = function(data) {
        $state.go('app.chathead', { name: data.name, mobile: data.mobile });
    };

    $scope.viewImage = function($event) {
        $event.stopPropagation();
        console.log("viewImage");
    };

    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/chats");
    $scope.chatss = $firebaseArray(api);

})

.controller('ChatHeadCtrl', function($scope, $rootScope, $state, $firebaseArray, $stateParams, $ionicScrollDelegate, $ionicPopover) {
    var urname = $scope.urname = $stateParams.name;
    var urmobile = $stateParams.mobile;
    var myname = $scope.myname;
    var mymobile = $scope.mymobile;

    var sum = parseFloat(mymobile) + parseFloat(urmobile);
    $scope.chatRoomId = sum;

    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/chats/" + $scope.chatRoomId);
    $scope.chats = $firebaseArray(api);


    $scope.sendChat = function(message) {
        if (message != '') {
            $scope.chats.$add({
                name: myname,
                message: message,
                time: Firebase.ServerValue.TIMESTAMP
            });
        }
        $scope.message = "";
        $ionicScrollDelegate.scrollBottom(true);
    };

    $scope.whatClassIsIt = function(val) {
        if (val == $scope.myname)
            return "mychats"
        else
            return "urchats";
    };

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.viewContact = function() {
        $state.go('app.urprofile', { mobile: urmobile });
        $scope.popover.hide();
    }

})

.controller('MyProfileCtrl', function($scope, DataApi, $firebaseObject, $firebaseArray) {
    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
    var obj = $firebaseObject(api);
    obj.$loaded().then(function() {
        $scope.userdata = obj;
    });
    angular.forEach($scope.userdata, function(res) {
        if ($scope.mymobile == res.mobile) {
            $scope.user = res;
        }
    });
})

.controller('UrProfileCtrl', function($scope, DataApi, $firebaseObject, $firebaseArray, $stateParams) {
    var urmobile = $stateParams.mobile;
    var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
    var obj = $firebaseObject(api);
    obj.$loaded().then(function() {
        $scope.userdata = obj;
    });
    angular.forEach($scope.userdata, function(res) {
        if (urmobile == res.mobile) {
            $scope.user = res;
        }
    });
})

.controller('AppCtrl', function($scope, $rootScope, $state, $cordovaToast) {
    $scope.logout = function() {
        $rootScope.myname = '';
        $rootScope.mymobile = '';
        $state.go('login');
        //$cordovaToast.showLongBottom('Successfully logged out!');
        console.info('Successfully logged out!');
    }
})
