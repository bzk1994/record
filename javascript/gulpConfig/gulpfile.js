var gulp = require('gulp'), //本地安装gulp所用到的地方
  htmlmin = require('gulp-htmlmin'),
  rev = require('gulp-rev-append'),
  less = require('gulp-less'),
  cssmin = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  autoprefixer = require('gulp-autoprefixer'),
  gulpzip = require('gulp-zip'),
  cache = require('gulp-cache');

//////////////////////
//	!!!修改版本号
//////////////////////
const VERSION = '5.7.22';

//html压缩
gulp.task('OrangeHtmlmin', function () {
  var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  };
  gulp.src('src/tylc/*.html')
    .pipe(rev())
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/tylc'));
  gulp.src('src/tylc/lib/tpl/*.htm')
    .pipe(rev())
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/tylc/lib/tpl'));
  gulp.src('src/tylc/widget/**/*.html')
    .pipe(rev())
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/tylc/widget'));
});

//css压缩
gulp.task('cssmin', function () {
  var autoprefixerConfig = {
    browsers: ['last 2 versions', 'Android >= 4.0'],
    cascade: true, //是否美化属性值 默认：true 像这样：
    remove: true //是否去掉不必要的前缀 默认：true 
  };
  //编译src目录下的所有css文件
  //（**匹配src/less的0个或多个子文件夹）
  gulp.src(['src/tylc/css/*.css', '!src/less/**/{reset,test}.less'])
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // .pipe(autoprefixer(autoprefixerConfig))
    .pipe(sourcemaps.write())
    .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
    .pipe(gulp.dest('dist/tylc/css'));
  gulp.src(['src/tylc/lib/css/*.css'])
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // .pipe(autoprefixer(autoprefixerConfig))
    .pipe(sourcemaps.write())
    .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
    .pipe(gulp.dest('dist/tylc/lib/css'));
});

//image压缩
gulp.task('imagemin', function () {
  gulp.src('src/tylc/images/**/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
      svgoPlugins: [{
        removeViewBox: false
      }], //不要移除svg的viewbox属性
      use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    })))
    .pipe(gulp.dest('dist/tylc/images'));
  gulp.src('src/tylc/img/**/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
      svgoPlugins: [{
        removeViewBox: false
      }], //不要移除svg的viewbox属性
      use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    })))
    .pipe(gulp.dest('dist/tylc/img'));
});

//js压缩
gulp.task('jsmin', function () {
  var uglifyConfig = {
    //mangle: true,//类型：Boolean 默认：true 是否修改变量名
    mangle: {
      except: ['require', 'exports', 'module', '$'],
      mangle: true, //类型：Boolean 默认：true 是否修改变量名
      compress: true, //类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'all' //保留所有注释
    } //排除混淆关键字
  };
  //压缩src/js目录下的所有js文件
  //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
  gulp.src(['src/tylc/js/*.js', '!src/js/**/{test1,test2}.js'])
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest('dist/tylc/js'));
  gulp.src(['src/tylc/lib/js/**/*.js'])
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest('dist/tylc/lib/js'));
  gulp.src(['src/tylc/widget/**/*.js'])
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest('dist/tylc/widget'));
  gulp.src(['src/tylc/*.js'])
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest('dist/tylc'));
});

//copyCompany Meta
gulp.task("copy", function () {
  gulp.src(["src/tylc/company/**/*.*"])
    .pipe(gulp.dest('dist/tylc/company'));
  gulp.src(["src/tylc/*.json"])
    .pipe(gulp.dest('dist/tylc'));

})

var config = ['OrangeHtmlmin', 'jsmin', 'cssmin', 'copy', 'imagemin'];

gulp.task('default', config); //定义默认任务

/////////////////////////
//	混淆压缩后再运行次命令
/////////////////////////
gulp.task("zip", function () {
  return gulp.src('dist/tylc/**/*.*')
    .pipe(gulpzip('tylc_v' + VERSION + '.zip'))
    .pipe(gulp.dest('zip'));
})

//语法检查 暂时关闭
// gulp.task("jsHint", function() {
// 	gulp.src(["tylc/js/*.js", "/tylc/lib/**/*.js"])
// 		.pipe(jshint()) // 进行检查
// 		.pipe(jshint.reporter("default")); // 对代码进行报错提示
// })

// gulp.task('testWatch', function() {
// 	gulp.watch('src/**/*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
// });
// gulp.task('testLess', function() {
// 	//编译src目录下的所有less文件
// 	//除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
// 	gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
// 		.pipe(sourcemaps.init())
// 		.pipe(plumber({
// 			errorHandler: notify.onError('Error: <%= error.message %>')
// 		}))
// 		.pipe(less())
// 		.pipe(sourcemaps.write())
// 		.pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
// 		.pipe(gulp.dest('src/css'));
// });
