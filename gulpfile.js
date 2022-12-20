import gulp from 'gulp';
import concat from 'gulp-concat';
import sassCompiler from 'sass';
import sassBuilder from 'gulp-sass';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';

const sass = sassBuilder(sassCompiler);

const paths = {
  styles: {
    watch: 'app/scss/**/*',
    src: 'app/scss/app.scss',
    dst: 'build/styles/'
  },
  pages: {
    watch: 'app/pages/**/*',
    src: 'app/pages/*.pug',
    dst: 'build/'
  },
  images: {
    watch: 'app/assets/images/*',
    src: 'app/assets/images/*',
    dst: 'build/images'
  },
  svg: {
    watch: 'app/assets/svg/*',
    src: 'app/assets/svg/*',
    dst: 'build/images/'
  },
  all: {
    src: 'app/**/*',
    dst: 'build/**/*'
  }
};

const svg = () => {
    const config = {
        shape: {
            dimension: {
                maxWidth: 100,
                maxHeight: 100
            },
            spacing: {
                padding: 0
            },
            transform: []
        },
        mode: {
            symbol: {
                dest : '.',
                sprite: 'sprite.svg'
            }
        }
    };

    return gulp.src(paths.svg.src)
        .pipe(svgSprite(config)).on('error', (error) => console.log(error))
        .pipe(gulp.dest(paths.svg.dst));
}



export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.styles.dst))
}

export const pages = () => {
  return gulp.src(paths.pages.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.pages.dst))
}

export const images = () => (
	gulp.src(paths.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dst))
);

const jobs = gulp.parallel(styles, pages, images, svg);

const watchFiles = () => {
  gulp.watch(paths.images.watch, images);
  gulp.watch(paths.pages.watch, pages);
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.svg.watch, svg);
}


const build = gulp.series(jobs, watchFiles);

export { watchFiles as watchers };
export default build;
