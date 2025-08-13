import "./_your-leaut.scss";
import "@/app/real-estate/_card-popup.scss";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { polygonsData } from "@/utils/consts";
import { formatKzt } from "@/utils/helpers";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalContent, Spinner } from "@heroui/react";
import Link from "next/link";
import { setModalSendRequestGalaOne } from "@/redux/modals";
moment.locale("ru");

const PROJECT_ID_GALA_ONE = 54255;
const HOUSE_ID_GALA_ONE = 141959;

type Point = { x: number; y: number };
type Polygon = {
  id: number;
  realIdForDb: number;
  color: string;
  points: Point[];
  data?: any;
};

function YourLayout() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allPlans = useRef<IPlan[]>([]);

  useEffect(() => {
    ActionGetProjectsProperty("/plan", {
      isArchive: false,
      status: ["AVAILABLE"],
      projectIds: [PROJECT_ID_GALA_ONE],
    }).then((result) => {
      const data: IPlan[] = result.data;
      allPlans.current = data;
    });
  }, []);

  const [plans, setPlans] = useState<IPlan[] | null>(null);

  function FindAllProperty(ids: number[]) {
    console.log(
      allPlans.current,
      "allPlans.currentallPlans.currentallPlans.current",
    );

    const findAllPlans = ids.flatMap((_id: number) =>
      allPlans.current
        .filter((plan) => plan.properties.includes(String(_id)))
        .map((plan) => ({ ...plan, propertyId: _id })),
    );

    setPlans(findAllPlans);
  }

  const boards = useRef<IBoard | null>(null);

  useEffect(() => {
    ActionGetProjectsProperty("/board", {
      houseId: HOUSE_ID_GALA_ONE,
    }).then((result) => {
      boards.current = result;
      fetchTooltipData(polygonsData[0]);
    });
  }, [HOUSE_ID_GALA_ONE]);

  // Virtual canvas dimensions
  const virtualWidth = 1500;
  const virtualHeight = 1050;

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [polygons, setPolygons] = useState<Polygon[] | any>([]);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) {
        return;
      }

      const container = containerRef.current;
      const canvas = canvasRef.current;

      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.width = width;
      canvas.height = height;

      const scaleX = width / virtualWidth;
      const scaleY = height / virtualHeight;
      const newScale = Math.max(0.0001, Math.min(scaleX, scaleY));

      setScale(newScale);
      setOffset({
        x: (width - virtualWidth * newScale) / 2,
        y: (height - virtualHeight * newScale) / 2,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPolygons(polygonsData);

    const img = new Image();
    img.src = "/img/gala-one/top-view-x-clear-bg.png";
    img.onload = () => setImageEl(img);
  }, []);

  // Պոլիգոնի նկարումը
  const drawPolygon = (
    ctx: CanvasRenderingContext2D,
    poly: Polygon,
    isHovered: boolean,
  ) => {
    if (poly.points.length < 2) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(poly.points[0].x, poly.points[0].y);
    for (let i = 1; i < poly.points.length; i++) {
      const p = poly.points[i];
      ctx.lineTo(p.x, p.y);
    }

    // Հիմնական գույնը
    const baseColor = poly.color;
    // Hover-ի դեպքում ավելի պայծառ գույն
    const hoverColor = isHovered
      ? adjustColorBrightness(baseColor, 30) // ավելացնում ենք պայծառությունը 30 միավորով
      : baseColor;

    const rgba = isHovered
      ? hexToRgba(hoverColor, 0.5)
      : hexToRgba(hoverColor, 0.25);

    ctx.fillStyle = rgba;
    ctx.strokeStyle = hoverColor;
    ctx.lineWidth = (isHovered ? 2.5 : 1.5) / scale;

    if (poly.points.length >= 3) {
      ctx.closePath();
    }
    ctx.fill();
    ctx.stroke();
  };

  // HEX to RGBA փոխակերպում
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const adjustColorBrightness = (hex: string, amount: number) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // redraw
  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    if (imageEl) {
      ctx.drawImage(imageEl, 0, 0, virtualWidth, virtualHeight);
    }

    for (const poly of polygons) {
      drawPolygon(ctx, poly, activeHoverId === poly.id);
    }
    ctx.restore();
  };

  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);

  const fetchTooltipData = (polygon: Polygon) => {
    if (boards && boards.current) {
      const propertyIds: number[] = boards.current.floors
        .map((floor) => floor.sections.find((sec) => sec.number === polygon.id))
        .filter((sec): sec is ISection => Boolean(sec))
        .flatMap((sec) => sec.cells)
        .map((c) => c.propertyId)
        .filter((id): id is number => id !== null);

      console.log(polygon);
      FindAllProperty(propertyIds);
    }
  };

  // screen -> virtual coords
  const getVirtualCoords = (clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    const cssScaleX = rect.width / canvas.width;
    const cssScaleY = rect.height / canvas.height;

    const x = ((clientX - rect.left) / cssScaleX - offset.x) / scale;
    const y = ((clientY - rect.top) / cssScaleY - offset.y) / scale;

    return { x, y };
  };

  // Point in polygon
  const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
    if (polygon.length < 3) {
      return false;
    }

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y;
      const xj = polygon[j].x,
        yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  };

  // Mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getVirtualCoords(e.clientX, e.clientY);
      const hovered = polygons.find((poly: Polygon) =>
        isPointInPolygon({ x, y }, poly.points),
      );

      if (hovered) {
        if (activeHoverId !== hovered.id) {
          setActiveHoverId(hovered.id);
          redraw(); // Անհրաժեշտ է վերանկարել hover էֆեկտի համար
        }
      } else if (activeHoverId !== null) {
        setActiveHoverId(null);
        redraw();
      }
    },
    [polygons, activeHoverId],
  );

  // CLICK
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getVirtualCoords(e.clientX, e.clientY);

    const clickedPoly = polygons.find((poly: Polygon) =>
      isPointInPolygon({ x, y }, poly.points),
    );

    if (clickedPoly) {
      fetchTooltipData(clickedPoly);
    }
  };

  useEffect(() => {
    redraw();
  }, [polygons, scale, offset, imageEl, activeHoverId]); // Ավելացված է activeHoverId-ի կախվածությունը

  const [selectedProject, setSelectedProject] = useState<IProjectMerged | null>(
    null,
  );

  const [modalViewProperty, setModalViewProperty] = useState(false);
  const [selectedFullPlan, setSelectedFullPlan] = useState<{
    plan: IPlan;
    property: IProperty;
  } | null>(null);

  const projects = useSelector(
    (state: IProjectsState) => state.projectsState.projects,
  );

  function OpenModalViewInfo(plan: any) {
    setModalViewProperty(true);

    ActionGetProjectsProperty("/property", {
      status: ["AVAILABLE"],
      id: plan.propertyId,
    }).then((result) => {
      setSelectedFullPlan({ plan, property: result.data[0] });
    });

    // ActionGetProjectsProperty("/floor", {
    //   isArchive: false,
    //   status: ["AVAILABLE"],
    //   houseId: plan.houseId,
    // }).then((result) => {
    //   console.log(result);
    //
    //   const fontFloor = result.find((floor: any) =>
    //     floor.areas.some((_a: any) => plan.properties.includes(_a.propertyId)),
    //   );
    //   if (fontFloor) {
    //     setFloor(fontFloor);
    //   }
    // });

    const findProject = projects.find(
      (proj) => proj.project_id === PROJECT_ID_GALA_ONE,
    );

    setSelectedProject(findProject || null);
  }

  return (
    <>
      <div className="your-layout !mt-10">
        <div className="wrapper">
          <h2>Выберите свою планировку</h2>
          <div className="info">
            <div className="images md:pb-10 ">
              <div className="scroll">
                {plans?.map((plan, i) => (
                  <div
                    className="img p-4 md:p-6 bg-[#E8EAEF] hover:bg-[#E8EAEF]/80 mr-2 rounded-[10px] cursor-pointer !w-[95%]"
                    onClick={() => OpenModalViewInfo(plan)}
                    key={i}
                  >
                    <img
                      src={plan.image.preview}
                      alt="plan image"
                      className="rounded-[10px] !h-auto !w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={containerRef}
              className="planing-info !h-[300px] md:!h-[850px] bg-white w-full relative"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-pointer w-full h-full transform max-[420px]:scale-125 md:scale-125"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal size="5xl" isOpen={modalViewProperty} hideCloseButton>
        <ModalContent className="rounded-[18px] sm:rounded-[35px] max-w-[1226px]">
          <ModalBody className="max-w-[1226px] p-4 sm:p-10">
            <div className="wrapper !p-0">
              <div className="flex-je-c mb-4">
                <Button
                  className="text-white min-w-[24px] sm:min-w-[30px] min-h-[24px] sm:min-h-[30px] text-[20px] rounded-[7px] bg-[#7F0217]"
                  color="primary"
                  onPress={() => {
                    setModalViewProperty(false);
                    setSelectedFullPlan(null);
                  }}
                >
                  <i className="fa-regular fa-xmark"></i>
                </Button>
              </div>
              <div id="card-popup" className="">
                {selectedFullPlan ? (
                  <div className="popup-body !p-0">
                    <div className="info flex-jsb-s lg:gap-10 flex-col lg:flex-row !px-0 !max-w-full">
                      <div className="texts lg:min-w-[350px] !w-full">
                        <div className="top-info !w-full !mb-0">
                          <div className="flex-js-c gap-4">
                            <h2>ЖК {selectedFullPlan.property.projectName}</h2>
                            <span className="status !mb-2">Свободно</span>
                          </div>
                          <span className="nomer mb-0 sm:!mb:3 max-[576px]:!max-w-full">
                            {selectedFullPlan.property.rooms_amount}-комнатная
                            квартира №{selectedFullPlan.property.number}
                          </span>

                          <div className="w-full grid grid-cols-2 sm:grid-cols-3 mb-8 mt-2 sm:mt-6 gap-2 sm:gap-4">
                            <div>
                              <h4 className="text-[13px] text-blue">
                                Площадь:
                              </h4>
                              <h3 className="text-[18px] sm:text-[26px] text-blue font-medium">
                                {selectedFullPlan.property.area.area_total}м²
                              </h3>
                            </div>
                            <div>
                              <h4 className="text-[13px] text-blue">Этаж:</h4>
                              <h3 className="text-[18px] sm:text-[26px] text-blue font-medium">
                                {selectedFullPlan.property.floor}
                              </h3>
                            </div>
                            <div>
                              <h4 className="text-[13px] text-blue">
                                Срок сдачи:
                              </h4>
                              <h3 className="text-[18px] sm:text-[26px] text-blue font-medium capitalize">
                                {moment(
                                  selectedProject?.completion_date || "",
                                ).format("MMMM YYYY")}
                              </h3>
                            </div>
                            <div className="sm:col-span-2 sm:mt-4">
                              <h4 className="text-[13px] text-blue">
                                Стоимость:
                              </h4>
                              <h3 className="text-[18px] sm:text-[26px] text-blue font-medium">
                                {formatKzt(
                                  selectedFullPlan.property.price.value,
                                )}
                              </h3>
                            </div>
                            <div className="sm:mt-4">
                              <h4 className="text-[13px] text-blue">
                                Стоимость за м²:
                              </h4>
                              <h3 className="text-[18px] sm:text-[26px] text-blue font-medium">
                                {selectedFullPlan.property.price.value ? (
                                  formatKzt(
                                    selectedFullPlan.property.price.value /
                                      selectedFullPlan.property.area.area_total,
                                  )
                                ) : (
                                  <span className="text-[15px] underline opacity-70 cursor-default">
                                    Скоро будет видно{" "}
                                  </span>
                                )}
                              </h3>
                            </div>
                          </div>

                          <div className="flex-js-c gap-4 mb-4">
                            <Link
                              href={selectedFullPlan.plan.image.big}
                              target="_blank"
                              className="download !rounded-full !mb-0 border w-10 h-10 flex-jc-c border-blue"
                              download={`${selectedFullPlan.property.projectName}-${selectedFullPlan.property.id}.jpeg`}
                            >
                              <img src="/img/download-icon.svg" alt="" />
                            </Link>
                            <Button
                              color="primary"
                              className="border border-blue rounded-full"
                              variant="bordered"
                              onPress={() =>
                                dispatch(setModalSendRequestGalaOne(true))
                              }
                            >
                              Оставить заявку
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="img-wrap">
                        <img
                          src={selectedFullPlan.plan.image.big}
                          alt=""
                          className="w-full h-auto"
                          height={500}
                          width={400}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[400px] flex-jc-c">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default YourLayout;
