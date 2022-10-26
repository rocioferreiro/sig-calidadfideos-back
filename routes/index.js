const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

router.get('/users', controllers.getUsers);
router.get('/users/:userId', controllers.getUserById);
router.post('/login', controllers.login);
router.post('/batches', controllers.createBatch);
router.get('/batches', controllers.getBatches);
router.get('/batches/:batchId', controllers.getBatchById);
router.get('/sample/:sampleId', controllers.getSampleById);
router.get('/batches/state/:batchState', controllers.getBatchesByState);
router.post('/samples/:batchId/:userId', controllers.createSample);
router.post('/visual/:batchId/:userId', controllers.visualEdit);
router.post('/cooking/:batchId/:userId', controllers.cookingEdit);
router.get('/products', controllers.getProducts);

module.exports = router;
