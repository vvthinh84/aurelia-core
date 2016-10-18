'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const paths = require('../paths');
var exec = require('child_process').exec;
const ChildProcess = require('child_process');
const BlueBird = require('bluebird');

// deletes all files in the output path

gulp.task('copy-to-deloy', function () {
    return gulp.src([paths.exportSrv + '/*', paths.exportSrv + '/**/*.*', paths.exportSrv + '/**/**/*.*', paths.exportSrv + '/**/**/*.*', paths.exportSrv + '/**/**/**/*.*'])
        .pipe(gulp.dest(paths.deploy));
});


// use after prepare-release
gulp.task('predeploy', function (callback) {
    return runSequence(
        'copy-to-deloy',
        callback
    );
});
gulp.task('deploy', function () {
    SpawnShell('git', ['commit', '-m', "comment"], {
            cwd: paths.deploy
        }).then(rs => {
            console.log(rs);
            //push 
            SpawnShell('git', ['push'], {
                cwd: paths.deploy,
                env: {
                    GIT_SSL_NO_VERIFY: true
                }
            }).then(rs => {
                console.log(rs);
            }).catch(rj => {
                console.error(rj);
            })
        }).catch(rj => {
            console.log(rj);
        })
        // exec(`git add -A && git commit -m ${'commit to push'.toString()}  && git push`, {
        //     cwd: paths.deploy
        // }, function (error, stdout, stderr) {
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //     if (error !== null) {
        //         console.log('exec error: ' + error);
        //     }
        // });

})
let Cmd = () => {
    switch (process.platform) {
        case 'win32':
    }
}

function SpawnShell(command, args, opts) {
    opts = opts || {};
    return new BlueBird((resolve, reject) => {
        let out = '';
        let env = process.env;
        env.GIT_SSL_NO_VERIFY = true; // bug ssl ca store not found

        let newProcess = ChildProcess.spawn(command, args, {
            env: opts.env ? opts.env : {},
            cwd: opts.cwd ? opts.cwd : {},
            shell: true
        });


        newProcess.on('error', function (err) {
            reject(err);
        });

        newProcess.stdout.on('data', function (data) {
            let str = String.fromCharCode.apply(null, data);
            out += str;
            if (opts.onProgress)
                opts.onProgress(str);
        });

        newProcess.stderr.on('data', function (data) {
            let str = String.fromCharCode.apply(null, data);
            out += str;
            if (opts.onProgress)
                opts.onProgress(str);
        });

        newProcess.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
            resolve(out);
            // if (code === 0)
            //     resolve(out);
            // else
            //     reject(code);
        });
    });
}