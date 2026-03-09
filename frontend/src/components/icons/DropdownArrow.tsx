export default function DropdownArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.47 8.47a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06L12 10.06l-5.47 5.47a.75.75 0 01-1.06-1.06l6-6z"
        fill="fff"
      ></path>
    </svg>
  );
}
