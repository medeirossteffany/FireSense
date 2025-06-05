import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LandTable from './Partials/LandTable';
import RegisterLandModal from './Partials/RegisterLandModal';
import EditLandModal from './Partials/EditLandModal';
import { Button, Box, Typography } from '@mui/material';

export default function Page() {
  const { lands, crops } = usePage().props;
  const [showRegister, setShowRegister] = useState(false);
  const [editingLand, setEditingLand] = useState(null);

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Terrenos</h2>}
    >
      <Head title="Terrenos" />

      <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="success" onClick={() => setShowRegister(true)}>
          + Novo Terreno
        </Button>
      </Box>


        <LandTable lands={lands} onEdit={(land) => setEditingLand(land)} />

        {showRegister && (
          <RegisterLandModal crops={crops} onClose={() => setShowRegister(false)} />
        )}
        {editingLand && (
          <EditLandModal land={editingLand} crops={crops} onClose={() => setEditingLand(null)} />
        )}

      </Box>
    </AuthenticatedLayout>
  );
}
