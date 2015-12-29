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

	render: function() {

	},

	loadMoreEvents: function() {
		console.log('hi')
		this.$('.sm-promo').each(function() {
			if($(this).hasClass('hidden')) {
				$(this).removeClass('hidden');
			}
		});
	}

});