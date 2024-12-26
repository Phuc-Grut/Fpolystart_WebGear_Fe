export interface SubCategory {
    subCategoryID: number;
    subCategoryName: string;
    categoryID: number;
  }
  
  export interface Category {
    categoryID: number;
    categoryName: string;
    subCategories: SubCategory[];
  }
  