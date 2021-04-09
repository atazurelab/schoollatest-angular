import { IBase } from "../shared/IBase";
 
  export interface IClassDetail extends  IBase {
	Id :number;
	Name :string;
	Code :string;
	SchoolCode :string;
	IsDeleted :boolean;
	Description :string;
	ClassTeacherId :number;  

}
 

 