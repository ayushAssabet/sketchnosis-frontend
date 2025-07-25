"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { useCategory } from "@/features/categories/useCategory";
import { categoryInterface } from "@/interface/category.interface";
import { CategoryListTableHeading } from "./CategoryListTableHeading";

const CategoryList = ({
    categoryList,
    setEditItem,
    setShowModal,
    mutate
}: {

    categoryList: categoryInterface[];
    setEditItem : (value : categoryInterface) => void
    setShowModal : (value : boolean) => void
    mutate : () => Promise<void>

}) => {
    const { deleteCategory } = useCategory(mutate);
    const onEdit = (value : categoryInterface) => {
        setEditItem(value)
        setShowModal(true)
    }

    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={categoryList}
                columns={CategoryListTableHeading({ onDelete: deleteCategory , onEdit })}
            />
        </div>
    );
};

export default CategoryList;
