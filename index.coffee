mod = angular.module('adminr-login',['adminr-datasources'])

mod.run(($templateCache)->
  $templateCache.put('adminr-login',require('./index.html'))
)

mod.controller('AdminrLogin',($scope,DataSources)->
  $scope.dataSource = DataSources.getDataSource()

  $scope.authorizing = no
  $scope.authorizationError = null

  $scope.authorize = (username,password,rememberMe)->
    $scope.authorizing = yes
    $scope.authorizationError = null
    $scope.dataSource.authorize(username,password,!rememberMe).then(()->
      $scope.authorizing = no
    ).catch((error)->
      $scope.authorizing = no
      $scope.authorizationError = error
    )
)

