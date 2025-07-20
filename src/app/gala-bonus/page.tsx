"use client";

import MainTemplate from "@/components/common/main-template/main-template";
import "./gala-bonus.scss";
import React, { useEffect, useState } from "react";
import { addToast, Button, Checkbox, InputOtp } from "@heroui/react";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import BonusBlock from "@/app/gala-bonus/bonus-block";
import { InputMask } from "@react-input/mask";
import { ActionSendMessage } from "@/app/actions/phone/send-message";
import {
  getRemainingDaysText90Days,
  normalizeKazakhstanPhoneNumber,
} from "@/utils/helpers";
import { ActionCheckCode } from "@/app/actions/phone/check-code";
import moment from "moment";
import { ActionUpdateCode } from "@/app/actions/phone/update-now";
import { Fade } from "react-awesome-reveal";

function Requests() {
  const [modalCheckPhone, setModalCheckPhone] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const [openBlockCode, setOpenBlockCode] = useState(false);

  const [phoneSucceed, setPhoneSucceed] = useState<boolean>(false);

  const [startPlying, setStartPlying] = useState<
    "phone-success" | "wait-day" | "start"
  >("phone-success");

  const [loading, setLoading] = useState(false);

  const [sendData, setSendData] = useState<IDataSendMessage | null>(null);
  const [codeInput, setCodeInput] = useState("");

  useEffect(() => {
    if (sendData) {
      if (sendData.data.status === "played") {
        setStartPlying("wait-day");
        setModalCheckPhone(false);
      } else if (sendData.data.status === "verified") {
        setStartPlying("start");
        setModalCheckPhone(false);

        addToast({
          title: `Вы еще не закончили, можете начать.`,
          color: "default",
        });
      } else if (sendData.data.status === "no-verified") {
        setOpenBlockCode(true);
      }
      if (
        sendData.status === "have-db" &&
        sendData.data.status !== "verified" &&
        sendData.data.status !== "played"
      ) {
        addToast({
          title: `Код уже отправлено ваше WhatsApp, ${moment(sendData.data.timeout).format("DD.MM.YYYY hh:mm")} проверьте пожалуйста`,
          color: "default",
        });
      }
    }
  }, [sendData]);

  const getFilteredNumber = normalizeKazakhstanPhoneNumber(phoneNumber);

  function sendCodeNumber(e: any) {
    e.preventDefault();

    if (!phoneNumber) {
      addToast({
        title: "Напишите, пожалуйста, ваш телефон",
        color: "warning",
      });
      return;
    }

    if (!name) {
      addToast({
        title: "Напишите, пожалуйста, ваш имя",
        color: "warning",
      });
      return;
    }

    setLoading(true);

    ActionSendMessage(getFilteredNumber, name)
      .then((result: any) => {
        const checkRemainingDays = getRemainingDaysText90Days(
          result.data.timeout,
        );

        if (checkRemainingDays > 0) {
          setSendData(result);
        } else {
          ActionUpdateCode(result.data.id).then((res: any) => {
            setSendData(res);
          });
        }
      })
      .finally(() => setLoading(false));
  }

  const [loadingCheckCode, setLoadingCheckCode] = useState(false);

  function numberSucceed(e: any) {
    e.preventDefault();

    if (sendData) {
      if (codeInput) {
        addToast({
          title: "Подождите пожалуйста",
          color: "warning",
        });

        setLoadingCheckCode(true);
        ActionCheckCode(getFilteredNumber, +codeInput)
          .then((result: any) => {
            if (result.data) {
              setPhoneSucceed(true);

              setSendData(result);

              setTimeout(() => {
                setModalCheckPhone(false);
                setStartPlying("start");
              }, 3000);

              addToast({
                title: "Спасибо начинаем",
                color: "success",
              });
            } else {
              addToast({
                title: "Неверные код ",
                color: "danger",
              });
            }
          })
          .finally(() => setLoadingCheckCode(false));
      } else {
        addToast({
          title: "Неправильные код",
          color: "danger",
        });
      }
    }
  }

  return (
    <MainTemplate>
      {startPlying === "phone-success" ? (
        <div className="bonus-wrap">
          <div className="wrapper">
            <div className="bonus-info">
              <div className="texts">
                <Fade direction="left" triggerOnce delay={3000}>
                  <h1>Gala Bonus</h1>
                </Fade>
                <Fade direction="left" triggerOnce delay={3200}>
                  <p>
                    Испытайте удачу, запустите колесо удачи и выйграйте
                    гарантированный приз, бонус можно потратить на покупку
                    квартиры
                  </p>
                </Fade>
                <Fade direction="left" triggerOnce delay={3400}>
                  <Button
                    onPress={() => setModalCheckPhone(true)}
                    className="red-btn"
                  >
                    Запустить колесо удачи
                  </Button>
                </Fade>
              </div>
              <div className="bonus">
                <Fade direction="right" triggerOnce delay={4400}>
                  <img src="/img/gala-bonus-role.svg" alt="" />
                </Fade>
              </div>
            </div>
          </div>
        </div>
      ) : startPlying === "start" ? (
        <BonusBlock data={sendData} />
      ) : (
        <div className="bonus-wrap">
          <div className="wrapper">
            <div className="bonus-info">
              <div className="texts">
                <h1>Gala Bonus</h1>
                <p>
                  Вы уже участвовали в Gala Bonus. До следующей попытки осталось
                </p>
                {sendData ? (
                  <h3 className="text-[30px] text-white tracking-[-0.9px] flex-js-c gap-3">
                    <img src="/img/icons/time-white.svg" alt="time-white.svg" />
                    {getRemainingDaysText90Days(sendData.data.timeout)} дней
                  </h3>
                ) : null}
              </div>
              <div className="bonus">
                <img src="/img/gala-bonus-role.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalCheckPhone}
        onOpenChange={() => setModalCheckPhone(false)}
      >
        <ModalContent className="bg-blue">
          <ModalBody>
            {!phoneSucceed ? (
              <h2 className="text-center text-white text-[45px] font-medium mt-6 leading-[40px]">
                Пройдите верификацию
              </h2>
            ) : null}

            {openBlockCode ? (
              <>
                {phoneSucceed ? (
                  <>
                    <h2 className="text-center text-white text-[30px] font-medium mt-6 leading-[40px]">
                      Верификация успешно пройдена!
                    </h2>

                    <div className="w-full flex-jc-c mt-[78px]">
                      <img
                        src="/img/icons/green-check.svg"
                        alt="green-check.svg"
                      />
                    </div>

                    <p className="text-center text-white text-[20px] mt-[50px] mb-6">
                      Вы успешно подтвердили свой номер. Колесо Фортуны Gala
                      Bonus будет активировано автоматически.
                    </p>
                  </>
                ) : (
                  <form action="#" onSubmit={numberSucceed}>
                    <p className="text-center text-white text-[20px] mt-[50px]">
                      Мы отправили вам код. Пожалуйста, введите его для
                      подтверждения.
                    </p>

                    <div className="w-full flex-jc-c overflow-hidden mt-6">
                      <InputOtp
                        length={4}
                        size="lg"
                        variant="bordered"
                        color="primary"
                        onValueChange={(e) => setCodeInput(e)}
                        classNames={{
                          wrapper: "flex-jc-c",
                          errorMessage: "text-center",
                          segment:
                            "w-16 h-16 border-[1px] text-white text-[30px]",
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      isLoading={loadingCheckCode}
                      className="w-full bg-[#2859AA] text-white mb-6 mt-4 rounded-[30px] text-[20px] h-[53px]"
                    >
                      Подтвердить
                    </Button>
                  </form>
                )}
              </>
            ) : (
              <form action="#" onSubmit={sendCodeNumber}>
                <p className="text-center text-white text-[20px] mt-[50px]">
                  Введите номер телефона, чтобы получить код подтверждения
                </p>

                <div className="w-full border-[2px] !border-[#2859AA] rounded-[30px] py-2 mt-[50px] mb-4">
                  <InputMask
                    mask="+7 (___) ___-__-__"
                    replacement={{ _: /\d/ }}
                    value={phoneNumber}
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-transparent text-white text-center text-[20px]"
                    placeholder="Введите номер телефона "
                  />
                </div>
                <div className="w-full border-[2px] !border-[#2859AA] rounded-[30px] py-2 mb-4">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-white text-[20px] text-center"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <Checkbox
                  isRequired
                  color="danger"
                  className="ml-4"
                  classNames={{
                    label: "text-white text-[#D9D9D9] text-[10.085px]",
                    wrapper: "w-5 h-5 rounded-[4px]",
                  }}
                >
                  Согласие на сбор и обработку персональных данных
                </Checkbox>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full bg-[#2859AA] text-white mb-6 mt-4 rounded-[30px] text-[20px] h-[53px]"
                >
                  Отправить
                </Button>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </MainTemplate>
  );
}

export default Requests;
