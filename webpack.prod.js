const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',

    output: {
        clean: true, // Esta linea borra todo, antes de volver a crear los archivos
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [{
            test: /\.html$/, // Esta linea busca todos los archivos html en la corrida
            loader: 'html-loader', // Esta carga en modulo html loader
            options: {
                minimize: true, // Esta linea elimina los comentarios
                sources: false, // Esta linea lo que haces es que cuando
                // hay imagenes en el html el cambia las direcciones src al crear el nuevo html (archivo)
            },
        },
        {
            test: /\.css$/,
            exclude: /styles.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /styles.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'file-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
        }
    ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        // Dentro del HtmlWebPackPlugin podemos modificar los elementos de mi html que seran
        // modificados despues del run en consola, se puede cambiar el titulo del html
        // el nombre del archivo, etc
        new HtmlWebPackPlugin({
            title: "nuevo titulo", // asigna un titulo al archivo html de salida
            template: './src/index.html', // Template dice cual es el archivo base
            filename: './index.html' // finle name da el nombre al archivo de salida
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets/', to: 'assets/' },
            ],
        }),
    ]

}