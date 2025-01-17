import {defineConfig} from 'vite';
import * as path from 'path';

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../dist'),
        lib: {
            entry: path.resolve(__dirname, 'lib/main.ts'),
            name: 'ckeditor5-blazor',
            fileName: () => `ckeditor5.js`,
            formats: ['es']
        },
        rollupOptions: {
            output: {
                globals: {
                    'ckeditor5-blazor': 'ckeditor5Blazor'
                },
            }
        },
        minify: false
    }
})

/*
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../dist'),
        lib: {
            entry: path.resolve(__dirname, 'lib/main.ts'),
            name: 'ckeditor5-blazor',
            fileName: () => 'main.js'
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                manualChunks(id) {
                    if (id.includes('main.ts')) {
                        return 'main';
                    }
                },
                inlineDynamicImports: false
            }
        }
    }
})*/
