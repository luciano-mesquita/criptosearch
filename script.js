document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input != '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.coingecko.com/api/v3/coins/${encodeURI(input)}`;

        let results = await fetch(url);
        let json = await results.json();

        if (json) {
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
                change_1y: json.market_data.price_change_percentage_1y,
                max_supply: json.market_data.max_supply,
                circulating_supply: json.market_data.circulating_supply,
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
    document.querySelector('.name').innerHTML = `-- ${json.name.toUpperCase()} --`;
    document.querySelector('.result img').setAttribute('src', `${json.icon}`);
    document.querySelector('.symbol').innerHTML = `${json.symbol.toUpperCase()}`;
    document.querySelector('.price').innerHTML = `${json.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
    document.querySelector('.marketCap').innerHTML = `${json.market_cap.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
    document.querySelector('.rank').innerHTML = `${json.rank}`;
    document.querySelector('.change1d').innerHTML = `${addIndicator(json.change_1d)}`;
    document.querySelector('.change7d').innerHTML = `${addIndicator(json.change_7d)}`;
    document.querySelector('.change1y').innerHTML = `${addIndicator(json.change_1y)}`;
    document.querySelector('.maxSupply').innerHTML = `${showSupply(json.max_supply)}`;
    document.querySelector('.circulatingSupply').innerHTML = `${json.circulating_supply}`;
    document.querySelector('.description').innerHTML = `${linkRemove(json.description)}`;

    setColor(json.change_1d, '#val1');
    setColor(json.change_7d, '#val2');
    setColor(json.change_1y, '#val3');
}

function linkRemove(data) {
    let replace = data.replace(/<a\b[^>]*>/gm, '').replace(/<\/a>/gm, '');
    console.log(replace);
    return replace;
}

function setColor(data, id) {
    if (data > 0) {
        document.querySelector(id).style.color = 'chartreuse';
    } else {
        document.querySelector(id).style.color = 'red';
    }
}

function clearInfo() {
    showWarning('');
    document.querySelector('.result').style = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function showSupply(data) {
    if (data == null) {
        data = 'Emissão Ilimitada';
        return data;
    } else {
        return data;
    }
}

function addIndicator(data) {
    if (data > 0) {
        return `+${data.toFixed(2)}%`;
    } else {
        return `${data.toFixed(2)}%`;
    }
}
