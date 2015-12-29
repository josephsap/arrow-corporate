import Backbone from 'backbone';
import _ from 'lodash';
import $ from 'jquery';

var slick =  require('slick-carousel');

export default Backbone.View.extend({

  initialize: function() {
    _.bindAll(this);
    console.log(slick, 'kskskssk');
    this.render();
  },

  render: function() {
    var view = this;
    console.log('hi');
    $('.video-slider').slick({
        centerMode: true,
        speed: 300,
        vertical: true,
        verticalSwiping: true,
        centerPadding: '150px',
        cssEase: 'ease-in-out',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                    verticalSwiping: false
                }
            
            }
        ]
    });

    return view;
  }

});
