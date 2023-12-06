import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "./Button";

function Landing() {
  const { t } = useTranslation();
  const SCREEN_NAME = "landing";
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            {t(`${SCREEN_NAME}.title`)}
          </span>
          <span className="block">{t(`${SCREEN_NAME}.title1`)}</span>
          <span className="block">{t(`${SCREEN_NAME}.title2`)}</span>
        </h1>

        <div className="space-x-8">
          <Button title={t(`${SCREEN_NAME}.button`)} />
          <a className="link" href="https://www.apple.com/iphone-15/">
            {t(`${SCREEN_NAME}.button1`)}
          </a>
        </div>
      </div>

      <a
        className=" relative hidden h-[450px] w-[450px] md:h-[650px] md:w-[600px] overflow-hidden transform transition-transform duration-500 hover:scale-150 cursor-pointer  md:inline lg:h-[650px] lg:w-[600px]"
        href="https://www.apple.com/iphone-15/"
      >
        <Image
          src="/iphone-15.png"
          fill
          style={{ objectFit: "contain" }}
          alt="iphone"
        />
      </a>
    </section>
  );
}

export default Landing;
