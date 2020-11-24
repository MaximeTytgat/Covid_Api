const httpHeaders = { 'Accept' : 'application/json', 'Accept-Charset' : 'utf-8', 'X-My-Custom-Header' : 'Zeke are cool' };
const myHeaders = new Headers(httpHeaders);
const monInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

const req = new Request("https://cors-anywhere.herokuapp.com/https://coronavirusapi-france.now.sh/FranceLiveGlobalData", monInit)


const h1 = document.querySelector('h1')
const selection = ["hospitalises", "reanimations", "newHospitalisations", "newReanimations", "deaths", "Healed"];
for (const key in selection) {
    selection.splice(key, 1, document.querySelector(`#${selection[key]} span`))
}

fetch(req).then(async res => {
    const json = await res.json()

    const data = json.FranceGlobalLiveData[0]
    const separate_data = [data.hospitalises, data.reanimation, data.nouvellesHospitalisations, data.nouvellesReanimations, data.deces, data.gueris]


    for (const key in selection) {
        selection[key].innerHTML = separate_data[key];
    }
});


document.querySelectorAll("path").forEach(element => {
    element.addEventListener('click', element => {
        const req = new Request(`https://cors-anywhere.herokuapp.com/https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=${element.target.id}`, monInit)
        fetch(req).then(async res => {
            const json = await res.json()

            const data = json.LiveDataByDepartement[0]
            const separate_data = [data.hospitalises, data.reanimation, data.nouvellesHospitalisations, data.nouvellesReanimations, data.deces, data.gueris]
            h1.innerHTML = `Covid 19 <br> ${element.target.id}`

            for (const key in selection) {
                selection[key].innerHTML = separate_data[key];
            }
        })
    })
})


