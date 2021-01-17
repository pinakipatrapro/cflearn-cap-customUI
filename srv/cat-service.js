module.exports = (srv) => {

    const { Books } = cds.entities

    //Define implementations
    srv.after('READ', 'Books', (each) => _addDiscount(each));
    srv.before('CREATE', 'Orders', __reduceStock);


    //Add some discount to overstocked books
    function _addDiscount(each) {
        if (each.stock > 20) {
            each.title += each.title + `(   11 % discount , Only valid for first ${each.stock - 20} copies)`
        }
        return each;
    }


    async function __reduceStock(req) {
        const cdstnx = cds.transaction(req);
        const { Items: orderItems } = req.data;

      
        return cdstnx.run( 
            orderItems.map(item => {
                return UPDATE(Books)
                    .set('stock -=', item.amount)
                    .where('stock >=', item.amount)
                    .and('ID = ', item.book_ID)
            })
        ).then(all => all.forEach((affectedRows, i) => {
            if (affectedRows === 0) {
                return req.error(409, 'Shit!OOS')
            }
        }))
    }



   
}