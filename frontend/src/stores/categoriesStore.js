import { defineStore } from "pinia";
import { ref } from "vue";
import { LocalStorage } from "quasar";

export const useCategoriesStore = defineStore("categories", () => {
    const categories = ref([]);
    const category = ref(null);
    const token = LocalStorage.getItem("token");
    const apiUrl = "http://localhost:3000/api/v1";

    const addCategory = async (category) => {
        try {
            const response = await fetch(`${apiUrl}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
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
            const response = await fetch(`${apiUrl}/categories`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
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
            const response = await fetch(`${apiUrl}/categories/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
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