const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name][chunkhash:10].js',
        chunkFilename: 'static/js/[name][chunkhash:10].chunk.js',
        assetModuleFilename: 'media/[name][chunkhash:6][ext][query]',
        clean: true
    },
    module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024 // 4kb
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
            {
                test: /\.vue$/,
                loader: 'vue-loader'
              }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../template.html'),
            filename: 'index.html'
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules',
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist') }
            ],
        }),
        new VueLoaderPlugin(),
        //  定义给源代码使用的环境变量
        new DefinePlugin({
            __VUE_OPTIONS_API__: true, // 使用OPTIONS API
            __VUE_PROD_DEVTOOLS__: false // 生产环境下不使用开发者工具
        })
    ],
    resolve: {
		extensions: ['.js', '.vue'],
	},
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: 'all',
			cacheGroups: {
				vue: {
					test: /[\\/]node_modules[\\/]@?vue(.*)?[\\/]/,
					name: 'chunk-vue',
					priority: 50,
				},
				element: {
					test: /[\\/]node_modules[\\/]element(.*)?[\\/]/,
					name: 'chunk-element',
					priority: 20,
				},
				libs: {
					test: /[\\/]node_modules[\\/]/,
					name: 'chunk-libs',
					priority: 10
				},
			},
			// minSize: 0
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}`, // 改动异步模块里的代码不会影响到打包后的index.js文件
		}
	},
}


