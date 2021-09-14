document.querySelector('.busca').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value;
    
    if(input != '') {
        clearInfo();
        showWarning('Carregando...');
        
        let url = `https://api.coingecko.com/api/v3/coins/${encodeURI(input)}`;
        
        let results = await fetch(url);
        let json = await results.json();

        if(url) {
            showInfo({
                name: json.name,
                symbol: json.symbol,
                icon: json.image.small,
                price: json.market_data.current_price.brl,
            })
        } else {
            clearInfo();
            showWarning('Não localizamos esse projeto.');
        }
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name.toUpperCase()}`;
    document.querySelector('.sigla').innerHTML = `${json.symbol.toUpperCase()}`;
    document.querySelector('.coluna1 img').setAttribute('src', `${json.icon}`);
    document.querySelector('.price').innerHTML = `${json.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}
