import { ChartTemplate } from "@/types";

export const chartTemplates: ChartTemplate[] = [
  // --- LINE CHARTS ---
  {
    id: "basic-line",
    type: "line",
    name: "Basic Line Chart",
    description: "Basic line chart showing trends over time.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Visitors",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    },
    defaultConfig: {
      title: "Basic Line Chart",
      theme: "default",
      colors: ["#5470c6"],
    },
    echartsOption: {
      title: { text: "Basic Line Chart" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Visitors",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    },
  },
  {
    id: "smoothed-line",
    type: "line",
    name: "Smoothed Line Chart",
    description: "Line chart with smoothed curves.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Visitors",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    },
    defaultConfig: {
      title: "Smoothed Line Chart",
      theme: "default",
      colors: ["#91cc75"],
    },
    echartsOption: {
      title: { text: "Smoothed Line Chart" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Visitors",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
    },
  },
  {
    id: "basic-area",
    type: "line",
    name: "Basic Area Chart",
    description: "Line chart with filled area.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Visitors",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    },
    defaultConfig: {
      title: "Basic Area Chart",
      theme: "default",
      colors: ["#fac858"],
    },
    echartsOption: {
      title: { text: "Basic Area Chart" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Visitors",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {},
        },
      ],
    },
  },
  {
    id: "stacked-line",
    type: "line",
    name: "Stacked Line Chart",
    description: "Multiple lines stacked on top of each other.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Email",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    },
    defaultConfig: {
      title: "Stacked Line Chart",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: { text: "Stacked Line Chart" },
      tooltip: { trigger: "axis" },
      legend: { data: ["Email", "Union Ads", "Video Ads"] },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    },
  },
  {
    id: "temperature-change",
    type: "line",
    name: "Temperature Change in the Coming Week",
    description: "High and low temperature forecast.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Highest",
          type: "line",
          data: [10, 11, 13, 11, 12, 12, 9],
        },
        {
          name: "Lowest",
          type: "line",
          data: [1, -2, 2, 5, 3, 2, 0],
        },
      ],
    },
    defaultConfig: {
      title: "Temperature Change in the Coming Week",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: { text: "Temperature Change in the Coming Week" },
      tooltip: { trigger: "axis" },
      legend: {},
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        axisLabel: { formatter: "{value} °C" },
      },
      series: [
        {
          name: "Highest",
          type: "line",
          data: [10, 11, 13, 11, 12, 12, 9],
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
        {
          name: "Lowest",
          type: "line",
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ value: -2, xAxis: 1, yAxis: -1.5 }],
          },
          markLine: {
            data: [
              { type: "average", name: "Avg" },
              [
                {
                  symbol: "none",
                  x: "90%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "Max",
                  },
                  type: "max",
                  name: "Highest Point",
                },
              ],
            ],
          },
        },
      ],
    },
  },
  {
    id: "line-gradient",
    type: "line",
    name: "Line Gradient",
    description: "Line chart with gradient area style.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Line 1",
          type: "line",
          data: [140, 232, 101, 264, 90, 340, 250],
        },
      ],
    },
    defaultConfig: {
      title: "Line Gradient",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: { text: "Line Gradient" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Line 1",
          type: "line",
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          // IMPORTANT: Removed hardcoded color stops to allow theme overriding
          // areaStyle now relies on default color or theme color
          areaStyle: {
            opacity: 0.8,
          },
          data: [140, 232, 101, 264, 90, 340, 250],
        },
      ],
    },
  },
  {
    id: "distribution-electricity",
    type: "line",
    name: "Distribution of Electricity",
    description: "Area chart showing distribution over time.",
    thumbnail: "",
    defaultData: {
      xAxis: ["00:00", "01:15", "02:30", "03:45", "05:00", "06:15", "07:30", "08:45", "10:00", "11:15", "12:30", "13:45", "15:00", "16:15", "17:30", "18:45", "20:00", "21:15", "22:30", "23:45"],
      series: [
        {
            name: "Electricity",
            type: "line",
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
        }
      ]
    },
    defaultConfig: {
      title: "Distribution of Electricity",
      theme: "default",
      colors: [],
    },
    echartsOption: {
        title: {
            text: 'Distribution of Electricity',
            subtext: 'Fake Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["00:00", "01:15", "02:30", "03:45", "05:00", "06:15", "07:30", "08:45", "10:00", "11:15", "12:30", "13:45", "15:00", "16:15", "17:30", "18:45", "20:00", "21:15", "22:30", "23:45"]
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} W'
            }
        },
        series: [
            {
                name: 'Electricity',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                // IMPORTANT: Removed hardcoded color stops to allow theme overriding
                areaStyle: {
                    opacity: 0.8,
                },
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
            }
        ]
    }
  },
  {
    id: "line-markline",
    type: "line",
    name: "Line with Marklines",
    description: "Line chart with statistical marklines.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Electricity",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    },
    defaultConfig: { title: "Line with Marklines", theme: "default", colors: [] },
    echartsOption: {
      title: { text: 'Line with Marklines' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{
        name: 'Electricity',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            { type: 'max', name: 'Max' }
          ]
        }
      }]
    }
  },
  {
    id: "data-transform-filter",
    type: "line",
    name: "Data Transform Filter",
    description: "Using dataset transform to filter data.",
    thumbnail: "",
    defaultData: {
      xAxis: [], // Not used with dataset source usually, but kept for type
      series: []
    },
    defaultConfig: { title: "Data Transform Filter", theme: "default", colors: [] },
    echartsOption: {
      dataset: [
        {
          id: 'dataset_raw',
          source: [
            ['Product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        {
          id: 'dataset_since_2016',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: { dimension: '2016', '>': 50 }
          }
        }
      ],
      title: { text: 'Data Transform Filter' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          type: 'bar',
          datasetId: 'dataset_since_2016',
          encode: { x: 'Product', y: '2016' }
        }
      ]
    }
  },

  // --- BAR CHARTS ---
  {
    id: "basic-bar",
    type: "bar",
    name: "Basic Bar Chart",
    description: "Simple bar chart for categorical comparisons.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Sales",
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    },
    defaultConfig: {
      title: "Basic Bar Chart",
      theme: "default",
      colors: ["#5470c6"],
    },
    echartsOption: {
      title: { text: "Basic Bar Chart" },
      tooltip: {},
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          name: "Sales",
          type: "bar",
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
    },
  },
  {
    id: "bar-background",
    type: "bar",
    name: "Bar with Background",
    description: "Bar chart with background color for reference.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Sales",
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    },
    defaultConfig: {
      title: "Bar with Background",
      theme: "default",
      colors: ["#91cc75"],
    },
    echartsOption: {
      title: { text: "Bar with Background" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    },
  },
  {
    id: "stacked-bar",
    type: "bar",
    name: "Stacked Bar Chart",
    description: "Bar chart showing composition of categories.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Direct",
          type: "bar",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Email",
          type: "bar",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "bar",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    },
    defaultConfig: {
      title: "Stacked Bar Chart",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: { text: "Stacked Bar Chart" },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: { data: ["Direct", "Email", "Union Ads"] },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Direct",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Email",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    },
  },
  {
    id: "stacked-column",
    type: "bar",
    name: "Stacked Column Chart",
    description: "Vertical stacked bar chart.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      series: [
        { name: "Product A", type: "bar", data: [10, 15, 20, 25, 30, 35, 40] },
        { name: "Product B", type: "bar", data: [20, 25, 30, 35, 40, 45, 50] },
        { name: "Product C", type: "bar", data: [30, 35, 40, 45, 50, 55, 60] }
      ]
    },
    defaultConfig: {
      title: "Stacked Column Chart",
      theme: "default",
      colors: []
    },
    echartsOption: {
      title: { text: "Stacked Column Chart" },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Product A', type: 'bar', stack: 'total', data: [10, 15, 20, 25, 30, 35, 40] },
        { name: 'Product B', type: 'bar', stack: 'total', data: [20, 25, 30, 35, 40, 45, 50] },
        { name: 'Product C', type: 'bar', stack: 'total', data: [30, 35, 40, 45, 50, 55, 60] }
      ]
    }
  },

  // --- PIE CHARTS ---
  {
    id: "basic-pie",
    type: "pie",
    name: "Basic Pie Chart",
    description: "Circular chart showing proportional data.",
    thumbnail: "",
    defaultData: {
      xAxis: [],
      series: [
        {
          name: "Access Source",
          type: "pie",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ] as any,
        },
      ],
    },
    defaultConfig: {
      title: "Referer of a Website",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    },
  },
  {
    id: "doughnut-chart",
    type: "pie",
    name: "Doughnut Chart",
    description: "Pie chart with a hole in the center.",
    thumbnail: "",
    defaultData: {
      xAxis: [],
      series: [
        {
          name: "Access Source",
          type: "pie",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ] as any,
        },
      ],
    },
    defaultConfig: {
      title: "Doughnut Chart",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: {
        text: "Doughnut Chart",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    },
  },
  {
    id: "pie-pad-angle",
    type: "pie",
    name: "Pie with padAngle",
    description: "Pie chart with gaps between sectors.",
    thumbnail: "",
    defaultData: {
      xAxis: [],
      series: [
        {
          name: "Access Source",
          type: "pie",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" }
          ] as any
        }
      ]
    },
    defaultConfig: {
      title: "Pie with padAngle",
      theme: "default",
      colors: []
    },
    echartsOption: {
      title: { text: "Pie with padAngle", left: "center" },
      tooltip: { trigger: "item" },
      legend: { top: "5%", left: "center" },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: { borderRadius: 10 },
          label: { show: false, position: "center" },
          emphasis: { label: { show: true, fontSize: 40, fontWeight: "bold" } },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" }
          ]
        }
      ]
    }
  },
  {
    id: "pie-texture",
    type: "pie",
    name: "Texture on Pie Chart",
    description: "Pie chart with textured patterns.",
    thumbnail: "",
    defaultData: {
        xAxis: [],
        series: [{
            name: "Texture Pie",
            type: "pie",
            data: [
                { value: 1048, name: 'A' },
                { value: 735, name: 'B' },
                { value: 580, name: 'C' },
                { value: 484, name: 'D' },
                { value: 300, name: 'E' }
            ] as any
        }]
    },
    defaultConfig: { title: "Texture on Pie Chart", theme: "default", colors: [] },
    echartsOption: {
        title: { text: 'Texture on Pie Chart', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [
            {
                name: 'Texture Pie',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'A' },
                    { value: 735, name: 'B' },
                    { value: 580, name: 'C' },
                    { value: 484, name: 'D' },
                    { value: 300, name: 'E' }
                ],
                itemStyle: {
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#fff'
                }
            }
        ]
    }
  },

  // --- SCATTER CHARTS ---
  {
    id: "basic-scatter",
    type: "scatter",
    name: "Basic Scatter Plot",
    description: "Scatter plot showing distribution of two variables.",
    thumbnail: "",
    defaultData: {
      xAxis: [],
      series: [
        {
          name: "Data A",
          type: "scatter",
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68],
          ] as any,
        },
      ],
    },
    defaultConfig: {
      title: "Basic Scatter Plot",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: { text: "Basic Scatter Plot" },
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68],
          ],
          type: "scatter",
        },
      ],
    },
  },

  // --- RADAR CHARTS ---
  {
    id: "basic-radar",
    type: "radar",
    name: "Basic Radar Chart",
    description: "Radar chart for multivariate data.",
    thumbnail: "",
    defaultData: {
      xAxis: [],
      series: [
        {
          name: "Budget vs Spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "Actual Spending",
            },
          ] as any,
        },
      ],
    },
    defaultConfig: {
      title: "Budget vs Spending",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: {
        text: "Basic Radar Chart",
      },
      legend: {
        data: ["Allocated Budget", "Actual Spending"],
      },
      radar: {
        indicator: [
          { name: "Sales", max: 6500 },
          { name: "Administration", max: 16000 },
          { name: "IT", max: 30000 },
          { name: "Support", max: 38000 },
          { name: "Development", max: 52000 },
          { name: "Marketing", max: 25000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    },
  },
  {
    id: "custom-radar",
    type: "radar",
    name: "Customized Radar Chart",
    description: "Radar chart with custom styles.",
    thumbnail: "",
    defaultData: {
      xAxis: [],
      series: [
        {
          name: "Data",
          type: "radar",
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: "Allocated Budget"
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: "Actual Spending"
            }
          ] as any
        }
      ]
    },
    defaultConfig: { title: "Customized Radar", theme: "default", colors: [] },
    echartsOption: {
        title: { text: 'Customized Radar Chart' },
        legend: { data: ['Allocated Budget', 'Actual Spending'] },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
            ],
            splitArea: {
                areaStyle: {
                    color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10
                }
            }
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: 'Allocated Budget',
                    itemStyle: { color: '#F9713C' },
                    areaStyle: { opacity: 0.1 }
                },
                {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    name: 'Actual Spending',
                    itemStyle: { color: '#B3E4A1' },
                    areaStyle: { opacity: 0.1 }
                }
            ]
        }]
    }
  },

  // --- CANDLESTICK CHARTS ---
  {
    id: "basic-candlestick",
    type: "candlestick",
    name: "Basic Candlestick",
    description: "Financial chart for stock price movements.",
    thumbnail: "",
    defaultData: {
      xAxis: ["2023-10-24", "2023-10-25", "2023-10-26", "2023-10-27"],
      series: [
        {
          name: "Day",
          type: "candlestick",
          data: [
            [20, 34, 10, 38], // open, close, low, high
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42],
          ],
        },
      ],
    },
    defaultConfig: {
      title: "Basic Candlestick",
      theme: "default",
      colors: [],
    },
    echartsOption: {
      title: { text: "Basic Candlestick" },
      xAxis: {
        data: ["2023-10-24", "2023-10-25", "2023-10-26", "2023-10-27"],
      },
      yAxis: {},
      series: [
        {
          type: "candlestick",
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42],
          ],
        },
      ],
    },
  },

  // --- MIXED/CUSTOM CHARTS ---
  {
    id: "mixed-line-bar",
    type: "mix",
    name: "Mixed Line and Bar",
    description: "Combination of line and bar charts.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "Evaporation", type: "bar", data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6] },
        { name: "Precipitation", type: "bar", data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6] },
        { name: "Temperature", type: "line", data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3] }
      ]
    },
    defaultConfig: { title: "Mixed Line and Bar", theme: "default", colors: [] },
    echartsOption: {
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        legend: { data: ['Evaporation', 'Precipitation', 'Temperature'] },
        xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisPointer: { type: 'shadow' } }],
        yAxis: [
            { type: 'value', name: 'Precipitation', min: 0, max: 250, interval: 50, axisLabel: { formatter: '{value} ml' } },
            { type: 'value', name: 'Temperature', min: 0, max: 25, interval: 5, axisLabel: { formatter: '{value} °C' } }
        ],
        series: [
            { name: 'Evaporation', type: 'bar', data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6] },
            { name: 'Precipitation', type: 'bar', data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6] },
            { name: 'Temperature', type: 'line', yAxisIndex: 1, data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3] }
        ]
    }
  },
  {
    id: "multiple-y-axes",
    type: "mix",
    name: "Multiple Y Axes",
    description: "Chart with multiple Y axes for different scales.",
    thumbnail: "",
    defaultData: {
        xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            { name: 'Evaporation', type: 'bar', data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3] },
            { name: 'Precipitation', type: 'bar', data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3] },
            { name: 'Temperature', type: 'line', data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2] }
        ]
    },
    defaultConfig: { title: "Multiple Y Axes", theme: "default", colors: [] },
    echartsOption: {
        color: ['#5470C6', '#91CC75', '#EE6666'],
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        legend: { data: ['Evaporation', 'Precipitation', 'Temperature'] },
        xAxis: [{ type: 'category', axisTick: { alignWithLabel: true }, data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }],
        yAxis: [
            { type: 'value', name: 'Evaporation', position: 'right', alignTicks: true, axisLine: { show: true, lineStyle: { color: '#5470C6' } }, axisLabel: { formatter: '{value} ml' } },
            { type: 'value', name: 'Precipitation', position: 'right', alignTicks: true, offset: 80, axisLine: { show: true, lineStyle: { color: '#91CC75' } }, axisLabel: { formatter: '{value} ml' } },
            { type: 'value', name: 'Temperature', position: 'left', alignTicks: true, axisLine: { show: true, lineStyle: { color: '#EE6666' } }, axisLabel: { formatter: '{value} °C' } }
        ],
        series: [
            { name: 'Evaporation', type: 'bar', data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3] },
            { name: 'Precipitation', type: 'bar', yAxisIndex: 1, data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3] },
            { name: 'Temperature', type: 'line', yAxisIndex: 2, data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2] }
        ]
    }
  },

  // --- GRAPH CHARTS ---
  {
    id: "graph-cartesian",
    type: "graph",
    name: "Graph on Cartesian",
    description: "Graph nodes positioned on a cartesian coordinate system.",
    thumbnail: "",
    defaultData: {
        xAxis: [], // Not strictly used for nodes but good for consistency
        series: [{
            name: "Graph",
            type: "graph",
            data: [
                { x: 10, y: 10, name: 'Node 1', value: 10 },
                { x: 50, y: 50, name: 'Node 2', value: 20 },
                { x: 30, y: 30, name: 'Node 3', value: 30 }
            ] as any,
            links: [
                { source: 'Node 1', target: 'Node 2' },
                { source: 'Node 2', target: 'Node 3' }
            ]
        }]
    },
    defaultConfig: { title: "Graph on Cartesian", theme: "default", colors: [] },
    echartsOption: {
        title: { text: 'Graph on Cartesian' },
        tooltip: {},
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 40,
                label: { show: true },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: [
                    { x: 10, y: 10, name: 'Node 1', value: 10 },
                    { x: 50, y: 50, name: 'Node 2', value: 20 },
                    { x: 30, y: 30, name: 'Node 3', value: 30 }
                ],
                links: [
                    { source: 'Node 1', target: 'Node 2' },
                    { source: 'Node 2', target: 'Node 3' }
                ],
                lineStyle: { color: '#2f4554' }
            }
        ]
    }
  },
  
  // --- DYNAMIC/ADVANCED ---
  {
    id: "line-race",
    type: "line",
    name: "Line Race",
    description: "Line chart race animation.",
    thumbnail: "",
    defaultData: {
      xAxis: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      series: [
        { name: "A", type: "line", data: [10, 20, 30, 40, 50] },
        { name: "B", type: "line", data: [50, 40, 30, 20, 10] },
        { name: "C", type: "line", data: [20, 30, 10, 50, 40] }
      ]
    },
    defaultConfig: { title: "Line Race", theme: "default", colors: [] },
    echartsOption: {
      title: { text: "Line Race" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "A",
          type: "line",
          data: [10, 20, 30, 40, 50],
          endLabel: { show: true, formatter: "{a}" },
          labelLayout: { moveOverlap: "shiftY" },
          emphasis: { focus: "series" }
        },
        {
          name: "B",
          type: "line",
          data: [50, 40, 30, 20, 10],
          endLabel: { show: true, formatter: "{a}" },
          labelLayout: { moveOverlap: "shiftY" },
          emphasis: { focus: "series" }
        },
        {
          name: "C",
          type: "line",
          data: [20, 30, 10, 50, 40],
          endLabel: { show: true, formatter: "{a}" },
          labelLayout: { moveOverlap: "shiftY" },
          emphasis: { focus: "series" }
        }
      ]
    }
  },
  {
    id: "bar-axis-break",
    type: "bar",
    name: "Bar Chart with Axis Breaks",
    description: "Bar chart with broken Y-axis for varying scales.",
    thumbnail: "",
    defaultData: {
      xAxis: ["A", "B", "C", "D"],
      series: [
        { name: "Value (Top)", type: "bar", data: [1000, 1200, 5, 8] },
        { name: "Value (Bottom)", type: "bar", data: [1000, 1200, 5, 8] }
      ]
    },
    defaultConfig: { title: "Bar Chart with Axis Breaks", theme: "default", colors: [] },
    echartsOption: {
      title: { text: "Bar Chart with Axis Breaks" },
      tooltip: { trigger: "item" },
      axisPointer: { link: { xAxisIndex: "all" } },
      grid: [
        { bottom: "60%", height: "35%" },
        { top: "60%", height: "35%" }
      ],
      xAxis: [
        { type: "category", data: ["A", "B", "C", "D"], gridIndex: 0, axisLabel: { show: false }, axisTick: { show: false } },
        { type: "category", data: ["A", "B", "C", "D"], gridIndex: 1, position: "bottom" }
      ],
      yAxis: [
        { type: "value", gridIndex: 0, min: 800, max: 1500 },
        { type: "value", gridIndex: 1, min: 0, max: 20 }
      ],
      series: [
        {
          type: "bar",
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: [1000, 1200, 5, 8]
        },
        {
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [1000, 1200, 5, 8]
        }
      ]
    }
  },
  {
    id: "dynamic-data",
    type: "line",
    name: "Dynamic Data",
    description: "Simulated dynamic data updates.",
    thumbnail: "",
    defaultData: {
        xAxis: ["00:00", "00:01", "00:02", "00:03", "00:04", "00:05", "00:06", "00:07", "00:08", "00:09"],
        series: [{ name: "Dynamic Line", type: "line", data: [10, 12, 11, 14, 19, 17, 15, 12, 10, 15] }]
    },
    defaultConfig: { title: "Dynamic Data", theme: "default", colors: [] },
    echartsOption: {
        title: { text: 'Dynamic Data' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#283b56' } } },
        legend: {},
        dataZoom: { show: false, start: 0, end: 100 },
        xAxis: { type: 'category', boundaryGap: true, data: ["00:00", "00:01", "00:02", "00:03", "00:04", "00:05", "00:06", "00:07", "00:08", "00:09"] },
        yAxis: { type: 'value', scale: true, name: 'Value', max: 30, min: 0, boundaryGap: [0.2, 0.2] },
        series: [{
            name: 'Dynamic Line',
            type: 'line',
            data: [10, 12, 11, 14, 19, 17, 15, 12, 10, 15]
        }]
    }
  }
];
