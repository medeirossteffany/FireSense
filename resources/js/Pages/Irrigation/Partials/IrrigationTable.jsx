import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function IrrigationTable({ histories }) {
  const [searchText, setSearchText] = useState('');

  const filtered = histories.filter(history =>
    history.land.name.toLowerCase().includes(searchText.toLowerCase()) ||
    history.land.street.toLowerCase().includes(searchText.toLowerCase()) ||
    history.land.state.toLowerCase().includes(searchText.toLowerCase()) ||
    history.land.neighborhood.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: 'Nome',
      selector: row => row.land.name,
      sortable: true,
    },
    {
      name: 'Rua',
      selector: row => row.land.street,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.land.state,
      sortable: true,
    },
    {
      name: 'Bairro',
      selector: row => row.land.neighborhood,
      sortable: true,
    },
    {
      name: 'Plantação',
      selector: row => row.land.crop?.type || '-',
      sortable: true,
    },
    {
      name: 'Data de Irrigação',
      selector: row => new Date(row.date).toLocaleDateString('pt-BR'),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status ? 'Ativado' : 'Desativado',
      sortable: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filtered}
      keyField="id"
      pagination
      highlightOnHover
      responsive
      noDataComponent="Nenhum histórico encontrado"
      subHeader
      subHeaderComponent={
        <TextField
          variant="outlined"
          placeholder="Buscar Terreno"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          size="small"
          sx={{ width: '250px', maxWidth: '100%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      }
    />
  );
}
