//Third Party Includes
import $ from 'jquery';
import Backbone from 'backbone';

//Models
//import PortfolioItem from './models/portfolioitem';

//Collections
//import PortfolioItems from './collections/portfolioitems';

//Views
import HomeView from './views/home';
// import SliderSectionView from './views/sliderSectionView';
import CampaignsView from './views/campaign';
import VView from './views/v';

var el;

export default Backbone.Router.extend({

    routes: {
        '': 'home',
        'campaigns/:slug': 'campaigns',
        'v/:slug': 'v',
        '*path':  'defaultRoute'
    },

    initialize: () => {
        el = $('#app');
    },

    home: () => {
        console.log('home view');
        var homeView = new HomeView({
            el: el
        });

        // var sliderSectionView = new SliderSectionView({
        //     el: $('#slider-section')
        // });

        homeView.render();

        // sliderSectionView.render();
    },

    campaigns: () => {
        console.log('campaign');
        var campaignsView = new CampaignsView({
            el: el
        });

        campaignsView.render();
    },

    v: () => {
        var vView = new VView({
            el: el
        });

        vView.render();
    },

    defaultRoute: () => {
        console.log('default path');
    }

});
