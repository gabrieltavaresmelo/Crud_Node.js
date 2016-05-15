(function () {
  var app = angular.module('requestModule', []);
  app.controller('inserirCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.Cliente = {};
    //Function of insert data
    $scope.inserir = function () {
        var urlRequest = window.location.origin + '/process_post';
        var params = {
          method: 'POST',
          url: urlRequest,
          data: {
            full_name: $scope.Cliente.nome,
            cpf: $scope.Cliente.cpf,
            rg: $scope.Cliente.rg,
            email_addr: $scope.Cliente.email,
            telefone: $scope.Cliente.telefone,
            acao: 1
          }
        };
        var successCallback = function (response) {
          if (response.data === 'OK') {
            $('#modal-inserir').modal('show');
          }
        };
        //Cliente model is 'nulled'
        $scope.Cliente = {};
        return $http(params).then(successCallback, null);
      }
      //This code prevent default pattern from forms
    var formInserir = document.getElementById("form-inserir");
    formInserir.onsubmit = function (ev) {
      ev.preventDefault();
      $scope.inserir();
    };
  }]);
  app.controller('atualizarCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.Cliente = {};
    //Function of update data
    $scope.atualizar = function () {
        var urlRequest = window.location.origin + '/process_post';
        var params = {
          method: 'POST',
          url: urlRequest,
          data: {
            full_name: $scope.Cliente.nome,
            cpf: $scope.Cliente.cpf,
            rg: $scope.Cliente.rg,
            email_addr: $scope.Cliente.email,
            telefone: $scope.Cliente.telefone,
            acao: 3
          }
        };
        var successCallback = function (response) {
          if (response.data === 'OK') {
            $('#modal-atualizar').modal({
              show: true
            });
          }
        };
        $scope.Cliente = {};
        return $http(params).then(successCallback, null);
      }
      //This code prevent default pattern from forms
    var formAtualizar = document.getElementById("form-atualizar");
    formAtualizar.onsubmit = function (ev) {
      ev.preventDefault();
      $scope.atualizar();
    };
  }]);
  app.controller('deletarCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.cpf = null;
    //Function to delete data
    $scope.deletar = function () {
        var urlRequest = window.location.origin + '/process_post';
        var params = {
          method: 'POST',
          url: urlRequest,
          data: {
            cpf: $scope.cpf,
            acao: 4
          }
        };
        var successCallback = function (response) {
          if (response.data === 'certo') {
            $('#modal-deletar').modal({
              show: true
            });
          }
          console.log(response);
        };
        $scope.cpf = null;
        return $http(params).then(successCallback, null);
      }
      //This code prevent default pattern from forms
    var formDeletar = document.getElementById("form-deletar");
    formDeletar.onsubmit = function (ev) {
      ev.preventDefault();
      $scope.deletar();
    };
  }]);
  app.controller('listarCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.Cliente = {};
    $scope.procurarDados = function (nome) {
      var urlRequest = window.location.origin + '/process_post';
      var params = {
        method: 'POST',
        url: urlRequest,
        data: {
          full_name: $scope.Cliente.nome,
          acao: 2
        }
      };
      $http(params).then(function (response) {
        if (response.data === "[]") {
          $('#modal-listar').modal({
            show: true
          });
          $scope.Cliente = {};
        } else {
          var requestJSON = JSON.parse(response.data);
          $scope.Cliente = requestJSON[0];
        }
      });
    };
  }]);
})();