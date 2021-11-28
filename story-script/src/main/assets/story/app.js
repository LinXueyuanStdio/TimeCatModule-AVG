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
    global.StoryNext = function() {
        global.story.next();
    }
    global.StoryLoad = function(scriptString) {
        global.story.load(scriptString);
    }
    global.StorySetSaveScope = function(saveScope) {
        global.story.setSaveScope(saveScope);
    }
})(this);