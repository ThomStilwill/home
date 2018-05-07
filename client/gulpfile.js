var install = require('gulp-install');
var cleanDest = require('gulp-clean-dest');
var gulp = require('gulp');

gulp.task('deps', function() {
  return gulp.src(['./package.json'])
  .pipe(gulp.dest('./dist'))
  .pipe(install({
      production: true
    }));
})

var exec = require('child_process').exec;

gulp.task('build', function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('deploy',function(){
  return gulp.src('./dist/**/*',{read: false})
          .pipe(cleanDest('\\\\MARS\\nodeweb\\home\**\*.*'))
          //.pipe(gulp.dest('\\\\MARS\\nodeweb\\home'))
})
