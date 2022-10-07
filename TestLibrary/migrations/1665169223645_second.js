exports.up = async db => {
  await db.collection('test').insertOne(
    {
      name: "juan2",
      code: 2
    }
    );
};


exports.down = async db => {
  await db.collection('test').deleteOne({
    code: 2
  }
);
};
    