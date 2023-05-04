import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name)
    private readonly model: Model<ResourceDocument>,
  ) {}

  create(resource: Resource) {
    return new this.model(resource);
  }
}
