"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { RadarChart } from "@mui/x-charts/RadarChart";

const getCommonSettings = (setHighlightedSeries) => ({
  height: 320,
  margin: { top: 40, right: 20, bottom: 20, left: 20 },
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

  // Define poles dynamically based on chart type
  const poles =
    title === "Polos de Orientação Fundamentais"
      ? [
          { letter: "C", name: "Foco Concreto" },
          { letter: "L", name: "Lógica Analítica" },
          { letter: "I", name: "Reflexão Interna" },
          { letter: "S", name: "Estrutura Estável" },
          { letter: "H", name: "Harmonia Colaborativa" },
        ]
      : [
          { letter: "N", name: "Percepção Abstrata" },
          { letter: "V", name: "Valores Empáticos" },
          { letter: "O", name: "Engajamento Externo" },
          { letter: "F", name: "Flexibilidade Adaptativa" },
          { letter: "A", name: "Autonomia Independente" },
        ];

  return (
    <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
      <h3 className="text-sm md:text-lg font-bold text-[var(--accent)] mb-4 text-center">
        {title === "Polos de Orientação Fundamentais" ? "Gráfico 1" : "Gráfico 2"}
      </h3>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 text-center">{title}</h2>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="radar-dark" style={{ width: "100%", maxWidth: 500 }}>
          <RadarChart
            {...commonSettings}
            series={series}
            radar={{
              metrics,
              max: 100,
              min: 0, // Optional but recommended for clarity
            }}
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

      {/* Poles list */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-start">
        {poles.map((pole) => (
          <div key={pole.letter} className="flex items-center">
            <div
              className="bg-[var(--surface3)] text-white font-black text-sm w-6 h-6 rounded-full 
                         flex items-center justify-center shadow-lg"
            >
              {pole.letter}
            </div>
            <h4 className="ml-4 text-sm font-medium text-[var(--text-primary)]">{pole.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
