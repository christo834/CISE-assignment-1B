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

  describe('root', () => {
    it('should return "Hello World!, Hello CISE Team!, Let\'s build SPEED App! "', () => {
      expect(appController.getHello()).toBe(
        "Hello World!, Hello CISE Team!, Let's build SPEED App! ",
      );
    });
  });
});
