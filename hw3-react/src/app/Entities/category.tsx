// Category interface

export interface Category {
    id: string;
    categoryName: string;
    categorySort: number;
    syncDt: Date | string;  // Date type if you handle it as a Date object, string if as ISO string
    tag: string;  // Optional property
}