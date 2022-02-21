import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidationPipe } from '../shared/validation.pipe';

describe('UserController', () => {

    let controller: UserController;
    const mockService = {
        register: jest
            .fn()
            .mockImplementation((dto) => {
                return Promise.resolve({
                    id: Date.now(),
                    ...dto
                })
            }
        ),
        login: jest
            .fn()
            .mockImplementation((dto) => Promise.resolve(dto)),
        updateUsername: jest
            .fn()
            .mockImplementation((id, username) => {
                return Promise.resolve({
                    id,
                    username
                })
            }
        )
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).overrideProvider(UserService).useValue(mockService).compile()

        controller = moduleRef.get<UserController>(UserController)

    })

    it("controller should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("should register new user", async () => {

        const dto = {
            username: "name",
            password: "morpex"
        }
        await expect(controller.register(dto)).resolves.toEqual({
            ...dto,
            id: expect.any(Number)
        })

        expect(mockService.register).toHaveBeenCalledWith(dto)
        expect(mockService.register).toHaveBeenCalledTimes(1)

    })

    it("should login user", async () => {

        const dto = {
            username: "name",
            password: "morpex"
        }

        await expect(controller.login(dto)).resolves.toEqual(dto)

        expect(mockService.login).toHaveBeenCalledWith(dto)
        expect(mockService.login).toHaveBeenCalledTimes(1)

    })

    it("should update username", async () => {

        const dto = {
            username: "name"
        },
        id = "someid"

        await expect(controller.changeUsername(id, dto)).resolves.toEqual({
            ...dto,
            id
        })

        expect(mockService.updateUsername).toHaveBeenCalledWith(id, dto.username)
        expect(mockService.updateUsername).toHaveBeenCalledTimes(1)

    })

})