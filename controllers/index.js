const models = require("../database/models");
const lodash = require('lodash');

const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send({error: error.message});
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
    return res.status(404).send({error: "User with the specified ID does not exists"});
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
    return res.status(404).send({error: "User with the specified email does not exists"});
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
}

const createBatch = async (req, res) => {
  try {
    const oldBatch = await models.Batch.findOne({
      where: { batchNumber: req.body.batchNumber }
    })
    if(oldBatch){
      return res.status(400).json({ error: 'Ya existe un lote con ese número de lote'});
    }
    if(new Date().getTime() < new Date(req.body.productionDate).getTime()) {
      return res.status(400).json({ error: 'La fecha de produccion debe ser anterior a hoy.' });
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
    return res.status(500).send({error: error.message});
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
      changes.filter(c => c).sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      batch.samples.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return res.status(200).json({ batch, changes });
    }
    return res.status(404).send({error: "Batch with the specified ID does not exists"});
  } catch (error) {
    return res.status(500).send({error: error.message});
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
    return res.status(404).send({error: "Sample with the specified ID does not exists"});
  } catch (error) {
    return res.status(500).send({error: error.message});
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
      let subchanges = [batches[i].samples.length];
      for(let j = 0; j < batches[i].samples.length; j++){
        subchanges[j] = await models.ChangeReport.findOne({
          where: {newSampleId: batches[i].samples[j].id},
          include: [{
            model: models.User,
            as: "user"
          }]
        })
      }
      changes[i] = {id: batches[i].id, changes: subchanges}
    }
    if (batches) {
      return res.status(200).json({ batches, changes });
    }
    return res.status(404).send({error: "Batches with the specified state don't exist"});
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
    const batch = await models.Batch.findOne({
      where: { id: batchId },
    });
    if((new Date(batch.productionDate).getTime() - (24 * 60 * 60 * 1000)) > new Date(req.body.packingDate).getTime() ||
      (new Date(batch.productionDate).getTime() + (24 * 60 * 60 * 1000)) < new Date(req.body.packingDate).getTime()) {
      return res.status(400).json({ error: 'La fecha de empaquetado debe estar cerca de la fecha de produccion del lote en cuestion.' });
    }
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
    return res.status(500).send({error: error.message});
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

const dashboardHeader = async (req, res) => {
  try {
    let batches = await models.Batch.findAll({
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
    batches = batches.filter(b => b.productionDate.getMonth() === new Date().getMonth() && b.productionDate.getFullYear() === new Date().getFullYear())
    const analyzed = batches.filter(b => b.state !== 'PROCESANDO');
    const pnc = analyzed.filter(b => b.state !== 'PARA LIBERAR');
    const rejected = analyzed.filter(b => b.state === 'RECHAZADO');

    const efficiency = (analyzed.length / batches.length) * 100;
    const pncPercentage = (pnc.length / analyzed.length) * 100;
    const rejectedPercentage = (rejected.length / analyzed.length) * 100;

    return res.status(200).json({ efficiency, pncPercentage, rejectedPercentage });

  } catch (error) {
    return res.status(500).send({error: error.message});
  }
}

const efficiencyMonthly = async (req, res) => {
  try {
    let batches = await models.Batch.findAll({
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
    const result = lodash.groupBy(batches, ({productionDate})=> new Date(productionDate).getMonth());
    let efficiencyByMonth = [Object.keys(result).length]
    for (let i = Object.keys(result)[0]-1+1; i < (Object.keys(result)[0]-1+1+Object.keys(result).length); i++) {
      const analyzed = result[i.toString()].filter(b => b.state !== 'PROCESANDO');
      const efficiency = (analyzed.length / result[i.toString()].length) * 100;
      efficiencyByMonth[i-(Object.keys(result)[0])] = { month: i+1, value: efficiency }
    }

    return res.status(200).json({ efficiencyByMonth });

  } catch (error) {
    return res.status(500).send({error: error.message});
  }
}

const pncMonthly = async (req, res) => {
  try {
    let batches = await models.Batch.findAll({
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
    const result = lodash.groupBy(batches, ({productionDate})=> new Date(productionDate).getMonth());
    let pncByMonth = [Object.keys(result).length]
    for (let i = Object.keys(result)[0]-1+1; i < (Object.keys(result)[0]-1+1+Object.keys(result).length); i++) {
      const analyzed = result[i.toString()].filter(b => b.state !== 'PROCESANDO');
      const pnc = analyzed.filter(b => b.state !== 'PARA LIBERAR');
      const pncPercentage = (pnc.length / analyzed.length) * 100;
      pncByMonth[i-(Object.keys(result)[0])] = { month: i+1, value: pncPercentage }
    }

    return res.status(200).json({ pncByMonth });

  } catch (error) {
    return res.status(500).send({error: error.message});
  }
}

const concessionMonthly = async (req, res) => {
  try {
    let batches = await models.Batch.findAll({
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
    const result = lodash.groupBy(batches, ({productionDate})=> new Date(productionDate).getMonth());
    let concessionByMonth = [Object.keys(result).length]
    for (let i = Object.keys(result)[0]-1+1; i < (Object.keys(result)[0]-1+1+Object.keys(result).length); i++) {
      const analyzed = result[i.toString()].filter(b => b.state !== 'PROCESANDO');
      const delivered = analyzed.filter(b => b.state !== 'RECHAZADO');
      const concession = delivered.filter(b => b.state === 'CONCESION');
      const concessionPercentage = (concession.length / delivered.length) * 100;
      concessionByMonth[i-(Object.keys(result)[0])] = { month: i+1, value: concessionPercentage }
    }

    return res.status(200).json({ concessionByMonth });

  } catch (error) {
    return res.status(500).send({error: error.message});
  }
}

const rejectedMonthly = async (req, res) => {
  try {
    let batches = await models.Batch.findAll({
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
    const result = lodash.groupBy(batches, ({productionDate})=> new Date(productionDate).getMonth());
    let rejectedByMonth = [Object.keys(result).length]
    for (let i = Object.keys(result)[0]-1+1; i < (Object.keys(result)[0]-1+1+Object.keys(result).length); i++) {
      const analyzed = result[i.toString()].filter(b => b.state !== 'PROCESANDO');
      const rejected = analyzed.filter(b => b.state === 'RECHAZADO');
      const rejectedPercentage = (rejected.length / analyzed.length) * 100;
      rejectedByMonth[i-(Object.keys(result)[0])] = { month: i+1, value: rejectedPercentage }
    }

    return res.status(200).json({ rejectedByMonth });

  } catch (error) {
    return res.status(500).send({error: error.message});
  }
}

const pncByVisualMonthly = async (req, res) => {
  try {
    let batches = await models.Batch.findAll({
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
      let subchanges = [batches[i].samples.length];
      for(let j = 0; j < batches[i].samples.length; j++){
        subchanges[j] = await models.ChangeReport.findOne({
          where: {newSampleId: batches[i].samples[j].id},
          include: [{
            model: models.User,
            as: "user"
          }]
        })
      }
      changes[i] = {id: batches[i].id, changes: subchanges.filter(c=>c)}
    }
    const result = lodash.groupBy(batches, ({productionDate})=> new Date(productionDate).getMonth());
    let pncByMonth = [Object.keys(result).length]
    for (let i = Object.keys(result)[0]-1+1; i < (Object.keys(result)[0]-1+1+Object.keys(result).length); i++) {
      const analyzed = result[i.toString()].filter(b => b.state !== 'PROCESANDO');
      const pnc = analyzed.filter(b => b.state !== 'PARA LIBERAR');
      const visualTrizado = pnc.filter(b => changes.filter(c => c.id === b.id)[0].changes.filter(c => c.type === 'visual' && c.shatterLevel > 0).length > 0)
      const pncVisualPercentage = (visualTrizado.length / pnc.length) * 100;
      pncByMonth[i-(Object.keys(result)[0])] = { month: i+1, value: pncVisualPercentage }
    }

    return res.status(200).json({ pncByMonth });

  } catch (error) {
    return res.status(500).send({error: error.message});
  }
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
  getSampleById,
  dashboardHeader,
  efficiencyMonthly,
  pncMonthly,
  concessionMonthly,
  rejectedMonthly,
  pncByVisualMonthly
};
