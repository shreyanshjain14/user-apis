import { ExecutionContext, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AuthApisModule } from "../src/module";
import { JwtGuard, RolesGuard } from "@libs/users/guards";
import { ExceptionFilter, RequestGuard, TimeoutInterceptor } from "@libs/core";
import { UserModel } from "@libs/users";
import { HttpAdapterHost } from "@nestjs/core";

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AuthApisModule],
  })
    .overrideGuard(JwtGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        request.user = { id: 1 } as UserModel; // Mock the user object
        return true;
      },
    }) // Mock JwtGuard
    .overrideGuard(RolesGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        request.user = { id: 1 } as UserModel; // Mock the user object
        return true;
      },
    }) // Mock RolesGuard
    .compile();

  const app = moduleFixture.createNestApplication();
  // interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());
  // guards
  app.useGlobalGuards(new RequestGuard());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));
  await app.init();
  return app;
}

export function testRequest(app: INestApplication) {
  return request(app.getHttpServer());
}


describe("UserController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return health check status", async () => {
    const res = await testRequest(app).get("/users/health");
    expect(res.status).toBe(200);
    expect(res["_body"]["data"]).toEqual({
      message: "auth apis service is working fine",
    });
  });
});
