var keystone = require('keystone');
var Hero = keystone.list('HomeHero');
var Evnt = keystone.list('Evnts');
var V = keystone.list('V');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	// locals.section = 'home';
	locals.section = 'index';

	// get the hero section
	view.on('init', function(next) {
		Hero.model.findOne({

		}).exec(function(err, result) {
			locals.hero = result;
			next(err);
		});
	});


	// get all of the events. sort = sortable in cms
	view.query('evnts', Evnt.model.find().sort({sortOrder:1}));


	// grab the Vs
	view.query('vs', V.model.find());

	// Render the view
	view.render('index');
	
};