# Bamazon
An online storefront / command line app - using MySQL, Inquirer and Node.js.

### Synopsis
An Amazon-like storefront using MySQL, the MySQL Package, and the Inquirer Package.

This CLI application takes an order from a customer and deplete the store's stock accordingly.

Initializing node bamazonCustomer.js in the command line brings up the storefront. It asks the user what item they like to purchase and the quantity:
![Start Shopping Screen Shot](https://github.com/StacieM/Bamazon/blob/master/Images/bamazonStartScreen.png) 

If there are enough in stock Bamazon will adjust the quantities and continue:
![Purchase Screen Shot](https://github.com/StacieM/Bamazon/blob/master/Images/bamazonPurchaseScreen.png)

Current Order:
![Current Order Screen Shot](https://github.com/StacieM/Bamazon/blob/master/Images/bamazonCurrentOrder.png)

If there are not enough items in stock, an error message will be given to the User: 
![Insufficient Quantity](https://github.com/StacieM/Bamazon/blob/master/Images/bamazonInsufficientQuant.png)
