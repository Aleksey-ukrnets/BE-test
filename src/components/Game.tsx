import useTouchHandler from "@/shared/hooks/useTouchHandler";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Title } from "@telegram-apps/telegram-ui";
import cn from "classnames";
import clickerImg from "@/assets/сlickerImg.png";
const sameStyles = "flex items-center justify-between";
export const Game = () => {
  const { initData } = useLaunchParams();

  const {
    clickPositions,
    reward,
    energy,
    balance,
    multiplier,
    level,
    exp,
    expToLevelUp,
    handleTouch,
  } = useTouchHandler();
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
      <div className={sameStyles}>
        <Title level="3">exp to level up</Title>
        <div>{exp}/{expToLevelUp(level + 1)}</div>
      </div>
      <div className={sameStyles}>
        <Title level="3">multiplier</Title>
        <div>{multiplier}</div>
      </div>

      <div className={sameStyles}>
        <Title level="3">level</Title>
        <div>{level}</div>
      </div>

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
