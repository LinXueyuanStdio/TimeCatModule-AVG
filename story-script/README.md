剧本脚本

https://ohmlang.github.io/editor/#

```aidl
cnpm install hermes-engine
```

脚本解释器来自于

https://github.com/avgjs/storyscript

我的修改如下：

1. 代码压缩的依赖和命令
    ```shell
    //依赖
    "uglify-js": "^3.14.3",
    //命令定义
    "release": "webpack --progress --colors --mode=production",
    "minifyJS": "uglifyjs dist/index.js --compress --mangle --warn --output dist/index.min.js",
    "production": "npm run version:bump --silent && rm -f index.min.js && npm run minifyJS --silent",
    "production2": "npm run version:bump --silent && rm -f index.min.js && npm run minifyJS --silent && npm run version:add --silent",
    "version:add": "echo \"/*! My Rad Scriptz!!!!1!11! v - $(npm run version:extract --silent)n * © Someone probably n * Build time: $(date '+%m-%d-%Y %H:%M:%S')n */n$(cat dist/index.min.js)\" > dist/index.min.js",
    "version:bump": "npm version patch --no-git-tag-version --silent",
    "version:extract": "cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]'"
    //使用
    npm run production
    ```
2. 打包好后，获得index.min.js，需要手动修改 `s.default=t` 为 `s.StoryScript=t`, 恢复被混淆的解释器对象名称。
   这句在第二个 use strict 上面一点点。 未混淆时为
    ```shell
    // module.exports = StoryScript;
    exports.default = StoryScript;
    ```

TODO 目前使用了 hermes （js引擎，React Native同款）来加载动态脚本。hermes 允许把 index.min.js 预先编译为字节码，直接加载，可以提高加载速度。有空再搞 