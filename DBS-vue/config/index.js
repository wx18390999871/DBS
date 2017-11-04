// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var moment = require('moment');

var buildVersion = moment().format('YYYYMMDDHHMMss');
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist', './index.html'),
        assetsRoot: path.resolve(__dirname, '../dist', buildVersion),
        assetsSubDirectory: 'static',
        assetsPublicPath: buildVersion + '/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        proxyTable: {
            '/api':{
                target:'http://60.190.227.172:9101/DBS/',
                changeOrigin:true,
                pathRewrite:{
                    '^api':''
                },
                onProxyRes: function(proxyRes, req, res) {
                    var oldCookie = proxyRes.headers['set-cookie']
                    if (oldCookie == null || oldCookie.length == 0) {
                        delete proxyRes.headers['set-cookie'];
                        return;
                    }
                    var oldCookieItems = oldCookie[0].split(';')
                    var newCookie = ''
                    for (var i = 0; i < oldCookieItems.length; ++i) {
                        if (newCookie.length > 0) {
                            newCookie += ';'
                        }
                        if (oldCookieItems[i].toLowerCase().indexOf('path=') >= 0) {
                            newCookie += 'Path=/';
                        } else {
                            newCookie += oldCookieItems[i];
                        }
                    }
                    proxyRes.headers['set-cookie'] = [newCookie];
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
