"use client";

import { appRoutes } from "@/lib/routes";
import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import CategoryList from "./CategoryList";
import { useGetCategoriesList } from "@/features/categories/useGetCategories";
import { useEffect, useState } from "react";
import CategoryActionModal from "../actions/CategoryActionModal";
import { categoryInterface } from "@/interface/category.interface";

const CategoryContent: React.FC = () => {
  const { data, isLoading, mutate } = useGetCategoriesList();
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<categoryInterface | null>();

  useEffect(() => {
    if (!showActionModal) {
      setEditItem(null);
    }
  }, [showActionModal]);

  return (
    <div>
      <PrivateView
        title="Category"
        breadCrumbItems={[
          { title: "Category", href: appRoutes.CATEGORY_INDEX_PAGE },
        ]}
      >
        <CommonContainer title="clinic-list-section">
          <>
            <div className="flex justify-between items-center">
              <DebouncedSearch
                mutate={mutate}
                placeholder={"Search Category"}
              />
              <div className="space-x-5">
                <AppAddButton
                  title="Add Category"
                  onClick={() => setShowActionModal(true)}
                />
              </div>
            </div>
            <CategoryList
              categoryList={data?.data ?? []}
              setShowModal={setShowActionModal}
              setEditItem={setEditItem}
              mutate={mutate}
            />
            <div className="flex items-center justify-between mt-12">
              <Pagination
                currentPage={2}
                totalPages={3}
                onPageChange={() => {}}
              />
              <PageSelector
                currentPage={2}
                totalPages={10}
                onPageChange={() => {}}
              />
            </div>

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
