import { EntityManager } from "@mikro-orm/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "~database/entities/user/entity";

@Injectable()
export class UserService {
    constructor(private readonly em: EntityManager) {}

    async list() {
        const users = await this.em.find(
            UserEntity,
            {},
            { orderBy: { name: "ASC" } },
        );

        return users.map((user) => ({
            id: user.id,
            name: user.name,
        }));
    }

    async requireById(id: number) {
        const user = await this.em.findOne(UserEntity, { id });
        if (!user) {
            throw new NotFoundException("That person does not exist");
        }
        return user;
    }
}
