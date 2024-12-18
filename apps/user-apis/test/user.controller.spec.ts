import { INestApplication } from "@nestjs/common";
import { createTestApp, testRequest } from "./app.e2e-spec";

describe("UserController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return signed URLs for upload", async () => {
    const res = await testRequest(app).post("/users/upload-url").send({
      n: "1",
      path: "documents",
    });
    expect(res.status).toBe(200);
    expect(res["_body"]["data"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: expect.any(String),
          url: expect.any(String),
          signedUrl: expect.any(String),
        }),
      ])
    );
  });

  it("should return all documents", async () => {
    const res = await testRequest(app).get("/users/documents");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      meta: expect.any(Object),
      data: expect.any(Array),
      code: 200,
    });
  });

  /*the id(2) should exist in db before running the test cases, 
  and should we owned by(ownerId) the user we are mocking in app.e2e-spec.ts, i.e.. 1 in our case*/

  it("should return a document by ID", async () => {
    const res = await testRequest(app).get("/users/documents/2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: expect.any(Object),
      code: 200,
    });
  });
});
