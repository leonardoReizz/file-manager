import pdfIcon from "@assets/file-icons/PDF.svg";
import aiIcon from "@assets/file-icons/AI.svg";
import docIcon from "@assets/file-icons/DOC.svg";
import jpgIcon from "@assets/file-icons/JPG.svg";
import pptIcon from "@assets/file-icons/PPT.svg";
import psdIcon from "@assets/file-icons/PSD.svg";
import svgIcon from "@assets/file-icons/SVG.svg";
import xlsIcon from "@assets/file-icons/XLS.svg";
import zipIcon from "@assets/file-icons/ZIP.svg";
import cssIcon from "@assets/file-icons/CSS.svg";
import htmlIcon from "@assets/file-icons/HTML.svg";
import tsIcon from "@assets/file-icons/TS.svg";
import txtIcon from "@assets/file-icons/TXT.svg";
import jsIcon from "@assets/file-icons/JS.svg";
import gifIcon from "@assets/file-icons/GIF.svg";
import mp3Icon from "@assets/file-icons/MP3.svg";

export type ExtensionType =
  | ".pdf"
  | ".ai"
  | ".jpg"
  | ".ppt"
  | ".svg"
  | ".xls"
  | ".css"
  | ".html"
  | ".ts"
  | ".tst"
  | ".gif"
  | ".mp3"
  | ".zip"
  | ".jpg";

interface FileIconProps {
  extension: ExtensionType;
  className?: string | undefined;
}

export function FileIcon({ extension, className }: FileIconProps) {
  return (
    <img
      className={`${className} h-6 w-6 `}
      src={
        extension.startsWith(".pdf")
          ? pdfIcon
          : extension.startsWith(".ai")
          ? aiIcon
          : extension.startsWith(".doc")
          ? docIcon
          : extension.startsWith(".jpg")
          ? jpgIcon
          : extension.startsWith(".ppt")
          ? pptIcon
          : extension.startsWith(".psd")
          ? psdIcon
          : extension.startsWith(".svg")
          ? svgIcon
          : extension.startsWith(".xls")
          ? xlsIcon
          : extension.startsWith(".css")
          ? cssIcon
          : extension.startsWith(".html")
          ? htmlIcon
          : extension.startsWith(".ts")
          ? tsIcon
          : extension.startsWith(".txt")
          ? txtIcon
          : extension.startsWith(".gif")
          ? gifIcon
          : extension.startsWith(".mp3")
          ? mp3Icon
          : extension.startsWith(".zip")
          ? zipIcon
          : extension.startsWith(".js")
          ? jsIcon
          : zipIcon
      }
      alt=""
    />
  );
}
