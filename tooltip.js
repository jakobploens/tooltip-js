/**
 * Tooltip.js is a lightweight javascript plugin for responsive and
 * easy to use tooltips. Requires jQuery for the moment.
 *
 * @version   1.0
 * @author    Jakob Ploens <jakob@2helden.com>
 * @copyright Jakob Ploens 2016
 * @license   The MIT License
 */

var Tooltip = function(element, settings){

    var self = this;

    /**
     * Define default settings we go for.
     *
     * @param integer Animation's speed – if needed.
     * @param integer Delay between mouse leaving target and removing tooltip
     * @param integer Difference between tooltip and target
     * @param string  Tooltip's position. Can be either auto or left/right/top/bottom
     * @param string  CSS class for tooltip
     * @param string  CSS class for fixed tooltip
     * @param string  Data attribute for the content
     * @param string  Event to trigger the tooltip
     * @param boolean If true, follows mouse instead of one defined position
     * @param boolean If true, injects html insted of plain text
     */
    this.defaults = {
        speed:       100,
        delay:       0,
        offset:      5,

        class:       'tooltip',
        classFixed:  'tooltip--fixed',
        classLeft:   'tooltip--left',
        classRight:  'tooltip--right',
        classTop:    'tooltip--top',
        classBottom: 'tooltip--bottom',
        classShown:  'tooltip--is-shown',

        position:    'auto',
        dataAttr:    'tooltip',
        trigger:     'mouseenter',

        follow:      false,
        html:        false,
    };

    /**
     * Get options.
     */
    this.options = merge(this.defaults, settings);


    /**
     * Save target as jQuery object
     */
    this.$target  = $(element);
    this.$tooltip = $('<div class="' + this.options.class + '" role="tooltip" aria-hidden="true" />');
    this.content  = this.$target.data( this.options.dataAttr );

    this.target   = element;
    this.tooltip = '<div class="' + this.options.class + '" role="tooltip" aria-hidden="true" />';



    /**
     * Init function which builds our tooltip
     *
     * @param  string Element selector of tooltip
     * @param  object Custom options, see defaults for more information
     * @return prototype
     */
    this.init = function(element, settings){

        /**
         * Remove existing tooltips, just to be sure
         */
        self.remove();

        /**
         * Bind events to tooltip's event trigger
         */
        self.target.addEventListener(self.options.trigger, self.construct);

        /**
         * Return this
         */
        return self;
    };


    /**
     * Construct the tooltip
     */
    this.construct = function(){

        /**
         * If no content is given on this element, do nothing.
         */
        if(!self.content || self.content === ''){
            return;
        }

        /**
         * Add content and append object to body
         */
        if(self.options.html){
            self.$tooltip.html(self.content);
            // self.tooltip.innerHTML = self.content;
        } else {
            self.$tooltip.text(self.content);
            // self.tooltip.textContent = self.content;
        }
        // document.querySelector('body').innerHTML += self.tooltip;
        $('body').append(self.$tooltip);

        /**
         * If target is in a fixed container, apply fixed class to tooltip.
         */
        if(self.inFixedPosition(self.$target)){
            self.$tooltip.addClass(self.options.classFixed);
        }

        /**
         * Place tooltip at dedicated position.
         */
        self.position();

        self.target.addEventListener('mouseleave', function(){
            setTimeout(self.remove, self.options.delay);
        });
    };


    /**
     * Calculate tooltip at right position
     *
     * @return object left and top values as object
     */
    this.position = function(){

        /**
         * Get often used settings in easier and shorter variable names.
         */
        var position  = self.options.position;
        var offset    = self.options.offset * 2;
        var direction = 'down';

        /**
         * Get dimensions and position of target and tooltip
         */
        var windowWidth    = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        var targetWidth    = self.$target.outerWidth();
        var targetHeight   = self.$target.outerHeight();
        var targetPosition = self.$target.offset();

        var tooltipWidth   = self.$tooltip.outerWidth();
        var tooltipHeight  = self.$tooltip.outerHeight();

        var left = targetPosition.left + (targetWidth / 2) - (tooltipWidth / 2);
        var top  = targetPosition.top - tooltipHeight - offset;

        /**
         * If window is smaller than tooltip, add a new max width to tooltip
         */
        if(windowWidth < (tooltipWidth * 1.5)){
            self.$tooltip.css('max-width', (windowWidth / 2));
        }

        /**
         * Now we start checking for positions.
         */
        if(position === 'left' || left < 0){
            left = targetPosition.left + (targetWidth / 2) - offset;
            self.$tooltip.addClass(self.options.classLeft);
        } else {
            self.$tooltip.removeClass(self.options.classLeft);
        }

        if(position === 'right' || (left + tooltipWidth) > windowWidth){
            left = targetPosition.left - tooltipWidth + (targetWidth / 2) + offset;
            self.$tooltip.addClass(self.options.classRight);
        } else {
            self.$tooltip.removeClass(self.options.classRight);
        }

        if(position === 'bottom' || top < 0){
            direction = 'up';
            top = targetPosition.top + targetHeight + offset;
            self.$tooltip.addClass(self.options.classBottom);
        } else {
            self.$tooltip.removeClass(self.options.classBottom);
        }

        if(position === 'top'){
            top = targetPosition.top - tooltipHeight - offset;
            self.$tooltip.removeClass(self.options.classBottom);
        }

        /**
         * If follow is true, recalculate the left and top values again.
         */
        if(self.options.follow){
            self.$target.on('mousemove', function(event){
                left = event.pageX - (tooltipWidth / 2);
                top  = event.pageY - tooltipHeight - offset;

                self.$tooltip.css({
                    left: left,
                    top:  top
                }).addClass(self.options.classShown);
            });
        } else {
            self.$tooltip.css({
                left: left,
                top:  top
            }).addClass(self.options.classShown);
        }
    };


    /**
     * Returns true if one of parents is in fixed position
     *
     * @param  jQuery Object
     * @return boolean
     */
    this.inFixedPosition = function($element){
        return false;
    };


    /**
     * Remove a named tooltip or all.
     *
     * @param  jQuery object
     * @return boolean
     */
    this.remove = function(){
        var all = false;

        if(all){
            $(self.options.class).removeClass(self.options.classShown);
            setTimeout(function(){
                $(self.options.class).remove();
            }, self.speed);

        } else {
            self.$tooltip.removeClass(self.options.classShown);
            setTimeout(function(){
                self.$tooltip.remove();
            }, self.speed);
        }

        return;
    };


    /**
     * Destroy plugin and unbind events.
     */
    this.destroy = function(){
        self = null;
        delete self;
        return;
    };


    /**
     * Return init function
     */
    return this.init();
};


/**
 * Short function to merge two objects.
 *
 * @param  object (gets overwritten)
 * @param  object (overwrites)
 * @return object (merged)
 */
function merge(objectA, objectB){
    var result = {};
    for(var attr in objectA){
        result[attr] = objectA[attr];
    }
    for(var attr in objectB){
        result[attr] = objectB[attr];
    }
    return result;
}



(function($){
    'use strict';

    /**
     * Initialize jQuery plugin
     */
    $.fn.tooltip = function(options){
        $(this).each(function(){
            var tooltip = new Tooltip(this, options);
        });
        return;
    };
})(jQuery);
