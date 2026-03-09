export default function PythOracleIcon({ className }: { className?: string }) {
  return (
    <img
      className={`w-[13px] h-[13px] ml-1 ${className || ""}`}
      src="/common/pyth.svg"
      alt="Pyth Oracle"
    />
  );
}
