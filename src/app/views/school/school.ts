import { IBase } from "../shared/IBase";

export interface ISchool  extends IBase  {
	Id :number;
Name :string;
ShortName :string;
Code :string;
RegisteredDate :Date;
EmailID :string;
Mobile :string;
Board :string;
City :string;
Address :string;
State :string;
PIN :string;
IsDeleted :boolean;
ContactPerson :string;
ContactNo :string;
}