import { IBase } from "../shared/IBase";


export interface IPlan extends IBase{
	Name :string;
StudentLimit :number;
StaffLimit :number;
Amount :number;
IsDeleted : boolean;
PlanType :string;
PaymentFrequency :string;
FrequencyAmount :number;
Description :string;

	 
}