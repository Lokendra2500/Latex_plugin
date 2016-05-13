/*
 *  Auther Name: Lokendra Prajapati
 *  Date: 06-April-2016
 *  Purpose: Demo file for plugin testing
*/

window.latex=0;
CKEDITOR.dialog.add('demoDialog', function(editor)
{
   var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
   window.latex++;
   
   return{
       title: 'Latex Equation Editor',
       minWidth: 600,
       minHeight: 400,
       //resizable: CKEDITOR.DIALOG_RESIZE_NONE,
       
       contents: [
           {
               id: 'EquationEditor',
               label: 'DemoEquationEditor',
               elements:[
                   {
                       type: 'html',
                       html: '<div id="CCtoolbar'+window.latex+'"></div>',
                       style: 'margin-top:-9px'
                   },
                   {
                       type: 'html',
                       html: '<label for="CClatex'+window.latex+'">Equation (Latex): </label>'
                   },
                   {
                       type: 'html',
					   html: '<textarea id="CClatex'+window.latex+'" name="latex" rows="5"></textarea>',
					   style:'border:1px solid #8fb6bd; width:540px; font-size:16px; padding:5px; background-color:#ffc',
					},
                   {
                       type: 'html',
                       html: '<label for="CCequation'+window.latex+'">Preview:</label>'
                   },
               ]
           }
       ],
       
       onLoad : function(){
           EqEditor.embed('CCtoolbar'+window.latex,'','efull');
           EqEditor.add(new EqTextArea('CCequation'+window.latex,'CClatex'+window.latex),false);
       },
       
    onShow: function() {
        var dialog = this,
        sel = editor.getSelection(),
        image = sel.getStartElement().getAscendant('img', true);
        
        if(image)
        {
            var sName = image.getAttribute('src').match(/(gif|svg)\.latex\?(.*)/);
            if(sName!=null) EqEditor.getTextArea().setText(sName[2]);
            dialog.insertMode = true;   
        }
        
        dialog.setupContent( dialog.image );
    },
    onOk : function() {
			var eqn = editor.document.createElement( 'img' );
			eqn.setAttribute( 'alt', EqEditor.getTextArea().getLaTeX());
			eqn.setAttribute( 'src', EqEditor.getTextArea().exportEquation('urlencoded'));
			editor.insertElement(eqn);
			Example.add_history(EqEditor.getTextArea().getLaTeX());
		}
	};
});