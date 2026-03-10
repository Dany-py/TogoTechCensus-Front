
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Helper to generate colors or cycle through a premium palette
const COLORS = [
  '#FFD700', // Gold
  '#00CED1', // Dark Turquoise
  '#f89843ff', // Orange Red
  '#32CD32', // Lime Green
  '#9370DB', // Medium Purple
  '#1E90FF', // Dodger Blue
];

const Activity = () => {
    return (
        <div className="container">
            <section>
                <h1 className="text-start">Activities</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel praesentium quas eos! Optio, perspiciatis incidunt illum sunt voluptas ad qui quas autem, illo laborum nulla dignissimos voluptate distinctio, nemo debitis?</p>
            </section>
            <div>
                <ResponsiveContainer>
                    <AreaChart
                        //data={graphData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            {/*dataKeys.map((key, index) => (
                            <linearGradient key={`color-${key}`} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0} />
                            </linearGradient>
                            ))*/}
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />

                        <XAxis
                            dataKey="day"
                            stroke="#666"
                            tick={{ fill: '#888' }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />

                        <YAxis
                            stroke="#666"
                            tick={{ fill: '#888' }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            width={60}
                        />

                        <Tooltip
                            contentStyle={{
                            backgroundColor: 'rgba(20, 20, 20, 0.95)',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                            }}
                            itemStyle={{ padding: '2px 0' }}
                            //formatter={(value: number) => [formatCurrency(value), '']}
                            labelStyle={{ color: '#888', marginBottom: '8px' }}
                        />

                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ paddingBottom: '20px' }}
                        />

                        {/*dataKeys.map((key, index) => (
                            <Area
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={COLORS[index % COLORS.length]}
                                fill={`url(#color-${key})`}
                                strokeWidth={2}
                                name={key} // Render the full key or a mapped name if available
                                animationDuration={1500}
                            />
                        ))*/}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Activity;