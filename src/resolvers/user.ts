import { Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";
import argon2 from "argon2";

import { User } from "../entities/User";
import { Mycontext } from "src/types";
import { RequiredEntityData } from "@mikro-orm/core";

@InputType()
class UserInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Mutation(() => User) 
    async register(
        @Arg('options') options: UserInput,
        @Ctx() {em}: Mycontext
    ) {
        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username,
            password: hashedPassword
        } as RequiredEntityData<User>);
        em.persistAndFlush(user);
        return user;
    }
}