const httpHeaders = { 'Accept' : 'application/json', 'Accept-Charset' : 'utf-8', 'X-My-Custom-Header' : 'Zeke are cool' };
const myHeaders = new Headers(httpHeaders);
const monInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

const req = new Request("https://cors-anywhere.herokuapp.com/https://coronavirusapi-france.now.sh/FranceLiveGlobalData", monInit)

fetch(req).then(async res => {
    console.log(res)
    const json = await res.json()
    console.log(json.FranceGlobalLiveData[0])
    const data = json.FranceGlobalLiveData[0]

    const selection = ["hospitalises", "reanimations", "newHospitalisations", "newReanimations", "deaths", "Healed"]
    const separate_data = [data.hospitalises, data.reanimation, data.nouvellesHospitalisations, data.nouvellesReanimations, data.deces, data.gueris]

    for (const key in selection) {
        selection.splice(key, 1, document.querySelector(`#${selection[key]}`))
    }

    for (const key in selection) {
        selection[key].innerHTML += separate_data[key];
    }
});


document.querySelectorAll("path").forEach(element => {
    element.addEventListener('click', element => {
        console.log(element)
    })
})


