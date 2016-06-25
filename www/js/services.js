angular.module('chatApp')

.service('DataApi', function($rootScope, $firebaseArray, $firebaseObject) {
    return {
        getUserData: function() {
            var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
            $rootScope.userdata = $firebaseArray(api);
            var obj = $firebaseArray(api);
            obj.$loaded().then(function() {
                $rootScope.savedData = obj;
            });
        }
    }
})
