(function(global){
    nativeLoggingHook('js-engine', 1);
    global.myfunctionSync = function(args){
        nativeLoggingHook('myfunctionSync,args1:' + args[0] + ",arg2:" +args[1], 1);
        return {key1:'value1中文', key2:'value2', arg1: args[0], arg2:args[1]}
    }
    global.myfunction = function(args, callback){
        nativeLoggingHook('myfunction', 1);
        callback({key11:'callback-1', key22:"value2"});
    }
    global.intAdd = function(args){
        nativeLoggingHook('jsAdd!', 1);
        a = args[0]
        b = args[1]
        c = a + b
        return {result: c + ""}
    }
    global.parseScriptSync = function(scriptString) {
        const story = new StoryScript();
        story.load(scriptString);
        for (const line of story) {
            //do something
        }
        return story;
    }
    global.parseScriptASync = function(scriptString, callback) {
        const story = new StoryScript();
        story.load(scriptString);
        for (const line of story) {
            //do something
        }
        callback(story);
    }
})(this);