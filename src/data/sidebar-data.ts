import { MenuSection } from "../types/sidebar-types";

export const menuData: MenuSection[] = [
  {
    section: "Main Menu",
    items: [
      { label: "Dashboard", icon: "Home" },
      {
        label: "Products",
        icon: "Package",
        isActive: true,
        subItems: [
          { label: "All Products" },
          { label: "Add New Product" },
          { label: "Tags" }
        ]
      },
      { label: "Categories", icon: "LayoutGrid" },
      { label: "Sub Category", icon: "LayoutGrid" },
      { label: "Brands", icon: "BadgeCheck" },
      { label: "Scan Barcode", icon: "ScanBarcode" },
      { label: "Import Products", icon: "Upload" }
    ]
  },
  {
    section: "Analytics",
    items: [
      { label: "Sales", icon: "TrendingUp", badge: 49 },
      { label: "Point of Sales", icon: "ShoppingBasket" },
      { label: "Leaderboards", icon: "ListOrdered" },
      {
        label: "Orders",
        icon: "ShoppingCart",
        subItems: [
          { label: "Refund" },
          { label: "Taxes" },
          { label: "Stock" }
        ]
      }
    ]
  },
  {
    section: "Apps",
    items: [
      { label: "Chat", icon: "MessageCircle", badge: 80 },
      { label: "Calendar", icon: "Calendar" },
      { label: "Email", icon: "Mail" }
    ]
  },
  {
    section: "Settings",
    items: [
      { label: "Settings", icon: "Settings" },
      { label: "Log Out", icon: "LogOut" }
    ]
  }
];
