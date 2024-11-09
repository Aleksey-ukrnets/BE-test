import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useClickCooldownStore } from "../store/useClickCooldown";

interface TouchPosition {
  x: number;
  y: number;
}

const clickLimit = 35;
const mockEnergyPerTap = 10;
const streakMultipliers: Record<number, number> = {
  5: 2,
  10: 3,
  20: 5,
};
const mockReward = 5;

const useTouchHandler = () => {
  const [clickPositions, setClickPositions] = useState<TouchPosition[]>([]);
  const [energy, setEnergy] = useState(1000);
  const [balance, setBalance] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const {
    clickCount,
    cooldown,
    incrementClickCount,
    resetClickCount,
    startCooldown,
    decrementCooldown,
  } = useClickCooldownStore();

  const cooldownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (clickCount >= clickLimit) {
      startCooldown();
      toast.error("Превышено количество кликов в минуту");
    }
  }, [clickCount, startCooldown]);
  // TIMER COOLDOWN AFTER CLICK LIMIT
  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setInterval(() => {
        decrementCooldown();
      }, 1000);
    } else if (cooldown === 0 && cooldownRef.current) {
      clearInterval(cooldownRef.current);
      cooldownRef.current = null;
      resetClickCount();
      setStreak(0);
      setMultiplier(1);
    }

    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
      }
    };
  }, [cooldown, decrementCooldown, resetClickCount]);
  //CLICK PER POSITIONS
  const handleTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (energy < mockEnergyPerTap) {
      toast.error("Недостаточно энергии");
      return;
    }

    if (clickCount >= clickLimit) {
      toast.error(`Слишком много кликов, подождите ${cooldown} секунд`);
      return;
    }

    const touches = event.touches;

    for (let i = 0; i < touches.length; i++) {
      const x = touches[i].clientX;
      const y = touches[i].clientY;
      setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    }

    // UPDATE MULTIPLIER
    setStreak((prevStreak) => {
      const newStreak = prevStreak + 1;

      if (streakMultipliers[newStreak]) {
        setMultiplier(streakMultipliers[newStreak]);
      }

      return newStreak;
    });
    const reward = mockReward * multiplier;
    setEnergy((prev) => prev - mockEnergyPerTap);
    setBalance((prev) => prev + reward);
    incrementClickCount();
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
    cooldown,
    streak,
    reward: mockReward * multiplier,
  };
};

export default useTouchHandler;
