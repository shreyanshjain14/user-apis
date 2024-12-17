import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AuthApisModule } from '../src/module';
import { JwtGuard, RolesGuard } from '@libs/users/guards';
import { RequestGuard } from '@libs/core';


export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AuthApisModule],
  })
    .overrideGuard(JwtGuard)
    .useValue({ canActivate: jest.fn(() => true) }) // Mock JwtGuard
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: jest.fn(() => true) }) // Mock RolesGuard
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalGuards(new RequestGuard());
  await app.init();
  return app;
}

export function testRequest(app: INestApplication) {
  return request(app.getHttpServer());
}

