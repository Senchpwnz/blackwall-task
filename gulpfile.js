const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const csso = require("gulp-csso");
const cssclean = require("gulp-clean-css");
const cssmin = require("gulp-cssmin");
const urladj = require("gulp-css-url-adjuster");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin"); 
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();

function html() {
  return src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'));
}

function scss() {
  return src("src/scss/**.scss")
    .pipe(sass())
    .pipe(autoprefixer(['last 5 versions']))
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('dist'));
}

function js() {
  return src("src/js/**.js")
    .pipe(dest('dist'))
}

function clear() {
  return del('dist')  
}


function serve() {
  sync.init({
    server: 'dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload);
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload);
  watch('src/js/**.js', series(js)).on('change', sync.reload);
}

exports.serve = series(scss, html, js, serve)

