import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ValidationPipe } from '../../shared/validation.pipe';

describe('UserController', () => {

    let controller: UserController;
    let service = {
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
        })
            .overrideProvider(UserService)
            .useValue(service)
            .compile()

        controller = moduleRef.get<UserController>(UserController)

    })

    it("controller should be defined", () => {
        expect(controller).toBeDefined()
    })

    describe("register", () => {
        it("should register new user", async () => {
            const dto = {
                username: "name",
                password: "morpex"
            }
            await expect(controller.register(dto)).resolves.toEqual({
                ...dto,
                id: expect.any(Number)
            })

            expect(service.register).toHaveBeenCalledWith(dto)
            expect(service.register).toHaveBeenCalledTimes(1)
        })
    })

    describe("login", () => {
        it("should login user", async () => {
            const dto = {
                username: "name",
                password: "morpex"
            }

            await expect(controller.login(dto)).resolves.toEqual(dto)

            expect(service.login).toHaveBeenCalledWith(dto)
            expect(service.login).toHaveBeenCalledTimes(1)
        })
    })

    describe("changeUsername", () => {
        it("should update username", async () => {
            const dto = {
                username: "name"
            },
            id = "someid"

            await expect(controller.changeUsername(id, dto)).resolves.toEqual({
                ...dto,
                id
            })

            expect(service.updateUsername).toHaveBeenCalledWith(id, dto.username)
            expect(service.updateUsername).toHaveBeenCalledTimes(1)
        })
    })
})