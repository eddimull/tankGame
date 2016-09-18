var gulp = require('gulp'),
    tiledmapPack = require('gulp-phaser-tiled-pack');

/*****
 * Assets Phaser packs task, creates phaser asset loader packs for tilemaps
 *****/
gulp.task('pack', function () {
    return gulp.src('./lib/public/map/basic_desert.json')
        .pipe(tiledmapPack({ baseUrl: 'static/map/' }))
        .pipe(gulp.dest('./lib/public/map'));
});