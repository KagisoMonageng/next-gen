// Blog interface
export interface Blog {
    id:number;
    title:string;
    content:any;
    blog_date:Date;
    feature_image:string;
    published:boolean;
    likes:number;
    category:string;
    tags:string; 
    author_name:string;
    author_surname:string;
    author_image:string;
    author_id:number;
}