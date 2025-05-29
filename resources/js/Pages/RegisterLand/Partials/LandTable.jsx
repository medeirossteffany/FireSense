import { Table, Button } from 'react-bootstrap';

export default function LandTable({ lands, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Rua</th>
          <th>Estado</th>
          <th>Bairro</th>
          <th>Plantação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {lands.map((land) => (
          <tr key={land.id}>
            <td>{land.name}</td>
            <td>{land.street}</td>
            <td>{land.state}</td>
            <td>{land.neighborhood}</td>
            <td>{land.crop?.type}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(land)}>Editar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
