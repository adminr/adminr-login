(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-login', ['adminr-datasources']);

mod.run(["$templateCache", function($templateCache) {
  return $templateCache.put('adminr-login', require('./index.html'));
}]);

mod.controller('AdminrLogin', ["$scope", "DataSources", function($scope, DataSources) {
  $scope.dataSource = DataSources.getDataSource();
  $scope.authorizing = false;
  $scope.authorizationError = null;
  return $scope.authorize = function(username, password, rememberMe) {
    $scope.authorizing = true;
    $scope.authorizationError = null;
    return $scope.dataSource.authorize(username, password, !rememberMe).then(function() {
      return $scope.authorizing = false;
    })["catch"](function(error) {
      $scope.authorizing = false;
      return $scope.authorizationError = error;
    });
  };
}]);


},{"./index.html":2}],2:[function(require,module,exports){
module.exports = '<span ng-controller="AdminrLogin">\n    <span ng-if="dataSource.isAuthorized()" adminr-container="\'adminr-login-content\'"></span>\n    <div class="container" ng-if="!dataSource.isAuthorized()">\n        <div class="row">\n            <div class="col-md-4 col-md-offset-4">\n                <div class="login-panel panel panel-default">\n                    <div class="panel-heading">\n                        <h3 class="panel-title">Please Sign In</h3>\n                    </div>\n\n                    <div class="panel-body">\n                        <form ng-submit="authorize(username,password,rememberMe)">\n                            <fieldset>\n                                <div class="form-group">\n                                    <input ng-model="username" ng-disabled="authorizing" class="form-control" placeholder="E-mail" name="email" type="email" autofocus>\n                                </div>\n                                <div class="form-group">\n                                    <input ng-model="password" ng-disabled="authorizing" class="form-control" placeholder="Password" name="password" type="password" value="">\n                                </div>\n                                <div class="checkbox">\n                                    <label>\n                                        <input ng-model="rememberMe" ng-disabled="authorizing" name="remember" type="checkbox" value="Remember Me">Remember Me\n                                    </label>\n                                </div>\n\n                                <div class="alert alert-danger" ng-if="authorizationError">{{authorizationError.data.error}}</div>\n                                <div class="alert alert-danger" ng-if="!dataSource">no datasource defined</div>\n\n                                <button href="index.html" class="btn btn-lg btn-success btn-block">Login</button>\n                            </fieldset>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</span>\n';
},{}]},{},[1]);
