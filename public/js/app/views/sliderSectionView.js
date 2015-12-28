import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

export default Backbone.View.extend({

	events: {
		'click #search-btn': 'performSearch'
	},

	initialize: function() {
		_.bindAll(this);
		console.log(this.$el, this);
		console.log('slider section');

		// scroll to top of page 
		document.body.scrollTop = document.documentElement.scrollTop = 0;

		// window height
		this.$winHeight = $(window).height();

		// our counter
		this.delta = 0;
		this.currentSlideIndex = 0;

		// it's 3 to account for regular, PC mouses
		this.scrollThreshold = 3;
		this.$slide = $('.slide');
		this.numSlides = this.$slide.length;
		this.$main = $('#slider-section');
		this.$rightSide = $('.right-side');
		this.numRightSideItems = this.$rightSide.length;
		this.$vComponents = $('.v-components');
		this.$vImgContainer = $('.v-img-container');
		this.$body = $('body');
		this.$page = $('html, body');
		this.$segment = $('.segment');
		this.$circle = $('.circle');
		this.inSliderSection = false;
		this.mainTopBuffer = this.$main.offset().top - 50;
		this.mainBottomBuffer = this.$main.offset().top + 70;
		this.mainTop = this.$main.offset().top;
		this.setHeights(this.$winHeight);
		this.sizeRightSideImgs();
		this.imgHoverInfo();
		this.render();
	},

	render: function() {
		this.start();
	},

	setHeights: function(winHeight) {
		var _this = this;
		this.$winHeight = winHeight;
		this.$main.css('height', this.$winHeight);
		this.$rightSide.each(function() {
			$(this).css('height', _this.$winHeight);
		});
		this.$vComponents.css('height', this.winHeight * this.numRightSideItems);
	},

	scrollSlides: function(e) {
		var _this = this;

		// 1: up towards nav. -1: down towards footer
		var scrollDir = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;

		// if we are scrolling from the top of the page, and we hit the slider section
		if($(window).scrollTop() >= this.mainTopBuffer && this.currentSlideIndex === 0 ) {

			// if scrolling down towards footer
			if(scrollDir === -1) {

				// if we are not yet in the slider section and the top of the slider section is less than the window scroll top
				if(!this.inSliderSection && this.mainTop < $(window).scrollTop()) {

					// disable scroll
					$(document).off('DOMMouseScroll mousewheel');

					// add overflow hidden to body
					this.lockSlider();

					// lock slider in place
					this.$page.animate({
						scrollTop: _this.$main.offset().top
					}, 300);

					// re-bind scroll, enabling slide advancement
					this.bindScroll();
				}

			// else, we are scrolling up towards the nav, and we want to give scroll control back to the user
			} else {
				this.unlockSlider();
			}
		}

		// if scrolling down and we are in the slider section
		if(scrollDir === -1 && this.inSliderSection) {
			// this.$body.addClass('locked');

			// keeping track of amount scrolled when in slider section
			if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta < 0) {
				this.delta++;

				// if we scroll enough to move the slide
				if (this.delta >= this.scrollThreshold) {

					// get out of slider section if on last slide
					if(this.currentSlideIndex === 3) {
						this.unlockSlider();
						return false;
					} else {

						// advance the slide
						$(document).off('DOMMouseScroll mousewheel');
						this.nextSlide();
					}
				}
			}
		}

		// if scrolling up and we are in the slider section
		if(scrollDir === 1 && this.inSliderSection && this.currentSlideIndex > 0) {
			this.delta--;

			if (Math.abs(this.delta) >= this.scrollThreshold) {

				// if we hit our threshold, unbind scroll
				$(document).off('DOMMouseScroll mousewheel');

				// advance slide
				this.prevSlide();
			}

		// if scrolling up, below slider section, then hit slider section
		} 
		else if($(window).scrollTop() <= this.mainBottomBuffer && scrollDir === 1 && this.currentSlideIndex === 3) {

			this.$page.animate({
				scrollTop: _this.$main.offset().top
			}, 300);
			this.lockSlider();
		}
	},

	lockSlider: function() {
		this.inSliderSection = true;
		this.$body.addClass('locked');
	},

	unlockSlider: function() {
		this.inSliderSection = false;
		this.$body.removeClass('locked');
	},

	showSlide: function() {
		var _this = this;
		var rotateAmount = 450;

		// reset
		this.delta = 0;

		// toggle active class, which animates the height
		this.$slide.each(function(i, slide) {
			$(slide).toggleClass('active', (i >= _this.currentSlideIndex));
		});

		// the circular animation to keep track of which slide you are on
		this.$segment.removeClass('back-forth');
		this.$circle.css({
			'-webkit-transform' : 'rotate(' + this.currentSlideIndex * rotateAmount + 'deg)',
			'-moz-transform'    : 'rotate(' + this.currentSlideIndex * rotateAmount + 'deg)',
			'-ms-transform'     : 'rotate(' + this.currentSlideIndex * rotateAmount + 'deg)',
			'-o-transform'      : 'rotate(' + this.currentSlideIndex * rotateAmount + 'deg)',
			'transform'         : 'rotate(' + this.currentSlideIndex * rotateAmount + 'deg)'
		});
		setTimeout(function() {
		    _this.$segment.addClass('back-forth');
		}, 755);

		// re-bind scroll
		this.bindScroll();

		// move the side bar up or down
		this.moveSideBar(this.currentSlideIndex);
	
	},

	prevSlide: function() {
		this.currentSlideIndex--;

		if (this.currentSlideIndex < 0) {
			this.currentSlideIndex = 0;
		}

		this.showSlide();

	},

	nextSlide: function() {
		this.currentSlideIndex++;

		if (this.currentSlideIndex > this.numSlides) { 
			this.currentSlideIndex = this.numSlides;
		}

		this.showSlide();

	},

	moveSideBar: function() {
		var _this = this;
		setTimeout(function() {
			var moveAmount = _this.$winHeight * _this.currentSlideIndex;
			var translateString = 'translateY(' + moveAmount + 'px)';
			_this.$vComponents.css({
			    '-webkit-transform': translateString,
			    '-moz-transform': translateString,
			    '-ms-transform': translateString,
			    '-o-transform': translateString,
			    'transform': translateString
			});
		}, 50);

	},

	bindScroll: function() {
		var _this = this;

		// then, after a the animation is done, bind scroll again
		setTimeout(function() {
			$(document).on('DOMMouseScroll mousewheel', _.throttle(_this.scrollSlides, 70));
		}, 850);

	},

	start: function() {
		$(document).on('DOMMouseScroll mousewheel', _.throttle(this.scrollSlides, 70));
	},

	performSearch: function() {
		var searchTerm = this.$('#search-input').val().trim();
		if(searchTerm === '') {
			$('.search').append('<p style="color: red;" class="error-msg">Please enter a search term.</p>');
			setTimeout(function() {
				$('.error-msg').css('display','none');
			}, 1000);
			return false;
		} else {
			window.open('https://www.arrow.com/en/products/search?q=' + searchTerm, '_blank');
		}
	},

	sizeRightSideImgs: function() {

		// loop through the slides
		for(var i = 0; i < this.numSlides; i++) {

			// find the number of images in each
			var numVImgsInEach = this.$('.section-' + [i]).find('.v-img-container').length;

			// if it's the section with one, set it to the same height as the section with four.
			if(numVImgsInEach < 3) {
				var imgHeight = this.$winHeight / 4;

				// center the short section
				this.$('.section-' + [i]).addClass('short-section');
				this.$('.short-section').find('.v-img-wrap').css('margin-top', - imgHeight / 2);

			// else set it to fit the window
			} else {
				var newImgHeight = this.$winHeight / numVImgsInEach;
			}

			this.$('.section-' + [i]).find('.v-img-container').each(function() {
				$(this).css({
					height: newImgHeight
				});
			});
		}
	},

	imgHoverInfo: function() {
        this.$vImgContainer.hover(function () {
				var _this = $(this);
				var $slidelem 	= _this.find('span');
				$slidelem.stop().animate({'width':_this.width() * 2.5},200);
				$slidelem.find('span').stop(true,true).fadeIn();
			},
			function () {
				var _this = $(this);
				var $slidelem 	= _this.find('span');
				$slidelem.stop().animate({'width':'100%'},150);
				$slidelem.find('span').stop(true,true).fadeOut();
			}
		);
	}

});