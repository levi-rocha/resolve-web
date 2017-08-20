import {User} from "./user";
import {Post} from "./post";

export class Solution {
    constructor(
        public id?: number,
        public content?: string,
        public author?: User,
        public authorUsername?: string,
        public post?: Post
    ){}
}