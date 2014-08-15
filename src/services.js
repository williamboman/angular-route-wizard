(function (angular) {
  'use strict';

  angular.module('wb.ngRouteWizard.services', [
    'ngRoute'
  ])

    .provider('urlWizard', ['$routeProvider',
      function ($routeProvider) {
        var self = this;

        var routeConfigs = {};

        this.pathPropertyName = 'path';

        this.init = function (routeObj) {
          angular.forEach(routeObj, function (routeConfig, routeName) {
            if( typeof routeConfig[self.pathPropertyName] === 'undefined' ) {
              throw new ReferenceError('[wb.ngRouteWizard] Route "' + routeName + '" is missing path property.');
            }
            var path = routeConfig[self.pathPropertyName];

            // Register the route
            $routeProvider.when(path, routeConfig);

            // Store route config
            routeConfigs[routeName] = routeConfig;
          });
          return this;
        };

        this.$get = ['$location',
          function ($location) {
            function URLService() {

            }

            URLService.prototype.to = function (routeName, params, absUrl) {
              if( typeof params !== 'object' ) {
                params = {};
              }

              var routeConfig = routeConfigs[routeName];
              if( typeof routeConfig === 'undefined' ) {
                throw new ReferenceError('[wb.ngRouteWizard] Unable to generate a url to the route \'' + routeName + '\': Specified route doesn\'t exist.');
              }

              var routePath = routeConfig[self.pathPropertyName];

              // Trim all forward slashes from the route path
              while( /^\/+/.test(routePath) ) {
                routePath = routePath.substr(1);
              }

              var routeParams = [];
              if( routePath.length > 0 ) {
                routeParams = routePath.split('/');
              }

              var newParams = [];
              angular.forEach(routeParams, function (routeParam) {
                if( _isParamVar(routeParam) ) {
                  var paramVarName = _stripParamVar(routeParam);

                  if( ['string', 'number'].indexOf(typeof params[paramVarName]) >= 0 ) {
                    newParams.push(params[paramVarName]);
                  } else if( !_isOptional(routeParam) ) {
                    throw new TypeError('[wb.ngRouteWizard] Unable to generate a url to the route \'' + routeName + '\': Missing/invalid mandatory route parameter (' + paramVarName + ').');
                  }
                } else {
                  newParams.push(routeParam);
                }
              });

              return ( absUrl === true ? $location.$$absUrl : '' ) + newParams.join('/');
            };

            return new URLService();
          }
        ];


        function _isParamVar(fragment) {
          return (/^:[\w\d]+\??/).test(fragment);
        }

        function _isOptional(param) {
          return (/\?$/).test(param);
        }

        function _stripParamVar(param) {
          return _isOptional(param) ? param.slice(1, -1) : param.substr(1);
        }
      }
    ]);
})(window.angular);
