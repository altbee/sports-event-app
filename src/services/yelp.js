import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer vI8ru2mZ-DcZjY3GhYFZj1KpZPpWAF5vE9m-nIFCKmbKTJ04-shFMDJlSsAUDtb5BjJ6VlyqVqMVS0C_R3eBGAtjmdnwMA_defZvtkpvKxtmyDqiEjUd53CXaJFqXHYx`,
  },
})

export const getCoffeeShops = (userLocation, filter = {}) =>
  api
    .get('/businesses/search', {
      params: {
        limit: 10,
        categories: 'coffee,coffeeroasteries,coffeeshops',
        ...userLocation,
        ...filter,
      },
    })
    .then((res) =>
      res.data.businesses.map((business) => ({
        name: business.name,
        coords: business.coordinates,
      }))
    )
    .catch((error) => console.error(error))

export default {
  getCoffeeShops,
}
