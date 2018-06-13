import { NewsApiSkill } from "./teremuapi-skills.model";

export class BusinessApiSkills {
    id: number;
    name: string;
    logo:string;
    latitude: number;
    longitude: number;
    skills: NewsApiSkill[]
    check: number;
}