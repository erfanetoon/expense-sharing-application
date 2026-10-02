import { defineEntity, p } from "@mikro-orm/core";

export const userSchema = defineEntity({
    name: "User",
    tableName: "users",
    properties: {
        id: p.integer().primary().autoincrement(),
        name: p.string().length(120),
        createdAt: p.datetime().fieldName("created_at"),
    },
});

export class UserEntity extends userSchema.class {}

userSchema.setClass(UserEntity);
