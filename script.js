document.querySelector('.busca').addEventListener('submit', async(event)=> {
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
                description: json.description.pt,
                market_cap: json.market_data.market_cap.brl,
                rank: json.coingecko_rank,
                change_1d: json.market_data.price_change_percentage_24h,
                change_7d: json.market_data.price_change_percentage_7d,
            })
        } else {
            clearInfo();
            showWarning('Não localizamos esse projeto.');
        }
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.result').style.display = 'block';
    document.querySelector('.name').innerHTML = `Projeto: ${json.name}`;
    document.querySelector('.result img').setAttribute('src', `${json.icon}`);
    document.querySelector('.symbol').innerHTML = `${json.symbol.toUpperCase()}`;
    document.querySelector('.price').innerHTML = `${json.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    document.querySelector('.marketCap').innerHTML = `${json.market_cap.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    document.querySelector('.rank').innerHTML = `${json.rank}`;
    document.querySelector('.change1d').innerHTML = `${json.change_1d.toFixed(2)}%`;
    document.querySelector('.change7d').innerHTML = `${json.change_7d.toFixed(2)}%`;
    document.querySelector('.description').innerHTML = `${json.description}`;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.result').style = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}