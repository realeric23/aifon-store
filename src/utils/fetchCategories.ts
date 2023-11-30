export const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    const categories: Category[] = data.categories;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
