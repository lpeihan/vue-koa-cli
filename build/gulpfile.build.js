const gulp = require('gulp');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const chalk = require('chalk');

const buildFrontend = require('./frontend.build');
const packageConfig = require('../package.json');
const { dir } = require('../config');

gulp.task('build:frontend', (done) => {
  buildFrontend(done);
});

gulp.task('copy', () => gulp.src([
  `{${dir.backend},${dir.config},${dir.public}}/**/*.*`,
  packageConfig.main,
  'package.json'
])
  .pipe(gulp.dest('dist')));

gulp.task('node_modules', shell.task([
  `cd dist && cnpm install -d --production`
]));

gulp.task('finished', () => {
  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow(
    '  cd dist && npm start \n'
  ));
});

gulp.task('building', (done) => {
  runSequence(
    'build:frontend',
    'eslint:backend',
    'copy',
    'node_modules',
    'finished',
    done
  );
});
