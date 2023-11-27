/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('artist',{
        id: {
            type: 'VARCHAR(100)',
            primaryKey: true,
            notNull: true
        },
        artist_name: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        package_name: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        image_url: {
            type: 'VARCHAR(200)',
        },
        release_date: {
            type: 'timestamp',
            notNull: true,
        },
        sample_url: {
            type: 'VARCHAR(200)',
        },

    })
    // pgm.sql("UPDATE artist SET release_date = TO_CHAR(release_date, 'DD Mon YYYY')");
};

exports.down = pgm => {
    pgm.dropTable("artist")
};
