var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * HomeSlides Model
 * ==========
 */

var HomeSlides = new keystone.List('HomeSlides', {
	sortable: true,
  track: true
});

HomeSlides.add({
	title: { type: Types.Text, required: true, initial: true },
  SubTitle: { type: Types.Text, required: true, initial: true },
  body: { type: Types.Textarea, required: true, initial: true  },
  image: { type: Types.LocalFile, dest: 'public/uploads' },
  V: { type: Types.Relationship, ref: 'V', many: true },
  type: { type: Types.Select, options: ['Search', 'CTA'] },
  Cta: { type: Types.Text, dependsOn: { type: 'CTA'} },
  link: {type: Types.Url, dependsOn: { type: 'CTA'} }
});


/**
 * Registration
 */

HomeSlides.defaultColumns = 'title, excerpt';
HomeSlides.register();
