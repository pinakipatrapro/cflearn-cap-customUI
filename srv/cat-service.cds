using {bookshop_w1u4.db.bookshop as my} from '../db/schema';

@path:'/browse'
// @impl : './my-service.js'

service CatalogService  {

    @readonly entity Books as select from my.Books{
        *
    } excluding{createdBy,createdAt} ;
    
    @requires_: 'authentecated-user'
    @insertonly entity Orders as projection on my.Orders;

}
