# Example architectures
User registration: 
classes: User, EmailAuth
flow: Anonymous clients can get EmailAuth instance with any email address as the instanceId. EmailAuth class has two methods: sendOtp, verifyOtp. Client calls sendOtp and receives an otp. Client calls verifyOtp with the otp and receives a custom token. In client side, client calls rio.authenticateWithCustomToken(customToken) and receives a rio token. Client can use this token to call User class methods.

E-commerce: 
classes: Cart, Product, Order, Payment
flow: Assuming user is authenticated with the previous scenario, user can create a Cart instance with the instanceId same as the userId. User can get product details from product class. User can add products to cart. When ready to order, they can create an Order instance. (random instanceId as the orderId) When ready to pay, they can call Order.finish, it will create a Payment instance. (Order class instance generates Payment class instance. User doesn't create Payment) Order instanceId and Payment instanceId are the same. User can call Payment.pay method. Payment class instance will call Payment.pay method of the payment gateway. Payment.pay method will call Order.finish method. Order.finish method will call Cart.clear method.

Quick Delivery: 
description: There are physical stores. Each store has some product stock.
classes: Store, StoreLocator, Product, Order, Payment
flow: Only difference here is, each physical store has a unique instance. User sends their location to StoreLocator singleton instance (instanceId: default). StoreLocator has all physical stores in its state. Finds the correct storeId and returns it. Client calls that Store instance to get the current product list with available stock. Rest is almost same with the E-commerce scenario.

A Wallet App:
description: User has a wallet. User can add money to wallet. User can send money to other users.
classes: Wallet, User
flow: User creates a Wallet instance with the instanceId same as the userId. User can call addMoney method which gets the money from credit card and updates its instance state with new balance. User can call sendMoney method. sendMoney can be a WRITE method. It can check if the user has enough balance and update the state. Once the balance is successfuly updated, it will call a QUEUED_WRITE method receiveMoneyFrom method of the other user's Wallet instance. receiveMoneyFrom method will update the state of the other user's Wallet instance. As long as receiveMoneyFrom method is QUEDUED_WRITE, it will always be executed by FIFO.