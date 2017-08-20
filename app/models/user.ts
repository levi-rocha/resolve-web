import {Permission} from './permission';

export class User {
    constructor(
        public id?: number,
        public username?: string,
        public password?: string,
        public email?: string,
        public permission?: Permission){}
}