const app = require('./app_hbs');

const port = 3000;

//serwer musi być włączony i słuchać na jakimś porcie
//Enabling the node.http server on port 3000 (http://localhost:3000/)
app.listen(port, (xerr) => { //słucha na porcie 3000 i jeśli wszystko będzie ok startuje 
    if (xerr)
        return (console.log('Something went wrong'));
    ServerRunning();        //zwróci (uruchomi) callback ServerRunning()
});                         //Server postawiony


function ServerRunning() {
    console.log('Server Node Express is running..');
};
