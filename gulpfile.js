const gulp = require("gulp");

var
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

folder = {
    src: 'src/',
    build: 'build/'
}


gulp.task("default", function() {
    browserSync.init({
        server: "./"
    });
    // code for your default task goes here
    gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task("styles", function() {
    gulp
      .src('src/sass/**/*.scss')
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
  });

gulp.task('dev', ['js-dev']);
gulp.task('prod', ['js-prod']);

gulp.task('js-dev', function() {

    var jsbuild = gulp.src(folder.src + 'js/**/*')
      .pipe(deporder())
      .pipe(concat('main.js'));
  
    return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
  
});

gulp.task('js-prod', function() {

    var jsbuild = gulp.src(folder.src + 'js/**/*')
      .pipe(deporder())
      .pipe(concat('main.js'));
    
      jsbuild = jsbuild
        .pipe(stripdebug())
        .pipe(uglify());
    
  
    return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
  
});