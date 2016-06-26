angular.module('chatApp')

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'

    })

    .state('app.chats', {
        url: '/chats',
        views: {
            'menuContent': {
                templateUrl: 'templates/chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })

    .state('app.chathead', {
        url: '/chat/:id/:name/:mobile',
        views: {
            'menuContent': {
                templateUrl: 'templates/chat-head.html',
                controller: 'ChatHeadCtrl'
            }
        }
    })

    .state('app.myprofile', {
        url: '/myprofile',
        views: {
            'menuContent': {
                templateUrl: 'templates/my-profile.html',
                controller: 'MyProfileCtrl'
            }
        }
    })

    .state('app.urprofile', {
        url: '/urprofile',
        views: {
            'menuContent': {
                templateUrl: 'templates/ur-profile.html',
                controller: 'UrProfileCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
