import React from "react";

function Preloader() {
  return (
    <div className="w-full h-[100dvh] flex-jc-c bg-white fixed top-0 left-0 px-[100px] z-[100000]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        data-app="Xyris"
      >
        <defs></defs>
        <g transform="">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 299.296 130.99 L 206.654 130.99 L 206.654 335.899 L 299.296 335.899 L 299.296 130.99 Z"
            fill="#DB1D31"
            transform=""
          >
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="0;1"
              begin="1.933989389648437"
              dur="1.073353740234375"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="0; 0"
              begin="-0.00001"
              dur="1.934019389648437"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="1;1"
              begin="2.99999"
              dur="1.967353129882812"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="1;0"
              begin="4.967323129882812"
              dur="1.01335251953125"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
          </path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 299.874 130.99 L 207.225 130.99 L 207.225 335.899 L 299.874 335.899 L 299.874 130.99 Z"
            fill="#132C5E"
            transform=""
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              begin="0.9669896948242186"
              dur="0.9200199999999997"
              keyTimes="0; 1"
              values="0, 0;105, 0"
              fill="freeze"
              additive="sum"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animateTransform>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="0;1"
              begin="-0.00001"
              dur="0.9670196948242186"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="1; 1"
              begin="1.8869896948242182"
              dur="3.080353435058594"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="translate"
              begin="3.9939893896484358"
              dur="0.9990200000000015"
              keyTimes="0; 1"
              values="0;-105, 0"
              fill="freeze"
              additive="sum"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animateTransform>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="1; 0"
              begin="5.0799900000000004"
              dur="0.9006856494140622"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
          </path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 299.867 130.99 L 207.225 130.99 L 207.225 335.899 L 299.867 335.899 L 299.867 130.99 Z"
            fill="#132C5E"
            transform=""
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              begin="0.9669896948242186"
              dur="0.9670196948242186"
              keyTimes="0; 1"
              values="0, 0;-105, 0"
              fill="freeze"
              additive="sum"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animateTransform>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="0;1"
              begin="-0.00001"
              dur="0.9670196948242186"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="1; 1"
              begin="1.933989389648437"
              dur="3.033353740234375"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="translate"
              begin="3.9663231298828125"
              dur="1.0266862597656246"
              keyTimes="0; 1"
              values="0;105, 0"
              fill="freeze"
              additive="sum"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animateTransform>
            <animate
              attributeName="opacity"
              keyTimes="0; 1"
              values="1; 0"
              begin="4.967323129882812"
              dur="1.01335251953125"
              fill="freeze"
              calcMode="spline"
              keySplines="0 0 1 1"
            ></animate>
          </path>
        </g>
      </svg>
    </div>
  );
}

export default Preloader;
