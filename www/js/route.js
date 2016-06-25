angular.module('chatApp')

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
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

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');
});
