export class User{
    //! represents field is non-null 
    id!: number;
    name!: string;
    mobile!: string;
    email!: string;
    isvaccinated!: boolean;
    vaccinename!: string;
    noofdoses!: number;
    
}
export interface UserPageResponse {
    content: User[];
    totalElements: number;
}
