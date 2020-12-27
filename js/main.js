const url = 'https://api.github.com/search/users';
const access_token = ''; //constate vazia propositalmente, para que quem fizer o download insira sua própria chave.
const screen = document.getElementById('profile');


//função assíncrona que vai buscar o perfil pessoal pela URL de cada membro
async function getName(url){
    const profileName = await fetch(`${url}?access_token=${access_token}`);
    const profile = profileName.json();

    return(profile);
}


//função assíncrona que retorna os usuários de acordo com a localidade e a data de criação do perfil. Retorna os 8 primeiros casos. Para aumentar, mude na query a quantidade per_page. Lembre que, sem autenticação, poderá fazer no máximo 60 requisições.
async function getUser(user, local, order){
    const query = `${url}?q=${user}+location%3A"${local}"&sort=joined&order=${order}&page=1&per_page=8&type=Users?access_token=${access_token}`;

    const profileResponse = await fetch(query);
    const profile = profileResponse.json();

    return(profile);
}


//função que exibe na tela as informações retornadas.
function showResult(obj){   

    screen.innerHTML += `
            <div class="profile">                
                <a href="${obj.url}" target="_blank"><img class="foto" src="${obj.avatar}"></a>
                <p><b>Nome:</b> ${obj.name}</p>
                <p><b>Username:</b> ${obj.username}</p>
                <p><b>Criado em:</b> ${obj.create}</p>
                <p><b>Local:</b> ${obj.location}</p>
                <p><b>Bio:</b> ${obj.bio}</p>                    
            </div>  
        `;
}


//função que, com base na requisição por nome, busca por cada perfil as informações pessoais.
function indexProfile(user, comBio){
    screen.innerHTML = '';
    

    for(i=0; i<user.items.length; i++){
        const url = (user.items[i].url).toLowerCase();
        const username = user.items[i].login;
        
        getName(url).then(res => {
            let colection = {};
            
            if(res.message) {
                screen.innerHTML = `<h2>Ocorreu um erro!<br>Foi excedido o limite de requisições.<br>Por favor, tente novamente mais tarde.</h2>`
                console.log(res)
            }     
            
            colection.url = res.html_url;
            colection.name = res.name;
            colection.username = res.login;
            colection.location = res.location;
            colection.avatar = res.avatar_url;
            colection.bio = res.bio;
            colection.create = res.created_at.split('T')[0];

            if(comBio == true && colection.bio == null) {return};
            if(colection.bio == null) {colection.bio = `<i>Não cadastrado</i>`}
            if(colection.name == null) {colection.name = `<i>Não cadastrado</i>`}
            if(colection.location == null) {colection.location = `<i>Não cadastrado</i>`}
            
            showResult(colection);
        })
    }
}


//função que pega do HTML os parâmetros e dispara a busca. Faz uma primeira verificação de o nome informado tem pelo menos 3 letras e, caso não tenha nenhum resultado, informa na tela.
function buscar(){
    const local = document.querySelector('#local').value;
    const search = document.getElementById('searchName').value;
    const bio = document.getElementById('bio').checked;
    const order = document.getElementById('order').value;

    //se a quantidade de letras da palavra buscada for menor que 3, vai ter uma mensagem de erro.
    if(search.length > 2) { 
        getUser(search, local, order).then(res => {

            if(res.total_count == 0) {
                screen.innerHTML = `
                <h2>Sua busca não retornou nenhum resultado.</h2>`
            } else {
                indexProfile(res, bio);
            }  
        })

    } else {
        screen.innerHTML = `
                <h2>Por favor, insira um nome com mais de 3 caracteres.</h2>`
    }

}
