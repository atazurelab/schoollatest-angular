import { IBase } from "../shared/IBase";


export interface ISubscription extends IBase{
	PlanId :number;
SchoolId :number;
StartDate :Date;
EndDate :Date;
Status :string;
SchoolCode:string;
Description :string;

	 
}