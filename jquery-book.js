(function($){
	$.fn.book = function(options){
		
		var defaults = {
			nextPage: function(){},
			prevPage: function(){}
		};
		
		var settings = $.extend(defaults, options);
		
		var pageIndex = 0;
		
		var pages = $(this).children('.page');
		
		var $this = $(this);
		
		
		this.initialize = function(){
			
			pages.hide();
			pages.first('.page').show();
			
			pages.find('.page-next').on('click', this.nextPage);
		
			pages.find('.page-prev').on('click', this.prevPage);
		}
		
		
		
		this.getPageIndex = function(){
			return pageIndex;
		}
		
		
		this.getPageCount = function(){
			return pages.length;
		}
		
		this.nextPage = function(){
			if (pageIndex < pages.length-1){
				currentPage = pages.eq(pageIndex);
				nextPage = pages.eq(++pageIndex);
				
				if (typeof settings.nextPage == 'function'){
					settings.nextPage.call(this, pageIndex, pages.length );
				}
					
				currentPage.hide("slide", {direction:"left"}, 500, function(){
					nextPage.show("slide", {direction:"right"}, 500);
				});
			}
			return this;
		};
		
		
		
		
		this.prevPage = function(callback){
			
			if (pageIndex > 0){
				currentPage = pages.eq(pageIndex);
				prevPage = pages.eq(--pageIndex);
			
				if (typeof settings.prevPage == 'function'){
					settings.prevPage.call(this, pageIndex, pages.length );
				}
				
				currentPage.hide("slide", {direction:"right"}, 500, function(){
					prevPage.show("slide", {direction:"left"}, 500);
				});
			}
			return this;
		};
		
		
		
		return this.initialize();
	};
	
	
}(jQuery));
