import { IBase } from "../shared/IBase";
export interface IPeriod   extends IBase {
	Id: number;
	Name: string;
	ClassCode: string;
	SchoolCode : string;
	Description: string;


}