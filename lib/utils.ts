import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cast_date = (args: string, format_code:string) => {
  const date = new Date(args);
  let formattedDate = '';

  switch (format_code.toLowerCase()) {
    case 'us':
      formattedDate = date.toLocaleDateString('en-US');
      break;
    case 'uk':
      formattedDate = date.toLocaleDateString('en-GB');
      break;
    case 'iso':
      formattedDate = date.toISOString();
      break;
    case 'de':
      formattedDate = date.toLocaleDateString('de-DE');
      break;
    default:
      formattedDate = args;
      break;
  }

  return formattedDate;
}