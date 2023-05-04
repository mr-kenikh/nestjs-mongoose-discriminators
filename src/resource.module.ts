import { DynamicModule, Module } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Module({})
export class ResourceModule {
  static forFeature(module: DynamicModule): DynamicModule {
    return {
      imports: [module],
      module: ResourceModule,
      controllers: [],
      providers: [ResourceService],
    };
  }
}
