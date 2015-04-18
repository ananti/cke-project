/**
 * @license Copyright (c) 2003-2015, CKSource - Ananti Sunny. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview [Rich Tag]
 */
CKEDITOR.plugins.add( 'rich', {
    requires: 'widget',
    init: function( editor ) {
    	var pluginDirectory = this.path;
        editor.addContentsCss( pluginDirectory + 'styles/style.css' );
        editor.widgets.add( 'rich', {
		    allowedContent: 'pre(!personal)',
		    requiredContent: 'pre(personal)',			
		    upcast: function( element ) {
		    	if(element.name == 'pre' && element.hasClass('personal')){
		    		var parElmt = element.getAscendant('span');
					if(parElmt == null) {
						var spanParTag = new CKEDITOR.htmlParser.element( 'span' );
						element.addClass('hlt');
						var attrs = spanParTag.attributes;
						return element.wrapWith(spanParTag);	
					}
		    	}
		    	//return element.name =='pre' && element.hasClass('personal');
            },
			downcast: function( element ) {
		    	if(element.name == 'span' && element.hasClass('hlt')){
					var richElmt = element.getFirst('pre');
            		return richElmt;
            	}
            },
            editables: {
				content: {
					selector: '.personal',
					allowedContent: 'p br ul ol li strong em'
				}
			}
    	});
    }
} );
