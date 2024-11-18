import { Address } from "./address";
import { Department } from "./department";

export class Employee {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public address?: Address,
        public department?: Department
    ) { }
}
