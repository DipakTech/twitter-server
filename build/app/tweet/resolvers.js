"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const queries = {
    getAllTweets: () => db_1.prismaClient.tweet.findMany({
        orderBy: {
            createdAT: 'desc',
        },
    }),
};
const mutations = {
    createTweet: (parent, { payload }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.user)
            throw new Error('not authenticated');
        const tweet = yield db_1.prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: {
                    connect: {
                        id: ctx.user.id,
                    },
                },
            },
        });
        return tweet;
    }),
};
const extraResolver = {
    Tweet: {
        author: (parent) => db_1.prismaClient.user.findUnique({
            where: {
                id: parent.authorId,
            },
        }),
    },
};
exports.resolvers = { mutations, extraResolver, queries };
