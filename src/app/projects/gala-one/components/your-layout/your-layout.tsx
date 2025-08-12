import "./_your-leaut.scss";
import React, { useEffect, useRef, useState } from "react";

const polygonsData = [
  {
    id: 129,
    realIdForDb: 194809,
    color: "#7f0212",
    points: [
      {
        x: 237.58100993376812,
        y: 114.89192553098587,
      },
      {
        x: 237.7810099337681,
        y: 168.69192553098588,
      },
      {
        x: 305.5810099337681,
        y: 168.29192553098588,
      },
      {
        x: 304.9810099337681,
        y: 172.49192553098587,
      },
      {
        x: 348.5810099337681,
        y: 172.29192553098588,
      },
      {
        x: 348.1810099337681,
        y: 168.69192553098588,
      },
      {
        x: 385.5810099337681,
        y: 168.69192553098588,
      },
      {
        x: 384.78100993376813,
        y: 119.49192553098587,
      },
      {
        x: 368.3810099337681,
        y: 119.29192553098588,
      },
      {
        x: 368.5810099337681,
        y: 115.69192553098587,
      },
    ],
  },
  {
    id: 130,
    realIdForDb: 194819,
    color: "#7f0212",
    points: [
      {
        x: 385.78100993376813,
        y: 143.29192553098588,
      },
      {
        x: 385.9810099337681,
        y: 192.49192553098587,
      },
      {
        x: 404.3810099337681,
        y: 192.09192553098586,
      },
      {
        x: 404.3810099337681,
        y: 195.89192553098587,
      },
      {
        x: 514.5810099337681,
        y: 195.89192553098587,
      },
      {
        x: 514.5810099337681,
        y: 192.09192553098586,
      },
      {
        x: 533.7810099337681,
        y: 192.09192553098586,
      },
      {
        x: 533.5810099337681,
        y: 142.89192553098587,
      },
      {
        x: 517.7810099337681,
        y: 142.89192553098587,
      },
      {
        x: 517.5810099337681,
        y: 138.09192553098586,
      },
      {
        x: 403.78100993376813,
        y: 138.09192553098586,
      },
      {
        x: 403.3810099337681,
        y: 143.09192553098586,
      },
    ],
  },
  {
    id: 131,
    realIdForDb: 194812,
    color: "#7f0212",
    points: [
      {
        x: 536.81754027849,
        y: 166.7025366174302,
      },
      {
        x: 535.87436120209,
        y: 265.73633963943024,
      },
      {
        x: 616.01504546689,
        y: 265.39316056303034,
      },
      {
        x: 614.62981408149,
        y: 167.1741261556302,
      },
    ],
  },
  {
    id: 132,
    realIdForDb: 194814,
    color: "#7f0212",
    points: [
      {
        x: 203.6256069202007,
        y: 170.1798745067273,
      },
      {
        x: 203.5013009202007,
        y: 269.0988825067273,
      },
      {
        x: 276.9013009202007,
        y: 268.4988825067273,
      },
      {
        x: 276.74276092020074,
        y: 255.85900650672733,
      },
      {
        x: 282.5013009202007,
        y: 255.8988825067273,
      },
      {
        x: 282.54059692020076,
        y: 183.7081585067273,
      },
      {
        x: 276.74276092020074,
        y: 183.7081585067273,
      },
      {
        x: 276.5013009202007,
        y: 170.2988825067273,
      },
    ],
  },
  {
    id: 133,
    realIdForDb: 194816,
    color: "#7f0212",
    points: [
      {
        x: 203.70135388020063,
        y: 268.9757704467273,
      },
      {
        x: 203.70135388020063,
        y: 280.3757704467273,
      },
      {
        x: 197.9885381202006,
        y: 280.4885862067273,
      },
      {
        x: 197.5987947002006,
        y: 355.31932284672735,
      },
      {
        x: 204.2244328402006,
        y: 354.92957942672734,
      },
      {
        x: 204.10135388020063,
        y: 367.1757704467273,
      },
      {
        x: 276.90135388020065,
        y: 367.1757704467273,
      },
      {
        x: 276.71670896020066,
        y: 355.31932284672735,
      },
      {
        x: 282.17311684020063,
        y: 355.31932284672735,
      },
      {
        x: 282.17311684020063,
        y: 280.4885862067273,
      },
      {
        x: 277.3013538802006,
        y: 280.3757704467273,
      },
      {
        x: 276.71670896020066,
        y: 268.7962836067273,
      },
    ],
  },
  {
    id: 134,
    realIdForDb: 194822,
    color: "#7f0212",
    points: [
      {
        x: 228.90135388020062,
        y: 368.3757704467273,
      },
      {
        x: 229.30135388020062,
        y: 379.3757704467273,
      },
      {
        x: 222.30135388020062,
        y: 378.9757704467273,
      },
      {
        x: 222.30135388020062,
        y: 454.97577044672727,
      },
      {
        x: 229.30135388020062,
        y: 454.7757704467273,
      },
      {
        x: 229.5013538802006,
        y: 466.37577044672724,
      },
      {
        x: 301.7013538802006,
        y: 466.97577044672727,
      },
      {
        x: 302.10135388020063,
        y: 455.7757704467273,
      },
      {
        x: 308.5013538802006,
        y: 455.97577044672727,
      },
      {
        x: 308.5013538802006,
        y: 378.7757704467273,
      },
      {
        x: 302.10135388020063,
        y: 378.7757704467273,
      },
      {
        x: 301.7013538802006,
        y: 367.3757704467273,
      },
    ],
  },
  {
    id: 135,
    realIdForDb: 194811,
    color: "#7f0212",
    points: [
      {
        x: 228.30135388020062,
        y: 466.97577044672727,
      },
      {
        x: 228.30135388020062,
        y: 564.9757704467272,
      },
      {
        x: 301.7013538802006,
        y: 564.5757704467272,
      },
      {
        x: 301.90135388020065,
        y: 552.7757704467273,
      },
      {
        x: 307.90135388020065,
        y: 552.5757704467272,
      },
      {
        x: 307.5013538802006,
        y: 480.37577044672724,
      },
      {
        x: 301.5013538802006,
        y: 479.97577044672727,
      },
      {
        x: 301.5013538802006,
        y: 466.97577044672727,
      },
    ],
  },
  {
    id: 136,
    realIdForDb: 194813,
    color: "#7f0212",
    points: [
      {
        x: 268.34737259435485,
        y: 565.8059114504167,
      },
      {
        x: 267.9934165943548,
        y: 615.8120134504167,
      },
      {
        x: 293.54737259435484,
        y: 616.0059114504168,
      },
      {
        x: 293.6013725943548,
        y: 619.8459114504166,
      },
      {
        x: 398.3873725943549,
        y: 619.3619114504166,
      },
      {
        x: 398.62937259435483,
        y: 615.0059114504165,
      },
      {
        x: 415.56937259435483,
        y: 615.0059114504165,
      },
      {
        x: 415.81137259435485,
        y: 562.2499114504166,
      },
      {
        x: 321.6733725943548,
        y: 562.2499114504166,
      },
      {
        x: 321.54737259435484,
        y: 566.0059114504168,
      },
    ],
  },
  {
    id: 137,
    realIdForDb: 194815,
    color: "#7f0212",
    points: [
      {
        x: 415.94737259435476,
        y: 563.0059114504168,
      },
      {
        x: 415.94737259435476,
        y: 615.8059114504167,
      },
      {
        x: 432.3473725943548,
        y: 615.4059114504167,
      },
      {
        x: 432.94737259435476,
        y: 620.2059114504167,
      },
      {
        x: 537.1473725943548,
        y: 619.4059114504167,
      },
      {
        x: 537.1473725943548,
        y: 615.2059114504167,
      },
      {
        x: 562.7473725943548,
        y: 615.0059114504168,
      },
      {
        x: 562.1473725943548,
        y: 566.4059114504167,
      },
      {
        x: 510.1473725943548,
        y: 566.2059114504167,
      },
      {
        x: 509.94737259435476,
        y: 562.4059114504167,
      },
    ],
  },
  {
    id: 138,
    realIdForDb: 194817,
    color: "#7f0212",
    points: [
      {
        x: 531.3473725943547,
        y: 467.2059114504167,
      },
      {
        x: 531.7473725943548,
        y: 565.4059114504167,
      },
      {
        x: 603.5473725943548,
        y: 565.0059114504168,
      },
      {
        x: 603.9473725943548,
        y: 552.8059114504167,
      },
      {
        x: 610.7473725943548,
        y: 552.6059114504167,
      },
      {
        x: 610.1473725943548,
        y: 479.40591145041674,
      },
      {
        x: 603.1473725943548,
        y: 479.40591145041674,
      },
      {
        x: 603.3473725943547,
        y: 466.8059114504167,
      },
    ],
  },
  {
    id: 139,
    realIdForDb: 194820,
    color: "#7f0212",
    points: [
      {
        x: 531.1473725943548,
        y: 366.6059114504167,
      },
      {
        x: 610.5473725943548,
        y: 365.6059114504167,
      },
      {
        x: 610.5473725943548,
        y: 456.0059114504167,
      },
      {
        x: 603.9473725943548,
        y: 455.2059114504167,
      },
      {
        x: 603.9473725943548,
        y: 465.6059114504167,
      },
      {
        x: 530.7473725943548,
        y: 465.2059114504167,
      },
      {
        x: 531.1473725943548,
        y: 453.0059114504167,
      },
      {
        x: 525.5473725943548,
        y: 452.6059114504167,
      },
      {
        x: 525.9473725943548,
        y: 379.40591145041674,
      },
      {
        x: 530.9473725943548,
        y: 378.8059114504167,
      },
    ],
  },
  {
    id: 140,
    realIdForDb: 194823,
    color: "#7f0212",
    points: [
      {
        x: 761.8550774317392,
        y: 170.64575488547797,
      },
      {
        x: 761.4550774317393,
        y: 224.04575488547798,
      },
      {
        x: 829.2550774317391,
        y: 224.44575488547798,
      },
      {
        x: 829.2550774317391,
        y: 227.845754885478,
      },
      {
        x: 871.8550774317391,
        y: 227.845754885478,
      },
      {
        x: 872.0550774317392,
        y: 224.04575488547798,
      },
      {
        x: 909.0550774317392,
        y: 224.245754885478,
      },
      {
        x: 909.0550774317392,
        y: 175.44575488547798,
      },
      {
        x: 893.0550774317392,
        y: 175.44575488547798,
      },
      {
        x: 893.0550774317392,
        y: 171.245754885478,
      },
    ],
  },
  {
    id: 141,
    realIdForDb: 194824,
    color: "#7f0212",
    points: [
      {
        x: 909.4550774317391,
        y: 202.845754885478,
      },
      {
        x: 909.0550774317392,
        y: 250.845754885478,
      },
      {
        x: 927.0550774317392,
        y: 251.04575488547798,
      },
      {
        x: 927.0550774317392,
        y: 255.04575488547798,
      },
      {
        x: 1038.0550774317392,
        y: 254.845754885478,
      },
      {
        x: 1037.655077431739,
        y: 250.845754885478,
      },
      {
        x: 1056.0550774317392,
        y: 251.04575488547798,
      },
      {
        x: 1055.8550774317391,
        y: 202.64575488547797,
      },
      {
        x: 1040.455077431739,
        y: 202.44575488547798,
      },
      {
        x: 1040.0550774317392,
        y: 198.04575488547798,
      },
      {
        x: 927.0550774317392,
        y: 198.245754885478,
      },
      {
        x: 926.4550774317391,
        y: 202.845754885478,
      },
    ],
  },
  {
    id: 142,
    realIdForDb: 194825,
    color: "#7f0212",
    points: [
      {
        x: 1060.2550774317392,
        y: 226.245754885478,
      },
      {
        x: 1059.8550774317391,
        y: 325.84575488547796,
      },
      {
        x: 1138.8550774317391,
        y: 326.045754885478,
      },
      {
        x: 1138.655077431739,
        y: 226.04575488547798,
      },
    ],
  },
];

// const PROJECT_ID_GALA_ONE = 54255;

type Point = { x: number; y: number };
type Polygon = {
  id: number;
  realIdForDb: number;
  color: string;
  points: Point[];
  data?: any;
};

function YourLayout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Virtual canvas dimensions
  const virtualWidth = 1300;
  const virtualHeight = 700;

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  // const [currentPolygon, setCurrentPolygon] = useState<Polygon | null>(null);
  // const [hoveredPolygon, setHoveredPolygon] = useState<Polygon | null>(null);
  // Պահում ենք նկարը state–ում, որպեսզի onload-ից հետո trigger լինի redraw
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) {
        return;
      }

      const container = containerRef.current;
      const canvas = canvasRef.current;

      // Կանվասի pixel buffer-ը պետք է հավասար լինի CSS չափերին՝ որ անհստակ չլինի
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

  // Տվյալների և նկարի բեռնում
  useEffect(() => {
    setPolygons(polygonsData);

    const img = new Image();
    img.src = "/img/gala-one/top-view-x-clear-bg.png";
    img.onload = () => setImageEl(img); // state -> redraw կգա dependency-ների միջոցով
  }, []);

  // // Պոլիգոնի նկարումը
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

    // Թափանցիկության ապահով տարբերակ՝ rgba
    const rgba = isHovered ? "rgba(127,2,18,0.5)" : "rgba(127,2,18,0.25)";
    ctx.fillStyle = rgba;
    ctx.strokeStyle = poly.color;
    ctx.lineWidth = (isHovered ? 2.5 : 1.5) / scale;

    if (poly.points.length >= 3) {
      ctx.closePath();
    }
    ctx.fill();
    ctx.stroke();

    // if (poly === currentPolygon) {
    //   for (const p of poly.points) {
    //     ctx.beginPath();
    //     ctx.arc(p.x, p.y, 4 / scale, 0, Math.PI * 2);
    //     ctx.fillStyle = poly.color;
    //     ctx.fill();
    //     ctx.strokeStyle = "white";
    //     ctx.stroke();
    //   }
    // }
  };

  // Գլխավոր redraw
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

    // Նկար
    if (imageEl) {
      ctx.drawImage(imageEl, 0, 0, virtualWidth, virtualHeight);
    }

    // Պոլիգոններ
    for (const poly of polygons) {
      drawPolygon(ctx, poly, false);
    }
    // if (currentPolygon) {
    //   drawPolygon(ctx, currentPolygon, false);
    // }

    ctx.restore();
  };

  useEffect(() => {
    redraw();
  }, [polygons, scale, offset, imageEl]);

  return (
    <div className="your-layout !mt-10">
      <div className="wrapper">
        <h2>Выберите свою планировку</h2>
        <div className="info">
          <div className="images md:pb-10">
            <div className="scroll">
              {[...Array(5)].map((_, i) => (
                <div className="img" key={i}>
                  <img src="/img/your-layout-img.png" alt="" />
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
              className="absolute inset-0 cursor-pointer w-full h-full transform scale-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourLayout;
