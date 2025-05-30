import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
  Badge,
} from '@mui/material';
import GrainIcon from '@mui/icons-material/Grain';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Dashboard() {
  const { lands } = usePage().props;
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    lands.forEach((land) => {
      const key = `${land.latitude},${land.longitude}`;

      axios.get('/weather', {
        params: {
          lat: land.latitude,
          lon: land.longitude,
        }
      })
        .then(response => {
          setWeatherData(prev => ({
            ...prev,
            [key]: response.data
          }));
        })
        .catch(error => {
          console.error(`Erro ao buscar clima para ${land.name}:`, error);
        });
    });
  }, [lands]);

  const calcularRiscoIncendio = (temp, humidity) => {
    const risco = temp - (0.55 * (1 - humidity / 100) * (temp - 14.5));
    let riscoPercentual = Math.min(Math.max((risco / 50) * 100, 0), 100);
    return parseFloat(riscoPercentual.toFixed(1));
  };

  const classificarRisco = (risco) => {
    if (risco >= 80) return { label: 'Muito Alto', color: 'error' };
    if (risco >= 60) return { label: 'Alto', color: 'warning' };
    if (risco >= 40) return { label: 'Moderado', color: 'info' };
    if (risco >= 20) return { label: 'Baixo', color: 'success' };
    return { label: 'Muito Baixo', color: 'primary' };
  };


    const chartData = lands.map((land) => {
        const key = `${land.latitude},${land.longitude}`;
        const weather = weatherData[key];
        if (!weather) return null;
        const risco = calcularRiscoIncendio(weather.main.temp, weather.main.humidity);
        return {
        name: land.name,
        risco,
        };
    }).filter(Boolean);


  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <Box sx={{ flexGrow: 1, p: 3 }}>
      {chartData.length > 0 && (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Risco de Incêndio Geral
            </Typography>
            <BarChart
                height={300}
                width={1100}
                series={[
                {
                    data: chartData.map(item => item.risco),
                    label: 'Risco de Incêndio (%)',
                    color: '#ff4444',
                },
                ]}
                xAxis={[
                {
                    scaleType: 'band',
                    data: chartData.map(item => item.name),
                },
                ]}
                yAxis={[
                {
                    min: 0,
                    max: 100,
                },
                ]}
                grid={{ horizontal: true }}
            />
            </Box>
        </Box>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {lands.map((land) => {
            const key = `${land.latitude},${land.longitude}`;
            const weather = weatherData[key];

            if (!weather) {
              return (
                <Grid item xs={12} md={6} lg={4} key={land.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{land.name}</Typography>
                      <Typography color="textSecondary">
                        {land.city}/{land.state}
                      </Typography>
                      <Typography color="textSecondary">
                        Carregando clima...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }

            const risco = calcularRiscoIncendio(weather.main.temp, weather.main.humidity);
            const riscoInfo = classificarRisco(risco);

            return (
              <Grid item xs={12} md={6} lg={4} key={land.id}>
                <Badge
                  color="error"
                  badgeContent="ALERTA"
                  invisible={riscoInfo.label !== 'Muito Alto'}
                >
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6">{land.name}</Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {land.city}/{land.state}
                      </Typography>

                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <ThermostatIcon color="error" sx={{ mr: 1 }} />
                            <Typography variant="body2">{weather.main.temp}°C</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <OpacityIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2">{weather.main.humidity}%</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <GrainIcon color="secondary" sx={{ mr: 1 }} />
                            <Typography variant="body2">{weather.main.pressure} hPa</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <AirIcon color="info" sx={{ mr: 1 }} />
                            <Typography variant="body2">{weather.wind.speed} m/s</Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" gutterBottom><strong>Risco de Incêndio:</strong></Typography>
                        <LinearProgress
                          variant="determinate"
                          value={risco}
                          color={riscoInfo.color}
                          sx={{ height: 10, borderRadius: 5 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2">{risco}%</Typography>
                          <Chip
                            label={riscoInfo.label}
                            color={riscoInfo.color}
                            size="small"
                          />
                        </Box>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                          alt={weather.weather[0].description}
                          style={{ height: 60 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Badge>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
