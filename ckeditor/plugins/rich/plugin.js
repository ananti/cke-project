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
		    allowedContent: 'rich',
		    requiredContent: 'rich',			
		    upcast: function( element ) {
		    	if(element.name == 'rich'){
		    		var parElmt = element.getAscendant('span');
					if(parElmt == null) {
						var spanParTag = new CKEDITOR.htmlParser.element( 'span' );
						spanParTag.addClass('hlt');
						var attrs = spanParTag.attributes;
						return element.wrapWith(spanParTag);	
					}
		    	}		    	
            },
			downcast: function( element ) {
		    	if(element.name == 'span' && element.hasClass('hlt')){
					var richElmt = element.getFirst('rich');
            		return richElmt;
            	}
            },
            editables: {
				content: {
					selector: 'span.hlt',
					allowedContent: 'p br ul ol li strong em'
				}
			}
    	});
    }
} );
