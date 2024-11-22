export interface User{
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage:string | null;
    createdAt: Date;
    locationRef?: string;
}
export interface ExtraData{
    firstName?: string;
    lastName?: string;
    profileImage?:string;

}