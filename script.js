
const countryList = {
    AED: "AE",
    AUD: "AU",
    BGN: "BG",
    BRL: "BR",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    CZK: "CZ",
    DKK: "DK",
    EUR: "EU",
    GBP: "GB",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    ISK: "IS",
    JPY: "JP",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NOK: "NO",
    NZD: "NZ",
    PHP: "PH",
    PLN: "PL",
    RON: "RO",
    SEK: "SE",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    USD: "US",
    ZAR: "ZA"
}


const dropdowns =document.querySelectorAll(".dropdown select");
const btn =document.querySelector("button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change" ,(evet)=>{
        updateFlag(evet.target)
    });
}
let updateFlag= (element) =>{
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let link = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=link;
}
btn.addEventListener("click" ,  (evt) =>{

    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amountVal= amount.value;
    if(amountVal=== "" || amountVal <1){
         amountVal=1;
         amount.value=1;
    }
    let from = fromCur.value;
    let to = toCur.value;
    convert(from ,to,amountVal);

    
})
function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        msg.innerText=`${amount} ${from} = ${convertedAmount} ${to}`;
      });
    }