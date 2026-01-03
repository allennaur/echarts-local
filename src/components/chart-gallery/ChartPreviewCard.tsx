import React, { useMemo } from 'react';
import { ChartTemplate } from '@/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EChartsRenderer from './EChartsRenderer';
import { Link } from 'react-router-dom';

interface ChartPreviewCardProps {
  template: ChartTemplate;
}

const ChartPreviewCard: React.FC<ChartPreviewCardProps> = ({ template }) => {
  // Create a simplified option for preview
  const previewOption = useMemo(() => {
    const option = { ...template.echartsOption };
    
    // Handle grid configuration
     const grid = Array.isArray(option.grid) 
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       ? option.grid.map((g: any) => ({ ...g, containLabel: true })) 
       : { top: 10, bottom: 10, left: 10, right: 10, containLabel: true };

    // Disable interactions for better performance in grid
    return {
      ...option,
      title: { show: false }, // Hide title in preview as Card has title
      tooltip: { show: false },
      toolbox: { show: false },
      legend: { show: false }, // Hide legend to save space
      grid, // Use the handled grid
      animation: false, // Disable animation for list view performance
    };
  }, [template.echartsOption]);

  return (
    <Link to={`/chart/${template.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-200 cursor-pointer border-transparent hover:border-primary/20 group">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20 border-b">
            <div className="absolute inset-0 p-4">
                 <EChartsRenderer 
                    option={previewOption} 
                    width="100%" 
                    height="100%" 
                    minHeight="0"
                />
            </div>
            {/* Overlay for hover effect */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    View Chart
                 </span>
            </div>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-base font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {template.name}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-2 mt-1">
            {template.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ChartPreviewCard;
