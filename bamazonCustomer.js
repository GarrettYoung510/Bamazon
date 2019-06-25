var mysql = require("mysql");
// require mysql

var inquirer = require("inquirer");
// require inquirer

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",

    // Your database
    database: "bamazon_db"
});


// first displays all of the items available for sale
// include ids, names, and prices of products
connection.connect(function(err) {
    // function that allows us to call another function when we connect to our database or does something the moment our database is connected
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    // after connection
});

function afterConnection() {

    connection.query("SELECT * FROM products", function(err, res) {
        // selecting all from products and then a callback function after the query is run
        // response is the actual response you get back! res
        if (err) throw err;
        // if any err then we throw it so the user can see it
        // if (err) throw err;
        console.log(res);
        userPrompt();
        // connection.end();
    });
}

const userPrompt = function() {
    // app should then prompt users with two messages
    inquirer.prompt([{
            // first should ask ID of the product
            type: "input",
            message: "Enter id of product you would like: ",
            name: "itemID"

        },
        {
            // second is how many units they would like to buy
            type: "input",
            message: "How many would you like?",
            name: "itemNum"
        }
    ]).then(function(user) {
        var itemID = JSON.stringify(user.itemID);
        // console.log(10 - itemID);

        console.log(`Item ID: ${user.itemID}`);

        var quantityOrdered = JSON.stringify(user.itemNum);
        // console.log(itemNum);

        console.log(`Quantity: ${user.itemNum}`);

        // after user has placed an order
        quantityCheck();

        function quantityCheck() {

            console.log("Checking Inventory: ");
            var query = connection.query(`SELECT stock FROM products WHERE id Like '${user.itemID}'`, function(err, res) {
                if (err) throw err;
                console.log(res[0]);
                // var stock = res[0].stock;
                // pull the stock
                console.log(`Current Stock: ${res[0].stock}`);
                // check quantity if meets customer's request
                if (res[0].stock < user.itemNum) {
                    // if not, app should log a phrase insufficient quantity!
                    console.log("Insufficient Quantity!");
                    // prevent order from going through
                    connection.end();
                } else {
                    // update SQL database remaining quantity if enough quantity
                    console.log("Your order is going through!");
                    // updateProduct();
                    console.log(`USER ITEM ID: ${user.itemID}`);
                    console.log(`Quantity Left: ${res[0].stock - user.itemNum}`);
                    var quantityLeft = res[0].stock - user.itemNum;
                    var query = connection.query(`UPDATE products SET stock = ${quantityLeft} WHERE id = ${user.itemID}`,
                        //  [{
                        //         stock: quantityLeft
                        //             // change stock to variable
                        //     },
                        //     {
                        //         id: user.itemID
                        //     }
                        // ], 
                        function(err, res) {
                            if (err) throw err;
                            console.log(`Remaining Quantity after order: ${quantityLeft}`);
                            showTotal()
                        })

                    function showTotal() {
                        // then show the customer their total
                        console.log(`Your Total is ($): `);
                        var query = connection.query(`SELECT price FROM products WHERE id Like '${user.itemNum}'`, function(err, res) {
                            if (err) throw err;
                            // console.log(res[0].price);
                            console.log(`${res[0].price * user.itemNum}`);
                            connection.end();
                        })
                    }
                }

            });
        }



    });
}