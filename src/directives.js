(function (angular) {
  'use strict';

  angular.module('wb.ngRouteWizard.directives', [])

    .directive('wizRoute', ['urlWizard', '$location',
      function (urlWizard, $location) {
        return {
          restrict: 'A',
          link: function (scope, element, attr) {
            op();

            attr.$observe('wizRoute', op);
            attr.$observe('wizParams', op);

            function op() {
              var wizRoute = attr.wizRoute,
                  wizParams = attr.wizParams,
                  params;

              if( typeof wizParams !== 'undefined' ) {
                try {
                  params = JSON.parse(wizParams);
                } catch( e ) {
                  throw new Error('[wb.ngRouteWizard] Could not parse wiz-params. [' + wizParams + ']');
                }
              }

              element.attr('href', ( !$location.$$html5 ? '#/' : '/' ) + urlWizard.to(wizRoute, params));
            }
          }
        };
      }
    ]);
})(window.angular);
