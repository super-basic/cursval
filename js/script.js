const DROP_LISTS = document.querySelectorAll("select"),
FROM_CURRENCY = document.querySelector("#from select"),
TO_CURRENCY = document.querySelector("#to select"),
GET_BUTTON = document.querySelector("button"),
FAS_BUTTON = document.querySelector(".fas");


for(let i=0; i<DROP_LISTS.length; i++) {
    for(let currency_code in country_list) {
        let selected = (i===0 && currency_code === "USD" || i===1 && currency_code === "RUB") ? "selected" : "";

        const OPTION_TAG = `<option ${selected}>${currency_code}</option>`;
        DROP_LISTS[i].insertAdjacentHTML("beforeend", OPTION_TAG);
    }

    DROP_LISTS[i].addEventListener("change", event => {
        const IMG_TAG = event.target.parentElement.querySelector("img");
        IMG_TAG.src = `https://flagcdn.com/48x36/${country_list[event.target.value].toLowerCase()}.png`;
    })
}

function getExchangeRate() {
    const AMOUNT = document.querySelector("input");
    const EXCHANGE_RATE_TEXT = document.querySelector("#exchange-rate");
    if(AMOUNT.value === 0 || AMOUNT.value === "") {
        AMOUNT.value = "1";
    }

    EXCHANGE_RATE_TEXT.innerText = "Ищу результат...";

     const URL = `https://v6.exchangerate-api.com/v6/4cbc99dc87f00c7184730b1c/latest/${FROM_CURRENCY.value}`

    fetch(URL)
        .then(response => response.json())
        .then(result => {
            const EXCHANGE_RATE = result.conversion_rates[TO_CURRENCY.value];
            const TOTAL_EX_RATE = (AMOUNT.value * EXCHANGE_RATE).toFixed(2);
            EXCHANGE_RATE_TEXT.innerText = `${AMOUNT.value} ${FROM_CURRENCY.value} = ${TOTAL_EX_RATE} ${TO_CURRENCY.value}`;
        })
        .catch(() => {
            EXCHANGE_RATE_TEXT.innerText = 'Что-то пошло не так...';
        })
}

window.addEventListener("load", () => {
    getExchangeRate();
});

GET_BUTTON.addEventListener("click", (event) => {
    event.preventDefault();
    getExchangeRate();
})

FAS_BUTTON.addEventListener("click", (eventFas) => {
    //console.log(FROM_CURRENCY.value);
    //console.log(TO_CURRENCY.value);

    let cur_from = FROM_CURRENCY.value
    let cur_to = TO_CURRENCY.value
    console.log(cur_from)
    console.log(cur_to)
    // const OPTION_TAG = `<option >${cur_to}</option>`;
    //
    // DROP_LISTS[0].insertAdjacentHTML("beforeend", OPTION_TAG);
    document.querySelector("#from select").value = cur_to;
    document.querySelector("#to select").value = cur_from;

    let from_country = country_list[cur_from].toLowerCase();
    let to_country = country_list[cur_to].toLowerCase();
    console.log(from_country)
    console.log(to_country)
    document.getElementById('img_from').src = `https://flagcdn.com/48x36/${to_country}.png`;
    document.getElementById('img_to').src = `https://flagcdn.com/48x36/${from_country}.png`;
    //console.log(country_list['RUB'])


})