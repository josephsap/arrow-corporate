var keystone = require('keystone');
var Config = keystone.list('Config');
var Evnt = keystone.list('Evnts');
var V = keystone.list('V');
var Slides = keystone.list('HomeSlides');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	// locals.section = 'home';
	locals.section = 'index';

	// get the hero section
	view.on('init', function(next) {
		Config.model.findOne({
			type: '0'
		})
		.populate('homeHero.Campaign')
		.exec(function(err, result) {
			if (result && result.homeHero && result.homeHero.Campaign && result.homeHero.Campaign.image ) {
				locals.hero = result.homeHero.Campaign;
			} else {
				locals.hero = {
					title: '',
					slug: '',
					image: {}
				};
			}
			next(err);
		});
	});


	// get the home slides and populate the related Vs
	view.query('slides', Slides.model.find().sort({sortOrder: 1 }).populate('V'));

	// get all of the events. sort = sortable in cms
	view.query('evnts', Evnt.model.find().sort({sortOrder: 1 }));

	// grab the Vs
	view.query('vs', V.model.find());

	// Render the view
	view.render('index');

};
