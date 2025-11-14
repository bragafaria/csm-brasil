"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { RadarChart } from "@mui/x-charts/RadarChart";

// --- Data & Settings ---
const getCommonSettings = (setHighlightedSeries) => ({
  height: 300,
  margin: { top: 30, right: 10, bottom: 10, left: 10 },
  radar: {
    max: 100,
    metrics: ["(I)", "(S)", "(H)", "(V)", "(N)"],
  },
  legend: {
    onClick: (event, d) => setHighlightedSeries((prev) => (prev === d.label ? null : d.label)),
  },
});

const lisaGrades = {
  label: "You",
  data: [50, 50, 50, 50, 50],
  color: "#6366f1",
};

const bartGrades = {
  label: "Your Partner",
  data: [75, 69, 52, 75, 55],
  color: "#f43f5e",
};

// --- Component ---
export default function DemoRadarAxisHighlight() {
  const [highlightedSeries, setHighlightedSeries] = React.useState(null);

  const commonSettings = React.useMemo(() => getCommonSettings(setHighlightedSeries), [setHighlightedSeries]);

  const series = React.useMemo(() => {
    return [lisaGrades, bartGrades].map((s) => ({
      ...s,
      hideMark: false, // Always show marks
      area: { opacity: 0.3 }, // Always fill with 30% opacity
      highlighted: highlightedSeries === s.label,
    }));
  }, [highlightedSeries]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
        <Box sx={{ width: "100%", maxWidth: 450 }}>
          <div className="radar-dark">
            <RadarChart
              {...commonSettings}
              series={series}
              slotProps={{
                tooltip: {
                  disablePortal: true,
                  sx: {
                    "& .MuiChartsTooltip-paper": {
                      backgroundColor: "#1f2937",
                      color: "#ffffff",
                      border: "1px solid #374151",
                    },
                  },
                },
              }}
              sx={{
                "& .MuiChartsAxis-root text": { fill: "#fff" },
                "& .MuiChartsAxisHighlight-root text": { fill: "#fff" },
                "& .MuiChartsAxis-line": { stroke: "#fff" },
                "& .MuiChartsGrid-line": { stroke: "#fff" },
                "& svg line[stroke-dasharray]": {
                  stroke: "#fff",
                  strokeDasharray: "4 4",
                },
                "& .MuiChartsCursor-root line": {
                  stroke: "#fff",
                  strokeDasharray: "4 4",
                },
                "& .MuiChartsLegend-label": {
                  fill: "#fff",
                  color: "#fff",
                },
              }}
            />
          </div>
        </Box>
      </Stack>
    </Box>
  );
}
