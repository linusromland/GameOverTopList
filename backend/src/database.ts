//External Dependencies import
import { connect, connection, ConnectOptions } from 'mongoose';

// Variable Declarations
let db;

/**
 * @name setup
 * @param  {} collectionname - The name of the collection
 * @param  {} connectURL - The URL to connect to MongoDB
 * @returns null
 * @description This function connects to MongoDB
 */
export function setup(collectionname: string, connectURL: string) {
    const dbLink = connectURL + collectionname;
    connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

    db = connection;
    db.on(
        'error',
        console.error.bind(console, 'Error while connecting to MongoDB using the following mongoURL: "' + dbLink + '"'),
    );
    db.once('open', function () {
        console.info('Connected to MongoDB using collection "' + collectionname + '"');
    });
}

export { db };
