import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleService } from 'articles/article.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService], 
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('AppController', () => {
    it("Goal: see if root return a result", () => {
      expect(appController.getHello()).toBe(
        "NestJS Backend is Running Successfully...",
      );
    });
  });
});
