// Ionic wpIonic App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'wpIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'wpIonic.controllers' is found in controllers.js, wpIoinc.services is in services.js
angular.module('wpIonic', ['ionic','ionic.service.core', 'wpIonic.controllers', 'wpIonic.services', 'wpIonic.filters', 'ngCordova', 'angular-cache'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, CacheFactoryProvider) {

  angular.extend(CacheFactoryProvider.defaults, { 
    'storageMode': 'localStorage',
    'capacity': 10,
    'maxAge': 10800000,
    'deleteOnExpire': 'aggressive',
    'recycleFreq': 10000
  })

  // Native scrolling
  if( ionic.Platform.isAndroid() ) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }


  // AdMob
  var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
      banner: 'ca-app-pub-9456117956279909/8721002273',
      interstitial: 'ca-app-pub-9456117956279909/1211081871'
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
      banner: 'ca-app-pub-9456117956279909/8721002273',
      interstitial: 'ca-app-pub-9456117956279909/1211081871'
    };
  } else {
    admobid = { // for Windows Phone
      banner: 'ca-app-pub-9456117956279909/8721002273',
      interstitial: 'ca-app-pub-9456117956279909/1211081871'
    };
  }

  AdMob.createBanner( {
    adId: admobid.banner,
    isTesting: true,
    overlap: false,
    offsetTopBar: false,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    bgColor: 'black'
  } );

  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    autoShow: true
  });

  $stateProvider

  // sets up our default state, all views are loaded through here
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.intro', {
    url: "/intro",
    views: {
      'menuContent': {
        templateUrl: "templates/intro.html",
        controller: 'IntroCtrl'
      }
    }
  })

  // this is the first sub view, notice menuContent under 'views', which is loaded through menu.html
  .state('app.posts', {
    url: "/posts",
    views: {
      'menuContent': {
        templateUrl: "templates/posts.html",
        controller: 'PostsCtrl'
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "templates/bookmarks.html",
        controller: 'BookmarksCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/posts/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/post.html",
        controller: 'PostCtrl'
      }
    }
  })

  .state('app.custom', {
    url: "/custom",
    views: {
      'menuContent': {
        templateUrl: "templates/custom.html"
      }
    }
  })

  .state('app.tabs', {
    url: "/tabs",
    views: {
      'menuContent': {
        templateUrl: "templates/tabs.html",
        controller: 'TabsCtrl'
      }
    }
  })

  .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent': {
          templateUrl: "templates/settings.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/intro');
});
