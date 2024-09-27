import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore("categories", () => {
    const categories = ref([]);
    const category = ref(null);
    const baseUrl = process.env.BASE_URL;
    const apiUrl = `${baseUrl}/api/v1`;

    const addCategory = async (category) => {
        try {
            const response = await fetch(`${apiUrl}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category),
            });
            if (!response.ok) {
                throw new Error("Error adding category");
            }
            await fetchCategories();
        } catch (error) {
            console.log("Error adding category", error);
        };
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/categories`);
            if (!response.ok) {
                throw new Error("Error fetching categories");
            }
            categories.value = await response.json();
        } catch (error) {
            console.log("Error fetching categories", error);
        };
    };

    const fetchCategory = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/categories/${id}`);
            if (!response.ok) {
                throw new Error("Error fetching category");
            }
            const data = await response.json();
            category.value = data;
        } catch (error) {
            console.log("Error fetching category", error);
        };
    };

    return {
        categories,
        category,
        addCategory,
        fetchCategories,
        fetchCategory,
    };
});