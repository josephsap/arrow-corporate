var keystone = require('keystone');
var Video = keystone.list('Video');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'campaign';

	view.query('videos', Video.model.find());

	// Render the view
	view.render('campaign');

};
