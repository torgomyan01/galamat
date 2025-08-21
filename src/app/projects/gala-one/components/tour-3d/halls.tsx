const items = [
  <iframe
    key="tour-3d-555"
    width="100%"
    height="640"
    frameBorder="0"
    allow="xr-spatial-tracking; gyroscope; accelerometer"
    allowFullScreen
    scrolling="no"
    className="h-[60dvh]"
    src="https://kuula.co/share/hx6cM?logo=1&info=0&logosize=110&fs=1&vr=0&thumbs=3&inst=0"
  />,
  <iframe
    key="tour-3d-5566"
    width="100%"
    height="640"
    frameBorder="0"
    allow="xr-spatial-tracking; gyroscope; accelerometer"
    allowFullScreen
    scrolling="no"
    className="h-[60dvh]"
    src="https://kuula.co/share/hx6cd?logo=1&info=0&logosize=110&fs=1&vr=0&thumbs=3&inst=0"
  />,
  <iframe
    key="tour-3d-5567"
    width="100%"
    height="640"
    frameBorder="0"
    allow="xr-spatial-tracking; gyroscope; accelerometer"
    allowFullScreen
    scrolling="no"
    className="h-[60dvh]"
    src="https://kuula.co/share/hx6cj?logo=1&info=0&logosize=110&fs=1&vr=0&thumbs=3&inst=0"
  ></iframe>,
];

interface IThisProps {
  activeIndex: number;
}

function Halls({ activeIndex }: IThisProps) {
  return <div className="w-full">{items[activeIndex]}</div>;
}

export default Halls;
