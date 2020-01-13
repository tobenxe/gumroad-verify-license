const axios = require('axios');

module.exports = async (req, res) =>{
    try{
        if(!req.body.license) return res.status(400).send('Yikes'); //checks that license prop exists, you should probably change 'Yikes'
        //send verification request to gumroad
        const response  = await axios({
                                method: 'post',
                                url: 'https://api.gumroad.com/v2/licenses/verify',
                                data: {
                                product_permalink: '<your product permalink here>',
                                license_key: req.body.license //can change this according to what the payload will look like
                                }
                            });
        //send response back to wherever
        return (response.data.success && !response.data.purchase.refunded && !response.data.purchase.chargebacked) ?  
            res.status(200).json({isValid: true}) : 
            res.status(200).json({isValid: false})
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMessage: 'Something went wrong'});
    }
}