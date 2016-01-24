mod = angular.module('adminr-login',['adminr-core','adminr-datasources'])

mod.config((AdminrContainerManagerProvider)->
  AdminrContainerManagerProvider.setViewForContainer('adminr-login-form','adminr-login-form')
)

mod.run(($templateCache)->
  $templateCache.put('adminr-login',require('./views/index.html'))
  $templateCache.put('adminr-login-form',require('./views/form.html'))
  $templateCache.put('adminr-login-form',require('./views/form.html'))
)


mod.provider('AdminrLogin',(AdminrContainerManagerProvider)->
  class AdminrLogin
    @EMAIL = 'email'
    @TEXT = 'text'
    usernameType: @EMAIL

    setAsRootViewController:()->
      AdminrContainerManagerProvider.setViewForRootContainer('adminr-login')

    setLoggedView:(view)->
      AdminrContainerManagerProvider.setViewForContainer('adminr-login-content',view)

    $get:()->
      return @

  return new AdminrLogin()
)


mod.controller('AdminrLoginCtrl',($scope,AdminrDataSources,AdminrLogin)->
  $scope.dataSource = AdminrDataSources.getDataSource()

  $scope.usernameType = AdminrLogin.usernameType
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
    if $scope.dataSource?.isAuthorized()
      return 'adminr-login-content'
    return 'adminr-login-form'
)

