var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Config Model
 * ==========
 */

var Config = new keystone.List(
  'Config',
  {
    map: {name: 'type'},
    track: true,
    nocreate: true,
    nodelete: true
  }
);

var pageTypes = [
  { value: '0', label: 'Home Page Hero' }
];

// General Page
Config.add({
  type: {
    type: Types.Select,
    options: pageTypes,
    required: true,
    initial: true,
    noedit: true,
  }
});

//Home Hero
Config.add(
  {
    homeHero: {
      Campaign: { type: Types.Relationship, ref: 'Evnts', filters: { type: 'Campaign' }, dependsOn: { type: '0' } }
    }
  }
);


Config.defaultColumns = 'name';
Config.register();
