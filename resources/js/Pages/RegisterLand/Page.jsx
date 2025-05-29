import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import LandTable from './Partials/LandTable';
import RegisterLandModal from './Partials/RegisterLandModal';
import EditLandModal from './Partials/EditLandModal';
import { Button, Container } from 'react-bootstrap';

export default function Page() {
  const { lands, crops } = usePage().props;
  const [showRegister, setShowRegister] = useState(false);
  const [editingLand, setEditingLand] = useState(null);

  return (
    <Container className="mt-4">
      <Head title="Terrenos" />
      <h1 className="mb-4">Cadastro de Terrenos</h1>
      <Button variant="success" onClick={() => setShowRegister(true)}>+ Novo Terreno</Button>

      <LandTable lands={lands} onEdit={(land) => setEditingLand(land)} />

      {showRegister && <RegisterLandModal crops={crops} onClose={() => setShowRegister(false)} />}
      {editingLand && (
        <EditLandModal land={editingLand} crops={crops} onClose={() => setEditingLand(null)} />
      )}
    </Container>
  );
}
