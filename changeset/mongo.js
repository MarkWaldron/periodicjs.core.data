'use strict';
const mongoose = require('mongoose');
const path = require('path');
const Mongo_Adapter = require(path.join(__dirname, '../adapters/mongo'));

/**
 * Default changeset schema for mongo databases
 * @type {mongoose.Schema}
 */
const CHANGESET = new mongoose.Schema({
	createdat: {
		index: true,
    type: Date,
    default: Date.now
  },
  editor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  editor_username: String,
  changeset: mongoose.Schema.Types.Mixed,
  parent_document: {
  	id: {
  		index: true,
  		type: mongoose.Schema.ObjectId
  	},
  	document_type: {
  		index: true,
  		type: String
  	}
  }
});

/**
 * Registers a changeset schema to a custom mongoose instance
 * @param  {Object} db_connection A mongoose connection where the changeset collection should be registered
 * @return {Object}               Returns an instance of a Mongo_Adapter that has been configured for the changeset collection
 */
module.exports = function register_changeset (db_connection) {
  let ChangeSet;
  try {
    ChangeSet = db_connection.model('Changeset', CHANGESET);
  }
  catch (e) {
    ChangeSet = db_connection.model('Changeset');
  }
  return new Mongo_Adapter({
    model: ChangeSet,
    track_changes: false
  });
};