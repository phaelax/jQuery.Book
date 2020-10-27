(function($){
	$.fn.book = function(options){
		
		var defaults = {
			onPageChange: function(){},
			speed: 500
		};
		
		var settings = $.extend(defaults, options);
		
		
		if (this.length > 1){
			this.each(function(){ $(this).book(options) });
			return this;
		}
		
		var pageIndex = 0;
		
		var $this = $(this);
		
		var pages = $this.children('section').css({width:'100%',height:'100%',position:'relative'}); // The sections need to match the parent (<form>) container's size for animation to look correct
		
		
		
		// The form will expand to fit the container it's in (unless overridden).
		//this.css({width:'100%', display:'flex', margin:'auto', overflow:'hidden'});  
		
		this.initialize = function(){
			
			pages.hide();
			pages.first('section').show();
			
			pages.find('.page-next').on('click', this.nextPage);
		
			pages.find('.page-prev').on('click', this.prevPage);
			
			return this;
		}
		
		
		
		this.getPageIndex = function(){
			return pageIndex;
		}
		
		
		this.getPageCount = function(){
			return pages.length;
		}
		
	
		this.setPage = function(i){
			
			return changePage(i);
		}
		
		function changePage(index){
			
			if (index >= 0 && index < pages.length && index != pageIndex){
				
				if ((typeof $this.valid === 'function' && index > pageIndex && $this.valid()) || typeof $this.valid !== 'function'){
				
					oldPageIndex = pageIndex; // retain for callback info
					$currentPage = pages.eq(pageIndex);
					$newPage     = pages.eq(index);
					pageIndex    = index;
					pageName     = ($newPage[0].hasAttribute("name")) ? $newPage.attr('name') : null;  // used in callback
					
					
					if (typeof settings.onPageChange == 'function'){
						settings.onPageChange.call(this, oldPageIndex, pageIndex, pages.length, pageName );
					}
					
					
					
					if (index > oldPageIndex){ // move forward
							
						$currentPage.hide("slide", {direction:"left"}, settings.speed, function(){
							$newPage.show("slide", {direction:"right"}, settings.speed);
						});
							
					}else{ // move back
						$currentPage.hide("slide", {direction:"right"}, settings.speed, function(){
							$newPage.show("slide", {direction:"left"}, settings.speed);
						});
						
					}
				}
				
			}
			return this;
		};
		
		
		this.nextPage = function(){
			
			return changePage(pageIndex+1);
		};
		
		
		
		
		this.prevPage = function(){
			
			return changePage(pageIndex-1);

		};

		
		return this.initialize();
	};
	
	
}(jQuery));
