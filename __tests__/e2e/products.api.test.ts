import request from "supertest";
import {app, HTTP_STATUSES} from "../../src";

describe('/products', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })
    it('should return 200 empty array', async () => {
        await request(app)
            .get('/products')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 for not existing products ', async () => {
        await request(app)
            .get('/products/777')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })
})