const { v4: uuidv4 } = require('uuid');
const SSLCommerzPayment = require('sslcommerz-lts'); 

const store_id = 'eshik672666a790842'; 
const store_passwd = 'eshik672666a790842@ssl'; 
const is_live = false; 

function paymentController(req, res, next) { 
    const { price, name, phone, email, postcode } = req.body; 

    const transactionID = uuidv4(); 
    const data = {
        total_amount: price,
        currency: 'BDT',
        tran_id: transactionID, 
        success_url: `http://localhost:3000/success/${transactionID}`,
        fail_url: `http://localhost:3000/fail/${transactionID}`,
        cancel_url: `http://localhost:3000/cancel/${transactionID}`,
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Tour & Fun',
        product_profile: 'general',
        cus_name: name,
        cus_email: email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: postcode,
        cus_country: 'Bangladesh',
        cus_phone: phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live); 
    sslcz.init(data)
        .then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL; 
            return res.json({
                GatewayPageURL
            });
        } 
    ); 
} 

module.exports = {
    paymentController
}