import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartData {
  week: string;
  projects: number;
}

const GrowthChart = () => {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyData: ChartData[] = [
    { week: 'W1', projects: 5 },
    { week: 'W2', projects: 13 },
    { week: 'W3', projects: 10  },
    { week: 'W4', projects: 3  },
    { week: 'W5', projects: 9  },
    { week: 'W6', projects: 7  },
    { week: 'W7', projects: 5  },
    { week: 'W8', projects: 1  },
    { week: 'W9', projects: 10  },
    { week: 'W10', projects: 15  },
    { week: 'W11', projects: 12  },
    { week: 'W12', projects: 8  },
  ];

  const monthlyData: ChartData[] = [
    { week: 'Jan', projects: 25 },
    { week: 'Fev', projects: 40 },
    { week: 'Mar', projects: 55 },
  ];

  const data = view === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="growth-chart-container p-3 mt-5 graph">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="mb-1">
            <strong>Growth Trends</strong>
          </h3>
          <p className="text-muted mb-0">
            {view === 'weekly'
              ? 'Trends in projects and startups over the past 12 weeks'
              : 'Trends in projects and startups over the past 3 months'}
          </p>
        </div>
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn btn-sm ${view === 'weekly' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setView('weekly')}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`btn btn-sm ${view === 'monthly' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setView('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="week" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            cursor={{ stroke: '#ddd' }}
          />
          <Legend />
          <Area
            type="natural"
            dataKey="projects"
            stroke="#28A745"
            strokeWidth={3}
            name="New Projects"
            dot={false}
            isAnimationActive={true}
            fill="#28A745"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
