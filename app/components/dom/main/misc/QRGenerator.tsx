import React, { useRef, useState } from "react";
import "@/app/globals.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import QRCode from "qrcode.react";
import { get_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyP } from "@/app/components/ui/misc/text";

export function GenerateQRButton({ head, jobId }) {
  const generateModal = useDisclosure();
  const errorModal = useDisclosure();

  const [generating, setGenerating] = useState(false);
  const [qrValue, setQrValue] = useState<string>(null);
  const qrRef = useRef(null);
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const handleGenerate = async () => {
    setGenerating(true);
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    try {
      const data = await get_core(
        `/resource?qr=1&exp=${date.getTime()}${
          jobId ? `&job_id=${jobId}` : ""
        }`,
        router,
        false,
        "POST"
      );
      if (data.query_token) {
        setQrValue(`https://embloy.com/sdk/apply?gq=${data.query_token}`);
      } else {
        setQrValue(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const borderSize = 100; // Adjust this value to change the border thickness

    // Create a new canvas with space for the border
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width + borderSize * 2;
    newCanvas.height = canvas.height + borderSize * 2;
    const newContext = newCanvas.getContext("2d");

    // Draw a white rectangle for the border
    newContext.fillStyle = "#ffffff";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw the original QR code on top of the white rectangle
    newContext.putImageData(imageData, borderSize, borderSize);

    const pngUrl = newCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let tempLink = document.createElement("a");
    tempLink.href = pngUrl;
    tempLink.setAttribute("download", "embloy-qr-code.png");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const handleDownloadQREmbed = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const borderSize = 1200;
    const padding = 400;
    const moveDown = 1000; // Adjust this value to move the QR code and text down
    const icon = new Image();
    const text = new Image();
    icon.src = "https://genius.embloy.com/icons/qrcode-button.png";
    text.src = "https://genius.embloy.com/icons/qrcode-text.png";

    // Calculate new width and height with a 3:2 aspect ratio
    const newWidth = canvas.width + borderSize * 2 + padding * 2;
    const newHeight = (newWidth * 3) / 2 + moveDown;

    const newCanvas = document.createElement("canvas");
    newCanvas.width = newWidth;
    newCanvas.height = newHeight;
    const newContext = newCanvas.getContext("2d");
    newContext.fillStyle = "#211B2E";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw a white border around the QR code
    newContext.fillStyle = "#ffffff";
    newContext.fillRect(
      borderSize,
      borderSize + moveDown,
      canvas.width + padding * 2,
      canvas.height + padding * 2
    );

    newContext.putImageData(
      imageData,
      borderSize + padding,
      borderSize + padding + moveDown
    );

    // Draw the text above the QR code with additional padding
    newContext.drawImage(
      text,
      newCanvas.width / 2 - text.width / 2,
      borderSize - text.height - padding + moveDown
    );

    // Draw the icon at the bottom of the page
    newContext.drawImage(
      icon,
      newCanvas.width / 2 - icon.width / 2,
      newCanvas.height - icon.height - padding
    );

    const pngUrl = newCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "embloy-qr-code-embedded.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <EmbloyV className={undefined}>
      
      <button
      onClick={() => {
        handleGenerate();
        generateModal.onOpen();
      }}>
        <EmbloyToolboxImgAdvanced tooltip={"Generate Embloy QR"} path="/icons/svg/black/qr.svg" path_hovered="/icons/svg/leidoveneta/qr.svg" dark_path="/icons/svg/amarone/qr.svg" dark_path_hovered="/icons/svg/barbera/qr.svg" height="12" width="12" />
      </button>
    </EmbloyV>
  
    
  );
}
