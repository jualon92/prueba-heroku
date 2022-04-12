


const mercadopago = new MercadoPago("APP_USR-5e526118-d978-4a6c-9f5c-0bfb7e9e828b", {
    locale: "es-AR"
});


const getPrecio = async () => {
    await fetch("/items/").then(r => r.json()).then(r => r[0].precio)
}



document.getElementById("checkout-btn").addEventListener("click", function () {
    let listaItems = [{
        quantity: 1,
        description: "pruebas",
        price: parseInt(33),
        auto_return: "approved"
    },
    {
        quantity: 1,
        description: "asdsda",
        price: parseInt(23),
        auto_return: "approved"
    } 
    ]
  

    /*
    const orderData = {
        quantity: 3,
        description: "prueba",
        price: 33
    };*/



    fetch("/create_preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listaItems),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            createCheckoutButton(preference.id);

            $(".shopping-cart").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500);
        })
        .catch(function () {
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
        });
    ;

    // Create preference when click on checkout button
    function createCheckoutButton(preferenceId) {
        // Initialize the checkout
        mercadopago.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#button-checkout', // Class name where the payment button will be displayed
                label: 'Pay', // Change the payment button text (optional)
            }
        });
    }


})