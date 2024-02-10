const {CSequelizeDb} = require("../models/cindex.js");

let cSeqDb = new CSequelizeDb();
cSeqDb.iniFromConst();

console.log(cSeqDb.sequelize.config.username);

const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/controller.get.js');
PagesController.saveDbIn(cSeqDb);

const ApplicationsController = require('../controllers/controller.post.js');
ApplicationsController.saveDbIn(cSeqDb); // (db);

//---- AssignMent to EndPoints --------------------
router.get('/'    , PagesController.home);
router.get('/log'  , PagesController.log);
router.get('/logdis'  , PagesController.logdis);
router.get('/table1', PagesController.table1);
router.get('/about'  , PagesController.about);

router.post('/jlogin', ApplicationsController.jlogin);
router.post('/', ApplicationsController.jaddnew);
router.post('/jupdate', ApplicationsController.jUpdate);
router.post('/jdelrow', ApplicationsController.jDelRow);

router.put("/", ApplicationsController.jUpdate);
router.delete("/", ApplicationsController.jDelRow);

module.exports = router;