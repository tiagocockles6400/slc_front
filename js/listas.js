/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListas = async () => {
  let url = 'http://127.0.0.1:5000/listas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.listas.forEach(item => insertLista(item.id, item.nome, item.tipo, item.qtd_itens, item.valor_total))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getListas()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postLista = async (nomeLista, tipoLista) => {
  const formData = new FormData();
  formData.append('nome', nomeLista);
  formData.append('tipo', tipoLista);
  formData.append('valor_total', 0);
  formData.append('qtd_itens', 0);

  let url = 'http://127.0.0.1:5000/lista';
  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
      insertLista(data.id, data.nome, data.tipo, data.qtd_itens, data.valor_total);
      alert("lista criada com sucesso");
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
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteLista = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/lista?id=' + item;
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
const newLista = () => {
  let nomeLista = document.getElementById("nomeLista").value;
  let tipoLista = document.getElementById("tipoLista").value;

  if (nomeLista === '') {
    alert("Preencha o campo nome da lista");
  }
  else if (tipoLista === '') {
    alert("Preencha o campo tipo da lista");
  }
  else {
    postLista(nomeLista, tipoLista)
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/

const insertLista = (idLista, nomeLista, tipoLista, qtdLista, valorLista) => {
  
  var item = [nomeLista, getNomeLista(tipoLista), qtdLista, valorLista]
  var table = document.getElementById('myLists');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    if(i === 0) {
      cel.innerHTML = '<a href=produto.html?id_lista=' + idLista + '>' + item[i] + '</a>';
    } else {
      cel.textContent = item[i];
    }
    
  }
  insertButton(row.insertCell(-1))

  document.getElementById("nomeLista").value = "";
  document.getElementById("tipoLista").value = "";

  removeElement()
}

const getNomeLista = (idLista) => {
  let retorno;
  if (idLista === 1) 
    retorno = 'Mensal';
  if (idLista === 2) 
    retorno = 'Semanal';
  if (idLista === 3) 
    retorno = 'Outros';

  return retorno;
}

