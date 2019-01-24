// fetch("http://localhost:8088/foods")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(
//             food=>{
//                 const foodAsHTML=foodfactory(food)
//                 addFoodToDom(foodAsHTML)
//             }
//         )
//         }
//     })

    const listEl = document.querySelector(".foodlist")
    const foodFactory = food =>{
        return`
        <article class="foodCard">
            <h1 class= "textStyle" >${food.name}</h1>
            <section>
                ${food.ethnicity}
            </section
            <section>
                ${food.category}
            </section>
            <section>
                ${food.ingredients}
            </section>
            <section>
                ${food.fat}
            </section>
        </article>
        `
    }

    const addFoodToDom = foodHTML => listEl.innerHTML += foodHTML

fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            foodFactory(food) // Should have a `barcode` property
            

            //Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${parseInt(food.barcode)}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients
                    .map (i=> {
                        return `<li>${i.text}</li>`
                    })
                    .join("")
                    // food.country =product.info.product.;
                    // food.calories. =;
                    food.fat = productInfo.product.nutriments.fat;
                    // food.sugar = 
                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                   //Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })