var keystone = require('keystone');
var V = keystone.list('V');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'v';

	view.on('init', function(next) {
		V.model.findOne({
			slug: req.params.slug
		}).exec(function(err, result) {
			if (!result) res.status(404).render('errors/404');
			
			locals.v = result;
			next(err);
		});
	});

	// Render the view
	view.render('v');

};
