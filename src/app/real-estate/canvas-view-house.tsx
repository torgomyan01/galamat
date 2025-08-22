"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ActionGetObject } from "@/app/actions/admin/objects/get-objects";
import clsx from "clsx";
import { Spinner, Button } from "@heroui/react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import DrawerViewPlansAndItems from "@/app/real-estate/drawer-view-plans-and-items";
import { filesLink } from "@/utils/consts";
import ChessView from "@/app/real-estate/chess-view";

type Point = { x: number; y: number };
type Polygon = {
  id: number;
  realIdForDb: number;
  color: string;
  points: Point[];
  data?: any;
};

interface IThisProps {
  objectInfo: IObjectData[];
  house: IHouse;
  onClose: () => void;
  projects: IProjectMerged[];
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function CanvasViewHouse({ objectInfo, house, onClose, projects }: IThisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const virtualWidth = 1300;
  const virtualHeight = 700;

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentPolygon, setCurrentPolygon] = useState<Polygon | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredPolygon, setHoveredPolygon] = useState<Polygon | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState<IFloor | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);
  const [viewPlan, setViewPlan] = useState<boolean>(false);

  // zoom
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const minScale = 0.5;
  const maxScale = 3;

  const [activeHouse, setActiveHouse] = useState<IObjectData | null>(null);
  const [chess, setChess] = useState<boolean>(false);

  function CloseModal() {
    setChess(false);
    onClose();
  }

  useEffect(() => {
    if (objectInfo.length) {
      setActiveHouse(objectInfo[0]);
    }
  }, [objectInfo]);

  // initial resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) {
        return;
      }

      const container = containerRef.current;
      const canvas = canvasRef.current;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const scaleX = canvas.width / virtualWidth;
      const scaleY = canvas.height / virtualHeight;
      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
      setOffset({
        x: (canvas.width - virtualWidth * newScale) / 2,
        y: (canvas.height - virtualHeight * newScale) / 2,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load data and image
  useEffect(() => {
    if (activeHouse) {
      ActionGetObject(activeHouse.id).then((res) => {
        setPolygons(
          res.data.map(
            (object) =>
              ({
                id: object.project_house_id,
                realIdForDb: object.id,
                color: object.color,
                points: JSON.parse(object.coordinates || "[]"),
              }) as any,
          ),
        );
      });
    }

    const img = new Image();
    img.src = `${filesLink}${activeHouse?.image_path}`;
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, [objectInfo, house, activeHouse]);

  // Fetch tooltip data
  const fetchTooltipData = async (polygon: Polygon) => {
    setLoadingData(true);
    if (objectInfo.length) {
      if (objectInfo[0].api_url === "/house") {
        ActionGetProjectsProperty("/floor", {
          houseId: objectInfo[0].project_house_id,
        }).then((result) => {
          setLoadingData(false);
          const _dats: IFloor[] = [...result];
          const filterResult = _dats.find((floor) => floor.id === polygon.id);
          if (filterResult) {
            setTooltipData(filterResult);
          }
        });
      }
    }
  };

  // coords utils
  const getVirtualCoords = (clientX: number, clientY: number): Point => {
    if (!canvasRef.current) {
      return { x: 0, y: 0 };
    }
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left - offset.x) / scale,
      y: (clientY - rect.top - offset.y) / scale,
    };
  };

  const getPhysicalCoords = (virtualX: number, virtualY: number): Point => {
    return { x: virtualX * scale + offset.x, y: virtualY * scale + offset.y };
  };

  // hover
  const handleHover = useCallback(
    debounce((polygon: Polygon | null) => {
      setHoveredPolygon(polygon);
      if (polygon && !polygon.data) {
        fetchTooltipData(polygon);
      }
    }, 100),
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getVirtualCoords(e.clientX, e.clientY);
      const hovered = polygons.find((poly) =>
        isPointInPolygon({ x, y }, poly.points),
      );

      if (hovered) {
        if (activeHoverId !== hovered.id) {
          setActiveHoverId(hovered.id);
          const center = getPolygonCenter(hovered.points);
          const physicalPos = getPhysicalCoords(center.x, center.y);

          setTooltipPosition({
            x: physicalPos.x + e.currentTarget.getBoundingClientRect().left,
            y: physicalPos.y + e.currentTarget.getBoundingClientRect().top,
          });

          handleHover(hovered);
        }
      } else if (activeHoverId !== null) {
        setActiveHoverId(null);
        handleHover(null);
      }
    },
    [polygons, activeHoverId, handleHover],
  );

  const handleMouseLeave = useCallback(() => {
    setActiveHoverId(null);
    handleHover(null);
  }, [handleHover]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getVirtualCoords(e.clientX, e.clientY);
    const clickedPoly = polygons.find((poly) =>
      isPointInPolygon({ x, y }, poly.points),
    );
    if (clickedPoly) {
      setViewPlan(true);
    }
    if (currentPolygon) {
      setCurrentPolygon({
        ...currentPolygon,
        points: [...currentPolygon.points, { x, y }],
      });
    }
  };

  // zoom handler
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = -e.deltaY / 500; // sensitivity
    const newScale = Math.min(Math.max(scale + delta, minScale), maxScale);

    const mouse = getVirtualCoords(e.clientX, e.clientY);

    const worldX = mouse.x;
    const worldY = mouse.y;

    const newOffsetX =
      e.clientX -
      worldX * newScale -
      canvasRef.current!.getBoundingClientRect().left;
    const newOffsetY =
      e.clientY -
      worldY * newScale -
      canvasRef.current!.getBoundingClientRect().top;

    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  // helpers
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

  const getPolygonCenter = (points: Point[]): Point => {
    const center = { x: 0, y: 0 };
    points.forEach((p) => {
      center.x += p.x;
      center.y += p.y;
    });
    center.x /= points.length;
    center.y /= points.length;
    return center;
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imageLoaded) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, virtualWidth, virtualHeight);
    }

    polygons.forEach((poly) => {
      drawPolygon(ctx, poly, poly === hoveredPolygon);
    });

    if (currentPolygon) {
      drawPolygon(ctx, currentPolygon, false);
    }

    ctx.restore();
  };

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
    poly.points.forEach((p, i) => i > 0 && ctx.lineTo(p.x, p.y));
    if (poly.points.length >= 3) {
      ctx.closePath();
    }

    ctx.globalAlpha = isHovered ? 0.4 : 0;
    ctx.fillStyle = poly.color;
    ctx.strokeStyle = poly.color;
    ctx.lineWidth = (isHovered ? 2.5 : 1.5) / scale;
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    redraw();
  }, [polygons, currentPolygon, imageLoaded, scale, offset, hoveredPolygon]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-[100dvh] z-[10] backdrop-blur-[5px]"
      >
        <div className={clsx({ hidden: !chess })}>
          {chess && <ChessView projects={projects} activeHouse={activeHouse} />}
        </div>

        <div className={clsx({ hidden: chess })}>
          <img
            src={`${filesLink}${activeHouse?.image_path}`}
            alt="image fon"
            className="w-full h-full object-cover absolute left-0 top-0 blur-[5px]"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1000] cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          />

          <div className="w-full absolute left-6 bottom-6 grid grid-cols-5 gap-4 z-[1000] h-[150px]">
            {objectInfo?.map((houseImage) => (
              <div
                key={`moda-house-${houseImage.id}`}
                onClick={() => setActiveHouse(houseImage)}
                className={clsx(
                  "w-full h-full overflow-hidden rounded-[12px] cursor-pointer border border-transparent hover:border-white",
                  {
                    "!border-white": activeHouse?.id === houseImage.id,
                  },
                )}
              >
                <img
                  src={`${filesLink}${houseImage.image_path}`}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-[50px] md:top-6 left-0 flex-jc-c w-full z-[1000000]">
          <div className="w-[300px] h-12 border border-white/50 rounded-[6px] flex-jsb-c backdrop-blur-[10px] bg-black/30">
            <Button
              variant={chess ? "bordered" : "flat"}
              onPress={() => setChess(false)}
              className={clsx("h-full rounded-[6px] w-full border-none", {
                "text-white bg-blue": !chess,
              })}
            >
              Объекты
            </Button>
            <Button
              variant={chess ? "flat" : "bordered"}
              className={clsx("h-full rounded-[6px] w-full border-none", {
                "text-white bg-blue": chess,
              })}
              onPress={() => setChess(true)}
            >
              Шахматка
            </Button>
          </div>
        </div>

        <div
          ref={tooltipRef}
          className={clsx(
            "absolute bg-white hidden md:!block text-black p-4 rounded-[12px] shadow-lg z-[2000] pointer-events-none transition min-w-[350px] h-[250px]",
            {
              "opacity-100": hoveredPolygon,
              "opacity-0": !hoveredPolygon,
            },
          )}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(20%, -65%)",
            width: "300px",
          }}
        >
          {loadingData ? (
            <div className="w-full h-[100px] flex-jc-c">
              <Spinner />
            </div>
          ) : (
            <>
              {tooltipData ? (
                <div className="w-full relative">
                  <img
                    src={tooltipData.images.source}
                    alt="floor"
                    className="w-full h-full rounded-[8px] object-cover"
                    width={400}
                    height={200}
                  />
                  <Button
                    color="primary"
                    className="absolute left-[50%] transform translate-x-[-50%] bottom-4 bg-blue text-white"
                    variant="flat"
                  >
                    {tooltipData.areas.length} Помещения{" "}
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>

        <i
          className="fa-light fa-xmark sm:bg-white w-[20p] sm:w-[40px] h-[20px] sm:h-[40px] rounded-full flex-jc-c absolute top-6 right-6 text-[20px] sm:text-[30px] text-black/60 hover:text-black cursor-pointer z-[1000000000]"
          onClick={CloseModal}
        />
      </div>

      {tooltipData && viewPlan && objectInfo.length ? (
        <DrawerViewPlansAndItems
          status={viewPlan}
          onClose={() => setViewPlan(false)}
          plan={tooltipData}
          projectId={house.projectId}
          houseId={objectInfo[0].project_house_id}
        />
      ) : null}
    </>
  );
}

export default CanvasViewHouse;
