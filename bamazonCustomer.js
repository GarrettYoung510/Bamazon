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


// app should then prompt users with two messages
// first should ask ID of the product
// second is how many units they would like to buy

// after user has placed and order
// check quantity if meets customer's request
// if not, app should log a phrase insufficient quantity!
// prevent order fro going through

// update SQL database remaining quantity if enough quantity
// use SET to update
function updateProduct() {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                quantity: quantityLeft
                    // change to variable
            },
            {
                product: ""
                    // product selected from prompt above
            }
        ],
        function(err, res) {
            console.log(res.affectedRows + " updated\n")
        }
    )
}
// then show the customer their total