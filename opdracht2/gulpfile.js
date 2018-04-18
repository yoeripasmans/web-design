var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('src/**/*.css', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/**/*.js', browserSync.reload);
});
