import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        return riscoPercentual.toFixed(1);
    };

    const classificarRisco = (risco) => {
        if (risco >= 80) return 'Muito Alto';
        if (risco >= 60) return 'Alto';
        if (risco >= 40) return 'Moderado';
        if (risco >= 20) return 'Baixo';
        return 'Muito Baixo';
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Clima nas suas propriedades</h3>
                        {lands.map((land) => {
                            const key = `${land.latitude},${land.longitude}`;
                            const weather = weatherData[key];

                            return (
                                <div key={land.id} className="mb-6 border-b pb-4">
                                    <h4 className="text-md font-semibold">{land.name} - {land.city}/{land.state}</h4>
                                    {weather ? (
                                        <div className="space-y-1">
                                            <p><strong>Temperatura:</strong> {weather.main.temp}°C (sensação: {weather.main.feels_like}°C)</p>
                                            <p><strong>Umidade:</strong> {weather.main.humidity}%</p>
                                            <p><strong>Pressão:</strong> {weather.main.pressure} hPa</p>
                                            <p><strong>Vento:</strong> {weather.wind.speed} m/s</p>
                                            <p><strong>Condição:</strong> {weather.weather[0].description}</p>
                                            <p><strong>Risco de Incêndio:</strong>
                                                {` ${calcularRiscoIncendio(weather.main.temp, weather.main.humidity)}% (${classificarRisco(calcularRiscoIncendio(weather.main.temp, weather.main.humidity))})`}
                                            </p>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                alt={weather.weather[0].description}
                                                className="h-12"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">Carregando clima...</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
