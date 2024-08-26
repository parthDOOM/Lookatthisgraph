import { Graph } from "../types";
import { Settings } from "../types";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { updateDirected } from "./animateGraph";
import { updateSettings } from "./animateGraph";
import { animateGraph } from "./animateGraph";

import { resizeGraph } from "./animateGraph";
import { updateGraph } from "./animateGraph";

// Interface for the props passed to the component
interface Props {
  graph: Graph;
  directed: boolean;
  settings: Settings;
}

// The main component
export function GraphCanvas({ graph, directed, settings }: Props) {
  // Reference to the canvas element
  let ref = useRef<HTMLCanvasElement>(null);

  // State to hold the image data
  const [image, setImage] = useState<string>();

  // Effect hook to initialize the canvas and handle resizing
  useEffect(() => {
    // Load custom font
    let font = new FontFace(
      "JB",
      "url(/another_graph_editor/JetBrainsMono-Bold.ttf)",
    );
    font.load();
    document.fonts.add(font);

    // Get the canvas element
    let canvas = ref.current;

    if (canvas === null) {
      console.log("Error: `canvas` is null!");
      return;
    }

    // Get the 2D rendering context
    let ctx = canvas.getContext("2d");

    if (ctx === null) {
      console.log("Error: `ctx` is null!");
      return;
    }

    // Function to resize the canvas and graph
    const resizeCanvas = (): void => {
      const canvasBorderX = canvas.offsetWidth - canvas.clientWidth;
      const canvasBorderY = canvas.offsetHeight - canvas.clientHeight;

      const pixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      const width = pixelRatio * rect.width;
      const height = pixelRatio * rect.height;

      canvas.width = width;
      canvas.height = height;

      ctx.scale(pixelRatio, pixelRatio);

      resizeGraph(rect.width - canvasBorderX, rect.height - canvasBorderY);
    };

    // Initial canvas resize and graph animation
    resizeCanvas();
    animateGraph(canvas, ctx, setImage);

    // Event listener for window resize
    window.addEventListener("resize", resizeCanvas);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Effect hook to update the graph when the `graph` prop changes
  useEffect(() => {
    updateGraph(graph);
  }, [graph]);

  // Effect hook to update the directed flag when the `directed` prop changes
  useEffect(() => {
    updateDirected(directed);
  }, [directed]);

  // Effect hook to update the settings when the `settings` prop changes
  useEffect(() => {
    updateSettings(settings);
  }, [settings]);

  // Render the canvas and download button
  return (
    <div className="flex h-screen">
      <div
        className="flex flex-col sm:w-7/8 sm:h-3/4 lg:w-1/3 xl:w-1/2 lg:h-2/3
          m-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
          lg:absolute"
      >
        <canvas
          ref={ref}
          className="active:cursor-pointer h-full border-2 border-border
            hover:border-border-hover rounded-lg bg-block shadow shadow-shadow
            touch-none"
        ></canvas>
        <a
          download="graph.png"
          href={image}
          className="w-36 mt-2 text-center border-2 border-border rounded-lg
            px-2 py-1 justify-between items-center hover:border-border-hover
            hover:cursor-pointer ml-auto"
        >
          Download (PNG)
        </a>
      </div>
    </div>
  );
}
