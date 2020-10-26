(function($){
	$.fn.book = function(options){
		
		var defaults = {
			nextPage: function(){},
			prevPage: function(){},
			speed: 500
		};
		
		var settings = $.extend(defaults, options);
		
		var pageIndex = 0;
		
		var pages = $(this).children('section');
		
		var $this = $(this);
		
		
		this.initialize = function(){
			
			pages.hide();
			pages.first('section').show();
			
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
				
				if ((typeof $this.valid === 'function' && $this.valid()) || typeof $this.valid !== 'function'){
					currentPage = pages.eq(pageIndex);
					nextPage = pages.eq(++pageIndex);
					
					if (typeof settings.nextPage == 'function'){
						settings.nextPage.call(this, pageIndex, pages.length );
					}
						
					currentPage.hide("slide", {direction:"left"}, settings.speed, function(){
						nextPage.show("slide", {direction:"right"}, settings.speed);
					});
				}
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
				
				currentPage.hide("slide", {direction:"right"}, settings.speed, function(){
					prevPage.show("slide", {direction:"left"}, settings.speed);
				});
			}
			return this;
		};
		
		
		
		return this.initialize();
	};
	
	
}(jQuery));
