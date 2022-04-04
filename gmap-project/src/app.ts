import axios, { AxiosResponse } from 'axios';

interface Coordinate {
  lat: number;
  lng: number;
}

type GoogleGeocodeResponse = {
  results: { geometry: { location: Coordinate } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

const form = document.querySelector('form')!;
const addressInput = <HTMLInputElement>document.getElementById('address');

const googleApiKey = process.env.GOOGLE_API_KEY;

const searchAdressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAdress = addressInput.value;
  axios
    .get<GoogleGeocodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAdress
      )}&key=${googleApiKey}`
    )
    .then((response: AxiosResponse<any, any>) => {
      if (response.data.status !== 'OK') {
        throw Error('Could not fetch any Location.');
      }
      const coordinate: Coordinate = response.data.results[0].geometry.location;
      console.log(coordinate);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

form.addEventListener('submit', searchAdressHandler);
