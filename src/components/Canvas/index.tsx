import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import backgroundImg from '$assets/img/background.jpg';
import { useResize } from '$hooks';

interface IProps {
  isHidden?: boolean;
  image: Blob | null;
  name: string;
  materials: string;
  placeAndYear: string;
  isOriginal: boolean;
  isLimited: boolean;
  className?: string;
}

const MAX_WIDTH_CANVAS = 700;

const BACKGROUND_WIDTH = 2385;
const BACKGROUND_HEIGHT = 1625;
const BACKGROUND_CF = BACKGROUND_WIDTH / BACKGROUND_HEIGHT;
const BACKGROUND_TEXT_LEFT_POSITION = 1190;
const BACKGROUND_TEXT_SIZE = 115;

const handleAddImg = (ctx: CanvasRenderingContext2D, cf: number, image: Blob) => {
  const img = new Image();
  img.src = URL.createObjectURL(image);

  img.onload = () => {
    const xStart = 80 / cf;
    const xCenter = 575 / cf;

    const yStart = 175 / cf;
    const yCenter = 835 / cf;

    const widthPlace = 990 / cf;
    const heightPlace = 1320 / cf;

    const cfImg = img.width / widthPlace;

    const isHorizontal = img.width > img.height;

    if (isHorizontal) {
      const height = img.height / cfImg;
      const y = yCenter - height / 2;
      ctx.drawImage(img, xStart, y, widthPlace, height);
    } else {
      const width = img.width / cfImg;
      const x = xCenter - width / 2;
      ctx.drawImage(img, x, yStart, width, heightPlace);
    }
  };
};

const handleAddName = (ctx: CanvasRenderingContext2D, cf: number, text: string) => {
  const x = BACKGROUND_TEXT_LEFT_POSITION / cf;
  const y = 545 / cf;

  ctx.fillText(text, x, y);
};

const handleAddPlaceAndYear = (ctx: CanvasRenderingContext2D, cf: number, text: string) => {
  const x = BACKGROUND_TEXT_LEFT_POSITION / cf;
  const y = 750 / cf;

  ctx.fillText(text, x, y);
};

const handleAddMaterials = (ctx: CanvasRenderingContext2D, cf: number, text: string) => {
  const x = BACKGROUND_TEXT_LEFT_POSITION / cf;
  const y = 980 / cf;

  ctx.fillText(text, x, y);
};

const handleAddCheck = (ctx: CanvasRenderingContext2D, cf: number) => {
  const size = 49 / cf;
  const x = 1204 / cf;

  return { size, x };
};

const handleAddCheckOriginal = (ctx: CanvasRenderingContext2D, cf: number) => {
  const { size, x } = handleAddCheck(ctx, cf);
  const y = 1024 / cf;

  ctx.fillRect(x, y, size, size);
};

const handleAddCheckLimited = (ctx: CanvasRenderingContext2D, cf: number) => {
  const { size, x } = handleAddCheck(ctx, cf);
  const y = 1115 / cf;

  ctx.fillRect(x, y, size, size);
};

export const Canvas: FC<IProps> = ({
  isHidden,
  image,
  name,
  materials,
  placeAndYear,
  isOriginal,
  isLimited,
  className,
}) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(undefined);

  const [sizeCf, setSizeCf] = useState(1);

  const [widthCanvas, setWidthCanvas] = useState(window.innerWidth);
  const [heightCanvas, setHeightCanvas] = useState(window.innerHeight);

  const handleSetSizeCanvas = useCallback(() => {
    const canvas = refCanvas.current;

    if (canvas) {
      const width = isHidden
        ? BACKGROUND_WIDTH
        : window.innerWidth > MAX_WIDTH_CANVAS
        ? MAX_WIDTH_CANVAS
        : window.innerWidth - 60;

      setWidthCanvas(width);
      setHeightCanvas(Math.round(width / BACKGROUND_CF));
    }
  }, [refCanvas, isHidden]);

  useResize(handleSetSizeCanvas);

  useEffect(() => {
    setSizeCf(BACKGROUND_WIDTH / widthCanvas);
  }, [widthCanvas]);

  useEffect(() => {
    const canvas = refCanvas.current;

    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) setCtx(context);
    }
  }, [refCanvas]);

  useEffect(() => {
    const canvas = refCanvas.current;

    if (canvas && ctx) {
      const background = new Image();
      background.src = backgroundImg;

      background.onload = () => {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = `${Math.round(BACKGROUND_TEXT_SIZE / sizeCf)}px Arial`;

        if (image) handleAddImg(ctx, sizeCf, image);
        if (name.length) handleAddName(ctx, sizeCf, name);
        if (materials.length) handleAddMaterials(ctx, sizeCf, materials);
        if (placeAndYear.length) handleAddPlaceAndYear(ctx, sizeCf, placeAndYear);
        if (isOriginal) handleAddCheckOriginal(ctx, sizeCf);
        if (isLimited) handleAddCheckLimited(ctx, sizeCf);
      };

      return () => {
        background.onload = null;
      };
    }
  }, [image, name, materials, placeAndYear, isOriginal, isLimited, sizeCf]);

  return (
    <canvas
      hidden={isHidden}
      id={isHidden ? 'passport-hidden' : 'passport'}
      ref={refCanvas}
      className={className}
      width={widthCanvas}
      height={heightCanvas}
    />
  );
};
