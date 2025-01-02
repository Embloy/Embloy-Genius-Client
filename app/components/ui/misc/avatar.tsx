"use client";
import React from "react";
import "@/app/globals.css";
import { alpha_24 } from "@/lib/utils/formats";
import { cn } from "@/lib/utils";
import "./local.css";

export const AvatarButton = ({
  user, // Can be user or company
  isUser = true, // Set to false if it's a company
  styles = "",
  w = 50,
  h = 50,
  updated_image,
  btn = true,
}) => {
  // Determine user-specific properties
  
  const name = isUser ? user?.first_name : user?.company_name;
  const imageProp = isUser ? user?.image_url : user?.company_logo;
  // Fallback image based on the first character of the name
  const fallbackImage = `/icons/${
    name && alpha_24.includes(name.charAt(0).toLowerCase())
      ? name.charAt(0).toUpperCase()
      : "Slug"
  }.svg`;

  // Determine the image URL
  const imageUrl = updated_image
    ? updated_image === "default"
      ? fallbackImage
      : updated_image
    : imageProp
    ? imageProp
    : fallbackImage;

  // Avatar content
  const avatarContent = (
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
  );

  // Render button or div based on `btn`
  return btn ? (
    <button className={cn("relative flex items-center justify-center", styles)}>
      {avatarContent}
    </button>
  ) : (
    <div className={cn("relative flex items-center justify-center", styles)}>
      {avatarContent}
    </div>
  );
};
