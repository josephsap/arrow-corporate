var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'v';

	locals.filters = {
		v: req.params.slug
	};

	locals.data = {
		v: []
	};

	view.on('init', function(next) {
		var q = keystone.list('V').model.findOne({
			slug: locals.filters.v
		});

		q.exec(function(err, result) {
			console.log(result);
			locals.data.v = result;
			next(err);
		});
	});

	// Render the view
	view.render('v');

};
