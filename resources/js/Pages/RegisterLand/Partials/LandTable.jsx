import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

export default function LandTable({ lands, onEdit }) {
  const [searchText, setSearchText] = useState('');

  const filtered = lands.filter(land =>
    land.name.toLowerCase().includes(searchText.toLowerCase()) ||
    land.street.toLowerCase().includes(searchText.toLowerCase()) ||
    land.state.toLowerCase().includes(searchText.toLowerCase()) ||
    land.neighborhood.toLowerCase().includes(searchText.toLowerCase()) ||
    (land.crop?.type?.toLowerCase() || '').includes(searchText.toLowerCase())
  );

  const enhancedData = filtered.map(land => ({
    ...land,
    row_key: `${land.id}`,
  }));

  const columns = [
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Rua',
      selector: row => row.street,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.state,
      sortable: true,
    },
    {
      name: 'Bairro',
      selector: row => row.neighborhood,
      sortable: true,
    },
    {
      name: 'Plantação',
      selector: row => row.crop?.type || '-',
      sortable: true,
    },
    {
      name: 'Ações',
      cell: row => (
        <Tooltip title="Editar Terreno">
          <IconButton color="primary" onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={enhancedData}
      keyField="row_key"
      pagination
      highlightOnHover
      responsive
      subHeader
      noDataComponent="Nenhum terreno encontrado"
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
