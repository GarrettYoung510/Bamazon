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
        connection.end();
    });
    userPrompt();
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

        console.log(10 - user.itemID);

        var itemNum = JSON.stringify(user.itemNum);
        // console.log(itemNum);

        console.log(user.itemNum);

    })
}

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