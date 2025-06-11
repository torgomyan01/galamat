import "./why-us.scss";
import { Fade } from "react-awesome-reveal";
import clsx from "clsx";
import { useSelector } from "react-redux";

function WhyUs() {
  const trans = useSelector(
    (state: IStateTranslate) => state.translateSite.words,
  );

  const dataWhyUs = [
    {
      title: trans["they_choose_us"],
      text: trans["the_company_is_deservedly"],
    },
    {
      title: trans["available_objects"],
      text: trans["everything_is_ready_for_occupancy"],
    },
    {
      title: trans["years_of_reliability"],
      text: trans["been_building_not_just_houses,_but_trust"],
    },
    {
      title: trans["families_have_chosen_us"],
      text: trans["our_homes_have_become_warm"],
    },
  ];

  return (
    <div className="why-us md:!mt-[80px]">
      <div className="wrapper">
        <h2 className="main-title">{trans["why_us_"]}</h2>
        <div className="info">
          <div className="info-items">
            <Fade cascade direction="up" damping={0.4} triggerOnce>
              {dataWhyUs.map((item, index) => (
                <div
                  key={`why-${index}`}
                  className={clsx("info-item", {
                    active: index === 0,
                  })}
                >
                  <h2>{item.title}</h2>
                  <h3>{item.text}</h3>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
