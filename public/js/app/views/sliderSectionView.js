import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

export default Backbone.View.extend({

	events: {
		'click #search-btn': 'performSearch'
	},
	delta: 0,
	currentSlideIndex: 0,
	scrollThreshold: 0,
	inSliderSection: false,


	initialize: function() {
		var view = this;
		_.bindAll(view);
		console.log(view.$el, view);
		console.log('slider section');

		view.render();
	},

	render: function() {
		var view = this;

		// scroll to top of page
		document.body.scrollTop = document.documentElement.scrollTop = 0;

		// window height
		view.$winHeight = $(window).height();

		// it's 3 to account for regular, PC mouses
		view.$slide = $('.slide');
		view.numSlides = view.$slide.length;
		view.$main = $('#slider-section');
		view.$rightSide = $('.right-side');
		view.numRightSideItems = view.$rightSide.length;
		view.$vComponents = $('.v-components');
		view.$vImgContainer = $('.v-img-container');
		view.$body = $('body');
		view.$page = $('html, body');
		view.$segment = $('.segment');
		view.$circle = $('.circle');
		view.mainTopBuffer = view.$main.offset().top - 50;
		view.mainBottomBuffer = view.$main.offset().top + 70;
		view.mainTop = view.$main.offset().top;
		view.setHeights(view.$winHeight);
		view.sizeRightSideImgs();
		view.imgHoverInfo();

		view.start();
	},

	setHeights: function(winHeight) {
		var view = this;
		view.$winHeight = winHeight;
		view.$main.css('height', view.$winHeight);
		view.$rightSide.each(function() {
			$(this).css('height', view.$winHeight);
		});
		view.$vComponents.css('height', view.winHeight * view.numRightSideItems);
	},

	scrollSlides: function(e) {
		var view = this;

		// 1: up towards nav. -1: down towards footer
		var scrollDir = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;

		// if we are scrolling from the top of the page, and we hit the slider section
		if($(window).scrollTop() >= view.mainTopBuffer && view.currentSlideIndex === 0 ) {

			// if scrolling down towards footer
			if(scrollDir === -1) {

				// if we are not yet in the slider section and the top of the slider section is less than the window scroll top
				if(!view.inSliderSection && view.mainTop < $(window).scrollTop()) {

					// disable scroll
					$(document).off('DOMMouseScroll mousewheel');

					// add overflow hidden to body
					view.lockSlider();

					// lock slider in place
					view.$page.animate({
						scrollTop: view.$main.offset().top
					}, 300);

					// re-bind scroll, enabling slide advancement
					view.bindScroll();
				}

			// else, we are scrolling up towards the nav, and we want to give scroll control back to the user
			} else {
				view.unlockSlider();
			}
		}

		// if scrolling down and we are in the slider section
		if(scrollDir === -1 && view.inSliderSection) {
			// view.$body.addClass('locked');

			// keeping track of amount scrolled when in slider section
			if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta < 0) {
				view.delta++;

				// if we scroll enough to move the slide
				if (view.delta >= view.scrollThreshold) {

					// get out of slider section if on last slide
					if(view.currentSlideIndex === 3) {
						view.unlockSlider();
						return false;
					} else {

						// advance the slide
						$(document).off('DOMMouseScroll mousewheel');
						view.nextSlide();
					}
				}
			}
		}

		// if scrolling up and we are in the slider section
		if(scrollDir === 1 && view.inSliderSection && view.currentSlideIndex > 0) {
			view.delta--;

			if (Math.abs(view.delta) >= view.scrollThreshold) {

				// if we hit our threshold, unbind scroll
				$(document).off('DOMMouseScroll mousewheel');

				// advance slide
				view.prevSlide();
			}

		// if scrolling up, below slider section, then hit slider section
		}
		else if($(window).scrollTop() <= view.mainBottomBuffer && scrollDir === 1 && view.currentSlideIndex === 3) {

			view.$page.animate({
				scrollTop: view.$main.offset().top
			}, 300);
			view.lockSlider();
		}
	},

	lockSlider: function() {
		var view = this;

		view.inSliderSection = true;
		view.$body.addClass('locked');
	},

	unlockSlider: function() {
		var view = this;

		view.inSliderSection = false;
		view.$body.removeClass('locked');
	},

	showSlide: function() {
		var view = this;
		var rotateAmount = 450;

		// reset
		view.delta = 0;

		// toggle active class, which animates the height
		view.$slide.each(function(i, slide) {
			$(slide).toggleClass('active', (i >= view.currentSlideIndex));
		});

		// the circular animation to keep track of which slide you are on
		view.$segment.removeClass('back-forth');
		view.$circle.css({
			'-webkit-transform' : 'rotate(' + view.currentSlideIndex * rotateAmount + 'deg)',
			'-moz-transform'    : 'rotate(' + view.currentSlideIndex * rotateAmount + 'deg)',
			'-ms-transform'     : 'rotate(' + view.currentSlideIndex * rotateAmount + 'deg)',
			'-o-transform'      : 'rotate(' + view.currentSlideIndex * rotateAmount + 'deg)',
			'transform'         : 'rotate(' + view.currentSlideIndex * rotateAmount + 'deg)'
		});
		setTimeout(function() {
		    view.$segment.addClass('back-forth');
		}, 755);

		// re-bind scroll
		view.bindScroll();

		// move the side bar up or down
		view.moveSideBar(view.currentSlideIndex);

	},

	prevSlide: function() {
		var view = this;

		view.currentSlideIndex--;

		if (view.currentSlideIndex < 0) {
			view.currentSlideIndex = 0;
		}

		view.showSlide();

	},

	nextSlide: function() {
		var view = this;

		view.currentSlideIndex++;

		if (view.currentSlideIndex > view.numSlides) {
			view.currentSlideIndex = view.numSlides;
		}

		view.showSlide();

	},

	moveSideBar: function() {
		var view = this;
		setTimeout(function() {
			var moveAmount = view.$winHeight * view.currentSlideIndex;
			var translateString = 'translateY(' + moveAmount + 'px)';
			view.$vComponents.css({
			    '-webkit-transform': translateString,
			    '-moz-transform': translateString,
			    '-ms-transform': translateString,
			    '-o-transform': translateString,
			    'transform': translateString
			});
		}, 50);

	},

	bindScroll: function() {
		var view = this;

		// then, after a the animation is done, bind scroll again
		setTimeout(function() {
			$(document).on('DOMMouseScroll mousewheel', _.throttle(view.scrollSlides, 70));
		}, 850);

	},

	start: function() {
		var view = this;

		$(document).on('DOMMouseScroll mousewheel', _.throttle(view.scrollSlides, 70));
	},

	performSearch: function() {
		var view = this;

		var searchTerm = view.$('#search-input').val().trim();
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
		var view = this;

		// loop through the slides
		for(var i = 0; i < view.numSlides; i++) {

			// find the number of images in each
			var numVImgsInEach = view.$('.section-' + [i]).find('.v-img-container').length;

			// if it's the section with one, set it to the same height as the section with four.
			if(numVImgsInEach < 3) {
				var imgHeight = view.$winHeight / 4;

				// center the short section
				view.$('.section-' + [i]).addClass('short-section');
				view.$('.short-section').find('.v-img-wrap').css('margin-top', - imgHeight / 2);

			// else set it to fit the window
			} else {
				var newImgHeight = view.$winHeight / numVImgsInEach;
			}

			view.$('.section-' + [i]).find('.v-img-container').each(function() {
				$(this).css({
					height: newImgHeight
				});
			});
		}
	},

	imgHoverInfo: function() {
				var view = this;
				var $view = $(this);

        view.$vImgContainer.hover(function () {
				var $slidelem = $view.find('span');
				$slidelem.stop().animate({'width':view.width() * 2.5},200);
				$slidelem.find('span').stop(true,true).fadeIn();
			},
			function () {
				var view = this;
				var $view = $(this);

				var $slidelem = $view.find('span');
				$slidelem.stop().animate({'width':'100%'},150);
				$slidelem.find('span').stop(true,true).fadeOut();
			}
		);
	}

});
