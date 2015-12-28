var keystone = require('keystone');
var Evnt = keystone.list('Evnts');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	// locals.section = 'home';
	locals.section = 'index';


	view.on('init', function(next) {
		Evnt.model.findOne({
			// slug: req.params.slug
		}).exec(function(err, result) {
			//throw a 404 if no slug is found
			if (!result) res.status(404).render('errors/404');
			// locals.title = result.title;
			locals.evnt = result;
			next(err);
		});
	});
	
	// Render the view
	view.render('index');
	
};