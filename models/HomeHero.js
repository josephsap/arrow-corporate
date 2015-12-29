var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Home Page Hero Model
 * ==========
 */

 var HomeHero = new keystone.List('HomeHero', {
 	track: true
 });

 HomeHero.add({
 	title: { type: Types.Text, required: true, initial: true },
 	linkText: { type: Types.Text, initial: true},
 	link: { type: Types.Url, initial: true },
 	image: { type: Types.LocalFile, dest: 'public/uploads' }
 });

 HomeHero.defaultColumns = 'title';
 HomeHero.register();