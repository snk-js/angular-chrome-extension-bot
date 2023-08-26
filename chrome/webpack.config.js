const { join } = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        contentPage: join(__dirname, "src/contentPage.ts"),
        serviceWorker: join(__dirname, "src/serviceWorker.ts"),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: join(__dirname, "../angular/dist"),
        filename: "[name].js",
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: "chrome/src/contentStyle.css", to: "." }],
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
    },
};
