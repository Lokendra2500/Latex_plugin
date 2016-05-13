CKEDITOR.plugins.add( 'ai_latex_plugin', {
    availableLangs: {en:1},
    lang: 'en',
    requires: ['dialog'],
	icons: 'ai_latex_plugin',
    
	init: function(editor){
        
        var host='localhost:9090/Knowledge/library/ckeditor_4.5.1_3b70c5ea9efc/ckeditor';
        var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
        
        
        CKEDITOR.scriptLoader.load([
           http+host+'/js/eq_config.js',
		   http+host+'/js/eq_editor-lite-18.js',
        ]);
        
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", http+host+'/plugins/ai_latex_plugin/css/equation-embed.css');
        document.getElementsByTagName("head")[0].appendChild(fileref);
        
        CKEDITOR.dialog.add( 'ai_latex_pluginDialog', this.path+ 'dialogs/ai_latex_plugin.js');
        
        editor.addCommand( 'ai_latex_plugin', new CKEDITOR.dialogCommand( 'ai_latex_pluginDialog'));
        editor.ui.addButton( 'ai_latex_plugin', {
            label: 'Insert Math Equation',
            command: 'ai_latex_plugin',
            toolbar: 'insert'
        });   

        
        editor.on( 'doubleclick', function(evt)
		{
			var element = evt.data.element;
			if (element && element.is('img'))
			{
				var sName = element.getAttribute('src').match( /(gif|svg)\.latex\?(.*)/ );
				if(sName!=null)
				{
					evt.data.dialog = pluginCmd;
					evt.cancelBubble = true;
					evt.returnValue = false;
					evt.stop();
				}
			}
		}, null, null, 1);

	}
});