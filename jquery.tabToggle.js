/*!
 * jQuery tabToggle plugin

 * Date 6/8/2009
 * razvan.caliman(at)gmail(dot)com | http://github.com/oslego/tabToggle/tree/master
 * @author Razvan Caliman
 * @version 1.0
 */

(function($){
	/**
	 * jQuery tabToggle plugin
	 * 
	 * The plugin receives a set of elements via the "this" parameter 
	 * that act as triggers to toggle the visibility of a set of targets.
	 *  
	 * The number of triggers must be equal to the number of targets. 
	 * Matching triggers to targets is done by their index.
	 * 
	 * @param {jQuery / Array} targets 
	 * 						   a set of elements that will be shown/hidden 
	 * 						   when clicking on the corresponding trigger
	 * 
	 * @param {Object} settings 
	 * 		object with custom defined settings for this plugin:
	 * 
	 * 		@param {String} selectedClass 
	 * 						CSS class to be applied to the selected trigger (tab)
	 * 
	 * 		@param {Number} defaultSelectedIndex
	 * 						default trigger/tab pair index (Array-like, zero-indexed) 
	 * 						to become active after the plugin loads 
	 */
	$.fn.tabToggle = function(targets, settings){
		
		//closure allows for multiple instances of the plugin on the same page
		return function($triggers, $targets, opt){
			
			//remove selected class from all triggers (tabs)
			var resetTriggers = function(){
				$triggers.removeClass(config.selectedClass);
			};
			
			//hide all targets (corresponding tab content)
			var resetTargets = function(){
				$targets.hide();
			};
			
			//highlight the selected tab and displat its contents
			var selectTabPair = function(trigger, target){
				resetTriggers();
				resetTargets();
				
				$(trigger).addClass(config.selectedClass);
				$(target).show();
			};
			
			//select the default trigger / target pair on first load
			var selectDefaultTabPair = function(){
				
				//make sure the user-defined index is a Number
				var defaultIndex = parseInt(config.defaultSelectedIndex, 10);
				
				//set the maximum allowed index value
				var maxIndex = $triggers.length - 1;
				
				//make sure the default selected Index is a number and within the range of triggers length;
				var index = (maxIndex < defaultIndex || isNaN(defaultIndex))? maxIndex:defaultIndex;
				
				//select the default trigger, target pair
				selectTabPair($triggers[index], $targets[index]);
			}
			
			//bind clicks on triggers to the visibility of targets
			var addTabBehavior = function(){
				//assign click behavior to trigger elements (tabs)
				$triggers.each(function(i){
					$trigger = $(this);
					$target = $($targets[i]);
	
					$trigger.bind('click', function(_trigger, _target){
						
						//closure to keep the value of triger and target in the correct scope
						return function(){
							selectTabPair(_trigger, _target);
						};
						
					}($trigger, $target));
				});
			}
			
			//method to run if the plugin setup conditions are met
			var init = function(){
				selectDefaultTabPair();
				addTabBehavior();
			}
					
			//extend the default settings with the ones specified by the user 
			config = $.extend({}, $.fn.tabToggle.defaults, opt);
			
			if ($triggers && 
				$targets &&
				$targets.length == $triggers.length &&
				$targets.length > 0){
				
				init();
			}
			
			//returns the current jquery object for chaining
			return $triggers;
			
		}($(this), $(targets), settings);
	}
	
	$.fn.tabToggle.defaults = {
		//CSS class to be applied to the selected trigger (tab)
		selectedClass: "selected",
		
		//default trigger/tab pair index (Array-like, zero-indexed) to become active after the plugin loads 
		defaultSelectedIndex: 0
	};
})(jQuery);