# EcommerceApplication
<h1>Ecommerce Application using Node.js, Angular4 ,Express and Mongodb<h1>

<h3>Dependencies<h3>

1> Node js installed above version 8.0
2> Mongodb installed version >= 3.4


Steps to run Project

Step1 : Download the project
Step2 : In the Zip folder this is one dump Folder
Step3 :  First you have to restore dump 
         After installation of mongodb and if you are running in your Windows( Go to this path
         C:\Program Files\MongoDB\Server\3.4\bin and than paste  dump folder there .
         Open Command prompt and run the command
         mongorestore dump
         
Step4 : Once dump restored use and GUI tool for database (like robo 3T , mongo booster)
Step5 : After inporting database you will see there is one db named "shopping" with two collections (products and carts)
Step6 : Go inside your  Ecommerce_application folder and there use cmd 
        Run command : npm install
        This command will install all the related dependencies (npm modules)
Step7 : Now run your server.js file
       Command : node server.js
          
Step8 : Go to google crome browser and run 
        localhost:8080/#/viewProducts
        
 Step9 : You application is now running      
 
 <h3>Screenshots<h3>
 ![image1](https://user-images.githubusercontent.com/29482235/39705032-d038d75e-522a-11e8-9de7-f9e77f14d0a8.JPG)
 
![image2](https://user-images.githubusercontent.com/29482235/39705123-1bde6462-522b-11e8-8a32-003aaaed57ba.JPG)

![image3](https://user-images.githubusercontent.com/29482235/39705139-2403b476-522b-11e8-8000-40910bb704e0.JPG)

![image4](https://user-images.githubusercontent.com/29482235/39705143-26c7f9d8-522b-11e8-8821-772f8c085e83.JPG)

 
 <h3>How the Project works<h3>
 <h4>STEP1<h4>
 
On load of of a project , 2 api gets triggered (one for getting all the products from the database and the other will check all the products added in the cart .      
Cart will always be based on user, So i added one default user with userId=1 (hardcoded value)
No pageination added for time being.
User id is hardcoded.

<h5>First Api to get list of products form the database</h5>
     <h6>Request Url : localhost:8080/getItems</h6>
     <h6>Request Type :GET </h6>
     <h6>Api Response:</h6> {
      "data": [
        {
            "_id": "4",
            "ProductId": "1004",
            "ProductName": "Trimmer",
            "CategoryId": 1,
            "QuantityPerUnit": 5,
            "UnitPrice": 1500,
            "UnitInStock": 10,
            "brand": "Philips",
            "imagesUrl": "4.jpg"
        },
        {
            "_id": "1",
            "ProductId": "31001",
            "ProductName": "Mixer",
            "CategoryId": 1,
            "QuantityPerUnit": 5,
            "UnitPrice": 1000,
            "UnitInStock": 10,
            "brand": "Maharaja",
            "imagesUrl": "1.jpg"
        },
        {
            "_id": "2",
            "ProductId": "1002",
            "ProductName": "Surf Excel",
            "CategoryId": 2,
            "QuantityPerUnit": 5,
            "UnitPrice": 100,
            "UnitInStock": 10,
            "brand": "Surf Excel",
            "imagesUrl": "2.jpg"
        },
        {
            "_id": "3",
            "ProductId": "3001",
            "ProductName": "Bean Bag",
            "CategoryId": 3,
            "QuantityPerUnit": 5,
            "UnitPrice": 2000,
            "UnitInStock": 10,
            "brand": "Bean Bag",
            "imagesUrl": "3.jpg"
        },
        {
            "_id": "5",
            "ProductId": "1005",
            "ProductName": "Iron",
            "CategoryId": 1,
            "QuantityPerUnit": 5,
            "UnitPrice": 800,
            "UnitInStock": 10,
            "brand": "Philips",
            "imagesUrl": "5.jpg"
        },
        {
            "_id": "6",
            "ProductId": "1006",
            "ProductName": "Wallet",
            "CategoryId": 2,
            "QuantityPerUnit": 5,
            "UnitPrice": 700,
            "UnitInStock": 10,
            "brand": "Zara",
            "imagesUrl": "6.jpg"
        }
    ],
    "message": "success",
    "res": true
}

<h5> Other Api to get the card Details based on user(user Id is hardcoded ie userId =1) <h5>
     <h6>Request Url : localhost:8080/getCartDetails/1</h6>
     <h6>Request Type : GET </h6>
     <h6>Api Response : </h6>{
      "data": {
        "TotalCartValue": [],
        "items": [
            {
                "_id": "5af0219939717c27e869b857",
                "quantity": 1,
                "pid": {
                    "_id": "6",
                    "ProductId": "1006",
                    "ProductName": "Wallet",
                    "CategoryId": 2,
                    "QuantityPerUnit": 5,
                    "UnitPrice": 700,
                    "UnitInStock": 10,
                    "brand": "Zara",
                    "imagesUrl": "6.jpg"
                }
            }
        ],
        "_id": "5af0219939717c27e869b856",
        "userId": 1,
        "__v": 0
    },
    "message": "Success",
    "res": true
} 

<h4>STEP2</h4>
   Now you can select any product and click on<b>Add To Cart </b>button , Item is added in cart if that particular product is not there    in the cart and in case if it is already there than it will show a message that item already there in Cart else it will add Item to       cart

<h5>  Api to add Items to cart </h5>
      <h6>Request Url : localhost:8080/addItemsToCart/</h6>
      <h6>Request Type : PUT </h6>
      <h6>Body Params : {
        userId:1
        itemId:6
        quantity:1
       }
      </h6>
      <h6>Api Response : </h6>{
       {
       "data": {
            "TotalCartValue": [],
            "_id": "5af0219939717c27e869b856",
            "userId": 1,
            "items": [
                {
                    "_id": "5af0219939717c27e869b857",
                    "quantity": 1,
                    "pid": "6"
                }
            ],
            "__v": 0
        },
       "message": "Product Added to cart",
       "res": true
     }
 
    <h5>STEP3 <h5>
    You can click on Shopping Cart button and check what all products are there in your Cart
    You can remove any product form your cart 
    
    <h5> Api to remove item from cart</h5>
    <h6>Request Url :localhost:8080/removeItemFromCart </h6>
    <h6>Request Type : PUT </h6>
    <h6> Body Params : {userId:2
                       itemId:5
                       }
                     </h6>
      <h6>Api Response</h6> :   
            {
          "TotalCartValue": [],
          "items": [
              {
                  "_id": "5aeff16874217c40180ccece",
                  "quantity": 1,
                  "pid": "4"
              }
          ],
          "_id": "5aefe9befc36671e7894756a",
          "userId": 2,
          "__v": 0
        }


