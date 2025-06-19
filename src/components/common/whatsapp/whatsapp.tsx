import "./whatsapp.scss";
import Link from "next/link";

function Whatsapp() {
  return (
    <div className="rs-video whatsapp-fixed">
      <div className="animate-border">
        <Link
          className="video-vemo-icon btn-whatsapp"
          aria-label="WhatsApp"
          href="https://wa.me/+77001085757"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-whatsapp"></i>
          <div className="sm-red-dot"></div>
        </Link>
      </div>
      <div id="hover-message" className="quick-message">
        <p>Свяжитесь с нами через Whatsapp</p>
        <div className="seta-direita"></div>
      </div>
    </div>
  );
}

export default Whatsapp;
