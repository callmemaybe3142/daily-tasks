// types/user.ts
export interface UserProfile {
    name: string;
    department: string;
    subDepartment: string;
  }
  
  export interface UserFormData extends UserProfile {
    password: string;
  }