export const fakeJsonData = {
  link: "https://www.blablacar.co.uk/search?departure_city=Paris&fc=48.864716%2C2.349014&arrival_city=London&tc=51.509865%2C-0.118092&db=2020-01-10&hb=09",
  search_info: {
    count: 416,
    full_trip_count: 123,
  },
  trips: [
    {
      link: "https://www.blablacar.co.uk/trip?source=CARPOOLING&id=1234-paris-london",
      waypoints: [
        {
          place: {
            city: "Paris",
            address: "6 rue Menars, 75002 Paris",
            latitude: 48.864716,
            longitude: 2.349014,
            country_code: "FR",
          },
          date_time: "2020-01-10T10:00:00+01:00",
        },
        {
          place: {
            city: "London",
            address: "Charing Cross, London WC2N 5DU",
            latitude: 51.509865,
            longitude: -0.118092,
            country_code: "FR",
          },
          date_time: "2020-01-10T14:00:00+01:00",
        },
      ],
      price: {
        amount: "25.00",
        currency: "EUR",
      },
      vehicle: {
        make: "Volvo",
        model: "v40",
      },
      distance_in_meters: 12345,
      duration_in_seconds: 12345,
    },
    {
      link: "https://www.blablacar.co.uk/trip?source=CARPOOLING&id=1234-paris-london",
      waypoints: [
        {
          place: {
            city: "Paris",
            address: "6 rue Menars, 75002 Paris",
            latitude: 48.864716,
            longitude: 2.349014,
            country_code: "FR",
          },
          date_time: "2020-01-10T12:00:00+01:00",
        },
        {
          place: {
            city: "Nantes",
            address: "Charing Cross, Nantes WC2N 5DU",
            latitude: 51.509865,
            longitude: -0.118092,
            country_code: "FR",
          },
          date_time: "2020-01-11T03:10:00+01:00",
        },
        {
          place: {
            city: "London",
            address: "Charing Cross, London WC2N 5DU",
            latitude: 51.509865,
            longitude: -0.118092,
            country_code: "GB",
          },
          date_time: "2020-01-11T14:00:00+01:00",
        },
      ],
      price: {
        amount: "5.00",
        currency: "EUR",
      },
      vehicle: {
        make: "Volvo",
        model: "v40",
      },
      distance_in_meters: 12345,
      duration_in_seconds: 123456,
    },
  ],
  next_cursor: "cGFnZT0xOA%3D%3D",
};
