var gulp = require('gulp'),
    jshint = require('gulp-jshint');
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
    gulp.run('lint');
    gulp.watch('./js/*.js', function() {
        gulp.run('lint');
    });
});