const datajs = require('./Data.js');

let db;
let cSeqDb;
let smessage = "";

exports.saveDbIn = (xcSeqDb) => {
    cSeqDb = xcSeqDb;
}

//---------- LOG ----------------------
exports.jlogin = (req, res) => { 
    //=== saves login data from the form to the sequelize object ====
    const jDataLog = { //POST method from Form: passes data to [request.body] object
        database: req.body.nDataBase,
        username: req.body.nUser,
        password: req.body.nPass,

        host: req.body.nHost,
        port: req.body.nPort,
    }
    
    console.log("1) Start ...");
    console.log("jDataLog.port: "+ jDataLog.password);
  
    let jconfig = cSeqDb.sequelize.connectionManager.config;
    jconfig.database = jDataLog.database;
    jconfig.username = jDataLog.username;
    jconfig.password = jDataLog.password;
    jconfig.host = jDataLog.host;
    jconfig.port = jDataLog.port;


    cSeqDb.sequelize.sync().then(function() {//...called if successful...
        console.log("Good");
        jLogged(res, jconfig);
      }, 
      function(err) {//...called if an error occurred...
        smessage = "ERROR sync connection: "+ err;
        console.log(smessage);
        jlogRenderNew(res, jconfig, smessage, true);
      }
    );
  
    datajs.aCountLog++;
};

jLogged = (xres, xjconfig) => {
    cSeqDb.nTimesLogged++;
    cSeqDb.bIsLogged = true;
    jlogRenderNew(xres, xjconfig, '', false);
}

jlogRenderNew = (xres, xjconfig, xsMessDown, xbErrorLog) => {

    xres.render('log', {
        zPageTitle: 'Node login page',
        zsMessDown: xsMessDown, //'Nothing',
        zCount: datajs.addAndGetCountLog(1),
        znTLogged: cSeqDb.nTimesLogged,
        zbIsLogged: cSeqDb.bIsLogged,
        zbErrorLog: xbErrorLog,
        zlog: xjconfig,
    });
}

jReadTab = (xres, xjconfig) => {

    cSeqDb.ctally.findAll()
    .then(data => { 
        smessage = "Table read good";
        jlogRender(xres, true, smessage, xjconfig, data);
    })
    .catch(err => {
        smessage = "ERROR: "+ err.message;
        console.log(smessage);
        jlogRender(xres, false, smessage, xjconfig, []);
    });

}

jlogRender = (xres, xbLoginOk, xsmess, xjconfig, xTable) => {

    let jconfig = cSeqDb.sequelize.connectionManager.config;

    xres.render('log', {
        zPageTitle: 'Node check login',
        zbIsTable: xbLoginOk,
        zCount: xsmess,
        ztNames: xTable,
        zbIsStart: false,
        zbIsLog: !xbLoginOk,
        zlog: xjconfig,
    });
}

//-------- NEW Row --------------------
exports.jaddnew = (req, res) => {

    const jDataRow = { //POST method from Form: passes data to [request.body] object
        title: req.body.nTitle ,
        description: req.body.nDescription,
        published: 1,
    }

    console.log("4) Add new row ..: "+ jDataRow.title);
    let sMessage = "";
    let nPostResult = -1;

    cSeqDb.ctally.create(jDataRow)
    .then(data => { 
      nPostResult = 1;
      sMessage = 'Position ['+ data.dataValues.id+ '] ('+ data.dataValues.title+') was added successfully.';
      jTab1GetAll(req, res, nPostResult, sMessage);
    })
    .catch(err => {
      nPostResult = 0;
      sMessage = "ERROR: "+ err.message;
      jTab1GetAll(req, res, nPostResult, sMessage);
    });

    console.log(sMessage);
}

//-------- UPDATE Row --------------------
exports.jUpdate = (req, res) => { //changes via POST and PUT method

    const jDataRow = { 
        id: req.body.nId,
        title: req.body.nTitle ,
        description: req.body.nDescription,
        published: 1,
    }

    let rInfo = {smess:"",nresult: -1 };

    const id = jDataRow.id; //req.params.id;
  
    cSeqDb.ctally.update( jDataRow, {where: { id: id }} )
      .then(num => {
        if (num == 1) {
          rInfo.nresult = 1;
          rInfo.smess = `Position id=${id} was updated successfully.`;
          jTab1GetAll(req, res, rInfo.nresult, rInfo.smess);
        } else {
          rInfo.nresult = 0;
          rInfo.smess = `Cannot update position with id=${id}. Maybe position was not found!`;
          jTab1GetAll(req, res, rInfo.nresult, rInfo.smess);
        }
      })
      .catch(err => {
        rInfo.nresult = 0;
        rInfo.smess = "Error updating with id=" + id + '. Code: '+ err.message;
        jTab1GetAll(req, res, rInfo.nresult, rInfo.smess);
    });

    console.log("8) Update row ..: "+ rInfo.smess);
}

//-------- DELETE Row --------------------
exports.jDelRow = (req, res) => {
  const id = req.body.nId;

  let rInfo = {smess:"",nresult: -1 };

  cSeqDb.ctally.destroy({where: { id: id }} )
  .then(num => {
    if (num == 1) {
      rInfo.nresult = 1;
      rInfo.smess = `Position id=${id} was deleted successfully.`;
      jTab1GetAll(req, res, rInfo.nresult, rInfo.smess);
    } else {
      rInfo.nresult = 0;
      rInfo.smess = `Cannot delete position with id=${id}. Maybe position was not found!`;
      jTab1GetAll(req, res, rInfo.nresult, rInfo.smess);
    }
  })
  .catch(err => {
    rInfo.nresult = 0;
    rInfo.smess = "Error deleting with id=" + id + '. Code: '+ err.message;
    jTab1GetAll(req, res, rInfo.nresult, rInfo.smess);
  });

}
