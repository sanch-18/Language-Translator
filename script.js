const url = 'https://text-translator2.p.rapidapi.com/translate';

let source_countryCode = 'en';
let target_countryCode = 'fr';

const inputLanguageSelect = document.getElementById('inputLanguage');
const outputLanguageSelect = document.getElementById('languageDropdown');
const btn = document.querySelector("#translateButton");
const inputText = document.querySelector('#inputText');
const outputText = document.querySelector('#outputText');
const warning = document.querySelector(".warning");

const updateFlag1 = (element) => {
    let currName = element.value;
    source_countryCode = countryList[`${currName}`];
    console.log(source_countryCode);
};
  
const updateFlag2 = (element) => {
    let currName = element.value;
    target_countryCode = countryList[`${currName}`];
    console.log(target_countryCode);
};


for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(currCode == "English")
        newOption.selected = "selected";
    inputLanguageSelect.append(newOption);
}

inputLanguageSelect.addEventListener("change", (evt) => {
    updateFlag1(evt.target);
})

for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(currCode == "French")
        newOption.selected = "selected";
    outputLanguageSelect.append(newOption);
}

outputLanguageSelect.addEventListener("change", (evt) => {
    updateFlag2(evt.target);
})

btn.addEventListener('click', (evt) => {

    warning.innerText = "";

    if(source_countryCode === target_countryCode){
        warning.innerText = "Please select different source and target languages.";
        return;
    }

    const data = new FormData();
    data.append('source_language', source_countryCode);
    data.append('target_language', target_countryCode);
    let txt = inputText.value;
    data.append('text', txt);

    if(txt === ""){
        warning.innerText = "Please enter some text.";
        return;
    }

    console.log(`${source_countryCode} ${target_countryCode} ${txt}`);

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'cb8ad2f9a0msh77030cddceabfebp1bdcf9jsn719022e2b4ae',
            'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
        },
        body: data
    };

    func(options);
})



async function func(options) {
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        let res = JSON.parse(result);
        console.log(result);
        console.log(res.data.translatedText);
        outputText.value = res.data.translatedText;
    } catch (error) {
        console.error(error);
        outputText.value = "ERROR";
    }
    
}
