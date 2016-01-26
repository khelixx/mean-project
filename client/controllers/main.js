(function() {
    'use strict';

    // Hum, very hard.
    angular.module('payMeApp').controller('MainCtrl',function ($rootScope, $location) {
        // To prevent refresh. User data are no longer in memory when refresh is pressed, so
        // the website go back to main page.
        if (!$rootScope.user) {
            $location.url("/");
        }
    });
})();