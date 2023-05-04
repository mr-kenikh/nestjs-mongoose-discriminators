import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { MsgModule, msgModuleFeatures } from './msg.module';
import { MsgService } from './msg.service';
import { tests } from './test.utils';

describe('MsgService', () => {
  let connection: Connection;
  let service: MsgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        MsgModule.forFeature(msgModuleFeatures),
      ],
    }).compile();

    connection = await module.get(getConnectionToken());
    service = module.get<MsgService>(MsgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each(tests)(
    `should be $expected.type`,
    ({ raw, expected, discriminatorMapping }) => {
      const received = service.create(raw);
      expect(received).toBeDefined();
      expect(received.toJSON()).toEqual(expected);

      const { discriminatorMapping: dm } = received.schema as any;
      expect(dm).toEqual(discriminatorMapping(/*isRoot*/ false));
    },
  );

  it('should be [alert, info, warn]', () => {
    const received = service.createMany(tests.map((x) => x.raw));
    expect(received).toBeDefined();

    const json = received.map((msg) => msg.toJSON());
    expect(json).toEqual(tests.map((x) => x.expected));

    const discriminatorsMapping = received.map(
      (x) => (x.schema as any).discriminatorMapping,
    );
    expect(discriminatorsMapping).toEqual(
      tests.map((x) => x.discriminatorMapping(/*isRoot*/ false)),
    );
  });

  afterEach(async () => {
    await connection.close();
  });
});
