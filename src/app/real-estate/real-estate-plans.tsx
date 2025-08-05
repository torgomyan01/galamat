"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { Spinner, Pagination } from "@heroui/react";
import PlanItem from "@/app/real-estate/plan-item";
import { useSelector } from "react-redux";

interface IThisProps {
  projectsIds: number[];
}

const ITEMS_PER_PAGE = 6;

function RealEstatePlans({ projectsIds }: IThisProps) {
  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<IPlan[] | null>(null);

  // ⏎ Ստանում ենք էջի արժեքը URL-ից կամ դնում ենք default `1`
  const initialPageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(
    isNaN(initialPageFromUrl) ? 1 : initialPageFromUrl,
  );

  // ⏎ Երբ filterParams-ը փոխվում է՝ բեռնենք նոր տվյալներ
  useEffect(() => {
    const _filterParams: any = { ...filterParams };

    if (!_filterParams.projectId) {
      delete _filterParams["projectId"];
    }

    if (!_filterParams.houseId) {
      delete _filterParams["houseId"];
    } else {
      _filterParams.houseId = [filterParams.houseId];
    }

    ActionGetProjectsProperty("/plan", {
      isArchive: false,
      status: ["AVAILABLE"],
      projectIds: projectsIds,
      ..._filterParams,
    }).then((result) => {
      const data: IPlan[] = result.data;
      setPlans(data);
      setCurrentPage(isNaN(initialPageFromUrl) ? 1 : initialPageFromUrl);
    });
  }, [filterParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlans = plans?.slice(startIndex, endIndex) || [];

  return (
    <div className="cards-wrap">
      {plans ? (
        <>
          <div className="cards">
            {currentPlans.map((plan: IPlan) => (
              <PlanItem key={`key-plan-${plan.id}`} plan={plan} plans={plans} />
            ))}
          </div>

          <div className="flex-jc-c sm:flex-je-c gap-4 mt-6 flex-col sm:flex-row">
            <span>
              Показано {startIndex + currentPlans.length} из {plans.length}
            </span>

            {plans.length > ITEMS_PER_PAGE && (
              <Pagination
                initialPage={currentPage}
                total={Math.ceil(plans.length / ITEMS_PER_PAGE)}
                onChange={(page) => setCurrentPage(page)}
                classNames={{
                  cursor: "text-white",
                }}
              />
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-[400px] flex-jc-c">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default RealEstatePlans;
