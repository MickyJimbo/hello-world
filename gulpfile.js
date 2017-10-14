var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('build', function() {
    gulp.src('js/app.js')
        .pipe(browserify({insertGlobals:true}))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['build']);
});

gulp.task('default', ['build']);
