const gulp = require('gulp');

require('./build/gulpfile.serve');
require('./build/gulpfile.build');

gulp.task('default', ['serve']);
gulp.task('build', ['building']);
