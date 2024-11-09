import useTouchHandler from "@/shared/hooks/useTouchHandler";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Title } from "@telegram-apps/telegram-ui";
import cn from "classnames";
import clickerImg from "@/assets/сlickerImg.png";
const sameStyles = "flex items-center justify-between";

export const Game = () => {
  const { initData } = useLaunchParams();

  const { clickPositions,reward, energy, balance, cooldown, handleTouch } =
    useTouchHandler();
  const userData = [
    { title: "energy", value: energy },
    { title: "balance", value: balance },
  ];

  return (
    <div className="px-6 w-full">
      <div className={cn("w-full ", sameStyles)}>
        <Title>User</Title>
        <div>{initData?.user?.username}</div>
      </div>
      <div className="mt-6">
        {userData.map((el) => (
          <div key={el.title} className={sameStyles}>
            <Title level="3">{el.title}</Title>
            <div>{el.value}</div>
          </div>
        ))}
      </div>
      {cooldown > 0 && (
        <div className={sameStyles}>
          <Title level="3">Cooldown to taps</Title>
          <div>{cooldown}</div>
        </div>
      )}
      <div
        className="w-full h-full border-red-100"
        
        onTouchStart={(e) => handleTouch(e)}
      >
        <img src={clickerImg} alt="clickImage" />
        {clickPositions.map((position, index) => (
          <p
            className="fly absolute"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
            key={index}
          >
            {reward}
          </p>
        ))}
      </div>
    </div>
  );
};
