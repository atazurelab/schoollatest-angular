import { IBase } from "../shared/IBase";
export interface IRequest extends IBase {
		Id:number;
		Subject :string;
		Category :string;
		Description :string;
		StudentId :number;
		SchoolId :number; 
		Remarks :string;
		RemarkDateTime :Date;
		AttachmentName :string;
		Status :string; 
		StudentName?:string;
	 
}
