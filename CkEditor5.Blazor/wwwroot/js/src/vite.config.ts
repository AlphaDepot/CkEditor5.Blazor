import {defineConfig} from 'vite';
import * as path from 'path';
import * as fs from 'fs';

export default defineConfig({
    // Deduplicate CKEditor imports to avoid multiple instances of CKEditor in the bundle.
    // This is really important with CKEditor 5 community plugins, which import CKEditor from their own node_modules.
    resolve: {
        dedupe: [
            'ckeditor5',
            'ckeditor5/src',
            'ckeditor5/dist'
        ]
    },
    build: {
        outDir: path.resolve(__dirname, '../dist'),
        emptyOutDir: true,
        lib: {
            entry: path.resolve(__dirname, 'lib/main.ts'),
            name: 'ckeditor5-blazor',
            fileName: () => `ckeditor5.js`,
            formats: ['es']
        },

        rolldownOptions: {
            output: {
                codeSplitting: false,
                globals: {
                    'ckeditor5-blazor': 'ckeditor5Blazor'
                },
            },
            onwarn(warning, warn) {
                if (warning.code === 'EVAL' && warning.id?.includes('@protobufjs')) {
                    return;
                }
                warn(warning);
            }
        },
        minify: false
    },
    plugins: [copyCkeditorCss()]
})



function copyCkeditorCss() {
    return {
        name: 'copy-ckeditor-css',
        closeBundle() {
            const root = __dirname;
            const toPosix = (p: string) => p.replace(/\\/g, '/');

            const colors = {
                gray: '\x1b[90m',
                cyan: '\x1b[36m',
                yellow: '\x1b[33m',
                reset: '\x1b[0m'
            };


            const filesToCopy = [
                {
                    from: path.resolve(root, 'node_modules/ckeditor5/dist/ckeditor5.css'),
                    to: path.resolve(root, '../../css/ckeditor5.css')
                },
                {
                    from: path.resolve(root, 'node_modules/ckeditor5-premium-features/dist/ckeditor5-premium-features.css'),
                    to: path.resolve(root, '../../css/ckeditor5-premium-features.css')
                },
                {
                    from: path.resolve(root, 'node_modules/@lstsystems/ckeditor5-source-editing-codemirror/dist/sourceediting-codemirror.css'),
                    to: path.resolve(root, '../../css/ckeditor5-sourceediting-codemirror.css')
                }
            ];

            const distRoot = path.resolve(root, '../dist');

            // Log file sizes like Vite does
            for (const file of filesToCopy) {
                fs.mkdirSync(path.dirname(file.to), { recursive: true });
                fs.copyFileSync(file.from, file.to);

                const size = fs.statSync(file.to).size;
                const kb = (size / 1024).toFixed(2);

                const rel = toPosix(path.relative(distRoot, file.to));
                const filename = path.basename(rel);
                const dir = rel.replace(filename, '');

                const totalWidth = 50;
                
                console.log(
                    colors.gray + dir +
                    colors.cyan + filename +
                    colors.reset +
                    ' '.repeat(Math.max(1, totalWidth - rel.length)) +
                    colors.yellow + `${kb} kB` +
                    colors.reset
                );
            }

            
        }
    };
}

