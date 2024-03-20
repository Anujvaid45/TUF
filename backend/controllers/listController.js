const connection = require("../config/db")

//GET all entries list
const getAllListController = async(req,res) =>{
    try {

        const data = await connection.query('SELECT * from data_table ORDER BY time_of_submission')
        res.status(200).send({
            success:true,
            message:'All Entries List',
            totalEntries:data[0].length,
            data:data[0]
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting list of all entries',
            error
        })
    }
}

const createEntryController = async(req,res)=>{
    try {
        const {username,language,input,source_code} = req.body;
        //validation
        switch(true){
            case !username:
                return res.status(500).send({error:'username is required'})
            case !language:
                return res.status(500).send({error:'Language is required'})
            case !source_code:
                return res.status(500).send({error:'Source Code is required'})           
        }

        const data = connection.query('INSERT INTO data_table (username,language,input,source_code) VALUES (?,?,?,?)',[username,language,input,source_code])
        //await data.save()
        res.status(200).send({
            success:true,
            message:'New entry added',
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating new data',
            error
        })   
    }
}

module.exports = {getAllListController,createEntryController}