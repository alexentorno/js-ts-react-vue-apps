import { ICategory } from "@/domain/ICategory";
import { IPriority } from "@/domain/IPriority";
import GetService from "@/services/CRUD/GetService";
import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";

interface CategoryMap {
    [key: string]: string;
}

interface PriorityMap {
    [key: string]: string;
}

export default function useCategoriesAndPriorities(): [CategoryMap, PriorityMap] {
    const [categoryMap, setCategoryMap] = useState<CategoryMap>({});
    const [priorityMap, setPriorityMap] = useState<PriorityMap>({});
    const { userInfo } = useContext(AppContext)!;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await GetService.getCategory(userInfo!.token);
                const priorityResponse = await GetService.getPriority(userInfo!.token);

                if (categoryResponse.data) {
                    const categories: ICategory[] = categoryResponse.data;
                    const newCategoryMap: CategoryMap = {};
                    categories.forEach(category => {
                        newCategoryMap[category.id] = category.categoryName;
                    });
                    setCategoryMap(newCategoryMap);
                }

                if (priorityResponse.data) {
                    const priorities: IPriority[] = priorityResponse.data;
                    const newPriorityMap: PriorityMap = {};
                    priorities.forEach(priority => {
                        newPriorityMap[priority.id] = priority.priorityName;
                    });
                    setPriorityMap(newPriorityMap);
                }
            } catch (error) {
                console.error("Error fetching categories and priorities:", error);
            }
        };

        fetchData();
    }, [userInfo]);

    return [categoryMap, priorityMap];
}
