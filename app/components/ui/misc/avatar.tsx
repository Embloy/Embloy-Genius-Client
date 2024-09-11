"use client";
import React, {useEffect} from "react";
import "@/app/globals.css";
import { alpha_24 } from "@/lib/utils/formats";
import { cn } from "@/lib/utils";
import "./local.css";

export const AvatarButton = ({ user, styles = "", w = 50, h = 50, updated_image }) => {
  // Fallback image based on the first character of the user's first name
  const fallbackImage = `/icons/${
    user?.first_name && alpha_24.includes(user.first_name.charAt(0).toLowerCase())
      ? user.first_name.charAt(0).toUpperCase()
      : "Slug"
  }.svg`;

  const [image_url, set_image_url] = React.useState(null);

  // Determine the image URL
  let imageUrl = updated_image
    ? (updated_image === "default" ? fallbackImage : updated_image)
    : user?.image_url
    ? user.image_url
    : fallbackImage;


  return (
    <button className={cn("relative flex items-center justify-center", styles)}>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          width: `${Math.min(h, w)}px`,
          height: `${Math.min(h, w)}px`,
        }}
        className="rounded-full border border-[2px] dark:border-rubeno border-etna"
      />
    </button>
  );
};
