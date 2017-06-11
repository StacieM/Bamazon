// require necessary packages
var inquirer = require('inquirer');
var mysql = require("mysql");
var consoleTable = require('console.table');

// connection to database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
        if (err) throw err;
});

// display table in console
var displayTable = function () {
    connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    console.table(result);
    shop();
    });
}

// application prompting user to enter items to purchase
var shop = function () {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter the ID of the item you wish to purchase",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            else {
                return false;
            }
        }
    },
        {
            name: "quantity",
            type: "input",
            message: "Enter the quantity you wish to purchase.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                }
            }
//   check inventory based on quantity selected and display result
  }]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE ?", { id: answer.id }, function(err, res) {
        if (parseInt(answer.quantity) > res[0].stock_quantity) {
            console.log("Sorry, we do not have enough in stock to complete your order.  Please modify your order.");
            shop();
        } else {
            console.log("Thank for your order of:\n" + answer.quantity + " x " + res[0].product_name);
            console.log("Please take a look through our other items:\n");
            var qtyUpdate = res[0].stock_quantity - parseInt(answer.quantity);
            var total = res[0].price * answer.quantity;
            console.log('qtyUpdate: ' + qtyUpdate);
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: qtyUpdate
            }, {
                id: answer.id
            }], function(err, res) {}); 
            console.log('You have purchased ' + answer.quantity + ' ' + res[0].product_name + ' for $' + total);
			console.log('There are ' + qtyUpdate + ' ' + res[0].product_name + ' remaining.');

            // display table with updated numbers
            displayTable();
        }
    });
  });
};
displayTable();
