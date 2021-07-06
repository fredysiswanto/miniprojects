let resultData = {};

// mengambil data dari api
async function getData() {
  const proxy = 'https://serene-grand-teton-69312.herokuapp.com/';
  // const url = 'https://api.kawalcorona.com/indonesia/provinsi/';
  const url = 'https://type.fit/api/quotes';
  const res = await fetch(proxy + url);
  const data = await res.json();
  return data;
}

// mengambil data yang diperlukan unt ui
async function data(quote) {
  await getData().then((res) => {
    const random = Math.floor(Math.random() * res.length);
    if (res[random].author) {
      resultData = res[random];
    } else {
      resultData = res[random];
      resultData.author = 'Unknow';
    }
  });
  // resultData.text.length > 60 ? quote.classList.add('long-text') : '';
}

// tampilkan data
function ui() {
  const quote = document.getElementById('quote-text');
  const author = document.getElementById('author');
  const btnQuote = document.getElementById('new-quote');
  const btnTwitter = document.getElementById('twitter');

  btnQuote.addEventListener('click', async (e) => {
    e.preventDefault();
    await data(quote);
    quote.innerText = resultData.text;
    author.innerText = resultData.author;
    console.log(resultData);
  });
}

ui();
