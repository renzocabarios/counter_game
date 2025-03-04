import Image from "next/image";

const diceImages = [
  "/icons/dice/white-dice-1.png",
  "/icons/dice/white-dice-2.png",
  "/icons/dice/white-dice-3.png",
  "/icons/dice/white-dice-4.png",
  "/icons/dice/white-dice-5.png",
  "/icons/dice/white-dice-6.png",
];

function LightDice({ n = 1, s = 120 }: { n?: number; s?: number }) {
  const selectedDiceImage = diceImages[n - 1];
  return (
    <Image
      width={s}
      height={s + 8}
      alt={`Light Dice ${n - 1}`}
      src={selectedDiceImage}
    />
  );
}

export default LightDice;
