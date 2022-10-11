module.exports={
    dev: {
        connectionString: 'postgresql://postgres:docker@localhost:5432/studentmvp',
        port: '3000'
    },
    production :{
        connectionString: process.env.PSQL_CONNECTION_STRING+'?ssl=true',
        port: process.env.PORT
    }
}