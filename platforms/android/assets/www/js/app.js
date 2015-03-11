// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('radio', [
  'ionic',
  'ngResource',
  'ngCookies',
  'ngRoute',
  'ui.bootstrap',
  'radio.service',
  'radio.controller',
  ])

.run(function($ionicPlatform, RadioAuth, $location, $http, $cookies, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.hide();
    }

    if (RadioAuth.authenticated === false) {
      $location.url('/login');
    }

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: '<img src="css/ajax-loader.gif"></img>'});
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    });
    
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  $stateProvider
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'
    })

    /* "Radio 하단 탭 */
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'templates/tabs/tabs.html',
    })

    /* "메인" 탭 */
    .state('tabs.main', {
      url: '/main',
      views: {
        'tabs-main': {
          templateUrl: 'templates/tabs/main/main.html',
          controller: 'MainCtrl'
        }
      }
    })

    .state('tabs.main-notify', {
      url: '/main/notify',
      views: {
        'tabs-main': {
          templateUrl: 'templates/tabs/main/notify.html',
          controller: 'MainNotifyCtrl'
        }
      }
    })

    .state('tabs.main-edit', {
      url: '/main/edit',
      views: {
        'tabs-main':{
          templateUrl: 'templates/tabs/main/edit.html',
          controller:'MainEditCtrl'
        }
      }
    })

    .state('tabs.main-detail-channel', {
      url: '/main-detail-channel/:channel_id',
      views: {
        'tabs-main':{
          templateUrl: 'templates/tabs/channel/detail-channel.html',
          controller: 'DetailChannelCtrl'
        }
      }
    })

    .state('tabs.main-detail-cody', {
      url: '/main-detail-cody/:cody_id',
      views: {
        'tabs-main':{
          templateUrl:'templates/tabs/channel/detail-cody.html',
          controller:'DetailCodyCtrl'
        }
      }
    })
    
    /* "채널" 탭 */
    .state('tabs.channel', {
      url: '/channel',
      views: {
        'tabs-channel': {
          templateUrl: 'templates/tabs/channel/channel.html',
          controller: 'ChannelCtrl'
        }
      }
    })

    .state('tabs.detail-channel', {
      url: '/detail-channel/:channel_id',
      views:{
        'tabs-channel': {
          templateUrl: 'templates/tabs/channel/detail-channel.html',
          controller: 'DetailChannelCtrl'
        }
      }
    })

    .state('tabs.detail-cody', {
      url: '/detail-cody/:cody_id',
      views:{
        'tabs-channel':{
          templateUrl: 'templates/tabs/channel/detail-cody.html',
          controller: 'DetailCodyCtrl'
        }
      }
    })

    /* "브랜드" 탭 */
    .state('tabs.brand', {
      url: '/brand',
      views: {
        'tabs-brand': {
          templateUrl: 'templates/tabs/brand/brand.html',
          controller: 'BrandCtrl'
        }
      }
    })

    /* "상점" 탭 */
    .state('tabs.shop', {
      url: '/shop/intro',
      views: {
        'tabs-shop':{
          templateUrl: 'templates/tabs/shop/intro.html',
          controller: 'ShopIntroCtrl'
        }
      }
    })


    .state('tabs.shop-list', {
      url: '/shop/list',
      views: {
        'tabs-shop': {
          templateUrl: 'templates/tabs/shop/list.html',
          controller: 'ShopListCtrl'
        }
      }
    })

    .state('tabs.shop-detail', {
      url: '/shop/detail/:product_id',
      views:{
        'tabs-shop': {
          templateUrl: 'templates/tabs/shop/detail.html',
          controller: 'ShopDetailCtrl',
        }
      }
    })

    /* "내 정보" 탭 */
    .state('tabs.private', {
      url: '/private',
      abstract: true,
      views: {
        'tabs-private': {
          templateUrl: 'templates/tabs/private/private.html',
        }
      }
    })

    .state('tabs.private.info', {
      url: '/info',
      views: {
        'tabs-private':{
          templateUrl: 'templates/tabs/private/info.html',
          controller: 'PrivateInfoCtrl'
        }
      }
    })

    .state('tabs.private.channel', {
      url:'/channel',
      views: {
        'tabs-private':{
          templateUrl: 'templates/tabs/private/channel.html',
          controller: 'PrivateChannelCtrl'
        }
      }
    })

    .state('tabs.private.brand', {
      url:'/brand',
      'views': {
        'tabs-private':{
          templateUrl: 'templates/tabs/private/brand.html',
          controller: 'PrivateBrandCtrl'
        }
      }
    })

    .state('tabs.private.product', {
      url: '/product',
      views: {
        'tabs-private':{
          templateUrl: 'templates/tabs/private/product.html',
          controller: 'PrivateProductCtrl'
        }
      }
    });

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('').icon('fa fa-arrow-left fa-lg').previousTitleText(false);

  //$ionicConfigProvider.views.maxCache(0);

  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    }
  })
  

});