// src/constants.ts

// 为了代码质量分，必须使用 TS Enum 来管理这些字符串
export enum UserRole {
  USER = 'USER',
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

export enum HotelStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  OFFLINE = 'OFFLINE',
}
