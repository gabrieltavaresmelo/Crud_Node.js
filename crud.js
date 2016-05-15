/* CRUD - NODEJS + MYSQL
 *  Author: Francisco Fernando Rocha
 *  Copyleft 2016 - This code is under GNU License - GPL 3.0
 *  More information: http://www.gnu.org/licenses/gpl-3.0.en.html
 *  
 */
//Configuração MySQL
//MySQL Configuration
var mysql = require('mysql');
var pool =  mysql.createPool({
	host : 'localhost',
	user : 'root',
	password: '123456',
	database: 'node'
});
//Definindo as querys
//Setting queries
var createSQL = "CREATE TABLE pessoa (id int(11) NOT NULL AUTO_INCREMENT,"+
    "nome varchar(35) DEFAULT NULL,"+
    "cpf varchar(14) DEFAULT NULL,"+
    "rg varchar(11) DEFAULT NULL,"+
    "email varchar(35) DEFAULT NULL,"+
    "telefone varchar(15) DEFAULT NULL,"+
    "PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1";
var insertSQL = 'INSERT INTO pessoa(nome, cpf, rg, email, telefone) VALUE(?,?,?,?,?)';
var readSQL = 'SELECT * FROM pessoa WHERE nome = ?';
var updateSQL = 'UPDATE pessoa SET nome = ?,rg = ?,email = ?, telefone = ? WHERE cpf = ?';
var deleteSQL = 'DELETE FROM pessoa WHERE cpf=?';
//Verificando existencia da tabela
//Verifying table existence
var criarTabela = function(err, connection){
  connection.query("SELECT * FROM pessoa", function(e){
    if(e){
      connection.query(createSQL,function(err){
        if(err) throw err;
        else {
          console.log('Table `pessoa` created with success.');
        }
      });
    } else {
      console.log("Table `pessoa` already exists.");
    }   
  });
  connection.release();
};
pool.getConnection(criarTabela);
//Conexão express com o formulario
//Express configuration with formulary
var express = require('express');
var app = express();
var arquivo;
var bodyParser = require('body-parser');
//Configure access to folders
app.use('/node_modules',express.static('node_modules'));
app.use('/js',express.static('js'));
app.use('/css',express.static('css'));
app.use('/templates',express.static('templates'));
app.use(bodyParser.json());
//Retorna esse arquivo a requisicao da pagina
//Returning html at requests
app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/cadastro.html', function (req, res) {
  res.sendFile( __dirname + "/" + "cadastro.html");
});
//Recebe os dados via get
//Receive data by get request
app.post('/process_post', function (req, res) {
  arquivo = {
    nome:req.body.full_name,
    cpf:req.body.cpf,
    rg:req.body.rg,
    email:req.body.email_addr,
    telefone:req.body.telefone,
    acao: req.body.acao
  };
//INSERIR
 if(arquivo.acao == 1){
    pool.getConnection(function(err, connection){
      connection.query(insertSQL,[arquivo.nome, arquivo.cpf, arquivo.rg, arquivo.email, arquivo.telefone], function(err){ 
        if (err) res.send('erro');
        else res.sendStatus(200);
      });
    connection.release();
    });
//BUSCAR
  }else if(arquivo.acao == 2){
    pool.getConnection(function(err, connection){
      connection.query(readSQL, [arquivo.nome], function(err, rows){
        if (err) res.send('erro');
        else {
          var respostaJSON = JSON.stringify(rows , ":");
          res.json(respostaJSON); 
        }
      });
    connection.release();
    });
//ATUALIZAR
  }else if(arquivo.acao == 3){
    pool.getConnection(function(err, connection){
      connection.query(updateSQL,[arquivo.nome,arquivo.rg,arquivo.email,arquivo.telefone,arquivo.cpf], function(err){
        if (err) res.send('erro');
        else res.sendStatus(200)
      });
    connection.release();
    });
//APAGAR    
  }else if(arquivo.acao == 4){
    pool.getConnection(function(err, connection){
      connection.query(deleteSQL,[arquivo.cpf], function(err){
        if (err) res.send('erro');
        else res.send('certo');
      });
    connection.release();
    });
//OPCAO NAO EXISTENTE    
  }else{
    res.send('opcao nao existente');
  }
});
//Configurando o servidor
//Configuring the server
var serverPort = 80;
var server = app.listen(serverPort, function () {
  console.log("Server running at port " + serverPort);
});