angular.module('chatApp')

.service('DataApi', function($rootScope, $firebaseArray) {
    return {
        getUserData: function() {
            var api = new Firebase("https://techie-apps.firebaseio.com/chat-app/userdata");
            $rootScope.userdata = $firebaseArray(api);
            var obj = $firebaseArray(api);
            obj.$loaded().then(function() {
                $rootScope.userdata = obj;
            }).catch(function(err) {
                console.log("Error getUserData: " + err);
            });
        }
    }
})
