const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Define our indexes
storeSchema.index({
  name: 'text',
  description: 'text'
});

storeSchema.index({location: '2dsphere'});


storeSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip
    return; // stop function
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
});

// Método personalizado
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

storeSchema.statics.getTopStores = function() {
  return this.aggregate([
    // Lookup Stores and populate their reviews
    // El primer reviews (de from) viene de que mongo pasa Review -> reviews, lo pasa a plural quitándole la mayúscula
    { $lookup: { 
        from: 'reviews', localField: '_id', foreignField: 'store', as: 'reviews' 
      } 
    },
    // filter for only items that have 2 or more reviews
    // reviews.1 -> reviews[1], o sea, que exista el segundo
    { $match: {
        'reviews.1': { $exists: true }
      } 
    },
    // Add the average reviews field
    { $addFields: {
        averageRating: { $avg: '$reviews.rating' }
      } 
    },
    // sort it by our new field, highest reviews first
    { $sort: {
        averageRating: -1
      }
    },
    // limit to at most 10
    { $limit: 10 }
  ]);
};

// Busca reviews donde el _id del store sea igual a la propiedas store de las reviews
storeSchema.virtual('reviews', {
  ref: 'Review', // Modelo a linkear
  localField: '_id', // Propiedad de este modelo (Store)
  foreignField: 'store' // Propiedad de el otro modelo (Review)
});

function autoPopulate(next) {
  this.populate('reviews');
  next();
};

storeSchema.pre('find', autoPopulate);
storeSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Store', storeSchema);