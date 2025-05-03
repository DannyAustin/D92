import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || !data.length) return;

    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('aria-labelledby', 'chart-title')
        .attr('role', 'img')
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append('text')
      .attr('id', 'chart-title')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text(title);

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.year || d.category))
      .padding(0.2);
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.amount || d.percentage) * 1.1])
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
        .attr('x', d => x(d.year || d.category))
        .attr('y', d => y(d.amount || d.percentage))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.amount || d.percentage))
        .attr('fill', '#046A38') // UNC Charlotte green
        .attr('aria-label', d => `${d.year || d.category}: ${d.amount || d.percentage}`)
        .append('title') // Tooltip for accessibility
          .text(d => `${d.year || d.category}: ${d.amount || d.percentage}`);

  }, [data, title]);

  return <div ref={chartRef} aria-live="polite"></div>;
};

const PieChart = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || !data.length) return;

    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 450;
    const height = 450;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(chartRef.current)
      .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('aria-labelledby', 'chart-title')
        .attr('role', 'img')
      .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    // Add title
    svg.append('text')
      .attr('id', 'chart-title')
      .attr('x', 0)
      .attr('y', -height / 2 + 20)
      .attr('text-anchor', 'middle')
      .text(title);

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(d3.schemeCategory10);

    // Compute the position of each group on the pie
    const pie = d3.pie()
      .value(d => d.percentage);

    const data_ready = pie(data);

    // Build the pie chart
    svg.selectAll('pieces')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', d => color(d.data.category))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .attr('aria-label', d => `${d.data.category}: ${d.data.percentage}%`)
        .append('title') // Tooltip for accessibility
          .text(d => `${d.data.category}: ${d.data.percentage}%`);

    // Add labels
    svg.selectAll('labels')
      .data(data_ready)
      .enter()
      .append('text')
        .text(d => `${d.data.category}: ${d.data.percentage}%`)
        .attr('transform', d => {
          const pos = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 0.6)
            .centroid(d);
          return `translate(${pos})`;
        })
        .style('text-anchor', 'middle')
        .style('font-size', '12px');

  }, [data, title]);

  return <div ref={chartRef} aria-live="polite"></div>;
};

const Chart = ({ type, data, title }) => {
  if (type === 'bar') {
    return <BarChart data={data} title={title} />;
  } else if (type === 'pie') {
    return <PieChart data={data} title={title} />;
  }
  return null;
};

export default Chart;
