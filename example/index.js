var mod = angular.module('adminr-core-test',['adminr-login','adminr-datasources']);

mod.config(function(AdminrLoginProvider,DataSourcesProvider){
    AdminrLoginProvider.setAsRootViewController()
    AdminrLoginProvider.setLoggedView('logged-view.html')
    AdminrLoginProvider.usernameType = AdminrLoginProvider.TEXT
    var datasource = DataSourcesProvider.createDataSource('Test','https://adminr-test-api.herokuapp.com')

    datasource.addResource('Me','/me')
})

mod.run(function($templateCache){
    $templateCache.put('logged-view.html','<div ng-controller="TestCtrl"><h1>Hello {{me.loading ? \'...\' : me.data.username}} <br /><small>You are now logged!</small></h1><button ng-click="datasource.logout()">logout</button></div>')
})

mod.controller('TestCtrl',function($scope,DataSources){
    $scope.datasource = DataSources.getDataSource('Test')
    $scope.me = $scope.datasource.getResource('Me').get()
})