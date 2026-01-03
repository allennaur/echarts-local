import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Download, Settings, Code, Table as TableIcon, Palette } from 'lucide-react';
import { chartTemplates } from '@/lib/chart-templates';
import DataEditor from '@/components/editor/DataEditor';
import VisualDataEditor from '@/components/editor/VisualDataEditor';
import ColorSchemeSelector from '@/components/editor/ColorSchemeSelector';
import EChartsRenderer, { EChartsRendererRef } from '@/components/chart-gallery/EChartsRenderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChartData, EChartsOption } from '@/types';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChartDetail = () => {
  const { id } = useParams<{ id: string }>();
  const template = chartTemplates.find(t => t.id === id);
  const chartRef = useRef<EChartsRendererRef>(null);

  const [dataCode, setDataCode] = useState<string>('');
  const [option, setOption] = useState<EChartsOption>({});
  const [error, setError] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'colors'>('visual');
  const [currentColors, setCurrentColors] = useState<string[]>([]);

  // Initialize data on load
  useEffect(() => {
    if (template) {
      // Create initial data structure code
      const initialData = {
        data: template.defaultData,
        config: template.defaultConfig
      };
      setDataCode(JSON.stringify(initialData, null, 2));
      setOption(template.echartsOption);
      if (template.defaultConfig.colors && template.defaultConfig.colors.length > 0) {
        setCurrentColors(template.defaultConfig.colors);
      }
    }
  }, [template]);

  if (!template) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Chart Not Found</h2>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  const handleRun = () => {
    try {
      setError(null);
      const parsed = JSON.parse(dataCode);
      const { data, config } = parsed;

      const newOption = { ...template.echartsOption };

      // Update Title
      if (config?.title) {
        newOption.title = { ...newOption.title, text: config.title };
      }

      // Update Colors if changed
      if (currentColors.length > 0) {
        newOption.color = currentColors;
      } else if (config?.colors && config.colors.length > 0) {
        newOption.color = config.colors;
      }

      // Update Series Data
      if (data?.series && Array.isArray(data.series)) {
        newOption.series = data.series.map((s: any, index: number) => {
          const originalSeries = Array.isArray(newOption.series) ? newOption.series[index] : {};
          return {
            ...originalSeries,
            ...s
          };
        });
      }

      // Update X Axis
      if (data?.xAxis && Array.isArray(data.xAxis)) {
        if (Array.isArray(newOption.xAxis)) {
             // Apply to all axes for consistency in simple mode
             newOption.xAxis.forEach((axis: any) => {
                 axis.data = data.xAxis;
             });
        } else if (newOption.xAxis) {
             newOption.xAxis.data = data.xAxis;
        }
      }

      setOption(newOption);

    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDownload = () => {
    const instance = chartRef.current?.getInstance();
    if (instance) {
      const url = instance.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
      });
      
      const link = document.createElement('a');
      link.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleVisualChange = (newData: ChartData) => {
    try {
      const currentFullData = JSON.parse(dataCode);
      const newFullData = {
        ...currentFullData,
        data: newData
      };
      setDataCode(JSON.stringify(newFullData, null, 2));
    } catch (e) {
      console.error("Failed to parse current data for visual update", e);
    }
  };

  const handleColorSchemeChange = (_schemeId: string, colors?: string[]) => {
    if (colors) {
      setCurrentColors(colors);
      // Automatically run to apply colors
      try {
        const currentFullData = JSON.parse(dataCode);
        // Update config in JSON as well
        const newFullData = {
          ...currentFullData,
          config: {
            ...currentFullData.config,
            colors: colors
          }
        };
        setDataCode(JSON.stringify(newFullData, null, 2));
        
        // Update Option directly for immediate feedback
        setOption(prev => ({
          ...prev,
          color: colors
        }));
      } catch (e) {
        console.error("Failed to update colors", e);
      }
    }
  };

  const getVisualData = (): ChartData | null => {
    try {
      const parsed = JSON.parse(dataCode);
      return parsed.data as ChartData;
    } catch {
      return null;
    }
  };

  const visualData = getVisualData();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b h-14 flex items-center px-4 justify-between bg-card z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold text-lg leading-none">{template.name}</h1>
            <p className="text-xs text-muted-foreground mt-1">{template.type}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={handleRun} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor */}
        <div className="w-1/3 min-w-[350px] max-w-[500px] border-r flex flex-col bg-background">
          <div className="border-b px-2 py-1 flex items-center justify-between bg-muted/30">
             <Tabs value={editorMode} onValueChange={(v) => setEditorMode(v as 'visual' | 'code' | 'colors')} className="w-full">
                <div className="flex items-center justify-between w-full">
                    <TabsList className="h-8">
                        <TabsTrigger value="visual" className="text-xs h-7 px-3">
                            <TableIcon className="h-3 w-3 mr-2" /> Data Table
                        </TabsTrigger>
                        <TabsTrigger value="code" className="text-xs h-7 px-3">
                            <Code className="h-3 w-3 mr-2" /> JSON Code
                        </TabsTrigger>
                        <TabsTrigger value="colors" className="text-xs h-7 px-3">
                            <Palette className="h-3 w-3 mr-2" /> Colors
                        </TabsTrigger>
                    </TabsList>
                </div>
             </Tabs>
          </div>
          
          <div className="flex-1 relative overflow-hidden flex flex-col">
            {editorMode === 'code' ? (
                <DataEditor 
                  value={dataCode} 
                  onChange={(val) => setDataCode(val || '')} 
                  language="json"
                />
            ) : editorMode === 'colors' ? (
                <div className="flex-1 overflow-auto">
                    <ColorSchemeSelector 
                        onSchemeChange={handleColorSchemeChange}
                        customColors={currentColors}
                    />
                </div>
            ) : (
                <div className="flex-1 overflow-auto p-4">
                    {visualData ? (
                        <VisualDataEditor 
                            data={visualData} 
                            onChange={handleVisualChange}
                            chartType={template.type}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                            <p className="mb-2">Invalid JSON data.</p>
                            <p className="text-sm">Please switch to Code mode to fix the syntax.</p>
                        </div>
                    )}
                </div>
            )}
          </div>
          
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-xs border-t border-destructive/20 max-h-24 overflow-y-auto shrink-0">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="flex-1 bg-muted/10 p-4 md:p-8 overflow-auto flex items-center justify-center">
          <Card className="w-full h-full shadow-sm bg-white flex items-center justify-center p-4 relative overflow-hidden border-muted">
             <div className="w-full h-full">
               <EChartsRenderer 
                 ref={chartRef}
                 option={option} 
                 height="100%"
                 width="100%"
               />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChartDetail;
