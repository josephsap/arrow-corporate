import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

export default Backbone.View.extend({

	// events: {
	// 	'click #more': 'loadMoreEvents'
	// },

	initialize: function() {
		_.bindAll(this);
		this.$navHeight = $('.navbar').height();
		this.$winHeight = $(window).height();
		this.$introContainer = $('.intro-video');
		this.render();
		$(window).on('resize', this.handleWindowResize);
	},

	render: function() {
		this.fullScreenIntro();
	},

	// make the hero image full screen
	fullScreenIntro: function() {
		this.$introContainer.css('height', (this.$winHeight - this.$navHeight)  + 'px');
	},

	handleWindowResize: function() {
		this.fullScreenIntro();
	}

	// loadMoreEvents: function() {
	// 	console.log('hi')
	// 	this.$('.sm-promo').each(function() {
	// 		if($(this).hasClass('hidden')) {
	// 			$(this).removeClass('hidden');
	// 		}
	// 	});
	// }

});
