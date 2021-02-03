const axios = require('axios');


function search (req, res) {
    const busqueda = JSON.stringify(req.query.q)

    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}` )
    .then(function (response) {
        let categoriesArr = []
        const itemsResponse = response.data.results.map((item)=>{
            categoriesArr.push(item.category_id)
            const price = Math.floor(item.price)
            const decimals = item.price % 1

            return {
                id: item.id,
                title: item.title,
                price: {
                        currency: item.currency_id,
                        amount: new Intl.NumberFormat('es-ES').format(price),
                        decimals: decimals.toFixed(2)
                    },
                picture: item.thumbnail,
                address: item.address.state_name,
                free_shipping: item.shipping.free_shipping,
                category: item.category_id
            }
        })
        const idCategorieRepited = categoriesArr.reduce((acum, el, i, ar) => {
            const count=ar.filter(e => e==el).length;
            return count > acum[1] ? el : acum;

        }, ["", 0]
        )
        const searchResponse = {
            author: {
                name: 'Jefry',
                lastname: 'Guevara'
            },
            categories: idCategorieRepited,
            items: itemsResponse,
        }
        res.send(searchResponse)
        // res.send(response.data)

        })
        .catch(function (error) {
            console.log(error);
        })
  }



async function  detail (req, res)  {
    const id = req.params.id

    axios.get(`https://api.mercadolibre.com/items/${id}` )
    .then(function (response) {
            const price = Math.floor(response.data.price)
            const decimals = response.data.price % 1
            const item = {
                author: {
                    name: 'Jefry',
                    lastname: 'Guevara'
                },
                item: {
                    id: response.data.id,
                    title: response.data.title,
                    price: {
                        currency: response.data.currency_id,
                        amount: new Intl.NumberFormat('es-CO').format(price),
                        decimals: decimals.toFixed(2)
                    },
                    picture: response.data.thumbnail,
                    condition: response.data.condition,
                    free_shipping: response.data.shipping.free_shipping,
                    sold_quantity: response.data.sold_quantity,
                    category: response.data.category_id

                }
            }

            res.send(item)
        // res.send(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  function description (req, res) {
    const id = req.params.id

    axios.get(`https://api.mercadolibre.com/items/${id}/description` )
    .then(function (response) {
        res.send(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  function category (req, res) {
      const idBreadcrumbs = req.params.id

      axios.get(`https://api.mercadolibre.com/categories/${idBreadcrumbs}`)
        .then(function (response){
            const categories = {
                name: response.data.name,
                parents: response.data.path_from_root,
                children: response.data.children_categories
            }

            res.send(categories)
        })
        .catch(function (error){
            console.log(error);
        })
  }


  module.exports = {
      search,
      detail,
      description,
      category
  }