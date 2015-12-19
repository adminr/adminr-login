(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = '<div class="container">\n    <div class="row">\n        <div class="col-md-4 col-md-offset-4">\n            <div class="login-panel panel panel-default">\n                <div class="panel-heading">\n                    <h3 class="panel-title">Please Sign In</h3>\n                </div>\n\n                <div class="panel-body">\n                    <form ng-submit="authorize(username,password,rememberMe)">\n                        <fieldset>\n                            <div class="form-group">\n                                <input ng-model="username" ng-disabled="authorizing" class="form-control" placeholder="E-mail" name="email" type="email" autofocus>\n                            </div>\n                            <div class="form-group">\n                                <input ng-model="password" ng-disabled="authorizing" class="form-control" placeholder="Password" name="password" type="password" value="">\n                            </div>\n                            <div class="checkbox">\n                                <label>\n                                    <input ng-model="rememberMe" ng-disabled="authorizing" name="remember" type="checkbox" value="Remember Me">Remember Me\n                                </label>\n                            </div>\n\n                            <div class="alert alert-danger" ng-if="authorizationError">{{authorizationError.data.error}}</div>\n                            <div class="alert alert-danger" ng-if="!dataSource">no datasource defined</div>\n\n                            <button href="index.html" class="btn btn-lg btn-success btn-block">Login</button>\n                        </fieldset>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
},{}],2:[function(require,module,exports){
var mod;

mod = angular.module('adminr-login', ['adminr-core', 'adminr-datasources']);

mod.config(["ContainerManagerProvider", function(ContainerManagerProvider) {
  return ContainerManagerProvider.setViewForContainer('adminr-login-form', 'adminr-login-form');
}]);

mod.run(["$templateCache", function($templateCache) {
  $templateCache.put('adminr-login', require('./index.html'));
  return $templateCache.put('adminr-login-form', require('./form.html'));
}]);

mod.provider('AdminrLogin', function() {
  var AdminrLogin;
  AdminrLogin = (function() {
    function AdminrLogin() {}

    AdminrLogin.prototype.$get = function() {
      return this;
    };

    return AdminrLogin;

  })();
  return new AdminrLogin();
});

mod.controller('AdminrLoginCtrl', ["$scope", "DataSources", function($scope, DataSources) {
  $scope.dataSource = DataSources.getDataSource();
  $scope.authorizing = false;
  $scope.authorizationError = null;
  $scope.authorize = function(username, password, rememberMe) {
    $scope.authorizing = true;
    $scope.authorizationError = null;
    return $scope.dataSource.authorize(username, password, !rememberMe).then(function() {
      return $scope.authorizing = false;
    })["catch"](function(error) {
      $scope.authorizing = false;
      return $scope.authorizationError = error;
    });
  };
  return $scope.getContainerKey = function() {
    if ($scope.dataSource.isAuthorized()) {
      return 'adminr-login-content';
    }
    return 'adminr-login-form';
  };
}]);


},{"./form.html":1,"./index.html":3}],3:[function(require,module,exports){
module.exports = '<span ng-controller="AdminrLoginCtrl" adminr-container="getContainerKey()">\n</span>\n';
},{}]},{},[2]);
