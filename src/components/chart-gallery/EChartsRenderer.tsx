import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from '@/types';

interface EChartsRendererProps {
  option: EChartsOption;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  theme?: string;
  onChartReady?: (instance: echarts.ECharts) => void;
}

export interface EChartsRendererRef {
  getInstance: () => echarts.ECharts | null;
  getRef: () => HTMLDivElement | null;
}

const EChartsRenderer = forwardRef<EChartsRendererRef, EChartsRendererProps>(
  ({ option, width = '100%', height = '400px', minHeight = '300px', theme = 'default', onChartReady }, ref) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useImperativeHandle(ref, () => ({
      getInstance: () => chartInstance.current,
      getRef: () => chartRef.current
    }));

    useEffect(() => {
      // Initialize chart
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.dispose();
        }
        
        chartInstance.current = echarts.init(chartRef.current, theme);
        
        if (onChartReady && chartInstance.current) {
          onChartReady(chartInstance.current);
        }
      }

      // Handle resize
      const handleResize = () => {
        chartInstance.current?.resize();
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }, [theme]); // Re-init if theme changes

    useEffect(() => {
      // Update option
      if (chartInstance.current) {
        chartInstance.current.setOption(option, true); // true = not merge, replace
      }
    }, [option]);
    
    // Handle container size change if width/height props change
    useEffect(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    }, [width, height, minHeight]);

    return (
      <div 
        ref={chartRef} 
        style={{ 
          width, 
          height,
          minHeight
        }} 
      />
    );
  }
);

EChartsRenderer.displayName = 'EChartsRenderer';

export default EChartsRenderer;
