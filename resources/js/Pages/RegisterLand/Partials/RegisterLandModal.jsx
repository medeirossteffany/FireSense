import { useForm } from '@inertiajs/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Button, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

export default function RegisterLandModal({ crops, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        hectares: '',
        state: '',
        neighborhood: '',
        city: '',
        street: '',
        number: '',
        latitude: '',
        longitude: '',
        type: '',
      });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/lands', {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cadastrar Terreno</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {[
            ['name', 'Nome'],
            ['hectares', 'Hectares'],
            ['state', 'Estado'],
            ['neighborhood', 'Bairro'],
            ['city', 'Cidade'],
            ['street', 'Rua'],
            ['number', 'Número'],
            ['latitude', 'Latitude'],
            ['longitude', 'Longitude'],
          ].map(([field, label]) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={label}
                value={data[field]}
                onChange={(e) => setData(field, e.target.value)}
                error={!!errors[field]}
                helperText={errors[field]}
              />
            </Grid>
          ))}

            <Grid item xs={12}>
            <Autocomplete
                freeSolo
                options={crops.map((c) => c.type)}
                onInputChange={(e, value) => setData('type', value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tipo de Plantação"
                    error={!!errors.type}
                    helperText={errors.type}
                />
                )}
            />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={processing} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
