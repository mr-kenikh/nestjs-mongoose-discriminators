import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { MsgModule, msgModuleFeatures } from './msg.module';
import { ResourceModule } from './resource.module';
import { ResourceService } from './resource.service';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { tests } from './test.utils';

describe('ResourceService', () => {
  let connection: Connection;
  let service: ResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        ResourceModule.forFeature(
          MongooseModule.forFeature([
            { name: Resource.name, schema: ResourceSchema },
          ]),
        ),
        MsgModule.forFeature(msgModuleFeatures),
      ],
    }).compile();

    connection = await module.get(getConnectionToken());
    service = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be casted', () => {
    const resource: Resource = {
      index: '0',
      msgs: tests.map((x) => x.raw),
    };

    const expected: Resource = {
      index: 0, // cast expected
      msgs: tests.map((x) => x.expected),
    };

    const received = service.create(resource);
    expect(received.toJSON()).toEqual(expected);
  });

  afterEach(async () => {
    await connection.close();
  });
});
