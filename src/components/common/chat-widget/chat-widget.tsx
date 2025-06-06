import { useEffect } from "react";

declare global {
  interface Window {
    IntDial: any;
  }
}

const ChatWidget = () => {
  useEffect(() => {
    // Ստեղծում ենք script tag
    const script = document.createElement("script");
    script.src = `https://chat.intellectdialog.com/files/constructors/widgets/app.js?t=${Date.now()}`;
    script.async = true;

    // Երբ script-ը բեռնված է, կանչում ենք IntDial
    script.onload = () => {
      new window.IntDial("5b74b38d-e96e-3ac0-4006-cd656c0cc8fd");
    };

    // Ավելացնում ենք script-ը head-ում
    document.head.appendChild(script);

    // Մաքրում ենք script-ը component-ի unmount-ի ժամանակ
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Այս component-ը ոչինչ չի վերադարձնում, պարզապես բեռնում է widget-ը
};

export default ChatWidget;
