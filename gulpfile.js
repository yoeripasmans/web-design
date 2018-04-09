var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
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

gulp.task('default', () => gulp.src('src/assets/images/*').pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {
                removeViewBox: true
            }, {
                cleanupIDs: false
            }
        ]
    })
])).pipe(gulp.dest('src/assets/images')));
