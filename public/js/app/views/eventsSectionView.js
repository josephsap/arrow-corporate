import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

export default Backbone.View.extend({

	events: {
		'click #more': 'loadMoreEvents'
	},

	initialize: function() {
		_.bindAll(this);
	},

	// render: function() {

	// },

	loadMoreEvents: function() {
		this.$('.sm-promo').each(function() {
			if($(this).hasClass('hidden')) {
				$(this).fadeIn(200);
			}
		});
	}

});