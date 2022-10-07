exports.up = async db => {
  await db.collection('test').insertOne(
    {
      name: "juan",
      code: 1
    }
    );
};


exports.down = async db => {
  await db.collection('test').deleteOne({
    code: 1
  }
);
};