/**
 * Created by Administrator on 2016/9/11.
 */
define(['app'], function (app) {

  return app.config(function ($stateProvider, $urlRouterProvider) {

    //基于state

    $urlRouterProvider.when("", "/PageTab");

    $stateProvider
      .state("PageTab", {
        url: "/PageTab",
        templateUrl: "js/views/PageTab.html"
      })
      .state("PageTab.Page1", {
        url: "/Page1",
        templateUrl: "js/views/Page1.html",
        controller: "page1Controller"
      })
      .state("PageTab.Page2", {
        url: "/Page2",
        templateUrl: "js/views/Page2.html",
        controller: "page2Controller"
      })
      .state("PageTab.Page3", {
        url: "/Page3",
        templateUrl: "js/views/Page3.html",
        controller: "page3Controller"
      });
  })
    .controller('formController', function ($scope) {

      // we will store all of our form data in this object
      $scope.pagename = $rootScope.pagename = "张浩1";

    });

});