module.exports = ({ nomeCliente, cpfCliente, desconto, itens, nomeEmpresa }) => {
  const today = new Date().toLocaleString('pt-BR', { hour12: false });
  const divsDeItens = itens.map(item => {
      return `<tr><td>${item.desc}</td> <td>R$ ${item.preco}</td> <td>${item.qtd}</td> <td>R$ ${item.preco * item.qtd}</td></tr>`  
    
  })
  const valorFinal = itens.reduce((acc, el) => el.preco * el.qtd + acc, 0) * (1 - (desconto/100))
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  
      <title>Nota fiscal</title>
      <style>
        .ajustePDF {
        max-width: 800px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica',
        color: #555;
        }
        </style>
    </head>
    <body>
        <div class="ajustePDF">
      <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight bg-primary text-white">
              <h1>${nomeEmpresa}</h1>
              <h4>Endereço:</h4>
              <p>Rua blablabla 99, 304 <br/>
                  Centro, Rio de janeiro</p>
          </div>
          <div class="p-2 flex-fill bd-highlight bg-light">
              <h1>Recibo:</h1>
              <h4>Data de emissão: ${today}</h4>
          </div>
        </div>
  
        <br/>
  
          <table class="table">
              <thead>
                <tr>
                  <th scope="col">Descrição do item</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Qtd</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                    ${divsDeItens}
              </tbody>
            </table>
  
            <br />
  
            <div class="d-flex bd-highlight">
              <div class="p-2 flex-fill bd-highlight bg-light text-primary">
                  <h3>Informações de pagamento</h3>
                  <h5>Nome do cliente: ${nomeCliente}</h5>
                  <h5>CPF do cliente: ${cpfCliente}</h5>
              </div>
              <div class="p-2 flex-fill bd-highlight bg-light">
                  <h3>Sub total:</h1>
                  <h5>Desconto: ${desconto} %</h5>
                  <br/>
                  <h5>Valor final: R$ ${valorFinal}</h5>
              </div>
            </div>
  
              <br/>
            <div class="card text-center">
              <div class="card-header">
                  <br/>
                _____________________________________ <br/>
                Assinatura
              </div>
            </div>
  
        </div>
  
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
      </body>
  </html>
    `;
};