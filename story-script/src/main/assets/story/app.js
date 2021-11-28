(function(global){
    nativeLoggingHook('launching js-engine', 1);

    global.StoryParser = new StoryScript().rawParse;
    global.onStoryScriptCreate = function(args, callback) {
        const fn = function() {
            callback("handleGlobalChanged");
        }
        global.story = new StoryScript(fn);
    }
    global.StoryNext = function(args) {
        global.story.next();
    }
    global.StoryLoad = function(scriptString) {
        global.story.load(scriptString);
    }
    global.StorySetSaveScope = function(saveScope) {
        global.story.setSaveScope(saveScope);
    }
})(this);