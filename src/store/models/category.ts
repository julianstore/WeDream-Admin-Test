export interface Category {
  categoryId: string;
  icon: string;
  name: string;
}

export interface CategoryResponse {
  pageNum: number;
  perPage: number;
  totalCount: string;
  categories: Array<Category>;
}
