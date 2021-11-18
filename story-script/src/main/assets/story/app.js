(function(global){
    nativeLoggingHook('launching js-engine', 1);
    global.parseScriptSync = function(scriptString) {
        const story = new StoryScript();
        story.load(scriptString);
        return story;
    }
    global.parseScriptASync = function(scriptString, callback) {
        const story = new StoryScript();
        story.load(scriptString);
        callback(story);
    }
})(this);