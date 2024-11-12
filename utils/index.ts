export interface User{
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage:string | null;
    createdAt: Date;
}
export interface ExtraData{
    firstName?: string;
    lastName?: string;
    profileImage?:string;

}