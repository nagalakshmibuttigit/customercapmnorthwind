
const cds = require('@sap/cds');
module.exports = cds.service.impl(async function(){
    const {Customers, Orders} = this.entities;
    const service = await cds.connect.to('northwind');

    this.on("getCustomerData", async(req)=>{
        let data = await service.send({
            method: 'GET',
            path: 'v4/northwind/northwind.svc/Customers'
        });
        return data;
    });

    this.on("getOrderData", async(req)=>{
        let data = await service.send({
            method : 'GET',
            path:'v4/northwind/northwind.svc/Orders'
        });
        return data;
    });

    this.on('getCustomerOrderData', async(req)=>{
        const db = await cds.connect.to('db');
        const tx = db.tx();
        try{
            const [customerData, orderData] = await Promise.all([
                service.send({
                      method: 'GET',
                      path: 'v4/northwind/northwind.svc/Customers'
                }),
                service.send({
                      method : 'GET',
                        path:'v4/northwind/northwind.svc/Orders'
                })

            ]);

            // checking data is coming or not
            console.log(`fetched customer recordes : ${customerData.length}`);
            console.log(`fetched Order records : ${orderData.length}`);

            // now to store the data
            await Promise.all([
                tx.run(INSERT.into('Customers').entries(customerData)),
                tx.run(INSERT.into('Orders').entries(orderData))
            ]);

            await tx.commit();

            return {
                Status : 'Success',
                message : 'Data fetched and store successfully'
            }


        }catch(error){
            if(tx){
                await tx.rollback()
            }
            return {
                Status: 'Error',
                message: error.message
            }
        }
    })
})