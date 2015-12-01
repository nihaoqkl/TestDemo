var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path');

var paths = {
    less: ['./gulp/less/**/*.less']
};

gulp.task('less', function () {
    return gulp.src('./gulp/less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./asset'));
});

gulp.task('watch', function() {
    gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['less','watch']);