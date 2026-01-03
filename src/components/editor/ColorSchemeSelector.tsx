import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Plus, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface ColorScheme {
  id: string;
  name: string;
  colors: string[];
}

export const defaultColorSchemes: ColorScheme[] = [
  {
    id: 'default',
    name: 'Default',
    colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  },
  {
    id: 'vintage',
    name: 'Vintage',
    colors: ['#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b']
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42']
  },
  {
    id: 'macarons',
    name: 'Macarons',
    colors: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089']
  },
  {
    id: 'shine',
    name: 'Shine',
    colors: ['#c1232b', '#27727b', '#fcce10', '#e87c25', '#b5c334', '#fe8463', '#9bca63', '#fad860', '#f3a43b', '#60c0dd', '#d7504b', '#c6e579', '#f4e001', '#f0805a', '#26c0c0']
  },
  {
    id: 'roma',
    name: 'Roma',
    colors: ['#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e', '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783', '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889', '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6']
  },
  {
    id: 'cool',
    name: 'Cool',
    colors: ['#003366', '#006699', '#4cabce', '#e5323e']
  },
  {
    id: 'warm',
    name: 'Warm',
    colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
  },
  {
    id: 'neon',
    name: 'Neon',
    colors: ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f']
  }
];

interface ColorSchemeSelectorProps {
  selectedSchemeId?: string;
  customColors?: string[];
  onSchemeChange: (schemeId: string, colors?: string[]) => void;
}

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({ 
  selectedSchemeId = 'default', 
  customColors,
  onSchemeChange 
}) => {
  const [customSchemes, setCustomSchemes] = useState<ColorScheme[]>([]);
  const [newSchemeName, setNewSchemeName] = useState('');
  const [newSchemeColors, setNewSchemeColors] = useState<string[]>(['#000000', '#000000']);
  const [isAdding, setIsAdding] = useState(false);

  const allSchemes = [...defaultColorSchemes, ...customSchemes];

  const handleCreateScheme = () => {
    if (!newSchemeName) return;
    const newScheme: ColorScheme = {
      id: `custom-${Date.now()}`,
      name: newSchemeName,
      colors: newSchemeColors.filter(c => c && c !== '')
    };
    setCustomSchemes([...customSchemes, newScheme]);
    onSchemeChange(newScheme.id, newScheme.colors);
    setIsAdding(false);
    setNewSchemeName('');
    setNewSchemeColors(['#000000', '#000000']);
  };

  const handleColorChange = (index: number, color: string) => {
    const updatedColors = [...newSchemeColors];
    updatedColors[index] = color;
    setNewSchemeColors(updatedColors);
  };

  const addColorSlot = () => {
    setNewSchemeColors([...newSchemeColors, '#000000']);
  };

  const removeColorSlot = (index: number) => {
    if (newSchemeColors.length <= 1) return;
    setNewSchemeColors(newSchemeColors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Standard Schemes</h3>
        <div className="grid grid-cols-1 gap-2">
          {defaultColorSchemes.map(scheme => (
            <button
              key={scheme.id}
              onClick={() => onSchemeChange(scheme.id, scheme.colors)}
              className={`flex items-center justify-between p-2 rounded-md border text-sm transition-colors ${
                selectedSchemeId === scheme.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-1">
                    {scheme.colors.slice(0, 5).map((c, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: c }} />
                    ))}
                 </div>
                 <span>{scheme.name}</span>
              </div>
              {selectedSchemeId === scheme.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      {customSchemes.length > 0 && (
        <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Custom Schemes</h3>
            <div className="grid grid-cols-1 gap-2">
            {customSchemes.map(scheme => (
                <button
                key={scheme.id}
                onClick={() => onSchemeChange(scheme.id, scheme.colors)}
                className={`flex items-center justify-between p-2 rounded-md border text-sm transition-colors ${
                    selectedSchemeId === scheme.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'
                }`}
                >
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                        {scheme.colors.slice(0, 5).map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: c }} />
                        ))}
                    </div>
                    <span>{scheme.name}</span>
                </div>
                {selectedSchemeId === scheme.id && <Check className="h-4 w-4 text-primary" />}
                </button>
            ))}
            </div>
        </div>
      )}

      <Popover open={isAdding} onOpenChange={setIsAdding}>
        <PopoverTrigger asChild>
            <Button variant="outline" className="w-full border-dashed">
                <Plus className="h-4 w-4 mr-2" /> Create Custom Scheme
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="space-y-4">
                <h4 className="font-medium leading-none">New Color Scheme</h4>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name" 
                        value={newSchemeName} 
                        onChange={(e) => setNewSchemeName(e.target.value)} 
                        placeholder="My Custom Theme"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Colors</Label>
                    <div className="grid grid-cols-5 gap-2">
                        {newSchemeColors.map((color, index) => (
                            <div key={index} className="relative group">
                                <input 
                                    type="color" 
                                    value={color}
                                    onChange={(e) => handleColorChange(index, e.target.value)}
                                    className="w-8 h-8 rounded overflow-hidden cursor-pointer border-0 p-0"
                                />
                                <button 
                                    onClick={() => removeColorSlot(index)}
                                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={addColorSlot}
                            className="w-8 h-8 rounded border border-dashed flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <Button onClick={handleCreateScheme} disabled={!newSchemeName} className="w-full">
                    Save Scheme
                </Button>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorSchemeSelector;
