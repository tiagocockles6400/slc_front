/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getNomeLista = async (id_lista) => {

  let url = 'http://127.0.0.1:5000/lista?id=' + id_lista;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("nomeLista").innerText = data.nome;
      return data.nome
    });
    
}

const getItensLista = async (item) => {
  let url = 'http://127.0.0.1:5000/produtos?id_lista=' + item;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => insertItem(item.nome, item.quantidade, item.valor))
    })
    .catch((error) => {
      alert("Erro na lista selecionada");
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
const urlParams = new URLSearchParams(window.location.search).get('id_lista');
document.getElementById("id_lista").value = urlParams;
console.log(urlParams);
getNomeLista(urlParams);
getItensLista(urlParams);

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postItem = async (id_lista, nome, quantidade, preco) => {
  const formData = new FormData();
  formData.append('id_lista', id_lista);
  formData.append('nome', nome);
  formData.append('quantidade', quantidade);
  formData.append('valor', preco);
console.log(id_lista);
  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
      insertItem(data.nome, data.quantidade, data.valor)
      alert("Produto adicionado.")
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(nomeItem);
        alert("Produto removido");
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  let url = 'http://127.0.0.1:5000/produto?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newProduto = (item) => {
  const inputProduct = document.getElementById("nomeProduto").value;
  const inputQuantity = document.getElementById("qtdProduto").value;
  const inputPrice = document.getElementById("valorProduto").value;
  const id_lista = document.getElementById("id_lista").value;

  if (inputProduct === '') {
    alert("Escreva o nome do produto");
  } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
    alert("Quantidade e valor precisam ser números.");
  } else {
    
    postItem(id_lista, inputProduct, inputQuantity, inputPrice)
    
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertItem = (nameProduct, quantity, price) => {
  var item = [nameProduct, quantity, price]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("nomeProduto").value = "";
  document.getElementById("qtdProduto").value = "";
  document.getElementById("valorProduto").value = "";

  removeElement()
}
const navegaIndex = () => {
  window.location = "index.html"; 
}



