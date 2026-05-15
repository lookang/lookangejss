const { useState } = React;

const GRID_SIZE = 10;
const CELL_SIZE = 60;

const Geoboard = () => {
  const [points, setPoints] = useState([]);
  const [showPolygon, setShowPolygon] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [userArea, setUserArea] = useState("");
  const [feedback, setFeedback] = useState("");

  const togglePoint = (x, y) => {
    const exists = points.some((p) => p.x === x && p.y === y);
    if (exists) {
      setPoints(points.filter((p) => !(p.x === x && p.y === y)));
      setShowPolygon(false);
      setShowHelp(false);
      setFeedback("");
    } else {
      setPoints([...points, { x, y }]);
    }
  };

  const calculateArea = () => {
    if (points.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const { x: x1, y: y1 } = points[i];
      const { x: x2, y: y2 } = points[(i + 1) % points.length];
      area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area / 2);
  };

  const getBoundingBox = () => {
    if (points.length === 0) return null;
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  };

  const checkAnswer = () => {
    const correctArea = calculateArea();
    const entered = parseFloat(userArea);
    if (isNaN(entered)) {
      setFeedback("Please enter a valid number.");
    } else if (Math.abs(entered - correctArea) < 0.01) {
      setFeedback("✅ Correct! Well done.");
    } else {
      setFeedback(
        `❌ Not quite. Try using 'Need Help' to see how to complete an outer rectangle.`
      );
    }
  };

  const box = getBoundingBox();

  return React.createElement("div", { className: "p-4 max-w-6xl mx-auto" },
    React.createElement("h1", { className: "text-2xl font-bold mb-4 text-center" }, "Geoboard Area Explorer"),
    React.createElement("div", { className: "flex flex-wrap justify-between" },
      // Left column - Geoboard
      React.createElement("div", { className: "flex flex-col" },
        React.createElement("div", { className: "relative" },
          React.createElement("svg", {
            width: (GRID_SIZE + 1) * CELL_SIZE,
            height: (GRID_SIZE + 1) * CELL_SIZE,
            className: "absolute top-0 left-0 z-0"
          },
            showPolygon && points.length > 2 &&
            React.createElement("polygon", {
              points: points.map(p => `${p.x * CELL_SIZE + CELL_SIZE / 2},${p.y * CELL_SIZE + CELL_SIZE / 2}`).join(" "),
              fill: "rgba(59, 130, 246, 0.3)",
              stroke: "blue",
              strokeWidth: "2"
            }),
            showHelp && box && [
              { x1: box.minX, y1: box.minY, x2: box.maxX, y2: box.minY },
              { x1: box.maxX, y1: box.minY, x2: box.maxX, y2: box.maxY },
              { x1: box.maxX, y1: box.maxY, x2: box.minX, y2: box.maxY },
              { x1: box.minX, y1: box.maxY, x2: box.minX, y2: box.minY }
            ].map((l, i) => React.createElement("line", {
              key: i,
              x1: l.x1 * CELL_SIZE + CELL_SIZE / 2,
              y1: l.y1 * CELL_SIZE + CELL_SIZE / 2,
              x2: l.x2 * CELL_SIZE + CELL_SIZE / 2,
              y2: l.y2 * CELL_SIZE + CELL_SIZE / 2,
              stroke: "gray",
              strokeDasharray: "5,5"
            }))
          ),
          React.createElement("div", { 
            className: "grid z-10 relative", 
            style: {
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_SIZE + 1}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE + 1}, ${CELL_SIZE}px)`,
              width: `${(GRID_SIZE + 1) * CELL_SIZE}px`,
              height: `${(GRID_SIZE + 1) * CELL_SIZE}px`
            }
          },
            Array.from({ length: (GRID_SIZE + 1) * (GRID_SIZE + 1) }, (_, i) => {
              const x = i % (GRID_SIZE + 1);
              const y = Math.floor(i / (GRID_SIZE + 1));
              const active = points.some((p) => p.x === x && p.y === y);
              return React.createElement("div", {
                key: `${x}-${y}`,
                style: { width: CELL_SIZE, height: CELL_SIZE },
                className: "flex justify-center items-center"
              },
                React.createElement("button", {
                  onClick: () => togglePoint(x, y),
                  className: `w-4 h-4 rounded-full border border-gray-400 ${active ? "bg-blue-500" : "bg-white"}`,
                  title: `(${x}, ${y})`
                })
              );
            })
          )
        ),
        React.createElement("div", { className: "flex gap-4 mt-4 justify-center" },
          React.createElement("button", {
            onClick: () => { setShowPolygon(true); setShowHelp(false); },
            className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          }, "JOIN"),
          React.createElement("button", {
            onClick: () => { setShowHelp(true); },
            className: "px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
          }, "Need Help")
        )
      ),
      
      // Right column - Selected Points and Controls
      React.createElement("div", { className: "flex-1 min-w-[300px] max-w-md" },
        React.createElement("h2", { className: "text-lg font-semibold" }, "Selected Points"),
        React.createElement("pre", null, JSON.stringify(points, null, 2)),
        React.createElement("h2", { className: "text-lg font-semibold mt-2 hidden" }, `Actual Area: ${calculateArea()} square units`),
        React.createElement("div", { className: "mt-4" },
          React.createElement("label", { className: "block font-medium" }, "Area of the given shape is:",
            React.createElement("input", {
              type: "text",
              value: userArea,
              onChange: (e) => setUserArea(e.target.value),
              className: "border border-gray-400 rounded px-2 py-1 ml-2",
              placeholder: "?"
            }), " square units."
          ),
          React.createElement("button", {
            onClick: checkAnswer,
            className: "mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          }, "Check"),
          feedback && React.createElement("p", { className: "mt-2 text-sm font-medium text-red-700" }, feedback)
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(Geoboard), document.getElementById("root"));
