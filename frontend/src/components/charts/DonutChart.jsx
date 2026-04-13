import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * DonutChart component using D3.js
 * @param {Array} data - Array of objects with label, value, and color
 * @param {Number} width - Chart width
 * @param {Number} height - Chart height
 * @param {Number} innerRadius - Inner radius ratio (0-1)
 */
export const DonutChart = ({ data, width = 200, height = 200, innerRadius = 0.6 }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        const radius = Math.min(width, height) / 2;
        const innerRadiusValue = radius * innerRadius;

        // Create SVG
        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Create pie layout
        const pie = d3
            .pie()
            .value(d => d.value)
            .sort(null);

        // Create arc generator
        const arc = d3
            .arc()
            .innerRadius(innerRadiusValue)
            .outerRadius(radius);

        // Create hover arc (slightly larger)
        const arcHover = d3
            .arc()
            .innerRadius(innerRadiusValue)
            .outerRadius(radius + 5);

        // Create arcs
        const arcs = svg
            .selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Add paths
        arcs
            .append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .style('transition', 'all 0.3s ease')
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('d', arcHover)
                    .attr('opacity', 0.9);
            })
            .on('mouseleave', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('d', arc)
                    .attr('opacity', 1);
            });

        // Add center text (total)
        const total = d3.sum(data, d => d.value);
        svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-0.2em')
            .style('font-size', '28px')
            .style('font-weight', '900')
            .style('fill', '#1e293b')
            .text(total);

        svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.2em')
            .style('font-size', '12px')
            .style('font-weight', '600')
            .style('fill', '#64748b')
            .text('Total Hours');

    }, [data, width, height, innerRadius]);

    return (
        <div className="flex flex-col items-center">
            <svg ref={svgRef}></svg>

            {/* Legend */}
            <div className="mt-4 space-y-2 w-full">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="font-semibold text-slate-700">{item.label}</span>
                        </div>
                        <span className="font-black text-slate-900">{item.value}h</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
