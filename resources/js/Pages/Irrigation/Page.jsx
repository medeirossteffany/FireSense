import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import IrrigationTable from './Partials/IrrigationTable';
import { Box } from '@mui/material';

export default function Page() {
  const { histories } = usePage().props;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Histórico de Irrigações</h2>}
    >
      <Head title="Histórico de Irrigações" />

      <Box sx={{ p: 2 }}>
        <IrrigationTable histories={histories} />
      </Box>
    </AuthenticatedLayout>
  );
}
