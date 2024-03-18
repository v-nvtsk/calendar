import React from "react";

export type ImageType = "search" | "prevArrow" | "nextArrow";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit";
  onClick?: (ev: React.MouseEvent) => void;
  title?: string;
  imageType?: ImageType;
};

export const Button = ({ className = "", title = "", imageType, type = "button", onClick }: ButtonProps) => {
  let btnContent: JSX.Element | string = title;

  if (btnContent === "") {
    switch (imageType) {
      case "search": {
        btnContent = (
          <svg data-name="search" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 
                18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        );
        break;
      }
      case "prevArrow": {
        btnContent = (
          <svg data-name="prevArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z" />
          </svg>
        );
        break;
      }
      case "nextArrow": {
        btnContent = (
          <svg data-name="nextArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M4.38 12.19 8.57 8 4.38 3.81l1.53-1.52L11.62 8l-5.71 5.71-1.53-1.52z" />
          </svg>
        );
        break;
      }
      default: {
        btnContent = "";
        break;
      }
    }
  }

  return (
    <button type={type} name={title || imageType} onClick={onClick} className={className}>
      {btnContent}
    </button>
  );
};
