const db = require('./../db');
const AutoIncrement = require('mongoose-sequence')(db);

const Schema = db.Schema;

const listingSchema = new Schema({
  itemId: Number,
  name: String,
  brand: String,
  style: String,
  priceOriginal: Number,
  priceDiscounted: Number,
  category: String,
  condition: {type: Number, min: 1, max: 9},
  photosSmall: [String],
});

// eslint-disable-next-line camelcase
listingSchema.plugin(AutoIncrement, {inc_field: 'itemId', start_seq: 0});

const Listing = db.model('Listing', listingSchema);

const add = (...listings) => {
  return Listing.create(...listings);
};

const get = (options = {}, limit = 25) => {
  return Listing.find(options).limit(limit).exec();
};

const getById = (itemId) => {
  return Listing.find({itemId}).exec();
};

const sortOptions = [
  {itemId: 1},
  {itemId: -1},
  {style: 1},
  {style: -1},
  {photosSmall: 1},
  {photosSmall: -1}
];

const getRandom = (options = {}, limit = 25) => {
  return Listing.find(options).sort(
    sortOptions[Math.floor(Math.random() * sortOptions.length)]
  ).limit(limit).exec();
};

module.exports = {
  add,
  get,
  getById,
  getRandom
};
