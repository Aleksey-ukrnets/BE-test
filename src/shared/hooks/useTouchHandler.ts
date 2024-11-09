import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useClickCooldownStore } from "../store/useClickCooldown";

interface TouchPosition {
  x: number;
  y: number;
}

const ENERGY_PER_TAP = 10;
const EXP_PER_TAP = 5;
const REWARD_PER_TAP = 5;
const BASE_EXP_TO_LEVEl_UP = 100;

const expToLevelUp = (level: number): number => {
  const growthRate = 1.15;

  if (level === 1) return BASE_EXP_TO_LEVEl_UP;
  return Math.round(BASE_EXP_TO_LEVEl_UP * Math.pow(growthRate, level - 2));
};
//Эта функция эмулирует отправку данных на сервер(кол-во) кликов
const sendTapData = (clickCount: number, setClickCount: () => void) => {
  if (clickCount > 0) {
    //тут отправка на сервер
    setClickCount();
  }
};
const useTouchHandler = () => {
  const [clickPositions, setClickPositions] = useState<TouchPosition[]>([]);
  const [energy, setEnergy] = useState(1000);
  const [balance, setBalance] = useState(0);
  const [exp, setExp] = useState(0);

  const [multiplier, setMultiplier] = useState(1);
  const [level, setLevel] = useState(1);

  const { clickCount, setClickCount, resetClickCount } =
    useClickCooldownStore();

    const tapTimeoutRef = useRef<number | null>(null);

  //дебаунс для того чтобы кадый тап не шел запрос на сервер
  const debounceTap = () => {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    tapTimeoutRef.current = window.setTimeout(() => {
      sendTapData(clickCount, resetClickCount);
    }, 1000);
  };

  //Тапы по позиции
  const handleTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (energy < ENERGY_PER_TAP) {
      toast.error("Недостаточно энергии");
      return;
    }

    const touches = event.touches;

    for (let i = 0; i < touches.length; i++) {
      const x = touches[i].clientX;
      const y = touches[i].clientY;
      setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    }

    const reward = REWARD_PER_TAP * multiplier;
    setEnergy((prev) => prev - ENERGY_PER_TAP);
    setBalance((prev) => prev + reward);

    setClickCount();
    debounceTap();
    //Обновление уровня и экспы
    setExp((prevExp) => {
      let newExp = prevExp + EXP_PER_TAP;
      let newLevel = level;
      let newMultiplier = multiplier;

      while (newExp >= expToLevelUp(newLevel + 1)) {
        newExp -= expToLevelUp(newLevel + 1);
        newLevel += 1;
        newMultiplier += 1;
      }

      setLevel(newLevel);
      setMultiplier(newMultiplier);

      return newExp;
    });
    //CLEAR DOM
    if (clickPositions.length > 100) {
      setClickPositions([]);
    }
  };

  return {
    handleTouch,
    clickPositions,
    energy,
    balance,
    level,
    multiplier,
    expToLevelUp,
    exp,
    reward: REWARD_PER_TAP * multiplier,
  };
};

export default useTouchHandler;
