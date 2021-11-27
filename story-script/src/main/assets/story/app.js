(function(global){
    nativeLoggingHook('launching js-engine', 1);

    global.StoryParser = new StoryScript().rawParse;
    global.onStoryScriptCreate = function(IScript) {
        const fn = function() {
            IScript.handleGlobalChanged();
        }
        global.story = new StoryScript(fn);
        return handleGlobalChanged;
    }
    global.parseScriptASync = function(scriptString, callback) {
        const story = ScriptParser(scriptString);
        callback(story);
    }
})(this);