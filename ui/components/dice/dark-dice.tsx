import Image from "next/image";

const diceImages = [
  "/icons/dice/dark-dice-1.png",
  "/icons/dice/dark-dice-2.png",
  "/icons/dice/dark-dice-3.png",
  "/icons/dice/dark-dice-4.png",
  "/icons/dice/dark-dice-5.png",
  "/icons/dice/dark-dice-6.png",
];

function DarkDice({ n = 1, s = 120 }: { n?: number; s?: number }) {
  const selectedDiceImage = diceImages[n - 1];
  return (
    <Image
      width={s}
      height={s + 8}
      alt={`Dark Dice ${n - 1}`}
      src={selectedDiceImage}
    />
  );
}

export default DarkDice;
