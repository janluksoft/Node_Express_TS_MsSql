const datajs = require('./Data.js');

let aCounter = 0;
let aCountAb = 0;
let aCountLog = 0;
let cSeqDb;
let smessage = "";

exports.saveDbIn = (xcSeqDb) => {
    cSeqDb = xcSeqDb;
}


//===== Routing of pages =============================================
exports.home = (xrequest, xresponse) => { 
    xresponse.render('table2', {
        zPageTitle: 'Node Main Page',
        zbIsTable: false,
        zCount: aCounter,
        ztNames: [],
    });
    aCounter++;
}; //Main Page '/' localhost:3000


exports.table1 = (xrequest, xresponse) => { 

    jTab1GetAll(xrequest, xresponse, -1, "Table read good");
};

jTab1GetAll = (xrequest, xresponse, xnPostResult, xsMessage) => { 
    let smessage = xsMessage;
    cSeqDb.ctally.findAll()
    .then(data => { 
        jTab1GetRender(xresponse, false, smessage, data, xnPostResult);
    })
    .catch(err => {
        smessage = "ERROR: "+ err.message;
        console.log(smessage);
        jTab1GetRender(xresponse, true, smessage, [], xnPostResult);
    });
};

jTab1GetRender = (xres, xbErrorTab, xsMessDown, xtable, xnPostResult) => {
	console.log("xbErrorTab= ["+ xbErrorTab+ "]");
    xres.render('table1', {
        zPageTitle: 'Table1 page',
        zsMessDown: xsMessDown, //'Nothing',
        zCount: datajs.addAndGetCountLog(1),// aCountLog,
        znTLogged: cSeqDb.nTimesLogged,
        zbIsLogged: cSeqDb.bIsLogged,
        zbErrorTab: xbErrorTab,
        ztTable: xtable,
        znPostResult: xnPostResult, // -1
    });
}


exports.log = (xrequest, xresponse) => { 

    let jconfig = cSeqDb.sequelize.connectionManager.config;
    const zlog = { 
        database: jconfig.database,
        username: jconfig.username,
        password: jconfig.password,
        host: jconfig.host,
        port: jconfig.port,
    }

    xresponse.render('log', {
        zPageTitle: 'Node login page',
        zsMessDows: 'Nothing',
        zCount: datajs.addAndGetCountLog(1),
        znTLogged: cSeqDb.nTimesLogged,
        zbIsLogged: cSeqDb.bIsLogged,
        zlog: jconfig,
    });
    aCountLog++;
}; //localhost:3000/log

exports.logdis = (xrequest, xresponse) => { 

    let jconfig = cSeqDb.sequelize.connectionManager.config;
    const zlog = { 
        database: jconfig.database,
        username: jconfig.username,
        password: jconfig.password,
        host: jconfig.host,
        port: jconfig.port,
    }

    cSeqDb.nTimesLogged++;
    cSeqDb.bIsLogged = false;
    jconfig.password = 'x'; //Specially wrong blank password

    xresponse.render('log', {
        zPageTitle: 'Node login page',
        zsMessDows: 'Nothing',
        zCount: datajs.addAndGetCountLog(1),
        znTLogged: cSeqDb.nTimesLogged,
        zbIsLogged: cSeqDb.bIsLogged,
        zlog: jconfig,
    });
    aCountLog++;
}; //localhost:3000/log

exports.about = (xrequest, xresponse) => { 
    xresponse.render('about');
};
