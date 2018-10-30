/**
 * Created by Administrator on 2016/9/11.
 */
require.config({
  //默认情况下模块所在目录为js/lib
  baseUrl: 'js/libs',
  //当模块id前缀为app时，他便由js/app加载模块文件
  //这里设置的路径是相对与baseUrl的，不要包含.js
  paths: {
    'jquery': 'jquery',
    'angular': 'angular',
    'angular-ui-router': 'angular-ui-router',
    'app': '../app',
    'appRoute': '../appRoute',
    'ctrls': '../ctrls'

  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular'],
      exports: 'angular'
    }
  }
});

// 开始逻辑.
requirejs([
  'jquery',
  'angular',
  'angular-ui-router',
  'appRoute',
  'ctrls/page1Controller',
  'ctrls/page2Controller',
  'ctrls/page3Controller',
],
  function ($, angular) {
    //jQuery, canvas and the ctrls/sub module are all
    //loaded and can be used here now.
    $(function () {
      angular.bootstrap(document, ["myApp"]);
    })
  });