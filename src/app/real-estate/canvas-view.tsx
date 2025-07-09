"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { filesLink } from "@/utils/consts";
import { ActionGetObject } from "@/app/actions/admin/objects/get-objects";
import clsx from "clsx";
import { Spinner } from "@heroui/spinner";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { Chip } from "@heroui/chip";
import { addToast, Divider } from "@heroui/react";
import { formatKzt } from "@/utils/helpers";
import { setHouse, setObjectInfo } from "@/redux/modals";
import { useDispatch } from "react-redux";

type Point = { x: number; y: number };
type Polygon = {
  id: number;
  realIdForDb: number;
  color: string;
  points: Point[];
  data?: any;
};

interface IThisProps {
  objectInfo: IObjectData;
  project: IProjectMerged;
  onClose: () => void;
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function CanvasView({ objectInfo, project, onClose }: IThisProps) {
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Virtual canvas dimensions
  const virtualWidth = 1300;
  const virtualHeight = 700;

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentPolygon, setCurrentPolygon] = useState<Polygon | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredPolygon, setHoveredPolygon] = useState<Polygon | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState<IHouse | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);

  // For canvas scaling
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const imagePath = `${filesLink}${objectInfo.image_path}`;

  // Initialize and handle resize
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
    ActionGetObject(project.project_id).then((res) => {
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

    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, [objectInfo, project]);

  // Fetch tooltip data on hover
  const fetchTooltipData = async (polygon: Polygon) => {
    setLoadingData(true);

    // const api_url =
    //   objectInfo.api_url === "/projects"
    //     ? "/house"
    //     : objectInfo.api_url === "/house"
    //       ? "/floor"
    //       : "";

    if (objectInfo.api_url === "/projects") {
      ActionGetProjectsProperty("/house", {
        isArchive: false,
        status: ["AVAILABLE"],
        id: polygon.id,
      }).then((result) => {
        setLoadingData(false);

        const _dats: IHouse[] = [...result.data];

        const filterResult = _dats.find((house) => house.id === polygon.id);

        if (filterResult) {
          setTooltipData(filterResult);
        }
      });
    }

    // try {
    //   const response = await fetch(`/api/polygon-data?id=${polygonId}`);
    //   const data = await response.json();
    //   setTooltipData(data);
    // } catch (error) {
    //   console.error("Failed to fetch tooltip data:", error);
    // } finally {
    //   setLoadingData(false);
    // }
  };

  // Convert coordinates
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
    return {
      x: virtualX * scale + offset.x,
      y: virtualY * scale + offset.y,
    };
  };

  // Debounced hover handler
  const handleHover = useCallback(
    debounce((polygon: Polygon | null) => {
      setHoveredPolygon(polygon);
      if (polygon && !polygon.data) {
        fetchTooltipData(polygon);
      }
    }, 100),
    [],
  );

  // Mouse move handler
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

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setActiveHoverId(null);
    handleHover(null);
  }, [handleHover]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getVirtualCoords(e.clientX, e.clientY);

    // Check if clicked on existing polygon
    const clickedPoly = polygons.find((poly) =>
      isPointInPolygon({ x, y }, poly.points),
    );

    if (clickedPoly) {
      addToast({
        title: "Подождите пожалуйста",
        color: "warning",
      });

      ActionGetObject(clickedPoly.realIdForDb).then((resultObjects) => {
        dispatch(setHouse(tooltipData));
        dispatch(setObjectInfo(resultObjects.data as IObjectData[]));

        addToast({
          title: `Спасибо, можете смотреть ${tooltipData?.title}`,
          color: "success",
        });
        onClose();
      });

      return;
    }

    if (currentPolygon) {
      setCurrentPolygon({
        ...currentPolygon,
        points: [...currentPolygon.points, { x, y }],
      });
    }
  };

  // Polygon helpers
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
    points.forEach((point) => {
      center.x += point.x;
      center.y += point.y;
    });
    center.x /= points.length;
    center.y /= points.length;
    return center;
  };

  // Main drawing function
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

    // Draw image
    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, virtualWidth, virtualHeight);
    }

    // Draw polygons
    polygons.forEach((poly) => {
      drawPolygon(ctx, poly, poly === hoveredPolygon);
    });

    if (currentPolygon) {
      drawPolygon(ctx, currentPolygon, false);
    }

    ctx.restore();
  };

  // Polygon rendering with hover effect
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

    ctx.fillStyle = `${poly.color}${isHovered ? "80" : "40"}`;
    ctx.strokeStyle = poly.color;
    ctx.lineWidth = (isHovered ? 2.5 : 1.5) / scale;

    if (poly.points.length >= 3) {
      ctx.closePath();
    }
    ctx.fill();
    ctx.stroke();

    if (poly === currentPolygon) {
      poly.points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 / scale, 0, Math.PI * 2);
        ctx.fillStyle = poly.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
      });
    }
  };

  useEffect(() => {
    redraw();
  }, [polygons, currentPolygon, imageLoaded, scale, offset, hoveredPolygon]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-[100dvh] z-[10]"
    >
      <img
        src={imagePath}
        alt="image fon"
        className="w-full h-full object-cover absolute left-0 top-0 blur-[5px]"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1000] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
      />

      <div
        ref={tooltipRef}
        className={clsx(
          "absolute bg-white text-black p-4 rounded-[12px] shadow-lg z-[2000] pointer-events-none transition min-w-[350px] h-[250px]",
          {
            "opacity-100": hoveredPolygon,
            "opacity-0": !hoveredPolygon,
          },
        )}
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          transform: "translate(20%, -40%)",
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
              <div className="w-full">
                <div className="w-full flex-jsb-c">
                  <h3 className="font-semibold">{tooltipData.title}</h3>
                  <div>
                    <Chip>
                      {tooltipData.salesStart?.month}.
                      {tooltipData.salesStart?.year}
                    </Chip>
                  </div>
                </div>
                <Divider className="my-4" />
                <ul>
                  <li>
                    <div className="flex-js-c">
                      <span className="text-black/60 mr-2">Адрес:</span>{" "}
                      {tooltipData.address.full}
                    </div>

                    <Divider className="my-4" />

                    <div className="w-full flex-jsb-s">
                      <h4 className="text-blue">
                        <b>{tooltipData.propertyCount}</b> квартир{" "}
                      </h4>
                      <div className="text-right">
                        <h3 className="text-[15px]">
                          от {formatKzt(tooltipData.minPrice)}
                        </h3>
                        <h3 className="text-[15px]">
                          от {formatKzt(tooltipData.minPriceArea)}/м²
                        </h3>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
          </>
        )}
      </div>

      <i
        className="fa-light fa-xmark absolute top-6 right-6 z-[1000] text-[30px] text-black/60 hover:text-black cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}

export default CanvasView;
