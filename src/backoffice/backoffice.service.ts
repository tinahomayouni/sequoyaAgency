// src/backoffice/backoffice.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/interfaces/user.interface';

@Injectable()
export class BackofficeService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  //notingh yet
}
