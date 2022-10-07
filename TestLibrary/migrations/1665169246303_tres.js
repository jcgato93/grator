exports.up = async db => {
  await db.collection('test').insertOne(
    {
      name: "juan3",
      code: 3
    }
    );
};


exports.down = async db => {
  await db.collection('test').deleteOne({
    code: 3
  }
);
};