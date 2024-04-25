import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { useStorage } from "@/liveblocks.config";
import { root } from "postcss";

const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

export const getShapeInfo = (shapeType: string) => {
  switch (shapeType) {
    case "rect":
      return {
        icon: "/assets/rectangle.svg",
        name: "Rectangle",
      };

    case "circle":
      return {
        icon: "/assets/circle.svg",
        name: "Circle",
      };

    case "triangle":
      return {
        icon: "/assets/triangle.svg",
        name: "Triangle",
      };

    case "line":
      return {
        icon: "/assets/line.svg",
        name: "Line",
      };

    case "i-text":
      return {
        icon: "/assets/text.svg",
        name: "Text",
      };

    case "image":
      return {
        icon: "/assets/image.svg",
        name: "Image",
      };

    case "freeform":
      return {
        icon: "/assets/freeform.svg",
        name: "Free Drawing",
      };

    default:
      return {
        icon: "/assets/rectangle.svg",
        name: shapeType,
      };
  }
};

export const exportToPdf = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  // use jspdf
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  // get the canvas data url
  const data = canvas.toDataURL();

  // add the image to the pdf
  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

  // download the pdf
  doc.save("canvas.pdf");
};

export const exportToJpeg = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  // Create a temporary anchor element
  const anchor = document.createElement("a");

  // Set the download attribute and href with the canvas data URL
  anchor.download = "canvas.jpeg";
  anchor.href = canvas.toDataURL("image/jpeg");

  // Trigger a click event on the anchor element to start the download
  anchor.click();
};


  export const exportToJson = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;
     console.log(canvas)
    // Get the canvas data as JSON
    const canvasData = {
      width: canvas.width,
      height: canvas.height,
      dataUrl: canvas.toDataURL(),
    };

    // Create a temporary anchor element
    const anchor = document.createElement("a");

    // Set the download attribute and href with the canvas data URL
    anchor.download = "canvas.json";
    anchor.href = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(canvasData))}`;

    // Trigger a click event on the anchor element to start the download
    anchor.click();
  };

 
