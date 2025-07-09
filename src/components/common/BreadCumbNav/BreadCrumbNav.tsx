import React from "react"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 

} from "@/components/ui/breadcrumb"
import { Link } from "lucide-react"

interface BreadCrumbItemInterface {
    title : string
    href : string
  
}
interface BreadCrumbNavPropsInterface {
  breadCrumbItems : BreadCrumbItemInterface[]
}

const BreadCrumbNav : React.FC<BreadCrumbNavPropsInterface> = ({
  breadCrumbItems
}) => {
  
  return(
  <Breadcrumb>
    <BreadcrumbList>
    {
      breadCrumbItems?.length > 1 &&
      breadCrumbItems.map((item: BreadCrumbItemInterface, index: number) => {
        const isLastItem = index === breadCrumbItems.length - 1;
        return (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {isLastItem ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>
                  {item.title}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLastItem && <BreadcrumbSeparator />}
          </React.Fragment>
        );
      })
    }
    </BreadcrumbList>
  </Breadcrumb>
  )
}

export default BreadCrumbNav