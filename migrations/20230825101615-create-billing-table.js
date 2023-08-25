'use strict';

const { INTEGER, DATE, STRING, BIGINT } = require('./config/data_types')

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('billing', {
    billing_id: { type: INTEGER, primaryKey: true },
    fk_account_id: INTEGER,
    period_covered_from: DATE,
    period_covered_to: DATE,
    connection_type: STRING,
    meter_id: BIGINT,
    previous_reading: INTEGER,
    present_reading: INTEGER,
    consumption: INTEGER,
    current_month_bill_cent: INTEGER,
    due_date: DATE
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('billing', callback)
};

exports._meta = {
  "version": 1
};
