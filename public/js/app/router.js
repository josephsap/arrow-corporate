//Third Party Includes
import $ from 'jquery';
import Backbone from 'backbone';

//Models
//import PortfolioItem from './models/portfolioitem';

//Collections
//import PortfolioItems from './collections/portfolioitems';

//Views
import HomeView from './views/home';
import CampainsView from './views/campaign';
import VView from './views/v';


var el;

export default Backbone.Router.extend({

  routes: {
    '': 'home',
    '/campaigns/:slug': 'campaigns',
    '/v/:slug': 'v',
    '*path':  'defaultRoute'
  },

  initialize: () => {

    el = $('#app');

  },

  home: () => {
    var campainsView = new CampainsView({
      el: el
    });

    campainsView.render();
  },

  campaigns: () => {
    var homeView = new HomeView({
      el: el
    });

    homeView.render();
  },

  v: () => {
    var vView = new VView({
      el: el
    });

    vView.render();
  },

  defaultRoute: () => {
    console.log('path');
  }

});
