export interface SubCategory {
    subCategoryID: number; // Tương ứng với SubCategoryDto
    subCategoryName: string;
    categoryID: number;
  }
  
  export interface Category {
    categoryID: number; // Tương ứng với CategoryDto
    categoryName: string;
    subCategories: SubCategory[]; // Mảng các SubCategory
  }
  