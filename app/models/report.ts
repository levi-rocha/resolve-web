import {User} from "./user";
import {Post} from "./post";

export class Report {
    constructor(
        public id?: number,
        public description?: string,
        public author?: User,
        public authorUsername?: string,
        public post?: Post
    ){}
}