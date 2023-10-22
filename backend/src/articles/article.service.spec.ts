import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getModelToken } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
    let controller: ArticleController
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArticleController],
            providers: [ArticleService,
                {
                    provide: getModelToken('article'),
                    useValue: {
                        findById: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get<ArticleController>(ArticleController);
    })
    describe('GetByID', () => {
        it("Goal: See if function returns entry with ID of 651fd55d6017d54a330cc61e", () => {
            const test = controller.getByID('651fd55d6017d54a330cc61e');
            expect(controller.getByID('651fd55d6017d54a330cc61e')).toStrictEqual(test);
        });
    });
});
