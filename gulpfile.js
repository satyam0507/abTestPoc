var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

var editorBundler = browserify({
    entries: ['./chatbot/api.js'],
    standalone: 'nvChatBot',
    debug: false,
});

gulp.task('default', ['dev']);

gulp.task('default', function() {
    runSequence('babel','editor');
});

gulp.task('babel', function() {
    return gulp.src('./chatbot/bable/api.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./chatbot/'));
});

gulp.task('editor', function() {
    return editorBundler
        .bundle()
        .pipe(source('api.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true,
        }))
        // .pipe(uglify({
        //     compress: false
        // }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/js/'));
});
