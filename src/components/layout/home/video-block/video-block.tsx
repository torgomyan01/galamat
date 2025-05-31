import "./video-block.scss";

function VideoBlock() {
  return (
    <div className="video-block">
      <div className="wrapper">
        <video autoPlay loop muted playsInline>
          <source src="img/video/galamat-cover.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default VideoBlock;
