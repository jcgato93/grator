# grator
## Install
---
    $ npm install @reaperx/grator

## Usage
---
We will need to set up the environment variables to connect  to mongo database

```
MONGO_DB_USER=
MONGO_DB_PASSWORD=
MONGO_DB_HOST=
MONGO_DB_NAME=
```

- create migration
    
        $ npm run grator -c migration_name

- run migrations

        $ npm run grator -r

- undo last migration

        $ npm run grator -u

## Examples

Into migration file we have an instance of the database, this use https://www.npmjs.com/package/mongodb

```javascript
exports.up = async db => {

   await db.collection('books').update(
    {"reorder": {$exists: true}}, 
    {$rename:{"reorder":"sort"}},
    false,
    true
    );
}

exports.down = async db => {
  
    await db.collection('books').update(
        {"reordenar": {$exists: true}}, 
        {$rename:{"sort":"reorder"}},
        false,
        true
    );
};
```