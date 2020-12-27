## Buscador de Github's

<a href="https://staelsabrina.github.io/githubfinder/index.html">Acesse a page aqui</a>

Consumo da API do GitHub, com filtro por data de criação do perfil, por localidade (apenas estados brasileiros ou por Brasil) e por usuários com Bio cadastrada.

Há duas maneiras de realizar buscas na API, uma pelo nome de usuário, onde aparece somente o perfil daquele username específico. Nesta parte estão todas as informações de nome, data de criação, localidade, etc. Quando se realiza a busca por nome, a api retorna os usuários cujo nome ou username contém a palavra buscada. Nesta busca, retornam apenas as informações gerais dos repositórios, seguidores e alguns links, inclusive para o perfil do usuário (onde estão as outras informações).
<br>Desta forma, para conseguir a informação completa, este sistema faz duas requisições por usuário, uma busca pelo nome e uma requisição para os dados de cada usuário retornado.
A API tem a opção de ordenar os retornos pela data de "joined" no github, porém esta informação parece estar desencontrada na API, ou retorna de alguma maneira estranha, pois em alguns casos, os usuários não ficam organizadas de acordo com o parâmetro solicitado. Não encontrei na documentação nenhuma explicação.

Na localidade, optei por filtrar pelo nome completo do estado ou por usuários com localidade no Brasil. Como esta informação é escrita manualmente pelo usuário, .

Caso não seja informada nenhuma opção, serão exibidos as primeiras 8 ocorrências que tenham no nome ou no username a palavra buscada.
Para aumentar esse número, abra o arquivo main.js, localize a variável query na função getUsers, e altere a parte onde diz "per_page=8", aumentando para a quantidade desejado (o limite da API é 100 por página). 
Cada usuário retornado representa uma requisição, o limite sem autenticação é 60 requisições por hora.

Os campos que estão em branco, retornam como NULL da API, então no lugar adicionei o texto 'Não cadastrado'.

Por motivos de segurança, optei por não colocar a chave secreta para autenticação da requisição. Desta forma, podem ser realizadas apenas 60 requisições por hora.

### Para conseguir fazer mais de 60 requisições por hora:

* Faça o download dos arquivos.
* Acesse: https://github.com/settings/developers
* Na aba "Personal access tokens" clique em generate new token.
* Selecione os escopos:  public_repo / read:user / user:email. Esses escopos darão acesso de leitura aos perfis público de usuários.
* Depois de criado, copie o token, abra o arquivo main.js, localize a constante access_token no topo e cole o número entre as aspas simples. Deve ficar mais ou menos assim:

const access_token = 'etcetcetc123123blábláblá100';

Pronto, você já pode fazer até 5000 requisições por hora.


<p align="center">
  <img src="img/Octocat.png">
</p>
