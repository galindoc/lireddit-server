import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User],
    host: 'localhost',
    port: 5433,
    dbName: 'lirredit',
    password: 'ILikeChocolate%',
    allowGlobalContext: true,
    type: 'postgresql',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
