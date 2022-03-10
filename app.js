


function calc(){
    var argOne=document.getElementById('arg1').value;
    var argTwo=document.getElementById('arg2').value;
    var ans=(argOne*argTwo);
    document.getElementById('result').innerHTML=argOne + ' multiplicado por ' + argTwo + ' es igual a ' + ans;
}


var Connection = require('tedious').Connection;
var config = {
    server: 'your_server.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'your_username', //update me
            password: 'your_password'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'your_database'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

connection.connect();



-------------------









const { Connection, Request, TYPES } = require('node_modules/tedious');

const config = {
    server: '192.168.1.212',
    authentication: {
        type: 'default',
        options: {
            userName: 'test',
            password: 'test'
        }
    },
    options: {
        port: 1433 // Default Port
    }
};

const connection = new Connection(config);

connection.connect(function(err) {
    if (err) {
        console.log('Connection Failed!');
        throw err;
    }

});


// using input parameters
//--------------------------------------------------------------------------------
function login() {
    // Values contain variables idicated by '@' sign
    const sql = `INSERT INTO ${table} (uniqueIdCol, intCol, nVarCharCol) VALUES (@uniqueIdVal, @intVal, @nVarCharVal)`;
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            throw err;
        }

        console.log('rowCount: ', rowCount);
        console.log('input parameters success!');
        outputParameters();
    });

    // Setting values to the variables. Note: first argument matches name of variable above.
    request.addParameter('uniqueIdVal', TYPES.UniqueIdentifier, 'ba46b824-487b-4e7d-8fb9-703acdf954e5');
    request.addParameter('intVal', TYPES.Int, 435);
    request.addParameter('nVarCharVal', TYPES.NVarChar, 'hello world');

    connection.execSql(request);
}

// using output parameters
//--------------------------------------------------------------------------------
function outputParameters() {
    const sql = 'SELECT @uniqueIdVal=uniqueIdCol, @intVal=intCol, @nVarCharVal=nVarCharCol from test_param';
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            throw err;
        }

        console.log('output parameters success!');
        console.log('DONE!');
        connection.close();
    });

    // Emits 'returnValue' when executed.
    request.addOutputParameter('uniqueIdVal', TYPES.UniqueIdentifier);
    request.addOutputParameter('intVal', TYPES.Int);
    request.addOutputParameter('nVarCharVal', TYPES.NVarChar);

    request.on('returnValue', (paramName, value, metadata) => {
        console.log(paramName + '=', value);
    });

    connection.execSql(request);
}