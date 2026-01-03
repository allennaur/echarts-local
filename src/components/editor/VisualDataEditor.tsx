import React from 'react';
import { ChartData } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface VisualDataEditorProps {
  data: ChartData;
  onChange: (newData: ChartData) => void;
  chartType: string;
}

const VisualDataEditor: React.FC<VisualDataEditorProps> = ({ data, onChange, chartType }) => {
  // Determine editor mode based on data structure
  const getMode = () => {
    // Check for Candlestick (data is array of arrays with 4 values)
    if (chartType === 'candlestick') return 'candlestick';

    // Standard Category Axis (Line, Bar)
    if (data.xAxis && data.xAxis.length > 0) return 'category';
    
    // Pie / Doughnut (Name-Value pairs)
    if (['pie', 'doughnut'].includes(chartType)) return 'name-value';
    
    // Scatter (X-Y pairs)
    if (['scatter'].includes(chartType)) return 'xy';
    
    // Radar (Value arrays)
    if (['radar'].includes(chartType)) return 'radar';

    // Default fallback
    if (data.xAxis) return 'category';
    
    return 'unknown';
  };

  const mode = getMode();

  // --- HANDLERS ---

  const handleCategoryChange = (index: number, val: string) => {
    const newXAxis = [...data.xAxis];
    newXAxis[index] = val;
    onChange({ ...data, xAxis: newXAxis });
  };

  const handleSeriesValueChange = (seriesIndex: number, dataIndex: number, val: string) => {
    const newSeries = [...data.series];
    const newData = [...newSeries[seriesIndex].data];
    newData[dataIndex] = Number(val);
    newSeries[seriesIndex] = { ...newSeries[seriesIndex], data: newData };
    onChange({ ...data, series: newSeries });
  };

  const handleNameValueChange = (index: number, field: 'name' | 'value', val: string) => {
    const newSeries = [...data.series];
    const newData = [...(newSeries[0].data as any[])];
    newData[index] = { ...newData[index], [field]: field === 'value' ? Number(val) : val };
    newSeries[0] = { ...newSeries[0], data: newData };
    onChange({ ...data, series: newSeries });
  };

  const handleXYChange = (index: number, axis: 0 | 1, val: string) => {
    const newSeries = [...data.series];
    const newData = [...(newSeries[0].data as any[])];
    const point = [...newData[index]];
    point[axis] = Number(val);
    newData[index] = point;
    newSeries[0] = { ...newSeries[0], data: newData };
    onChange({ ...data, series: newSeries });
  };

  const handleCandlestickChange = (dataIndex: number, valueIndex: 0 | 1 | 2 | 3, val: string) => {
    const newSeries = [...data.series];
    const newData = [...(newSeries[0].data as any[])];
    const candle = [...newData[dataIndex]];
    candle[valueIndex] = Number(val);
    newData[dataIndex] = candle;
    newSeries[0] = { ...newSeries[0], data: newData };
    onChange({ ...data, series: newSeries });
  };

  const handleRadarChange = (seriesIndex: number, indicatorIndex: number, val: string) => {
     const newSeries = [...data.series];
     const newDataItem = { ...(newSeries[0].data as any[])[seriesIndex] }; // Radar usually has 1 series with multiple data items (Allocated vs Actual)
     const newValues = [...newDataItem.value];
     newValues[indicatorIndex] = Number(val);
     newDataItem.value = newValues;
     
     const newSeriesData = [...(newSeries[0].data as any[])];
     newSeriesData[seriesIndex] = newDataItem;
     
     newSeries[0] = { ...newSeries[0], data: newSeriesData };
     onChange({ ...data, series: newSeries });
  };

  const addRow = () => {
    if (mode === 'category') {
      const newXAxis = [...data.xAxis, `Item ${data.xAxis.length + 1}`];
      const newSeries = data.series.map(s => ({
        ...s,
        data: [...s.data, 0]
      }));
      onChange({ ...data, xAxis: newXAxis, series: newSeries });
    } else if (mode === 'name-value') {
      const newSeries = [...data.series];
      const newData = [...(newSeries[0].data as any[]), { name: 'New Item', value: 0 }];
      newSeries[0] = { ...newSeries[0], data: newData };
      onChange({ ...data, series: newSeries });
    } else if (mode === 'xy') {
      const newSeries = [...data.series];
      const newData = [...(newSeries[0].data as any[]), [0, 0]];
      newSeries[0] = { ...newSeries[0], data: newData };
      onChange({ ...data, series: newSeries });
    } else if (mode === 'candlestick') {
       const newXAxis = data.xAxis ? [...data.xAxis, `Date ${data.xAxis.length + 1}`] : [];
       const newSeries = [...data.series];
       const newData = [...(newSeries[0].data as any[]), [0, 0, 0, 0]];
       newSeries[0] = { ...newSeries[0], data: newData };
       onChange({ ...data, xAxis: newXAxis, series: newSeries });
    }
  };

  const removeRow = (index: number) => {
    if (mode === 'category') {
      const newXAxis = data.xAxis.filter((_, i) => i !== index);
      const newSeries = data.series.map(s => ({
        ...s,
        data: s.data.filter((_, i) => i !== index)
      }));
      onChange({ ...data, xAxis: newXAxis, series: newSeries });
    } else if (mode === 'candlestick') {
       const newXAxis = data.xAxis ? data.xAxis.filter((_, i) => i !== index) : [];
       const newSeries = [...data.series];
       const newData = (newSeries[0].data as any[]).filter((_, i) => i !== index);
       newSeries[0] = { ...newSeries[0], data: newData };
       onChange({ ...data, xAxis: newXAxis, series: newSeries });
    } else if (mode === 'radar') {
       // Radar structure is different, usually fixed indicators. 
       // Deleting a data item (e.g. "Allocated Budget") is possible but indicators are fixed in config.
       // For simplicity, we skip delete for radar in this basic editor or just delete the data item.
       const newSeries = [...data.series];
       const newData = (newSeries[0].data as any[]).filter((_, i) => i !== index);
       newSeries[0] = { ...newSeries[0], data: newData };
       onChange({ ...data, series: newSeries });
    } else {
      const newSeries = [...data.series];
      const newData = (newSeries[0].data as any[]).filter((_, i) => i !== index);
      newSeries[0] = { ...newSeries[0], data: newData };
      onChange({ ...data, series: newSeries });
    }
  };

  // --- RENDERERS ---

  if (mode === 'category') {
    return (
      <div className="w-full">
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[400px]">
            <thead>
                <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium text-muted-foreground w-32">X Axis</th>
                {data.series.map((s, i) => (
                    <th key={i} className="p-3 text-left font-medium text-muted-foreground min-w-[100px]">{s.name}</th>
                ))}
                <th className="p-2 w-10"></th>
                </tr>
            </thead>
            <tbody>
                {data.xAxis.map((category, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-muted/20 group transition-colors">
                    <td className="p-2">
                    <input 
                        className="w-full bg-transparent px-2 py-1.5 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        value={category}
                        onChange={(e) => handleCategoryChange(rowIndex, e.target.value)}
                    />
                    </td>
                    {data.series.map((series, colIndex) => (
                    <td key={colIndex} className="p-2">
                        <input 
                        type="number"
                        className="w-full bg-transparent px-2 py-1.5 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        value={series.data[rowIndex]}
                        onChange={(e) => handleSeriesValueChange(colIndex, rowIndex, e.target.value)}
                        />
                    </td>
                    ))}
                    <td className="p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => removeRow(rowIndex)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                        <Trash2 className="h-4 w-4" />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="p-4 border-t bg-muted/10">
          <Button variant="outline" size="sm" onClick={addRow} className="w-full gap-2 border-dashed">
            <Plus className="h-4 w-4" /> Add Data Point
          </Button>
        </div>
      </div>
    );
  }

  if (mode === 'name-value') {
    const series = data.series[0];
    const items = series.data as unknown as { name: string, value: number }[];
    
    return (
      <div className="w-full">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="p-3 text-left font-medium text-muted-foreground">Value</th>
              <th className="p-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-muted/20 group">
                <td className="p-2">
                  <input 
                    className="w-full bg-transparent px-2 py-1.5 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={item.name}
                    onChange={(e) => handleNameValueChange(rowIndex, 'name', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="number"
                    className="w-full bg-transparent px-2 py-1.5 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={item.value}
                    onChange={(e) => handleNameValueChange(rowIndex, 'value', e.target.value)}
                  />
                </td>
                <td className="p-2 text-center opacity-0 group-hover:opacity-100">
                  <button onClick={() => removeRow(rowIndex)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t bg-muted/10">
          <Button variant="outline" size="sm" onClick={addRow} className="w-full gap-2 border-dashed">
            <Plus className="h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>
    );
  }

  if (mode === 'xy') {
    const series = data.series[0];
    const points = series.data as number[][];

    return (
      <div className="w-full">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-medium text-muted-foreground">X Value</th>
              <th className="p-3 text-left font-medium text-muted-foreground">Y Value</th>
              <th className="p-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {points.map((point, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-muted/20 group">
                <td className="p-2">
                  <input 
                    type="number"
                    className="w-full bg-transparent px-2 py-1.5 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={point[0]}
                    onChange={(e) => handleXYChange(rowIndex, 0, e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="number"
                    className="w-full bg-transparent px-2 py-1.5 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={point[1]}
                    onChange={(e) => handleXYChange(rowIndex, 1, e.target.value)}
                  />
                </td>
                <td className="p-2 text-center opacity-0 group-hover:opacity-100">
                  <button onClick={() => removeRow(rowIndex)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t bg-muted/10">
          <Button variant="outline" size="sm" onClick={addRow} className="w-full gap-2 border-dashed">
            <Plus className="h-4 w-4" /> Add Point
          </Button>
        </div>
      </div>
    );
  }

  if (mode === 'candlestick') {
      const series = data.series[0];
      const items = series.data as unknown as number[][]; // [Open, Close, Low, High]

      return (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium text-muted-foreground">Date/X</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Open</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Close</th>
                <th className="p-3 text-left font-medium text-muted-foreground">Low</th>
                <th className="p-3 text-left font-medium text-muted-foreground">High</th>
                <th className="p-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-muted/20 group">
                  <td className="p-2">
                     <input 
                      className="w-24 bg-transparent px-2 py-1.5 border rounded-md focus:border-primary outline-none"
                      value={data.xAxis ? data.xAxis[rowIndex] : rowIndex}
                      onChange={(e) => handleCategoryChange(rowIndex, e.target.value)}
                      disabled={!data.xAxis}
                    />
                  </td>
                  <td className="p-2"><input type="number" className="w-16 bg-transparent px-2 py-1.5 border rounded-md outline-none" value={item[0]} onChange={(e) => handleCandlestickChange(rowIndex, 0, e.target.value)} /></td>
                  <td className="p-2"><input type="number" className="w-16 bg-transparent px-2 py-1.5 border rounded-md outline-none" value={item[1]} onChange={(e) => handleCandlestickChange(rowIndex, 1, e.target.value)} /></td>
                  <td className="p-2"><input type="number" className="w-16 bg-transparent px-2 py-1.5 border rounded-md outline-none" value={item[2]} onChange={(e) => handleCandlestickChange(rowIndex, 2, e.target.value)} /></td>
                  <td className="p-2"><input type="number" className="w-16 bg-transparent px-2 py-1.5 border rounded-md outline-none" value={item[3]} onChange={(e) => handleCandlestickChange(rowIndex, 3, e.target.value)} /></td>
                  <td className="p-2 text-center opacity-0 group-hover:opacity-100">
                    <button onClick={() => removeRow(rowIndex)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t bg-muted/10">
            <Button variant="outline" size="sm" onClick={addRow} className="w-full gap-2 border-dashed">
              <Plus className="h-4 w-4" /> Add Candle
            </Button>
          </div>
        </div>
      );
  }

  if (mode === 'radar') {
     const seriesData = data.series[0].data as unknown as { value: number[], name: string }[];
     // Assuming indicators are fixed for now in this simple editor
     const indicators = [0, 1, 2, 3, 4, 5]; // Placeholder logic, ideally should come from config or data structure
     
     return (
       <div className="w-full p-4 text-sm">
         <p className="text-muted-foreground mb-4">Radar charts have complex structures. You can edit the values for each data item below.</p>
         {seriesData.map((item, sIndex) => (
             <div key={sIndex} className="mb-6 border rounded-md p-4 bg-muted/10">
                 <div className="font-medium mb-2 flex justify-between">
                     <span>{item.name}</span>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                     {item.value.map((val, vIndex) => (
                         <div key={vIndex} className="flex flex-col">
                             <label className="text-xs text-muted-foreground mb-1">Dimension {vIndex + 1}</label>
                             <input 
                                type="number"
                                className="bg-background px-2 py-1.5 border rounded-md focus:border-primary outline-none"
                                value={val}
                                onChange={(e) => handleRadarChange(sIndex, vIndex, e.target.value)}
                             />
                         </div>
                     ))}
                 </div>
             </div>
         ))}
       </div>
     )
  }

  return (
    <div className="p-8 text-center text-muted-foreground">
        <p>This chart type has a complex data structure that is best edited in Code mode.</p>
    </div>
  );
};

export default VisualDataEditor;
