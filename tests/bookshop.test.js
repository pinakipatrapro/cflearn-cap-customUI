const cds = require('@sap/cds');

describe('Bookshop : Odata Protocol level testing', () => {
    const app = require('express')();
    const request = require('supertest')(app);

    beforeAll(async () => {
        await cds.deploy(__dirname + '/../srv/cat-service').to('sqlite:memory');
        await cds.serve('CatalogService').from(__dirname + '/../srv/cat-service').in(app);
    })

    it('Serve Metadata', async () => {
        const response = await request
            .get('/browse/$metadata')
            .expect('Content-Type', /^application\/xml/)
            .expect(200)

        const expectedVersion = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">'
        const expectedBooksEntitySet = '<EntitySet Name="Books" EntityType="CatalogService.Books">'
        expect(response.text.includes(expectedVersion)).toBeTruthy()
        expect(response.text.includes(expectedBooksEntitySet)).toBeTruthy()
    })

})

describe('Service Level Testing',  () => {
    let srv, Books;
    beforeAll(async() => {
        srv = await cds.serve('CatalogService').from(__dirname + '/../srv/cat-service');
        Books = srv.entities.Books
        expect(Books).toBeDefined()
    })
    it('GETs all Books',async()=>{
        const books = await srv.read(Books,b =>{b.title})
        expect(books).toMatchObject([
            {"title":"Basic Elements"},
            {"title":"Basic Elements II"},
            {"title":"Basic Elements III"}
        ])
    })

})
