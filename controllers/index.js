const models = require("../database/models");

const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await models.User.findOne({
      where: { id: userId }
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const {password, email} = req.body
    if (email.length < 1) return res.status(400).json('NOT VALID EMAIL')
    const user = await models.User.findOne({
      where: { email: email }
    });
    if (user) {
      if(user.password !== password) res.status(404).json("BAD CREDENTIALS");
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified email does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const createBatch = async (req, res) => {
  try {
    const oldBatch = await models.Batch.findOne({
      where: { batchNumber: req.body.batchNumber }
    })
    if(oldBatch){
      return res.status(400).json({ message: 'Ya existe un lote con ese número de lote'});
    }
    const batch = await models.Batch.create(req.body);
    return res.status(201).json({
      batch
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBatches = async (req, res) => {
  try {
    const batches = await models.Batch.findAll({
      include: [
        {
          model: models.Sample,
          as: "samples",
          order: [
            ['createdAt', 'DESC']
          ]
        },
        {
          model: models.Product,
          as: 'product'
        }
      ]
    });

    return res.status(200).json({ batches });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBatchById = async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await models.Batch.findOne({
      where: { id: batchId },
      include: [
        {
          model: models.Sample,
          as: "samples",
          order: [
            ['createdAt', 'DESC']
          ]
        },
        {
          model: models.Product,
          as: 'product'
        }
      ]
    });
    if (batch) {
      let changes = [batch.samples.length];
      for(let i = 0; i < batch.samples.length; i ++) {
        changes[i] = await models.ChangeReport.findOne({
          where: {newSampleId: batch.samples[i].id},
          include: [{
            model: models.User,
            as: "user"
          }]
        })
      }
      changes.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      batch.samples.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return res.status(200).json({ batch, changes });
    }
    return res.status(404).send("Batch with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSampleById = async (req, res) => {
  try {
    const { sampleId } = req.params;
    const sample = await models.Sample.findOne({
      where: { id: sampleId }
    });
    if (sample) {
      return res.status(200).json({ sample });
    }
    return res.status(404).send("Sample with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBatchesByState = async (req, res) => {
  try {
    const { batchState } = req.params;
    const batches = await models.Batch.findAll({
      where: { state: batchState },
      include: [
        {
          model: models.Sample,
          as: "samples"
        },
        {
          model: models.Product,
          as: 'product'
        }
      ]
    });
    let changes = [batches.length];
    for(let i = 0; i < batches.length; i++){
      changes[i] = [batches[i].samples.length];
      for(let j = 0; j < batches[i].samples.length; j++){
        changes[i][j] = await models.ChangeReport.findOne({
          where: {newSampleId: batches[i].samples[j].id},
          include: [{
            model: models.User,
            as: "user"
          }]
        })
      }
    }
    if (batches) {
      return res.status(200).json({ batches, changes });
    }
    return res.status(404).send("Batches with the specified state don't exist");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const newSample = async (batchId, userId, type, shatterLevel, sampleBody) => {
  try {
    const sample = await models.Sample.create(sampleBody);
    const batch = await models.Batch.findOne({
      where: { id: batchId },
      include: [
        {
          model: models.Sample,
          as: "samples"
        },
        {
          model: models.Product,
          as: 'product'
        }
      ]
    });
    const relation = await models.BatchSample.create({BatchId: batchId, batchId: batchId, SampleId: sample.dataValues.id});
    const change = await models.ChangeReport.create({
      type: type,
      date: new Date(),
      shatterLevel: shatterLevel,
      lastSampleId: type === 'visual' ? batch.samples[0].id : batch.samples.filter(s => s.state === 'visual')[0].id,
      newSampleId: sample.dataValues.id,
      userId: userId
    });
    let batchState = '';
    if(type === 'visual') batchState = 'PROCESANDO';
    else {
      if(shatterLevel < 15) batchState = 'PARA LIBERAR';
      else if(shatterLevel < 25) batchState = 'CONCESION';
      else batchState = 'RECHAZADO';
    }
    await models.Batch.update(
      { shatterLevel: shatterLevel, state: batchState },
      { where: { id: batchId }} )
    return { sample, relation, change };
  } catch (error) {
    return { error: error.message };
  }
}

const createSample = async (req, res) => {
  try {
    const { batchId, userId } = req.params;
    const sample = await models.Sample.create(req.body);
    const relation = await models.BatchSample.create({BatchId: batchId, batchId: batchId, SampleId: sample.dataValues.id});
    const change = await models.ChangeReport.create({
      type: 'creation',
      date: new Date(),
      shatterLevel: 0,
      lastSampleId: 1,
      newSampleId: sample.dataValues.id,
      userId: userId
    });
    return res.status(201).json({
      sample, relation, change
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const prods = await models.Product.findAll();
    return res.status(200).json({ prods });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const visualEdit = async (req, res) => {
  const { batchId, userId } = req.params;
  const { sample, shatterLevel } = req.body;
  const result = await newSample(batchId, userId, 'visual', shatterLevel, sample);
  if(result.error) return res.status(500).json(result);
  return res.status(201).json(result);
}

const cookingEdit = async (req, res) => {
  const { batchId, userId } = req.params;
  const { sample, shatterLevel } = req.body;
  const result = await newSample(batchId, userId, 'coccion', shatterLevel, sample);
  if(result.error) return res.status(500).json(result);
  return res.status(201).json(result);
}


module.exports = {
  getUsers,
  getUserById,
  login,
  createBatch,
  getBatches,
  getBatchById,
  getBatchesByState,
  createSample,
  getProducts,
  visualEdit,
  cookingEdit,
  getSampleById
};
