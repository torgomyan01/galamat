import "./leave-request.scss";
import { Input } from "@heroui/input";
import { addToast, Button } from "@heroui/react";
import { SendCallBack } from "@/utils/api";
import { useState } from "react";
import { isValidInternationalPhoneNumber } from "@/utils/consts";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { useTranslate } from "@/hooks/useTranslate";

function LeaveRequest() {
  const $t = useTranslate();
  const [loading, setLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);

  function startCallBack(e: any) {
    e.preventDefault();
    const phone = e.target.phone.value;
    const name = e.target.name.value;

    if (isValidInternationalPhoneNumber(phone)) {
      if (!name) {
        addToast({
          title: "Поле «Имя» обязательно для заполнения.",
          color: "danger",
        });
        return;
      }

      setLoading(true);
      SendCallBack(phone, name, "").then(() => {
        setLoading(false);
        setSendStatus(true);
      });
    } else {
      addToast({
        title: "Пожалуйста, введите номер телефона правильно.",
        color: "danger",
      });
    }
  }

  return (
    <div className="leave-request mt-12">
      <div className="wrapper">
        <div className="leave-request-info">
          <Fade direction="left" className="md:w-[55%] " triggerOnce>
            <div className="info">
              <div className="texts">
                <h2>{$t("leave_a_request")}</h2>
                <span>{$t("we_are_building _the_future")}</span>
              </div>
              <div className="img-wrap">
                <Image
                  src="/img/leav-request.png"
                  alt="def image"
                  width={130}
                  height={130}
                />
              </div>
            </div>
          </Fade>
          <Fade direction="right" className="md:w-[45%]" triggerOnce>
            <div className="leave-request-form">
              {sendStatus ? (
                <div className="w-full flex-jc-c flex-col gap-4">
                  <Image
                    src="img/icons/checked.svg"
                    alt="check icon"
                    width="178"
                    height="103"
                  />
                  <h4 className="text-blue text-[28.74px] font-medium tracking-[-0.862px] text-center">
                    {$t("we_have_already_received")}
                  </h4>
                </div>
              ) : (
                <form action="" onSubmit={startCallBack}>
                  <div className="mb-4">
                    <Input
                      label={$t("your_name")}
                      name="name"
                      type="text"
                      variant="bordered"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label={$t("phone_number")}
                      type="text"
                      name="phone"
                      variant="bordered"
                      required
                    />
                  </div>
                  <Button
                    className="blue-btn send-btn h-12 w-full"
                    type="submit"
                    isLoading={loading}
                  >
                    {$t("send")}
                  </Button>
                </form>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
