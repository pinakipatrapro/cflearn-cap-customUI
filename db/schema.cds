namespace bookshop_w1u4.db.bookshop;

using {
    Currency,
    managed,
    cuid
} from '@sap/cds/common';

using {capdemo_w2u2.products.Products} from '../../products/index';

entity Books : Products {
    author : Association to Authors;
}

entity Magazines : Products {
    Publisher : String;
}

entity Authors : managed {
    key ID    : Integer;
        name  : String(1111);
        books : Association to Books
                    on books.author = $self;
}

entity Orders : managed, cuid {
    OrderNo : String;
    Items   : Composition of many OrderItems
                  on Items.parent = $self;
    total :Decimal(9,2) @readonly  ;
    currency :Currency;
}

entity OrderItems : cuid {
    parent   : Association to Orders;
    book     : Association to Books;
    amount : Integer;
    netAmount : Decimal(9,2);
}

entity Movies : additionalInfo {
    key ID   : Integer;
        name : String;
}

aspect additionalInfo {
    genre    : String(100);
    language : String(200);
}
