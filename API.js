let cities = [
    {
        arabicName: "جازان",
        name: "Jāzān"
    },
    {
        arabicName: "مكة المكرمة",
        name: "Makkah al Mukarramah	"
    },
    {
        arabicName: "الرياض",
        name: "Ar Riyāḑ"
    }
]
for (let city of cities) {
    const content = `
        <option>${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML += content
}

document.getElementById("cities-select").addEventListener("change", function () {
    document.getElementById("citiy-name").innerHTML = this.value
    let citiyName = ""
    for (let city of cities) {
        if (city.arabicName == this.value) {
            citiyName = city.name
        }
    }
    getPrayersTimingsofcitics(citiyName)

})

function getPrayersTimingsofcitics(citiyName) {
    //Query Paramaters
    let params = {
        country: "SA",
        city: citiyName //"Jāzān"
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {
            const timings = response.data.data.timings
            fillTimeForPrayer("fajr-time", timings.Fajr)
            fillTimeForPrayer("sunrise-time", timings.Sunrise)
            fillTimeForPrayer("dhurh-time", timings.Dhuhr)
            fillTimeForPrayer("Asr-time", timings.Asr)
            fillTimeForPrayer("Sunset-time", timings.Sunset)
            fillTimeForPrayer("Isha-time", timings.Isha)

            const readableDate = response.data.data.date.readable
            const weekDay = response.data.data.date.hijri.weekday.ar
            const date = weekDay + " " + readableDate
            document.getElementById("date").innerHTML = date
        })
        .catch(function (error) {
            console.log(error);
        })
}

getPrayersTimingsofcitics("Jāzān")

function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time
}
