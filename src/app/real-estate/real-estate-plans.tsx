import { useEffect, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { Spinner } from "@heroui/react";
import PlanItem from "@/app/real-estate/plan-item";
import { useSelector } from "react-redux";

interface IThisProps {
  projectsIds: number[];
}

function RealEstatePlans({ projectsIds }: IThisProps) {
  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const [plans, setPlans] = useState<IPlan[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
      setVisibleCount(6); // reset when filter changes
    });
  }, [filterParams]);

  let successLoadingNew = true;
  useEffect(() => {
    function handleScroll() {
      if (!plans) {
        return;
      }
      if (visibleCount >= plans.length) {
        return;
      }

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && successLoadingNew) {
        setIsLoadingMore(true);
        successLoadingNew = false;
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 6, plans.length));
          setIsLoadingMore(false);
          successLoadingNew = true;
        }, 600);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [plans, visibleCount]);

  return (
    <div className="cards-wrap">
      {plans ? (
        <>
          <div className="cards">
            {plans.slice(0, visibleCount).map((plan: IPlan) => (
              <PlanItem key={`key-plan-${plan.id}`} plan={plan} plans={plans} />
            ))}
          </div>

          <div className="bottom-info">
            <span>
              Показано {Math.min(visibleCount, plans.length)} из {plans.length}
            </span>
            {isLoadingMore && (
              <div className="w-full h-12 flex-jc-c">
                <Spinner />
              </div>
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
