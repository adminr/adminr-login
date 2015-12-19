mod = angular.module('adminr-login',['adminr-core','adminr-datasources'])

mod.config((ContainerManagerProvider)->
  ContainerManagerProvider.setViewForContainer('adminr-login-form','adminr-login-form')
)

mod.run(($templateCache)->
  $templateCache.put('adminr-login',require('./index.html'))
  $templateCache.put('adminr-login-form',require('./form.html'))
)


mod.provider('AdminrLogin',()->
  class AdminrLogin
    $get:()->
      return @

  return new AdminrLogin()
)


mod.controller('AdminrLoginCtrl',($scope,DataSources)->
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

  $scope.getContainerKey = ()->
    if $scope.dataSource.isAuthorized()
      return 'adminr-login-content'
    return 'adminr-login-form'
)

