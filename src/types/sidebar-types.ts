export interface MenuItem {
  label: string;
  icon?: string; // Lucide icon name (as string)
  badge?: number;
  isActive?: boolean;
  subItems?: MenuItem[];
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}