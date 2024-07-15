

const fs = require("fs");

const {Products} = require("../Models.js");



const Dashboard_Product_Post = async(req, res)=>{



    if (true) {
        let x = req.body.Options;
        let xc;
        if (x.length < 2) {
            xc = [];
        }else{
            xc = x.split(", ");
            
        }
        
        let ds = new Object(req.files);
        let IMM = [];
        for (let add = 0; add < 5; add++) {
            let a = `File_${add+1}`;
            if (ds[a]) {
                
                // console.log();
                IMM.push("/product/img/" +ds[a][0].filename);

            }
            
        }

        function IDDDD() {
            
            const character = "1234567890";
            let name = "";
            let varrr = 1;
            let getRandom = 0;
            while (varrr <= 19){
                getRandom = Math.floor(Math.random() * (character.length-1));
                name = name + character[getRandom];
                varrr = varrr + 1;
            };
            return name;
        }

        let dss = await Products.find({});
        let ID;
        while(true){

            let d = IDDDD();
            let po = 0;
            for (let i = 0; i < dss.length; i++) {
                const element = dss[i];
                if (element._id == d) {
                    po = 1;                 
                    break;
                }
            }
            if(po == 1){
                // ID = d;
            }else{
                ID = d;
                break;
            }
        }
        function Product_URL_Generator() {
            const character = "qwertyuioplkjhgfdsazxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
            let name = "";
            let varrr = 0;
            let getRandom = 0;
            while (varrr <= 18){
                getRandom = Math.floor(Math.random() * 61);
                name = name + character[getRandom];
                varrr = varrr + 1;
            };
            return name;
        
        };
        let URL;
        while(true){

            let d = Product_URL_Generator();
            let po = 0;
            for (let i = 0; i < dss.length; i++) {
                const element = dss[i];
                if (element.URL == d) {
                    po = 1;                 
                    break;
                }
            }
            if(po == 1){
                // ID = d;
            }else{
                URL = d;
                break;
            }
        }
        
        const htmlText = req.body.Description.replace(/\r\n|\r|\n/g, '<br>');
        let a = {
            _id: String(ID),
            Category:req.body.Category,
            URL:URL,
            Title:req.body.Title,
            MRP:req.body.MRP,
            Selling_Price:req.body.Selling_Price,
            Option:xc,
            Description:htmlText,
            Images:IMM,
            Orders_IDs:[],
            Instock:req.body.Quantity,
        };
        // console.log(a)
        let s = new Products(a);
        await s.save().then(()=>{
            res.status(200).redirect('/dashboard_product/add');
        })

    }else{
        let ds = new Object(req.files);

        for (let index = 0; index < 5; index++) {
            let dsda = `File_${index + 1}`;
            if (ds[dsda]) {
                let data = ds[dsda][0].filename;
                let filePath = path.join(__dirname, '../../Frontend/Product_Img', data);
                
                fs.unlinkSync(filePath, (err) => {
                    if (err) {
                        console.log(`Error deleting file ${data}: ${err.message}`);
                    } else {
                        console.log(`File ${data} deleted successfully`);
                    }
                });
            }
        }

        
        res.clearCookie("Add");
        res.status(200).json({ Message: 'Unable to add' });
    }



}
module.exports = Dashboard_Product_Post;