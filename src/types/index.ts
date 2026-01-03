export interface ChartData {
  xAxis: string[];
  series: Array<{
    name: string;
    data: number[] | any[];
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>;
}

export interface ChartConfig {
  title: string;
  subtitle?: string;
  theme: 'default' | 'dark' | 'vintage';
  colors: string[];
  width?: number | string;
  height?: number | string;
}

// ECharts Option Type (simplified)
export interface EChartsOption {
  title?: any;
  tooltip?: any;
  legend?: any;
  grid?: any;
  xAxis?: any;
  yAxis?: any;
  series?: any[];
  color?: string[];
  [key: string]: any;
}

export interface ChartTemplate {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'radar' | 'candlestick' | 'map' | 'graph' | 'mix' | 'custom';
  name: string;
  description: string;
  thumbnail?: string;
  defaultData: ChartData;
  defaultConfig: ChartConfig;
  echartsOption: EChartsOption;
}
