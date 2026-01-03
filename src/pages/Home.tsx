import { useState, useMemo } from 'react';
import { chartTemplates } from '@/lib/chart-templates';
import ChartPreviewCard from '@/components/chart-gallery/ChartPreviewCard';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ScatterChart, 
  Activity, 
  Radar, 
  Menu,
  X,
  Grid,
  Search,
  CandlestickChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract unique categories from templates
  const categories = useMemo(() => {
    // Defined categories to match ECharts official order/style where possible
    const categoryOrder = [
      'line', 'bar', 'pie', 'scatter', 'radar', 'candlestick', 'map', 'graph', 'boxplot', 'heatmap', 'tree', 'treemap', 'sunburst', 'sankey', 'funnel', 'gauge'
    ];
    
    const availableTypes = Array.from(new Set(chartTemplates.map(t => t.type)));
    
    // Sort available types based on predefined order, put others at the end
    availableTypes.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    const allCategories = [
      { id: 'all', label: 'All', icon: Grid },
      ...availableTypes.map(type => {
        let icon = Activity;
        if (type === 'bar') icon = BarChart;
        if (type === 'line') icon = LineChart;
        if (type === 'pie') icon = PieChart;
        if (type === 'scatter') icon = ScatterChart;
        if (type === 'radar') icon = Radar;
        if (type === 'candlestick') icon = CandlestickChart;
        
        return {
          id: type,
          label: type.charAt(0).toUpperCase() + type.slice(1),
          icon
        };
      })
    ];
    return allCategories;
  }, []);

  const filteredTemplates = useMemo(() => {
    return chartTemplates.filter(t => {
      const matchesCategory = activeCategory === 'all' || t.type === activeCategory;
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative z-50 w-[260px] h-full bg-[#f4f4f5] border-r flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 border-b flex items-center justify-between h-16 bg-white shrink-0">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <span className="font-bold text-xs">E</span>
            </div>
            <span>ECHARTS-VIEW</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 bg-[#f4f4f5]">
           <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-white border-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors border-l-4",
                activeCategory === category.id 
                  ? "bg-white text-primary border-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/50"
              )}
            >
              <span className="capitalize">{category.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative bg-white">
        {/* Mobile Header */}
        <header className="h-16 border-b flex items-center px-4 md:hidden shrink-0 bg-white">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-2 font-semibold">Examples</span>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-8 flex items-baseline gap-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {categories.find(c => c.id === activeCategory)?.label}
              </h1>
              <span className="text-sm text-gray-500 font-mono">
                {activeCategory}
              </span>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p>No charts found matching your search.</p>
                <Button variant="link" onClick={() => setSearchQuery('')}>Clear search</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="h-[260px]">
                    <ChartPreviewCard template={template} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
