import axios, { AxiosResponse } from 'axios';

const googleApiKey = process.env.GOOGLE_API_KEY;

// const googleScript = <HTMLScriptElement>(
//   document.getElementById('googlemap-area')!
// );
// googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;

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

      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 11,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((error) => {
      console.error(error);
    });
};

form.addEventListener('submit', searchAdressHandler);
