// Ionic newdrakemusic App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'newdrakemusic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'newdrakemusic.controllers' is found in controllers.js, wpIoinc.services is in services.js
angular.module('newdrakemusic', ['ionic','ionic.service.core', 'newdrakemusic.controllers', 'newdrakemusic.services', 'newdrakemusic.filters', 'ngCordova', 'angular-cache'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }*/
    //if(window.AdMob) {
      console.log("Loading Admob");
      var admob_key = "ca-app-pub-9456117956279909/8721002273";
      var admob = window.AdMob;
      console.log(JSON.stringify(admob));
      admob.createBanner( {
        adId:admob_key,
        position:admob.AD_POSITION.BOTTOM_CENTER,
        isTesting: true,
        autoShow:true} );
      /*admob.createBannerView(
          {
            'publisherId': admob_key,
            'adSize': admob.AD_SIZE.BANNER,
            'bannerAtTop': true
          },
          function() {
            admob.requestAd(
                { 'isTesting': false },
                function() {
                  admob.showAd(true);
                },
                function() { console.log('failed to request ad'); }
            );
          },
          function() { console.log('failed to create banner view'); }
      );*/
      console.log(admob);
    //}
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
