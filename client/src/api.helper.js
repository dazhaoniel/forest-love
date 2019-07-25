import axios from "axios";

export async function getAirports(name) {
    const response = await axios
    .get('/api/v1/location?name=' + name)
    .then(resp => {
        const names = resp.data;
        return names;
    })
    .catch(err => console.log(err));
    return response;
}

export async function getResults(origin, destination, isRoundTrip) {
    // hard coding for now, multiple ones to come later
    const response = await axios
    .post('/api/v1/distances', {
        'data': [{'start': origin, 'end': destination}]
    })
    .then(resp => {
        const flightData = resp.data;
        let { total_carbon, total_distance } = flightData; 
        if (isRoundTrip) {
            total_carbon = total_carbon * 2;
            total_distance = total_distance * 2;
        }
        // because we use camelCase on the front end ;)
        return {totalCarbon: total_carbon, totalDistance: total_distance};
    })
    .catch(err => console.log(err));
    return response;
}