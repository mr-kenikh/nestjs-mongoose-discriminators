import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { MsgModule, msgModuleFeatures } from './msg.module';
import { MsgService } from './msg.service';
import { ResourceModule } from './resource.module';
import { ResourceService } from './resource.service';
import { Resource, ResourceSchema } from './schemas/resource.schema';

import { tests } from './test.utils';

describe('ResourceService', () => {
  let connection: Connection;
  let msgService: MsgService;
  let resourceService: ResourceService;

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
    msgService = module.get<MsgService>(MsgService);
    resourceService = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(msgService).toBeDefined();
    expect(resourceService).toBeDefined();
  });

  it('should be casted', () => {
    const resource: Resource = {
      index: '0',
      // first cast embedded msgs using msg service
      msgs: msgService
        .createMany(tests.map((x) => x.raw))
        .map((x) => x.toJSON()),
    };

    const expected: Resource = {
      index: 0, // cast expected
      msgs: tests.map((x) => x.expected),
    };

    const received = resourceService.create(resource);
    expect(received.toJSON()).toEqual(expected);
  });

  // it('should match discriminator mapping', async () => {
  //   const resource: Resource = {
  //     index: '0',
  //     msgs: tests.map((x) => x.raw),
  //   };

  //   const received = resourceService.create(resource);
  //   const dms = tests.map(
  //     (_, i) =>
  //       (received.schema.path(`msgs.${i}`).schema as any).discriminatorMapping,
  //   );

  //   expect(dms).toEqual(tests.map((x) => x.discriminatorMapping(true)));
  // });

  afterEach(async () => {
    await connection.close();
  });
});
