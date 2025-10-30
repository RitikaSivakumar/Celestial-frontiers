import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4a8 8 0 0 1 8 8c0 2.5-1.2 4.7-3 6.2" />
      <path d="M12 4a8 8 0 0 0-8 8c0 2.5 1.2 4.7 3 6.2" />
      <path d="M12 20v-4" />
      <path d="M12 12V4" />
      <path d="M4.929 4.929l1.414 1.414" />
      <path d="M17.657 17.657l1.414 1.414" />
      <path d="M4.929 19.071l1.414-1.414" />
      <path d="M17.657 6.343l1.414-1.414" />
    </svg>
  );
}
