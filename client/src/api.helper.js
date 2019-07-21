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