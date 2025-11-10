// app/components/couples/CsmRadarChart.jsx
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { RadarChart } from "@mui/x-charts/RadarChart";

const getCommonSettings = (setHighlightedSeries) => ({
  height: 320,
  margin: { top: 40, right: 20, bottom: 20, left: 20 },
  radar: { max: 100 },
  legend: {
    onClick: (event, d) => setHighlightedSeries((prev) => (prev === d.label ? null : d.label)),
  },
});

export default function CsmRadarChart({ partnerA, partnerB, metrics, title }) {
  const [highlightedSeries, setHighlightedSeries] = React.useState(null);

  const commonSettings = React.useMemo(() => getCommonSettings(setHighlightedSeries), [setHighlightedSeries]);

  const series = React.useMemo(() => {
    return [
      {
        label: partnerA.name,
        data: partnerA.values,
        color: "#6366f1",
        area: { opacity: 0.3 },
        hideMark: false,
        highlighted: highlightedSeries === partnerA.name,
      },
      {
        label: partnerB.name,
        data: partnerB.values,
        color: "#f43f5e",
        area: { opacity: 0.3 },
        hideMark: false,
        highlighted: highlightedSeries === partnerB.name,
      },
    ];
  }, [partnerA, partnerB, highlightedSeries]);

  return (
    <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
      <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-6 text-left">{title}</h2>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="radar-dark" style={{ width: "100%", maxWidth: 500 }}>
          <RadarChart
            {...commonSettings}
            series={series}
            radar={{ metrics }}
            sx={{
              "& .MuiChartsAxis-root text": { fill: "#fff" },
              "& .MuiChartsAxis-line": { stroke: "#fff" },
              "& .MuiChartsGrid-line": { stroke: "#fff" },
              "& svg line[stroke-dasharray]": { stroke: "#fff", strokeDasharray: "4 4" },
              "& .MuiChartsLegend-label": { fill: "#fff", color: "#fff" },
            }}
          />
        </div>
      </Box>
    </section>
  );
}
