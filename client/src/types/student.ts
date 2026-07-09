export interface Student {
  id: number;
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  applicationDate: string;
}