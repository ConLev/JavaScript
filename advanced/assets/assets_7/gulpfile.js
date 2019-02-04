let gulp = require('gulp'), // Сам gulp
    sass = require('gulp-sass'), // Модуль для компиляции sass
    jsMin = require('gulp-terser'), // Минификация js
    autoPrefix = require('gulp-autoprefixer'), // Вендорные префиксы
    bs = require('browser-sync'), // Сервер
    htmlMin = require('gulp-htmlmin'), // Минификация html
    rename = require('gulp-rename'), // Rename
    delFiles = require('del'), // Delete files
    cssMin = require('gulp-csso'), //  Минификация css
    babel = require('gulp-babel'), // babel
    pug = require('gulp-pug'); // pug

// Gulp methods
// gulp.task() - создание новой задачи
// gulp.src() - позволяет выбрать файлы
// gulp.dest() - позволяет переместить/сохранить файлы
// gulp.series() - выполняет задачи последовательно
// gulp.parallel() - выполняет задачи параллельно
// gulp.watch() - следит за изменениями файлов

gulp.task('test', () => {
    return console.log('Gulp work!!');
});

// HTML
gulp.task('html', () => {
    return gulp.src('app/html/index.html') // Выбрали файл с которым работаем
        .pipe(htmlMin({
            collapseWhitespace: true  // Минифицируем файл
        }))
        .pipe(gulp.dest('dist')); // Сохраняем файл
});

//SASS
gulp.task('sass', () => {
    // return gulp.src('app/sass/**/*.+(scss|sass)')
    // return gulp.src('app/img/**/*.+(jpg|png|gif|svg)')
    // return gulp.src(['app/img/**/*.+(jpg|png|gif|svg)', 'app/content/*.jpg'])
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoPrefix())
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css'))
    // .pipe(bs.reload({stream: true}))
});

//PUG
gulp.task('pug', () => {
    return gulp.src('app/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist/templates'))
});

//Delete files
gulp.task('clean', () => {
    return delFiles(['dist/**', '!dist'])
});

// JS - es6
gulp.task('js:es6', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(jsMin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
    // .pipe(bs.reload({stream: true}))
});

// JS - babel
gulp.task('js:babel', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({
            suffix: '.es5'
        }))
        .pipe(gulp.dest('dist/js'))
});

// Server
gulp.task('server', () => {
    return bs({
        server: {
            baseDir: 'dist'
        },
        //browser: 'google chrome canary'
    })
});

// Следим за sass
gulp.task('sass:watch', () => {
    return gulp.watch('app/sass/**/*.sass', gulp.series('sass', (done) => {
        bs.reload();
        done();
    }))
});

// Следим за JS
gulp.task('js:watch', () => {
    return gulp.watch('app/js/**/*.js', gulp.series('js:es6', (done) => {
        bs.reload();
        done();
    }))
});

//Components
gulp.task('bower:js', () => {
    // return gulp.task(['app/bower_components/jquery/dist/jquery.min.js', ])
    return gulp.src('app/bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
});

// gulp.task('sass:watch', () => {
//     return gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
// });
// gulp.task('js:watch', () => {
//     return gulp.watch('app/js/**/*.js', gulp.series('js:es6'));
// });

// Переопределяем задачу по-умолчанию
gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'pug', 'js:es6', 'js:babel', 'bower:js'),
    gulp.parallel('sass:watch', 'js:watch', 'server')));