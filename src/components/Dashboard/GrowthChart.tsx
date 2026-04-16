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
    { week: 'S1', projects: 5 },
    { week: 'S2', projects: 13 },
    { week: 'S3', projects: 10  },
    { week: 'S4', projects: 3  },
    { week: 'S5', projects: 9  },
    { week: 'S6', projects: 7  },
    { week: 'S7', projects: 5  },
    { week: 'S8', projects: 1  },
    { week: 'S9', projects: 10  },
    { week: 'S10', projects: 15  },
    { week: 'S11', projects: 12  },
    { week: 'S12', projects: 8  },
  ];

  const monthlyData: ChartData[] = [
    { week: 'Jan', projects: 25 },
    { week: 'Fév', projects: 40 },
    { week: 'Mar', projects: 55 },
  ];

  const data = view === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="growth-chart-container p-3 mt-5 graph">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="mb-1">
            <strong>Tendances de Croissance</strong>
          </h3>
          <p className="text-muted mb-0">
            {view === 'weekly'
              ? 'Evolution des projets et startups sur les 12 dernières semaines'
              : 'Evolution des projets et startups sur les 3 derniers mois'}
          </p>
        </div>
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn btn-sm ${view === 'weekly' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setView('weekly')}
          >
            Hebdomadaire
          </button>
          <button
            type="button"
            className={`btn btn-sm ${view === 'monthly' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setView('monthly')}
          >
            Mensuel
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
            name="Nouveaux Projets"
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
