import gulp from 'gulp';
import concat from 'gulp-concat';
import clean from 'gulp-clean';
import sassCompiler from 'sass';
import sassBuilder from 'gulp-sass';
import pug from 'gulp-pug';

// import browserSyncBuilder from 'browser-sync';
// const browserSync = browserSyncBuilder.create();

const sass = sassBuilder(sassCompiler);

const paths = {
  styles: {
    src: 'app/scss/app.scss',
    dst: 'build/styles/'
  },
  pages: {
    src: 'app/pages/*.pug',
    dst: 'build/'
  },
  root: {
    src: 'app/**/*',
    dst: 'build/**/*'
  }
};

export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.styles.dst))
    // .pipe(browserSync.stream());
}

export const pages = () => {
  return gulp.src(paths.pages.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.pages.dst))
    // .pipe(browserSync.stream());
}

export const cleanBuild = () => {
  return gulp.src(paths.root.dst)
  .pipe(clean());
}

const jobs = gulp.parallel(styles, pages);

const watchFiles = () => {
  gulp.watch(paths.root.src, jobs);
}

// const browserSyncJob = () => {
//   browserSync.init({
//     server: "build/"
//   });
// };
// const build = gulp.series(cleanBuild, jobs, gulp.parallel(watchFiles, browserSyncJob));

const build = gulp.series(cleanBuild, jobs, watchFiles);

// export { watchFiles as watchers, browserSyncJob as server };
export { watchFiles as watchers };
export default build;
