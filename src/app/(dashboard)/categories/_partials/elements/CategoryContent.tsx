"use client";

import { appRoutes } from "@/lib/routes";
import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import CategoryList from "./CategoryList";
import { useGetCategoriesList } from "@/features/categories/useGetCategories";
import { useEffect, useState } from "react";
import CategoryActionModal from "../actions/CategoryActionModal";
import { categoryInterface } from "@/interface/category.interface";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { permissions } from "@/utils/permissions";
import { hasPermission } from "@/helpers/permission.helper";

const CategoryContent: React.FC = () => {
    const { data, isLoading, mutate } = useGetCategoriesList();
    const [showActionModal, setShowActionModal] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<categoryInterface | null>();
    
    
    const { data : permissionData } = useGetAllPermissionsByUserId()
    const canAdd = hasPermission([permissions.ADD_CATEGORY] , permissionData?.data)
    

    useEffect(() => {
        if (!showActionModal) {
            setEditItem(null);
        }
    }, [showActionModal]);


    return (
        <div>
            <PrivateView
                title="Area of Concern List"
                breadCrumbItems={[
                    {
                        title: "Area of Concerns",
                        href: appRoutes.CATEGORY_INDEX_PAGE,
                    },
                ]}
            >
                <CommonContainer title="area-of-concern-list-section">
                    <>
                        <div className="flex justify-between items-center">
                            <DebouncedSearch
                                mutate={mutate}
                                placeholder={"Search Category"}
                                searchKey="name"
                            />
                            <div className="space-x-5">
                                {
                                    canAdd && 
                                    <AppAddButton
                                        title="Add Area of Concern"
                                        onClick={() => setShowActionModal(true)}
                                    />
                                }
                            </div>
                        </div>
                        <CategoryList
                            categoryList={data?.data ?? []}
                            setShowModal={setShowActionModal}
                            setEditItem={setEditItem}
                            mutate={mutate}
                        />

                        <CategoryActionModal
                            editItem={editItem}
                            showModal={showActionModal}
                            handleShowChange={setShowActionModal}
                            mutate={mutate}
                        />
                    </>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default CategoryContent;
