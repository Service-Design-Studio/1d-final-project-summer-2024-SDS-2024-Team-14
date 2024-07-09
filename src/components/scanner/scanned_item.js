import "../../styles/globals.css"
import { Button } from "@mui/base"
import Image from "next/image"
import React, { useRef, useState, useEffect, useCallback } from "react";
import * as cv from "@techstark/opencv-js";
import { Canvas, createCanvas, ImageData } from "canvas"
////////////////////////////////////////////////////////////////////////////
/*! jscanify v1.2.0 | (c) ColonelParrot and other contributors | MIT License */

function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * Finds the contour of the paper within the image
 * @param {*} img image to process (cv.Mat)
 * @returns the biggest contour inside the image
 */
function findPaperContour(img) {
    const imgGray = new cv.Mat();
    cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY);

    const imgBlur = new cv.Mat();
    cv.GaussianBlur(
        imgGray,
        imgBlur,
        new cv.Size(5, 5),
        0,
        0,
        cv.BORDER_DEFAULT
    );

    const imgThresh = new cv.Mat();
    cv.threshold(imgBlur, imgThresh, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(
        imgThresh,
        contours,
        hierarchy,
        cv.RETR_CCOMP,
        cv.CHAIN_APPROX_SIMPLE
    );
    let maxArea = 0;
    let maxContourIndex = -1;
    for (let i = 0; i < contours.size(); ++i) {
        let contourArea = cv.contourArea(contours.get(i));
        if (contourArea > maxArea) {
            maxArea = contourArea;
            maxContourIndex = i;
        }
    }

    const maxContour = contours.get(maxContourIndex);

    imgGray.delete();
    imgBlur.delete();
    imgThresh.delete();
    contours.delete();
    hierarchy.delete();
    return maxContour;
}


/**
 * Highlights the paper detected inside the image.
 * @param {*} image image to process
 * @param {*} options options for highlighting. Accepts `color` and `thickness` parameter
 * @returns `HTMLCanvasElement` with original image and paper highlighted
 */
function highlightPaper(image, options) {
    options = options || {};
    options.color = options.color || "orange";
    options.thickness = options.thickness || 10;
    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");
    const img = cv.imread(image);

    const maxContour = findPaperContour(img);
    cv.imshow(canvas, img);
    if (maxContour) {
        const {
            topLeftCorner,
            topRightCorner,
            bottomLeftCorner,
            bottomRightCorner,
        } = getCornerPoints(maxContour, img);

        if (
            topLeftCorner &&
            topRightCorner &&
            bottomLeftCorner &&
            bottomRightCorner
        ) {
            ctx.strokeStyle = options.color;
            ctx.lineWidth = options.thickness;
            ctx.beginPath();
            ctx.moveTo(...Object.values(topLeftCorner));
            ctx.lineTo(...Object.values(topRightCorner));
            ctx.lineTo(...Object.values(bottomRightCorner));
            ctx.lineTo(...Object.values(bottomLeftCorner));
            ctx.lineTo(...Object.values(topLeftCorner));
            ctx.stroke();
        }
    }

    img.delete();
    return canvas;
}

/**
  * Extracts and undistorts the image detected within the frame.
  * @param {*} image image to process
  * @param {*} resultWidth desired result paper width
  * @param {*} resultHeight desired result paper height
  * @param {*} onComplete callback with `HTMLCanvasElement` passed - the unwarped paper
  * @param {*} cornerPoints optional custom corner points, in case automatic corner points are incorrect
  */
function extractPaper(image, resultWidth, resultHeight, cornerPoints) {
    const canvas = createCanvas();
    const img = cv.imread(image);
    const maxContour = findPaperContour(img);
    const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner,
    } = cornerPoints || getCornerPoints(maxContour, img);
    let warpedDst = new cv.Mat();
    let dsize = new cv.Size(resultWidth, resultHeight);
    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
        topLeftCorner.x,
        topLeftCorner.y,
        topRightCorner.x,
        topRightCorner.y,
        bottomLeftCorner.x,
        bottomLeftCorner.y,
        bottomRightCorner.x,
        bottomRightCorner.y,
    ]);
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
        0,
        0,
        resultWidth,
        0,
        0,
        resultHeight,
        resultWidth,
        resultHeight,
    ]);
    let M = cv.getPerspectiveTransform(srcTri, dstTri);
    cv.warpPerspective(
        img,
        warpedDst,
        M,
        dsize,
        cv.INTER_LINEAR,
        cv.BORDER_CONSTANT,
        new cv.Scalar()
    );

    cv.imshow(canvas, warpedDst);

    img.delete();
    warpedDst.delete();
    return canvas;
}

/**
   * Calculates the corner points of a contour.
   * @param {*} contour contour from {@link findPaperContour}
   * @returns object with properties `topLeftCorner`, `topRightCorner`, `bottomLeftCorner`, `bottomRightCorner`, each with `x` and `y` property
   */
function getCornerPoints(contour) {
    let rect = cv.minAreaRect(contour);
    const center = rect.center;

    let topLeftCorner;
    let topLeftCornerDist = 0;

    let topRightCorner;
    let topRightCornerDist = 0;

    let bottomLeftCorner;
    let bottomLeftCornerDist = 0;

    let bottomRightCorner;
    let bottomRightCornerDist = 0;

    for (let i = 0; i < contour.data32S.length; i += 2) {
        const point = { x: contour.data32S[i], y: contour.data32S[i + 1] };
        const dist = distance(point, center);
        if (point.x < center.x && point.y < center.y) {
            // top left
            if (dist > topLeftCornerDist) {
                topLeftCorner = point;
                topLeftCornerDist = dist;
            }
        } else if (point.x > center.x && point.y < center.y) {
            // top right
            if (dist > topRightCornerDist) {
                topRightCorner = point;
                topRightCornerDist = dist;
            }
        } else if (point.x < center.x && point.y > center.y) {
            // bottom left
            if (dist > bottomLeftCornerDist) {
                bottomLeftCorner = point;
                bottomLeftCornerDist = dist;
            }
        } else if (point.x > center.x && point.y > center.y) {
            // bottom right
            if (dist > bottomRightCornerDist) {
                bottomRightCorner = point;
                bottomRightCornerDist = dist;
            }
        }
    }

    return {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner,
    };
}
/*! jscanify v1.2.0 | (c) ColonelParrot and other contributors | MIT License */
////////////////////////////////////////////////////////////////////////////

export default function ScannedImage(props) {
    const containerRef = useRef(null);
    const processImage = useCallback(() => {
        if (!props.src) return;
        // containerRef.current.innerHTML = '';
        const img = document.createElement('img');
        img.src = props.src;

        img.onload = () => {
            const resultCanvas = extractPaper(img, 100, 142);
            containerRef.current.append(resultCanvas);

            // const highlightedCanvas = highlightPaper(img);
            // containerRef.current.append(highlightedCanvas);

        };
    }, [props.src]);

    useEffect(() => {
        processImage();
    }, [props.src, processImage]);
    return (<div className="flex flex-col embla__slide items-center min-w-[100px max-w-[100px]  h-auto mr-3">
        <div ref={ containerRef}></div>
        <Button className="text-red underline flex flex-row items-center text-md xsm:text-xl" onClick={() => props.remove(props.index)}><Image src="/images/cross.svg" className="w-2/12 h-5 mr-1" width={ 1} height={1} alt="Remove Item"/>Remove</Button>
    </div>)
}